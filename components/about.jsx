import styles from '../styles/about.module.css';
import Image from 'next/image';
import zoroImg from '../public/images/zoro.png';
import luffyImg from '../public/images/luffy.png';
import attImg from '../public/images/att_logo.png';
import ubsImg from '../public/images/ubs_logo.png';
import washuImg from '../public/images/washu_logo.png';
import profilePic from '../public/images/profilePic.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faX, faLinkedin
} from "@fortawesome/free-solid-svg-icons";

export default function About() {

    const companies = [attImg, ubsImg, washuImg];
    const logoWidths = [244, 261, 100];
    const logos = [];
    for (let i = 0; i < companies.length; ++i) {
        logos.push(<div className={styles.logoWrapper} ><Image style={"margin: 0 1rem"} src={companies[i]} width={logoWidths[i]} height={100} /></div>)
    }

    return (
        <section className={styles.about} id="about">
            <div className={styles.container}>
                {/* <div className={styles.profileImg}>
                    <Image src={luffyImg} width={500} height={617} />
                </div> */}
                <div className={styles.aboutDetails}>
                    <div className={styles.aboutHeading}>
                        <h1>Jordan</h1>
                        <h6>Stone</h6>
                    </div>
                    <div className={styles.bioAndImage}>
                        <p className={`${styles.bio} ${styles.animate_from_left} ${styles.animate_to_center}`} id="bio">
                        Hello! I am a computer science graduate from Washington University in St. Louis with a passion for using technology to improve efficiency and equity in the financial world. During university, I built frontend web applications and explored smart contract development and machine learning. Since graduating, I've been working full-time at AT&T, where I contribute to backend APIs, cloud migration, and enhancements to an internal technician iOS app that cuts follow-up visits and saves millions annually. I’m excited to keep learning and making a real impact through my work.
                        </p>
                        <div className={`${styles.imageSection} ${styles.animate_from_right} ${styles.animate_to_center}`}>
                            <Image src={profilePic} alt="Jordan Stone" className={styles.profilePic} />
                        </div>
                    </div>
                    <div className={styles.socialMedia}>
                        <ul className={styles.navList}>
                            <li>
                                <a href="https://www.linkedin.com/in/jordan-stone-051a25142/" className={styles.iconLink}>
                                    <FontAwesomeIcon className={styles.invisible} icon={faPlus} />
                                    <i className="fab fa-linkedin"></i>
                                    {/* <FontAwesomeIcon icon={faLinkedin} /> */}
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/Jordans2299" className={styles.iconLink}>
                                    <i className="fab fa-github"></i>
                                </a>
                            </li>
                            <li>
                                <a href="/assets/RESUME.pdf" className={styles.iconLink} target="_blank" rel="noopener noreferrer">
                                    <i className="fas fa-file-alt"></i>
                                    <p>Resume</p>
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    )
}