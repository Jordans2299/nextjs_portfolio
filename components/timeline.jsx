import { Fragment } from 'react';
import styles from '../styles/timeline.module.css';

const Timeline = () => {
    return (
        // <Fragment>
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
                        <p>AT&T Full Time Software Engineer</p>
                    </div>
                </div>
            </div>
        </div>
        // {/* </Fragment> */}
    )
}

export default Timeline;