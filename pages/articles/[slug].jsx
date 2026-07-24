import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/articleDetail.module.css';
import { articles, getArticleBySlug } from '../../lib/articles-data';
import MediumIcon from '../../components/mediumIcon.jsx';

export async function getStaticPaths() {
    return {
        paths: articles.map((article) => ({ params: { slug: article.slug } })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const article = getArticleBySlug(params.slug);
    if (!article) {
        return { notFound: true };
    }
    return { props: { article } };
}

function formatDate(dateString) {
    return new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(dateString));
}

function ArticleBlock({ block }) {
    switch (block.type) {
        case 'h2':
            return <h2 className={styles.blockHeading}>{block.text}</h2>;
        case 'code':
            return (
                <pre className={styles.codeBlock}>
                    <code>{block.text}</code>
                </pre>
            );
        case 'ul':
            return (
                <ul className={styles.blockList}>
                    {block.items.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            );
        default:
            return <p className={styles.paragraph}>{block.text}</p>;
    }
}

export default function ArticleDetail({ article }) {
    return (
        <div className={styles.page}>
            <Head>
                <title>{`${article.title} — Jordan Stone`}</title>
                <link rel="icon" href="/myIcon.ico" />
            </Head>

            <div className={styles.container}>
                <div className={styles.topRow}>
                    <Link href="/#articles" className={styles.backLink}>← Back to Articles</Link>
                    <a href={article.mediumUrl} className={styles.mediumIconLink} target="_blank" rel="noopener noreferrer" aria-label="Read on Medium">
                        <MediumIcon className={styles.mediumIcon} />
                        <span>Medium</span>
                    </a>
                </div>

                <div className={styles.header}>
                    <div className={styles.metaRow}>
                        <span className={styles.category}>{article.category}</span>
                        <span className={styles.date}>{formatDate(article.date)}</span>
                    </div>
                    <h1 className={styles.title}>{article.title}</h1>

                    {article.links?.source && (
                        <div className={styles.linkRow}>
                            <a href={article.links.source} className={styles.secondaryBtn} target="_blank" rel="noopener noreferrer">
                                View Source
                            </a>
                        </div>
                    )}
                </div>

                <div className={styles.body}>
                    {article.content.map((block, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <ArticleBlock key={i} block={block} />
                    ))}
                </div>
            </div>
        </div>
    );
}
