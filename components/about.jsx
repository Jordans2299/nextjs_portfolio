import styles from '../styles/about.module.css';
import Image from 'next/image';
import profilePic from '../public/images/profilePic.jpg';

export default function About() {
    return (
        <section className={styles.about} id="about">
            <div className={styles.container}>
                <div className={styles.aboutDetails}>
                    <div className={styles.aboutHeading}>
                        <h1>Jordan</h1>
                        <h6>Stone</h6>
                        <p className={styles.tagline}>Senior Software Engineer · iOS · Full-Stack · AI</p>
                    </div>
                    <div className={styles.bioAndImage}>
                        <p className={`${styles.bio} ${styles.animate_from_left} ${styles.animate_to_center}`} id="bio">
                            I&apos;m a software engineer with 3.5 years of full-stack and iOS experience at AT&T, where I own features for a production app used by 10,000+ field technicians daily, contributing to an estimated $5M in annual cost savings. I recently designed and shipped Arbiter, a privacy-first on-device AI assistant for iOS, going from concept to 1,000+ App Store downloads in under 2 months. I care deeply about building fast, secure software that makes a real impact.
                        </p>
                        <div className={`${styles.imageSection} ${styles.animate_from_right} ${styles.animate_to_center}`}>
                            <Image src={profilePic} alt="Jordan Stone" className={styles.profilePic} width={298} height={300} />
                        </div>
                    </div>
                    <div className={styles.socialMedia}>
                        <ul className={styles.navList}>
                            <li>
                                <a href="https://www.linkedin.com/in/jordan-stone-051a25142/" className={styles.socialBtn} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            </li>
                            <li>
                                <a href="https://github.com/Jordans2299" className={styles.socialBtn} target="_blank" rel="noopener noreferrer">GitHub</a>
                            </li>
                            <li>
                                <a href="/assets/Resume_2026.pdf" className={styles.resumeBtn} target="_blank" rel="noopener noreferrer">Resume</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
