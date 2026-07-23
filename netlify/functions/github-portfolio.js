const { buildPortfolioResponse } = require('../../lib/github-portfolio');

const GITHUB_API_VERSION = '2022-11-28';
const REQUEST_TIMEOUT_MS = 8_000;
const USERNAME = 'Jordans2299';

const PORTFOLIO_QUERY = `
  query Portfolio($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            homepageUrl
            isPrivate
            updatedAt
            stargazerCount
            forkCount
            primaryLanguage { name color }
            repositoryTopics(first: 6) {
              nodes { topic { name } }
            }
            languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
              totalSize
              edges {
                size
                node { name color }
              }
            }
            defaultBranchRef {
              target {
                ... on Commit {
                  history(first: 3) {
                    nodes {
                      oid
                      messageHeadline
                      committedDate
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
      contributionsCollection {
        startedAt
        endedAt
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

class GitHubRequestError extends Error {
  constructor(message, { status, rateLimitRemaining, rateLimitReset } = {}) {
    super(message);
    this.name = 'GitHubRequestError';
    this.status = status;
    this.rateLimitRemaining = rateLimitRemaining;
    this.rateLimitReset = rateLimitReset;
  }
}

async function githubRequest(url, options, token) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'JordanStone-portfolio',
        'X-GitHub-Api-Version': GITHUB_API_VERSION,
        ...options?.headers,
      },
      signal: controller.signal,
    });

    const payload = await response.json().catch(() => null);
    if (!response.ok || payload?.errors?.length) {
      throw new GitHubRequestError(
        payload?.message || payload?.errors?.[0]?.message || `GitHub returned ${response.status}`,
        {
          status: response.status,
          rateLimitRemaining: response.headers.get('x-ratelimit-remaining'),
          rateLimitReset: response.headers.get('x-ratelimit-reset'),
        },
      );
    }

    return payload;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new GitHubRequestError('GitHub request timed out', { status: 504 });
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function response(statusCode, body, cacheable = false, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': cacheable ? 'public, max-age=300' : 'no-store',
      ...(cacheable
        ? {
            'Netlify-CDN-Cache-Control':
              'public, durable, max-age=3600, stale-while-revalidate=86400',
          }
        : {}),
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  };
}

function warningFor(error, source) {
  if (error instanceof GitHubRequestError && error.rateLimitRemaining === '0') {
    return `${source} data is temporarily unavailable because GitHub's rate limit was reached.`;
  }
  return `${source} data is temporarily unavailable.`;
}

exports.handler = async function handler() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return response(503, {
      error: {
        code: 'GITHUB_NOT_CONFIGURED',
        message: 'GitHub portfolio data is not configured.',
      },
    });
  }

  const restPromise = githubRequest(
    `https://api.github.com/users/${USERNAME}/repos?type=owner&sort=updated&per_page=100`,
    { method: 'GET' },
    token,
  );
  const graphPromise = githubRequest(
    'https://api.github.com/graphql',
    {
      method: 'POST',
      body: JSON.stringify({
        query: PORTFOLIO_QUERY,
        variables: { login: USERNAME },
      }),
    },
    token,
  );

  const [restResult, graphResult] = await Promise.allSettled([restPromise, graphPromise]);
  const warnings = [];

  if (restResult.status === 'rejected') warnings.push(warningFor(restResult.reason, 'Repository'));
  if (graphResult.status === 'rejected') warnings.push(warningFor(graphResult.reason, 'Contribution'));

  const restRepositories = restResult.status === 'fulfilled' ? restResult.value : [];
  const graphUser = graphResult.status === 'fulfilled' ? graphResult.value?.data?.user : null;

  if (!restRepositories.length && !graphUser) {
    const errors = [restResult, graphResult]
      .filter((result) => result.status === 'rejected')
      .map((result) => result.reason);
    const rateLimitError = errors.find(
      (error) => error instanceof GitHubRequestError && error.rateLimitRemaining === '0',
    );
    const timeoutError = errors.find((error) => error?.status === 504);
    const retryAfter = rateLimitError?.rateLimitReset
      ? Math.max(1, Number(rateLimitError.rateLimitReset) - Math.floor(Date.now() / 1000))
      : null;

    return response(
      rateLimitError ? 429 : timeoutError ? 504 : 502,
      {
        error: {
          code: rateLimitError
            ? 'GITHUB_RATE_LIMITED'
            : timeoutError
              ? 'GITHUB_TIMEOUT'
              : 'GITHUB_UNAVAILABLE',
          message: rateLimitError
            ? 'GitHub data is temporarily rate limited.'
            : 'GitHub data is temporarily unavailable.',
        },
      },
      false,
      retryAfter ? { 'Retry-After': String(retryAfter) } : {},
    );
  }

  return response(
    200,
    buildPortfolioResponse({
      username: USERNAME,
      restRepositories,
      graphUser,
      fallbackRepositories: process.env.GITHUB_REPOSITORIES,
      warnings,
    }),
    true,
  );
};
