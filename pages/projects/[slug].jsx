import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/projectDetail.module.css';
import { projects, getProjectBySlug } from '../../lib/projects-data';
import useGithubPortfolio from '../../lib/use-github-portfolio';

export async function getStaticPaths() {
    return {
        paths: projects.map((project) => ({ params: { slug: project.slug } })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const project = getProjectBySlug(params.slug);
    if (!project) {
        return { notFound: true };
    }
    return { props: { project } };
}

const STATUS_CLASS = {
    'early-access': styles.statusEarlyAccess,
    completed: styles.statusCompleted,
    'in-progress': styles.statusInProgress,
};

export default function ProjectDetail({ project }) {
    const github = useGithubPortfolio();
    const repository = (github?.data?.projects || []).find(
        (repo) => repo.name.toLowerCase() === project.repoKey,
    );

    const updated = repository
        ? new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(repository.updatedAt))
        : null;

    return (
        <div className={styles.page}>
            <Head>
                <title>{`${project.title} — Jordan Stone`}</title>
                <link rel="icon" href="/myIcon.ico" />
            </Head>

            <div className={styles.container}>
                <Link href="/#projects" className={styles.backLink}>← Back to Projects</Link>

                <div className={styles.hero}>
                    <div className={styles.imageWrap}>
                        <Image
                            src={project.image}
                            alt={project.imageAlt}
                            className={project.imageClassName ? styles[project.imageClassName] : undefined}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>

                    <div className={styles.info}>
                        <span className={`${styles.statusBadge} ${STATUS_CLASS[project.status] || ''}`}>
                            {project.statusLabel}
                        </span>
                        <h6 className={styles.category}>{project.category}</h6>
                        <h1 className={styles.title}>{project.title}</h1>
                        {project.metrics && <p className={styles.metrics}>{project.metrics}</p>}

                        <div className={styles.linkRow}>
                            {project.links.appStore && (
                                <a href={project.links.appStore} className={styles.primaryBtn} target="_blank" rel="noopener noreferrer">↓ App Store</a>
                            )}
                            {project.links.website && (
                                <a href={project.links.website} className={styles.secondaryBtn} target="_blank" rel="noopener noreferrer">Visit Website →</a>
                            )}
                            {project.links.live && (
                                <a href={project.links.live} className={styles.primaryBtn} target="_blank" rel="noopener noreferrer">Visit Live Site →</a>
                            )}
                            {project.links.source && (
                                <a href={project.links.source} className={styles.secondaryBtn} target="_blank" rel="noopener noreferrer">View Source</a>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.body}>
                    <p className={styles.description}>{project.description}</p>

                    {project.bullets && (
                        <ul className={styles.bulletList}>
                            {project.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                            ))}
                        </ul>
                    )}

                    <div className={styles.techSection}>
                        <h6 className={styles.sectionLabel}>Built with</h6>
                        <div className={styles.techRow}>
                            {project.tech.map((t) => (
                                <span key={t} className={styles.techPill}>{t}</span>
                            ))}
                        </div>
                    </div>

                    {repository && (
                        <div className={styles.githubSection}>
                            <h6 className={styles.sectionLabel}>Repository activity</h6>
                            <div className={styles.githubStats}>
                                <span>★ {repository.stars} stars</span>
                                <span>⑂ {repository.forks} forks</span>
                                {repository.primaryLanguage && <span>{repository.primaryLanguage}</span>}
                                <span>Updated {updated}</span>
                            </div>

                            {repository.description && (
                                <p className={styles.repoDescription}>{repository.description}</p>
                            )}

                            {repository.topics?.length > 0 && (
                                <div className={styles.techRow}>
                                    {repository.topics.map((topic) => (
                                        <span key={topic} className={styles.techPill}>{topic}</span>
                                    ))}
                                </div>
                            )}

                            {repository.recentCommits?.length > 0 && (
                                <ul className={styles.commitList}>
                                    {repository.recentCommits.slice(0, 5).map((commit) => (
                                        <li key={commit.sha}>
                                            <a href={commit.url} target="_blank" rel="noopener noreferrer">
                                                <span className={styles.commitSha}>{commit.sha}</span>
                                                <span className={styles.commitMessage}>{commit.message}</span>
                                            </a>
                                            <span className={styles.commitDate}>
                                                {new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(commit.committedAt))}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
