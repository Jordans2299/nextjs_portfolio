import { useState } from 'react';
import styles from '../styles/navbar.module.css';

export default function NavBar() {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(!open);

    return (
        <nav className={styles.stickyNav} id="stickyNav">
            <div className={styles.hamburger} onClick={toggleMenu}>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </div>
            <ul className={`${styles.navList} ${open ? styles.showMenu : ''}`}>
                <li>
                    <a href="#about" className={styles.navLink} onClick={() => setOpen(false)}>About</a>
                </li>
                <li>
                    <a href="#projects" className={styles.navLink} onClick={() => setOpen(false)}>Projects</a>
                </li>
                <li>
                    <a href="#timeline" className={styles.navLink} onClick={() => setOpen(false)}>Experiences</a>
                </li>
                <li>
                    <a href="#contact" className={styles.navLink} onClick={() => setOpen(false)}>Contact</a>
                </li>
            </ul>
        </nav>
    )
}