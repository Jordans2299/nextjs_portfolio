import styles from '../styles/about.module.css';
import Image from 'next/image';
import HorizontalFeed from './horzontalFeed.jsx';

export default function About() {
    return (
        <section className={styles.about} id="about">
            <div className={styles.container}>
                <div className={styles.heroImageRow}>
                    <ul className={styles.socialRail}>
                        <li>
                            <a href="https://www.linkedin.com/in/jordan-stone-051a25142/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
                        </li>
                        <li>
                            <a href="https://github.com/Jordans2299" target="_blank" rel="noopener noreferrer" aria-label="GitHub">gh</a>
                        </li>
                    </ul>
                    <div className={`${styles.imageSection} ${styles.animate_from_right} ${styles.animate_to_center}`}>
                        <Image src="/images/profile_silhouette.png" alt="Jordan Stone" className={styles.profilePic} width={340} height={402} loading="eager" priority />
                        <span className={styles.statusBadge}>
                            <span className={styles.statusDot}></span>
                            root@jordan:~$ available
                        </span>
                    </div>
                    <div className={styles.railSpacer} aria-hidden="true"></div>
                </div>

                <div className={styles.aboutHeading}>
                    <h1 data-text="JORDAN STONE">JORDAN STONE</h1>
                    <p className={styles.tagline}>SOFTWARE ENGINEER // IOS + FULL-STACK // AI</p>
                </div>

                <div className={styles.ctaRow}>
                    <a href="/assets/Resume_2026.pdf" className={styles.resumeBtn} target="_blank" rel="noopener noreferrer">Download Resume</a>
                    <a href="#contact" className={styles.socialBtn}>Say Hello</a>
                </div>

                <HorizontalFeed />

                <ul className={`${styles.bio} ${styles.animate_from_left} ${styles.animate_to_center}`} id="bio">
                    <li><span className={styles.bioPrefix}>$</span> 3.5 years full-stack &amp; iOS @ AT&amp;T &mdash; own features for a 10,000+ daily-user field app, ~$5M/yr in cost savings</li>
                    <li><span className={styles.bioPrefix}>$</span> Shipped Arbiter, a privacy-first on-device AI assistant for iOS &mdash; 1,000+ downloads in under 2 months</li>
                    <li><span className={styles.bioPrefix}>$</span> Focused on building fast, secure software that makes a real impact</li>
                </ul>
            </div>
        </section>
    )
}
