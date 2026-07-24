import Link from 'next/link';
import styles from '../styles/blog.module.css';
import { articles } from '../lib/articles-data';
import MediumIcon from './mediumIcon.jsx';

const MEDIUM_URL = 'https://medium.com/@jordans2299';

function formatDate(dateString) {
    return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(dateString));
}

export default function Blog() {
    return (
        <div className={styles.blogSection} id="articles">
            <div className={styles.projHeader}>
                <h1>Blog</h1>
                <h6>Tech can still be good.</h6>
                <a href={MEDIUM_URL} className={styles.mediumLink} target="_blank" rel="noopener noreferrer" aria-label="View my articles on Medium">
                    <MediumIcon className={styles.mediumIcon} />
                </a>
            </div>

            <div className={styles.grid}>
                {articles.map((article) => (
                    <Link key={article.slug} href={`/articles/${article.slug}`} className={styles.card}>
                        <div className={styles.cardMeta}>
                            <span className={styles.category}>{article.category}</span>
                            <span className={styles.date}>{formatDate(article.date)}</span>
                        </div>
                        <h2 className={styles.cardTitle}>{article.title}</h2>
                        <p className={styles.excerpt}>{article.excerpt}</p>
                        <span className={styles.readMore}>Read Article →</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
