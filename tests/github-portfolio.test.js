const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildPortfolioResponse,
  configuredRepositories,
  getGithubViewState,
} = require('../lib/github-portfolio');
const { handler } = require('../netlify/functions/github-portfolio');

function restRepository(overrides = {}) {
  return {
    name: 'public-project',
    description: 'A public project',
    html_url: 'https://github.com/Jordans2299/public-project',
    homepage: 'https://example.com',
    language: 'JavaScript',
    stargazers_count: 12,
    forks_count: 3,
    topics: ['nextjs', 'portfolio'],
    updated_at: '2026-07-01T12:00:00Z',
    private: false,
    visibility: 'public',
    ...overrides,
  };
}

function graphRepository(overrides = {}) {
  return {
    name: 'public-project',
    description: 'A public project',
    url: 'https://github.com/Jordans2299/public-project',
    homepageUrl: 'https://example.com',
    isPrivate: false,
    updatedAt: '2026-07-01T12:00:00Z',
    stargazerCount: 12,
    forkCount: 3,
    primaryLanguage: { name: 'JavaScript', color: '#f1e05a' },
    repositoryTopics: { nodes: [{ topic: { name: 'nextjs' } }] },
    languages: {
      totalSize: 100,
      edges: [
        { size: 75, node: { name: 'JavaScript', color: '#f1e05a' } },
        { size: 25, node: { name: 'CSS', color: '#663399' } },
      ],
    },
    defaultBranchRef: {
      target: {
        history: {
          nodes: [
            {
              oid: 'abcdef1234567890',
              messageHeadline: 'Add portfolio feature',
              committedDate: '2026-07-20T12:00:00Z',
              url: 'https://github.com/Jordans2299/public-project/commit/abcdef1',
            },
          ],
        },
      },
    },
    ...overrides,
  };
}

test('prefers pinned public repositories and merges REST details with GraphQL activity', () => {
  const response = buildPortfolioResponse({
    username: 'Jordans2299',
    restRepositories: [restRepository()],
    graphUser: {
      pinnedItems: { nodes: [graphRepository()] },
      contributionsCollection: {
        startedAt: '2025-07-20T00:00:00Z',
        endedAt: '2026-07-20T23:59:59Z',
        contributionCalendar: {
          totalContributions: 321,
          weeks: [
            {
              contributionDays: [
                {
                  date: '2026-07-20',
                  contributionCount: 4,
                  contributionLevel: 'SECOND_QUARTILE',
                },
              ],
            },
          ],
        },
      },
    },
    generatedAt: '2026-07-23T12:00:00Z',
  });

  assert.equal(response.meta.projectSource, 'pinned');
  assert.equal(response.projects.length, 1);
  assert.equal(response.projects[0].stars, 12);
  assert.equal(response.projects[0].languages[0].percent, 75);
  assert.equal(response.projects[0].recentCommits[0].sha, 'abcdef1');
  assert.equal(response.contributions.total, 321);
  assert.equal(response.recentActivity[0].repository, 'public-project');
});

test('never exposes private repositories returned by either API', () => {
  const response = buildPortfolioResponse({
    username: 'Jordans2299',
    restRepositories: [
      restRepository(),
      restRepository({
        name: 'private-project',
        private: true,
        visibility: 'private',
      }),
    ],
    graphUser: {
      pinnedItems: {
        nodes: [
          graphRepository(),
          graphRepository({ name: 'private-project', isPrivate: true }),
        ],
      },
    },
  });

  assert.deepEqual(response.projects.map((project) => project.name), ['public-project']);
  assert.equal(JSON.stringify(response).includes('private-project'), false);
});

test('uses the explicit repository list when no public pins are available', () => {
  const response = buildPortfolioResponse({
    username: 'Jordans2299',
    restRepositories: [
      restRepository({ name: 'first' }),
      restRepository({ name: 'second' }),
    ],
    graphUser: { pinnedItems: { nodes: [] } },
    fallbackRepositories: 'second,first',
  });

  assert.equal(response.meta.projectSource, 'configured');
  assert.deepEqual(response.projects.map((project) => project.name), ['second', 'first']);
  assert.equal(response.projects.every((project) => project.featured === false), true);
});

test('parses configured repository names and strips owner prefixes', () => {
  assert.deepEqual(
    configuredRepositories('Jordans2299/one, two, Jordans2299/three'),
    ['one', 'two', 'three'],
  );
});

test('maps frontend loading, error, empty, and ready states', () => {
  assert.equal(getGithubViewState({ loading: true }), 'loading');
  assert.equal(getGithubViewState({ loading: false, error: new Error('offline') }), 'error');
  assert.equal(getGithubViewState({ loading: false, data: { projects: [] } }), 'empty');
  assert.equal(
    getGithubViewState({ loading: false, data: { projects: [{ name: 'one' }] } }),
    'ready',
  );
});

test('serverless endpoint fails safely when the token is not configured', async () => {
  const originalToken = process.env.GITHUB_TOKEN;
  delete process.env.GITHUB_TOKEN;

  try {
    const result = await handler();
    const body = JSON.parse(result.body);

    assert.equal(result.statusCode, 503);
    assert.equal(result.headers['Cache-Control'], 'no-store');
    assert.equal(body.error.code, 'GITHUB_NOT_CONFIGURED');
  } finally {
    if (originalToken === undefined) delete process.env.GITHUB_TOKEN;
    else process.env.GITHUB_TOKEN = originalToken;
  }
});

test('serverless endpoint applies one-hour durable CDN caching to successful responses', async () => {
  const originalToken = process.env.GITHUB_TOKEN;
  const originalFetch = global.fetch;
  process.env.GITHUB_TOKEN = 'test-token-never-sent-over-network';
  let requestCount = 0;

  global.fetch = async (url) => {
    requestCount += 1;
    if (url.includes('/graphql')) {
      return new Response(JSON.stringify({
        data: {
          user: {
            pinnedItems: { nodes: [graphRepository()] },
            contributionsCollection: {
              contributionCalendar: { totalContributions: 0, weeks: [] },
            },
          },
        },
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify([restRepository()]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };

  try {
    const result = await handler();
    const body = JSON.parse(result.body);

    assert.equal(result.statusCode, 200);
    assert.equal(requestCount, 2);
    assert.match(result.headers['Netlify-CDN-Cache-Control'], /max-age=3600/);
    assert.match(result.headers['Netlify-CDN-Cache-Control'], /stale-while-revalidate=86400/);
    assert.deepEqual(body.projects.map((project) => project.name), ['public-project']);
  } finally {
    global.fetch = originalFetch;
    if (originalToken === undefined) delete process.env.GITHUB_TOKEN;
    else process.env.GITHUB_TOKEN = originalToken;
  }
});
