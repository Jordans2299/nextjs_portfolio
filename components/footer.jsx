import styles from '../styles/footer.module.css';


export default function Footer() {
    return (
        <footer className={styles.copyright}>
            <a name="Contact"></a>
            {/* <div className={styles.up} id="up">
                <a href="index.html"><i className="fas fa-chevron-up"></i></a>
            </div> */}
            <p> &copy; 2025 Jordan Stone</p>
        </footer>
    )
}