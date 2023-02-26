import Image from 'next/image';
import styles from '../styles/projects.module.css';

import forumImg from "../public/images/intramuralcs.png";
import moneyImg from "../public/images/money_pool.png";
import doseImg from "../public/images/daily_dose.png";
import smileImg from "../public/images/smile.png";
import mattImg from '../public/images/matt_levine_bot.png';
import quizImg from "../public/images/quiz.png";

export default function Projects() {
    return (
        <div className={styles.projectSection} id="projects">
            <div className={styles.projHeader}>
                <h1>Projects</h1>
                <h6>View some of my recent work</h6>
            </div>
            <div className={styles.projects} >
                <div className={styles.projCard}>
                    <a name="Portfolio" className={styles.pageLink} href="https://forum.jordanstoneportfolio.com">
                    <div className={styles.projItem}>
                        <div className={styles.projImg}>
                            <a href="https://forum.jordanstoneportfolio.com">
                                <Image src={forumImg} />
                            </a>
                        </div>
                        <div className={styles.projDescription}>
                            <h6>Web Development</h6>
                            <a className={styles.projLink} href="https://forum.jordanstoneportfolio.com">
                                <h1 className={styles.projTitle}>CS Forum </h1>
                            </a>

                            <p>
                                Forum website built for asking CS related questions.
                                Supports image uploading, CRUD operations, pagination, and user authentication. It
                                also allows for users to sort and search previously created posts.
                            </p>
                            <a href="https://github.com/Jordans2299/intramuralCS" className={styles.projDetails}>View Details</a>
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
                            Money Pools is a blockchain application that allows users to create a contract, called a "Money Pool," on the Goerli Ethereum test network. The winner is randomly selected from all participants.
                            </p>
                            <a href="https://github.com/Jordans2299/Money-pool-solidity-nextjs" className={styles.projDetails}>View Details</a>
                        </div>
                        <div className={`${styles.projStatus} ${styles.completed}`}> Completed</div>
                    </div>
                    </a>
                </div>

                <div className={styles.projCard}>
                    <a name="Portfolio" className={styles.pageLink} href="http://getthedailydose.com">
                    <div className={styles.projItem}>
                        <div className={styles.projImg}>
                            <a href="https://getthedailydose.com">
                                <Image src={doseImg} />
                            </a>
                        </div>
                        <div className={styles.projDescription}>
                            <h6>Web Development</h6>
                            <a className={styles.profLink} href="http://getthedailydose.com">
                                <h1 className={styles.projTitle}>Daily Dose</h1>
                            </a>
                            <p>
                            The Daily Dose is a web app that allows users to see brief summaries of news articles in real-time in a variety of topics.
                            </p>
                            <a href="https://github.com/Jordans2299/daily-dose-site" className={styles.projDetails}>View Details</a>
                        </div>
                        <div className={`${styles.projStatus} ${styles.inProgress}`}> In Progress</div>
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
                                Team project displaying visualizations for based on Happiness index data.
                            </p>
                            <a href="https://github.com/Jordans2299/smile-visualizations" className={styles.projDetails}>View Details</a>
                        </div>
                        <div className={`${styles.projStatus} ${styles.completed}`}> Completed</div>
                    </div>
                    </a>
                </div>

                <div className={styles.projCard}>
                    <a name="Portfolio" className={styles.pageLink}></a>
                    <div className={styles.projItem}>
                        <div className={styles.projImg}>
                            <a href="https://63bcf5f2d8e5654dd5be778d--peppy-dieffenbachia-0cc34b.netlify.app/">
                                <Image src={mattImg} />
                            </a>
                        </div>
                        <div className={styles.projDescription}>
                            <h6>Web Development</h6>
                            <a className={styles.profLink} href="https://63bcf5f2d8e5654dd5be778d--peppy-dieffenbachia-0cc34b.netlify.app/">
                                <h1 className={styles.projTitle}>Matt Levine Bot</h1>
                            </a>
                            <p>
                                Uses GPT-3 API and prompt engineering to write a paragraph about any topic (especially finance) in the writing style of Matt Levine.
                            </p>
                            <a href="https://github.com/Jordans2299/gpt3-writer-starter" className={styles.projDetails}>View Details</a>
                        </div>
                        <div className={`${styles.projStatus} ${styles.completed}`}> Completed</div>
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
                                Fetches 10 random questions from an API and gives a score at the end.
                            </p>
                            <a href="https://github.com/Jordans2299/quiz_app" className={styles.projDetails}>View Details</a>
                        </div>
                        <div className={`${styles.projStatus} ${styles.completed}`}> Completed</div>
                    </div>
                    </a>
                </div>
            </div>
        </div>

    )
}