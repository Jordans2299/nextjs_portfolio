import Image from 'next/image';
import { useEffect } from 'react';
import styles from '../styles/projects.module.css';

import forumImg from "../public/images/intramuralcs.png";
import moneyImg from "../public/images/money_pool.png";
import doseImg from "../public/images/daily_dose.png";
import smileImg from "../public/images/smile.png";
import mattImg from '../public/images/matt_levine_bot.png';
import quizImg from "../public/images/quiz.png";
import odinImg from "../public/images/odin_office.png";

export default function Projects() {
    useEffect(() => {
        const cards = document.querySelectorAll(`.${styles.projCard}`);
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
        <div className={styles.projectSection} id="projects">
            <div className={styles.projHeader}>
                <h1>Projects</h1>
                <h6>View some of my recent work</h6>
            </div>

            <div className={styles.projects} >
                <div className={styles.projCard}>
                    <a name="Portfolio" className={styles.pageLink} href="https://getthedailydose.com">
                        <div className={styles.projItem}>
                            <div className={styles.projImg}>
                                <a href="https://getthedailydose.com">
                                    <Image src={doseImg} />
                                </a>
                            </div>
                            <div className={styles.projDescription}>
                                <h6>Web Development - AI Newsletter</h6>
                                <a className={styles.profLink} href="http://getthedailydose.com">
                                    <h1 className={styles.projTitle}>Daily Dose</h1>
                                </a>
                                <p>
                                    Automated daily email newsletter that fetches articles from external APIs, summarizes them, and leverages OpenAI for a comprehensive and engaging result. The App runs on an AWS EC2 instance using Docker containers.
                                </p>
                                <p className={styles.technologies}>Python, Flask, Next.js, HTML, CSS, AWS EC2, Docker</p>
                                <a href="https://github.com/Jordans2299/daily_dose_backend" className={styles.projDetails}>View Source</a>
                            </div>
                            <div className={`${styles.projStatus} ${styles.completed}`}> Completed</div>
                        </div>
                    </a>
                </div>
                <div className={styles.projCard}>
                    <a name="Portfolio" className={styles.pageLink} href="http://forum.jordanstoneportfolio.com">
                        <div className={styles.projItem}>
                            <div className={styles.projImg}>
                                <a href="http://forum.jordanstoneportfolio.com">
                                    <Image src={forumImg} />
                                </a>
                            </div>
                            <div className={styles.projDescription}>
                                <h6>Web Development</h6>
                                <a className={styles.projLink} href="http://forum.jordanstoneportfolio.com">
                                    <h1 className={styles.projTitle}>CS Forum </h1>
                                </a>

                                <p>
                                    Discover a comprehensive forum website where users can ask and answer CS related questions. Our platform supports image uploading, CRUD operations, pagination, user authentication, and post sorting/searching capabilities.
                                </p>

                                <p className={styles.technologies}>PHP, Laravel, CSS, MySQL,HTML, Javascript</p>
                                <a href="https://github.com/Jordans2299/intramuralCS" className={styles.projDetails}>View Source</a>
                            </div>
                            <div className={`${styles.projStatus} ${styles.completed}`}> Completed</div>
                        </div>
                    </a>
                </div>

                <div className={styles.projCard}>
                    <a name="Portfolio" className={styles.pageLink} href="https://money.jordanstoneportfolio.com">
                        <div className={styles.projItem}>
                            <div className={styles.projImg}>
                                <a href="https://money.jordanstoneportfolio.com">
                                    <Image src={moneyImg} />
                                </a>
                            </div>
                            <div className={styles.projDescription}>
                                <h6>Web Development/Smart Contracts</h6>
                                <a className={styles.profLink} href="https://money.jordanstoneportfolio.com">
                                    <h1 className={styles.projTitle}>Ethereum Money Pool </h1>
                                </a>
                                <p>
                                    Ethereum Money Pool platform uses smart contracts for secure, decentralized transactions. Create custom pools, invite participants with wallet addresses, and a random selection algorithm determines the winner who receives the entire pool.
                                </p>
                                <p className={styles.technologies}>Next.js, Solidity, Javascript, CSS, HTML, Tailwind</p>
                                <a href="https://github.com/Jordans2299/Money-pool-solidity-nextjs" className={styles.projDetails}>View Source</a>
                            </div>
                            <div className={`${styles.projStatus} ${styles.completed}`}> Completed</div>
                        </div>
                    </a>
                </div>

                <div className={styles.projCard}>
                    <a name="Portfolio" className={styles.pageLink} href="https://smile.jordanstoneportfolio.com">
                        <div className={styles.projItem}>
                            <div className={styles.projImg}>
                                <a href="https://smile.jordanstoneportfolio.com">
                                    <Image src={smileImg} />
                                </a>
                            </div>
                            <div className={styles.projDescription}>
                                <h6>Web Development</h6>
                                <a className={styles.profLink} href="https://smile.jordanstoneportfolio.com">
                                    <h1 className={styles.projTitle}>World Happiness</h1>
                                </a>
                                <p>
                                    Provides interactive visualizations and informative descriptions based on happiness index data. Explore global happiness trends and patterns, as well as the factors that contribute to overall happiness with our user-friendly platform.
                                </p>
                                <p className={styles.technologies}>D3.js, Javascript, CSS, HTML, Bootstrap, Python</p>
                                <a href="https://github.com/Jordans2299/smile-visualizations" className={styles.projDetails}>View Source</a>
                            </div>
                            <div className={`${styles.projStatus} ${styles.completed}`}> Completed</div>
                        </div>
                    </a>
                </div>

                <div className={styles.projCard}>
                    <a name="Portfolio" className={styles.pageLink} href="https://chrome.google.com/webstore/detail/odin-office-gpt-3-email-a/ifcmjhbpkjjpfmfkfakbgighemgioein?hl=en"></a>
                    <div className={styles.projItem}>
                        <div className={styles.projImg}>
                            <a href="https://chrome.google.com/webstore/detail/odin-office-gpt-3-email-a/ifcmjhbpkjjpfmfkfakbgighemgioein?hl=en">
                                <Image src={odinImg} />
                            </a>
                        </div>
                        <div className={styles.projDescription}>
                            <h6>Browser Extension</h6>
                            <a className={styles.profLink} href="https://chrome.google.com/webstore/detail/odin-office-gpt-3-email-a/ifcmjhbpkjjpfmfkfakbgighemgioein?hl=en">
                                <h1 className={styles.projTitle}>Odin Office - AI Email Writer</h1>
                            </a>
                            <p>
                                Odin Office, a Chrome extension, uses OpenAI's GPT-3 API to generate personalized emails. Integrated with Gmail, it offers professional communication without typing.
                            </p>
                            <p className={styles.technologies}>Javascript, CSS, HTML, OpenAI API</p>
                            <a href="https://github.com/Jordans2299/email_gpt3_extension" className={styles.projDetails}>View Source</a>
                        </div>
                        <div className={`${styles.projStatus} ${styles.inProgress}`}> In Progress</div>
                    </div>
                </div>

                <div className={styles.projCard}>
                    <a name="Portfolio" className={styles.pageLink} href="https://quiz.jordanstoneportfolio.com">
                        <div className={styles.projItem}>
                            <div className={styles.projImg}>
                                <a href="https://quiz.jordanstoneportfolio.com">
                                    <Image src={quizImg} />
                                </a>
                            </div>
                            <div className={styles.projDescription}>
                                <h6>Web Development</h6>
                                <a className={styles.profLink} href="https://quiz.jordanstoneportfolio.com">
                                    <h1 className={styles.projTitle}>Quiz App</h1>
                                </a>
                                <p>
                                    This app provides a fun way to test your knowledge. It fetches 10 random questions using an external API and scores your answers at the end, offering an engaging user experience. Give it a try and see how you fare!
                                </p>
                                <p className={styles.technologies}>Vue.js, Javascript, CSS, HTML</p>
                                <a href="https://github.com/Jordans2299/quiz_app" className={styles.projDetails}>View Source</a>
                            </div>
                            <div className={`${styles.projStatus} ${styles.completed}`}> Completed</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>

    )
}