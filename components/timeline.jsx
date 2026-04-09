import { useEffect } from 'react';
import styles from '../styles/timeline.module.css';

const Timeline = () => {
    useEffect(() => {
        const cards = document.querySelectorAll(`.${styles.container}`);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.show);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        cards.forEach((card) => observer.observe(card));
        return () => observer.disconnect();
    }, []);

    return (
        <div id='timeline' className={styles.timelineSection}>
            <div className={styles.projHeader}>
                <h1>Experiences</h1>
                <h6>Timeline of my relevant experiences</h6>
            </div>
            <div className={styles.timeline}>

                <div className={`${styles.container} ${styles.left}`}>
                    <div className={styles.content}>
                        <h2>July 2017 - August 2017</h2>
                        <p>Summer Science Program - Astrophysics and Coding</p>
                        <p className={styles.description}>Attended a nationally selective 6-week astrophysics and coding research program at New Mexico Tech.</p>
                    </div>
                </div>
                <div className={`${styles.container} ${styles.right}`}>
                    <div className={styles.content}>
                        <h2>Jan 2020 - May 2022</h2>
                        <p>WashU Computer Science Course Tutor</p>
                        <p className={styles.description}>Tutored undergraduates in data structures, algorithms, and web development across multiple semesters.</p>
                    </div>
                </div>

                <div className={`${styles.container} ${styles.left}`}>
                    <div className={styles.content}>
                        <h2>June 2020 - Aug 2020</h2>
                        <p>Mississippi State University Summer Research</p>
                        <p className={styles.description}>Conducted computer science research at Mississippi State University as part of a competitive summer research program.</p>
                    </div>
                </div>
                <div className={`${styles.container} ${styles.right}`}>
                    <div className={styles.content}>
                        <h2>June 2021 - Aug 2021</h2>
                        <p>UBS Quant Trading Summer Internship</p>
                        <p className={styles.description}>Built React.js tooling for TCA report generation and Dash dashboards for intraday trading data, and modeled per-client PnL using historical trading strategies.</p>
                    </div>
                </div>

                <div className={`${styles.container} ${styles.left}`}>
                    <div className={styles.content}>
                        <h2>Jan 2022 - Jun 2022</h2>
                        <p>Floodgate Reactor Program</p>
                        <p className={styles.description}>Selected for Floodgate's competitive startup fellowship, receiving mentorship from leading Silicon Valley investors while developing an early-stage venture.</p>
                    </div>
                </div>
                <div className={`${styles.container} ${styles.right}`}>
                    <div className={styles.content}>
                        <h2>July 2022 - Present</h2>
                        <p>AT&T Senior Software Engineer</p>
                        <p className={styles.description}>Own and ship production features for an iOS app used by 10,000+ field technicians daily, with contributions estimated to generate $5M+ in annual cost savings.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timeline;