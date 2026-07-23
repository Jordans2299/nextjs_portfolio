import { useMemo } from 'react';
import { getGithubViewState } from '../lib/github-portfolio';
import styles from '../styles/githubPortfolio.module.css';

const CONTRIBUTION_LEVELS = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

function formatDate(value, options = {}) {
  if (!value) return '';
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  }).format(new Date(value));
}

function contributionTrend(days) {
  const totals = days.reduce((months, day) => {
    const month = day.date.slice(0, 7);
    months.set(month, (months.get(month) || 0) + day.count);
    return months;
  }, new Map());

  return [...totals.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12)
    .map(([month, count]) => ({
      month,
      count,
      label: formatDate(`${month}-02T12:00:00Z`, { month: 'short', year: undefined }),
    }));
}

function ContributionCalendar({ contributions }) {
  const activeDays = useMemo(
    () => contributions.days.filter((day) => day.count > 0).length,
    [contributions.days],
  );
  const trend = useMemo(() => contributionTrend(contributions.days), [contributions.days]);
  const maxMonth = Math.max(...trend.map((month) => month.count), 1);

  if (!contributions.days.length) {
    return <div className={styles.emptyCalendar}>Contribution history is temporarily unavailable.</div>;
  }

  return (
    <section className={styles.contributionPanel} aria-labelledby="contribution-heading">
      <div className={styles.panelHeading}>
        <div>
          <span className={styles.eyebrow}>Contribution history</span>
          <h3 id="contribution-heading">{contributions.total.toLocaleString()} contributions</h3>
        </div>
        <span>{activeDays} active days</span>
      </div>

      <div className={styles.calendarScroller}>
        <div
          className={styles.calendar}
          aria-label={`${contributions.total} GitHub contributions across ${activeDays} active days`}
          role="img"
        >
          {contributions.days.map((day) => {
            const level = CONTRIBUTION_LEVELS[day.level] ?? 0;
            return (
              <span
                className={`${styles.calendarDay} ${styles[`level${level}`]}`}
                key={day.date}
                title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${formatDate(day.date)}`}
                aria-hidden="true"
              />
            );
          })}
        </div>
      </div>

      <div className={styles.legend} aria-hidden="true">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <i className={`${styles.calendarDay} ${styles[`level${level}`]}`} key={level} />
        ))}
        <span>More</span>
      </div>

      <div className={styles.trendHeading}>
        <strong>12-month trend</strong>
        <span>All public GitHub contributions</span>
      </div>
      <div
        className={styles.trendChart}
        role="img"
        aria-label={`Monthly contribution trend: ${trend.map((month) => `${month.label} ${month.count}`).join(', ')}`}
      >
        {trend.map((month) => (
          <div className={styles.trendMonth} key={month.month}>
            <div className={styles.trendTrack}>
              <i
                style={{ height: `${Math.max((month.count / maxMonth) * 100, month.count ? 5 : 0)}%` }}
                title={`${month.count} contributions in ${month.label}`}
              />
            </div>
            <span>{month.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function PopularProjects({ projects }) {
  if (!projects.length) return null;

  return (
    <section className={styles.popularPanel} aria-labelledby="popular-heading">
      <div className={styles.panelHeading}>
        <div>
          <span className={styles.eyebrow}>Beyond the case studies</span>
          <h3 id="popular-heading">Popular on GitHub</h3>
        </div>
      </div>
      <ol className={styles.popularList}>
        {projects.map((project, index) => (
          <li key={project.name}>
            <span className={styles.rank}>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
                {project.name}
              </a>
              <p>{project.description || 'Public source repository'}</p>
              <div className={styles.repoMeta}>
                {project.primaryLanguage && <span>{project.primaryLanguage}</span>}
                <span aria-label={`${project.stars} stars`}>★ {project.stars}</span>
                <span aria-label={`${project.forks} forks`}>⑂ {project.forks}</span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function RecentActivity({ activity, profileUrl }) {
  if (!activity.length) return null;

  return (
    <section className={styles.activityPanel} aria-labelledby="activity-heading">
      <div className={styles.panelHeading}>
        <div>
          <span className={styles.eyebrow}>Commit history</span>
          <h3 id="activity-heading">Recent development</h3>
        </div>
        <a href={profileUrl} target="_blank" rel="noopener noreferrer">View profile →</a>
      </div>
      <ol className={styles.activityList}>
        {activity.slice(0, 6).map((commit) => (
          <li key={`${commit.repository}-${commit.sha}`}>
            <a href={commit.url} target="_blank" rel="noopener noreferrer">
              <span>{commit.message}</span>
              <small>{commit.repository} · {formatDate(commit.committedAt)}</small>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

function LoadingState() {
  return (
    <div className={styles.loadingGrid} role="status" aria-live="polite">
      <span className={styles.srOnly}>Loading GitHub activity…</span>
      {[0, 1, 2].map((item) => <div className={styles.loadingCard} key={item} />)}
    </div>
  );
}

export default function GithubPortfolio({ github }) {
  const { data, loading, error } = github;
  const viewState = getGithubViewState({ loading, error, data });

  return (
    <section className={styles.section} aria-labelledby="github-heading">
      <header className={styles.header}>
        <span className={styles.kicker}>Open source &amp; recent work</span>
        <h2 id="github-heading">GitHub activity</h2>
        <p>
          Live development history and the public projects finding an audience beyond my featured work.
        </p>
      </header>

      {viewState === 'loading' && <LoadingState />}

      {viewState === 'error' && (
        <div className={styles.message} role="status">
          <p>Live GitHub details are unavailable right now. The project case studies above are still current.</p>
          <a href="https://github.com/Jordans2299" target="_blank" rel="noopener noreferrer">
            Visit GitHub directly →
          </a>
        </div>
      )}

      {viewState === 'empty' && (
        <div className={styles.message} role="status">
          <p>No public GitHub activity is available yet.</p>
          <a href={data.profile.url} target="_blank" rel="noopener noreferrer">
            Browse GitHub →
          </a>
        </div>
      )}

      {viewState === 'ready' && (
        <>
          <div className={styles.statGrid}>
            <div><strong>{data.profile.publicRepositories}</strong><span>Public repositories</span></div>
            <div><strong>{data.profile.totalStars}</strong><span>Stars received</span></div>
            <div><strong>{data.profile.totalForks}</strong><span>Repository forks</span></div>
            <div>
              <strong>{data.profile.topLanguages?.[0]?.name || '—'}</strong>
              <span>Most-used language</span>
            </div>
          </div>

          <ContributionCalendar contributions={data.contributions} />

          <div className={styles.detailGrid}>
            <PopularProjects projects={data.popularProjects || []} />
            <RecentActivity activity={data.recentActivity || []} profileUrl={data.profile.url} />
          </div>
        </>
      )}
    </section>
  );
}
