const DEFAULT_REPOSITORIES = [
  'daily_dose_backend',
  'intramuralCS',
  'Money-pool-solidity-nextjs',
  'smile-visualizations',
  'email_gpt3_extension',
  'quiz_app',
];

function configuredRepositories(value) {
  const repositories = String(value || '')
    .split(',')
    .map((name) => name.trim().split('/').pop())
    .filter(Boolean);

  return repositories.length ? repositories : DEFAULT_REPOSITORIES;
}

function languageBreakdown(languageEdges = [], totalSize = 0) {
  if (!totalSize) return [];

  return languageEdges
    .filter(({ size, node }) => size > 0 && node?.name)
    .map(({ size, node }) => ({
      name: node.name,
      color: node.color || null,
      percent: Math.round((size / totalSize) * 100),
    }));
}

function recentCommits(history) {
  return (history?.nodes || []).filter(Boolean).map((commit) => ({
    sha: commit.oid.slice(0, 7),
    message: commit.messageHeadline,
    url: commit.url,
    committedAt: commit.committedDate,
  }));
}

function normalizeRestRepository(repository, graphRepository, featured) {
  return {
    name: repository.name,
    description: repository.description || '',
    repositoryUrl: repository.html_url,
    homepageUrl: repository.homepage || null,
    primaryLanguage: repository.language || graphRepository?.primaryLanguage?.name || null,
    languages: languageBreakdown(
      graphRepository?.languages?.edges,
      graphRepository?.languages?.totalSize,
    ),
    stars: repository.stargazers_count || 0,
    forks: repository.forks_count || 0,
    topics: Array.isArray(repository.topics) ? repository.topics.slice(0, 6) : [],
    updatedAt: repository.updated_at,
    featured,
    recentCommits: recentCommits(graphRepository?.defaultBranchRef?.target?.history),
  };
}

function normalizeGraphRepository(repository, featured) {
  return {
    name: repository.name,
    description: repository.description || '',
    repositoryUrl: repository.url,
    homepageUrl: repository.homepageUrl || null,
    primaryLanguage: repository.primaryLanguage?.name || null,
    languages: languageBreakdown(repository.languages?.edges, repository.languages?.totalSize),
    stars: repository.stargazerCount || 0,
    forks: repository.forkCount || 0,
    topics: (repository.repositoryTopics?.nodes || [])
      .map((item) => item?.topic?.name)
      .filter(Boolean)
      .slice(0, 6),
    updatedAt: repository.updatedAt,
    featured,
    recentCommits: recentCommits(repository.defaultBranchRef?.target?.history),
  };
}

function normalizeContributions(contributionsCollection) {
  const calendar = contributionsCollection?.contributionCalendar;
  const days = (calendar?.weeks || []).flatMap((week) => week.contributionDays || []);

  return {
    total: calendar?.totalContributions || 0,
    from: contributionsCollection?.startedAt || null,
    to: contributionsCollection?.endedAt || null,
    days: days.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: day.contributionLevel || 'NONE',
    })),
  };
}

function buildPortfolioResponse({
  username,
  restRepositories = [],
  graphUser,
  fallbackRepositories,
  generatedAt = new Date().toISOString(),
  warnings = [],
}) {
  const publicRestRepositories = restRepositories.filter(
    (repository) => repository && repository.private !== true && repository.visibility !== 'private',
  );
  const publicGraphRepositories = (graphUser?.pinnedItems?.nodes || []).filter(
    (repository) => repository && repository.isPrivate === false,
  );
  const publicRecentGraphRepositories = (graphUser?.repositories?.nodes || []).filter(
    (repository) => repository && repository.isPrivate === false,
  );

  const graphByName = new Map(
    [...publicRecentGraphRepositories, ...publicGraphRepositories]
      .map((repository) => [repository.name.toLowerCase(), repository]),
  );
  const restByName = new Map(
    publicRestRepositories.map((repository) => [repository.name.toLowerCase(), repository]),
  );
  const pinnedNames = publicGraphRepositories.map((repository) => repository.name);
  const selectedNames = configuredRepositories(fallbackRepositories);

  const projects = selectedNames
    .map((name) => {
      const key = name.toLowerCase();
      const restRepository = restByName.get(key);
      const graphRepository = graphByName.get(key);
      const featured = pinnedNames.some((pinnedName) => pinnedName.toLowerCase() === key);

      if (restRepository) {
        return normalizeRestRepository(restRepository, graphRepository, featured);
      }
      if (graphRepository) {
        return normalizeGraphRepository(graphRepository, featured);
      }
      return null;
    })
    .filter(Boolean);

  const showcasedNames = new Set(selectedNames.map((name) => name.toLowerCase()));
  const normalizedPublicRepositories = publicRestRepositories.map((repository) =>
    normalizeRestRepository(
      repository,
      graphByName.get(repository.name.toLowerCase()),
      pinnedNames.some((name) => name.toLowerCase() === repository.name.toLowerCase()),
    ),
  );
  const popularityScore = (repository) => (repository.stars * 10) + repository.forks;
  const rankedPublicRepositories = normalizedPublicRepositories
    .filter((repository) => !showcasedNames.has(repository.name.toLowerCase()))
    .sort((a, b) => {
      const scoreDifference = popularityScore(b) - popularityScore(a);
      if (scoreDifference) return scoreDifference;
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
  const popularProjects = (
    rankedPublicRepositories.length ? rankedPublicRepositories : normalizedPublicRepositories
  ).slice(0, 4);

  const languageCounts = publicRestRepositories.reduce((counts, repository) => {
    if (repository.language) counts.set(repository.language, (counts.get(repository.language) || 0) + 1);
    return counts;
  }, new Map());
  const topLanguages = [...languageCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, repositories]) => ({ name, repositories }));

  const activity = publicRecentGraphRepositories
    .map((repository) => normalizeGraphRepository(repository, false))
    .flatMap((project) =>
      project.recentCommits.map((commit) => ({
        ...commit,
        repository: project.name,
      })),
    )
    .sort((a, b) => new Date(b.committedAt) - new Date(a.committedAt))
    .slice(0, 6);

  return {
    profile: {
      username,
      url: `https://github.com/${username}`,
      publicRepositories: publicRestRepositories.length,
      totalStars: publicRestRepositories.reduce(
        (total, repository) => total + (repository.stargazers_count || 0),
        0,
      ),
      totalForks: publicRestRepositories.reduce(
        (total, repository) => total + (repository.forks_count || 0),
        0,
      ),
      topLanguages,
    },
    projects,
    popularProjects,
    contributions: normalizeContributions(graphUser?.contributionsCollection),
    recentActivity: activity,
    meta: {
      generatedAt,
      projectSource: 'configured',
      pinnedRepositories: pinnedNames,
      partial: warnings.length > 0,
      warnings,
    },
  };
}

function getGithubViewState({ loading, error, data }) {
  if (loading) return 'loading';
  if (error) return 'error';
  const hasContent = Boolean(
    data?.projects?.length
    || data?.popularProjects?.length
    || data?.contributions?.days?.length,
  );
  if (!hasContent) return 'empty';
  return 'ready';
}

module.exports = {
  DEFAULT_REPOSITORIES,
  buildPortfolioResponse,
  configuredRepositories,
  getGithubViewState,
  languageBreakdown,
  normalizeContributions,
};
