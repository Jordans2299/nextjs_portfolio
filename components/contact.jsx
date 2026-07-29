import { useState } from 'react';
import styles from '../styles/contact.module.css';

export default function Contact() {
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const isLocalPreview = ['localhost', '127.0.0.1'].includes(window.location.hostname);

        if (isLocalPreview) {
            setStatus('preview');
            return;
        }

        setStatus('submitting');

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(new FormData(form)).toString(),
            });

            if (!response.ok) {
                throw new Error(`Form submission failed with status ${response.status}`);
            }

            form.reset();
            setStatus('success');
        } catch {
            setStatus('error');
        }
    };

    const isSubmitting = status === 'submitting';

    return (
        <div className={styles.contact} id="contact">
            <div className={styles.container}>
                <div className={styles.projHeader}>
                    <h1>Contact</h1>
                    <h6>Let's work together</h6>
                </div>

                <form
                    method="POST"
                    action="/"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    className={styles.contactForm}
                    name="contact"
                    onSubmit={handleSubmit}
                >
                    <input type="hidden" name="form-name" value="contact" />
                    <p className={styles.honeypot} aria-hidden="true">
                        <label htmlFor="bot-field">
                            Don&apos;t fill this out if you&apos;re human
                            <input
                                type="text"
                                id="bot-field"
                                name="bot-field"
                                tabIndex="-1"
                                autoComplete="off"
                            />
                        </label>
                    </p>

                    <label htmlFor="name">Name </label>
                    <input type="text" id="name" name="name" placeholder="Enter your name..." required />
                    <label htmlFor="email">Email </label>
                    <input type="email" id="email" name="email" placeholder="Enter your email..." required />
                    <label htmlFor="subject">Subject </label>
                    <input type="text" id="subject" name="subject" placeholder="What would you like to discuss?" />
                    <label htmlFor="message">Message </label>
                    <textarea name="message" id="message" rows="8" placeholder="What's on your mind?" required />

                    <button className={styles.submitBtn} type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending…' : 'Send Message'}
                    </button>

                    <div className={styles.status} aria-live="polite" aria-atomic="true">
                        {status === 'success' && (
                            <p className={styles.success}>Message sent. Thanks—I&apos;ll get back to you soon.</p>
                        )}
                        {status === 'error' && (
                            <p className={styles.error} role="alert">
                                Something went wrong and your message wasn&apos;t sent. Please try again.
                            </p>
                        )}
                        {status === 'preview' && (
                            <p className={styles.preview}>
                                Local preview only—your form is valid, but no message was sent. Use a Netlify
                                deploy preview or the production site to test delivery.
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}
