import styles from '../styles/navbar.module.css';

export default function NavBar() {
    return (
        <div className={styles.stickyNav} id="stickyNav">
            <ul className={styles.navList}>
                <li>
                    <a href="#about" className={styles.navLink}>About</a>
                </li>
                <li>
                    <a href="#projects" className={styles.navLink}>Projects</a>
                </li>
                <li>
                    <a href="#timeline" className={styles.navLink}>Experiences</a>
                </li>
                <li>
                    <a href="#contact" className={styles.navLink}>Contact</a>
                </li>
            </ul>
        </div>
    )
}