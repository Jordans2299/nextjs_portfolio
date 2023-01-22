import Image from 'next/image';
import styles from '../styles/projects.module.css';

import forumImg from "../public/images/intramuralcs.png";

export default function Projects() {
    return (
        <div className={styles.projectSection} id="projects">
            <div className={styles.projHeader}>
                <h1>Projects</h1>
                <h6>View some of my recent work</h6>
            </div>
            <div className={styles.projects} >
                <div className={styles.projCard}>
                    <a name="Portfolio" className={styles.pageLink}></a>
                    <div className={styles.projItem}>
                        <div className={styles.projImg}>
                            <a href="http://forum.jordanstoneportfolio.com">
                                <Image src={forumImg} />
                            </a>
                        </div>
                        <div className={styles.projDescription}>
                            <h6>Web Development</h6>
                            <a className={styles.projLink} href="http://forum.jordanstoneportfolio.com">
                                <h1 className={styles.projTitle}>Computer Science Forum Page</h1>
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
                </div>

                <div className={styles.projCard}>
                    <a name="Portfolio" className={styles.pageLink}></a>
                    <div className={styles.projItem}>
                        <div className={styles.projImg}>
                            <a href="http://forum.jordanstoneportfolio.com">
                                <Image src={forumImg} />
                            </a>
                        </div>
                        <div className={styles.projDescription}>
                            <h6>Web Development</h6>
                            <a className={styles.profLink} href="http://forum.jordanstoneportfolio.com">
                                <h1 className={styles.projTitle}>Computer Science Forum Page</h1>
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
                </div>

                <div className={styles.projCard}>
                    <a name="Portfolio" className={styles.pageLink}></a>
                    <div className={styles.projItem}>
                        <div className={styles.projImg}>
                            <a href="http://forum.jordanstoneportfolio.com">
                                <Image src={forumImg} />
                            </a>
                        </div>
                        <div className={styles.projDescription}>
                            <h6>Web Development</h6>
                            <a className={styles.profLink} href="http://forum.jordanstoneportfolio.com">
                                <h1 className={styles.projTitle}>Computer Science Forum Page</h1>
                            </a>
                            <p>
                                Forum website built for asking CS related questions.
                                Supports image uploading, CRUD operations, pagination, and user authentication. It
                                also allows for users to sort and search previously created posts.
                            </p>
                            <a href="https://github.com/Jordans2299/intramuralCS" className={styles.projDetails}>View Details</a>
                        </div>
                        <div className={`${styles.projStatus} ${styles.inProgress}`}> In Progress</div>
                    </div>
                </div>

                <div className={styles.projCard}>
                    <a name="Portfolio" className={styles.pageLink}></a>
                    <div className={styles.projItem}>
                        <div className={styles.projImg}>
                            <a href="http://forum.jordanstoneportfolio.com">
                                <Image src={forumImg} />
                            </a>
                        </div>
                        <div className={styles.projDescription}>
                            <h6>Web Development</h6>
                            <a className={styles.profLink} href="http://forum.jordanstoneportfolio.com">
                                <h1 className={styles.projTitle}>Computer Science Forum Page</h1>
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
                </div>

                <div className={styles.projCard}>
                    <a name="Portfolio" className={styles.pageLink}></a>
                    <div className={styles.projItem}>
                        <div className={styles.projImg}>
                            <a href="http://forum.jordanstoneportfolio.com">
                                <Image src={forumImg} />
                            </a>
                        </div>
                        <div className={styles.projDescription}>
                            <h6>Web Development</h6>
                            <a className={styles.profLink} href="http://forum.jordanstoneportfolio.com">
                                <h1 className={styles.projTitle}>Computer Science Forum Page</h1>
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
                </div>

                <div className={styles.projCard}>
                    <a name="Portfolio" className={styles.pageLink}></a>
                    <div className={styles.projItem}>
                        <div className={styles.projImg}>
                            <a href="http://forum.jordanstoneportfolio.com">
                                <Image src={forumImg} />
                            </a>
                        </div>
                        <div className={styles.projDescription}>
                            <h6>Web Development</h6>
                            <a className={styles.profLink} href="http://forum.jordanstoneportfolio.com">
                                <h1 className={styles.projTitle}>Computer Science Forum Page</h1>
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
                </div>
            </div>
        </div>

    )
}