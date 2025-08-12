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
                        <h2>July 2017 - August 2017 </h2>
                        <p>Summer Science Program - Astrophysics and Coding
                        </p>
                    </div>
                </div>
                <div className={`${styles.container} ${styles.right}`}>
                    <div className={styles.content}>
                        <h2>Jan 2020 - May 2022</h2>
                        <p>WashU Computer Science Course Tutor

                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.timeline}>
                <div className={`${styles.container} ${styles.left}`}>
                    <div className={styles.content}>
                        <h2>June 2020 - Aug 2020</h2>
                        <p>Mississippi State University Summer Research
                        </p>
                    </div>
                </div>
                <div className={`${styles.container} ${styles.right}`}>
                    <div className={styles.content}>
                        <h2>June 2021 Aug 2021</h2>
                        <p>UBS Quant Trading Summer Internship</p>
                    </div>
                </div>
            </div>
            <div className={styles.timeline}>
                <div className={`${styles.container} ${styles.left}`}>
                    <div className={styles.content}>
                        <h2>Jan 2022 - Jun 2022</h2>
                        <p>Floodgate Reactor Program </p>
                    </div>
                </div>
                <div className={`${styles.container} ${styles.right}`}>
                    <div className={styles.content}>
                        <h2>July 2022 - Now</h2>
                        <p>AT&T Senior Software Engineer</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timeline;