import styles from '../styles/contact.module.css';

export default function Contact() {

    return (
        <div className={styles.contact} id="contact">
            <div className={styles.container}>
                <div className={styles.projHeader}>
                    <h1>Contact</h1>
                    <h6>Let's work together</h6>
                </div>

                <form method="POST" data-netlify="true" className={styles.contactForm} name="contact">
                    <input type="hidden" name="form-name" value="contact" />

                    <label for="name">Name </label>
                    <input type="text" id="name" name="name" placeholder="Enter your name..." required />
                    <label for="email">Email </label>
                    <input type="email" id="email" name="email" placeholder="Enter your email..." required />
                    <label for="subject">Subject </label>
                    <textarea name="subject" id="subject" cols="10" rows="10"></textarea>
                    <input className={styles.submitBtn} type="submit" value="Submit" name="submit" />
                </form>
            </div>
        </div>
    )
}