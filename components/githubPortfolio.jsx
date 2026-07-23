import { useEffect, useMemo, useState } from 'react';
import { getGithubViewState } from '../lib/github-portfolio';
import styles from '../styles/githubPortfolio.module.css';

const CONTRIBUTION_LEVELS = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

function formatDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

function ProjectCard({ project }) {
  return (
    <article className={styles.projectCard}>
      <div className={styles.cardHeading}>
        <div>
          <span className={styles.eyebrow}>
            {project.featured ? 'Pinned repository' : 'Featured repository'}
          </span>
          <h3>
            <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
              {project.name}
            </a>
          </h3>
        </div>
        <span className={styles.githubMark} aria-hidden="true">⌘</span>
      </div>

      <p className={styles.description}>
        {project.description || 'Explore the source, history, and implementation on GitHub.'}
      </p>

      {project.languages.length > 0 && (
        <div className={styles.languageBar} aria-label="Repository language breakdown">
          {project.languages.map((language) => (
            <span
              key={language.name}
              style={{
                width: `${language.percent}%`,
                backgroundColor: language.color || 'rgb(137, 135, 236)',
              }}
              title={`${language.name}: ${language.percent}%`}
            />
          ))}
        </div>
      )}

      <div className={styles.meta}>
        {project.primaryLanguage && <span>{project.primaryLanguage}</span>}
        <span aria-label={`${project.stars} stars`}>★ {project.stars}</span>
        <span aria-label={`${project.forks} forks`}>⑂ {project.forks}</span>
        <span>Updated {formatDate(project.updatedAt)}</span>
      </div>

      {project.topics.length > 0 && (
        <ul className={styles.topics} aria-label="Repository topics">
          {project.topics.map((topic) => <li key={topic}>{topic}</li>)}
        </ul>
      )}

      <div className={styles.links}>
        <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
          View repository →
        </a>
        {project.homepageUrl && (
          <a href={project.homepageUrl} target="_blank" rel="noopener noreferrer">
            Live demo ↗
          </a>
        )}
      </div>
    </article>
  );
}

function ContributionCalendar({ contributions }) {
  const activeDays = useMemo(
    () => contributions.days.filter((day) => day.count > 0).length,
    [contributions.days],
  );

  if (!contributions.days.length) {
    return (
      <div className={styles.emptyCalendar}>
        Contribution history is temporarily unavailable.
      </div>
    );
  }

  return (
    <figure className={styles.contributionPanel}>
      <figcaption>
        <strong>{contributions.total.toLocaleString()} contributions</strong>
        <span>{activeDays} active days in the last year</span>
      </figcaption>
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
    </figure>
  );
}

function LoadingState() {
  return (
    <div className={styles.loadingGrid} role="status" aria-live="polite">
      <span className={styles.srOnly}>Loading GitHub projects and activity…</span>
      {[0, 1, 2].map((item) => <div className={styles.loadingCard} key={item} />)}
    </div>
  );
}

export default function GithubPortfolio() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPortfolio() {
      try {
        const response = await fetch('/.netlify/functions/github-portfolio', {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) throw new Error('GitHub portfolio endpoint unavailable');
        const payload = await response.json();
        setData(payload);
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadPortfolio();
    return () => controller.abort();
  }, []);

  const viewState = getGithubViewState({ loading, error, data });

  return (
    <section className={styles.section} aria-labelledby="github-heading">
      <header className={styles.header}>
        <span className={styles.kicker}>Open source &amp; recent work</span>
        <h2 id="github-heading">From my GitHub</h2>
        <p>
          A live look at the repositories I&apos;m highlighting and the work happening behind them.
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
          <p>No featured public repositories are configured yet.</p>
          <a href={data.profile.url} target="_blank" rel="noopener noreferrer">
            Browse all public repositories →
          </a>
        </div>
      )}

      {viewState === 'ready' && (
        <>
          <div className={styles.projectGrid}>
            {data.projects.map((project) => (
              <ProjectCard project={project} key={project.name} />
            ))}
          </div>

          <div className={styles.activityGrid}>
            <ContributionCalendar contributions={data.contributions} />

            {data.recentActivity.length > 0 && (
              <aside className={styles.activityPanel} aria-labelledby="activity-heading">
                <div className={styles.activityHeading}>
                  <div>
                    <span className={styles.eyebrow}>Latest commits</span>
                    <h3 id="activity-heading">Recent development</h3>
                  </div>
                  <a href={data.profile.url} target="_blank" rel="noopener noreferrer">
                    @{data.profile.username}
                  </a>
                </div>
                <ol className={styles.activityList}>
                  {data.recentActivity.slice(0, 4).map((commit) => (
                    <li key={`${commit.repository}-${commit.sha}`}>
                      <a href={commit.url} target="_blank" rel="noopener noreferrer">
                        <span>{commit.message}</span>
                        <small>{commit.repository} · {formatDate(commit.committedAt)}</small>
                      </a>
                    </li>
                  ))}
                </ol>
              </aside>
            )}
          </div>
        </>
      )}
    </section>
  );
}
