import styles from '../styles/skills.module.css';

const skillGroups = [
    {
        title: 'Languages',
        command: 'cat languages.json',
        summary: 'The languages I use to build product experiences, services, and data-driven tools.',
        skills: [
            'Swift',
            'Java',
            'JavaScript / TypeScript',
            'Python',
            'HTML / CSS',
            'SQL',
            'Solidity',
        ],
    },
    {
        title: 'Frameworks',
        command: 'ls frameworks/',
        summary: 'The application and service layers behind my native, web, and AI products.',
        skills: [
            'SwiftUI',
            'Node.js',
            'Next.js',
            'Angular',
            'React',
            'Firebase',
            'Flask',
        ],
    },
    {
        title: 'Tools & Platforms',
        command: 'which tools',
        summary: 'The infrastructure, design, and local-AI stack I use to take products from idea to release.',
        skills: [
            'Git',
            'Figma',
            'MLX / llama.cpp',
            'RAG',
            'Azure',
            'Docker',
            'AWS',
            'Kubernetes',
        ],
    },
];

export default function Skills() {
    return (
        <section className={styles.section} id="skills" aria-labelledby="skills-heading">
            <header className={styles.header}>
                <span className={styles.kicker}>Skills</span>
                <h2 id="skills-heading">Across the stack.</h2>
                <p>
                    I work across native Apple platforms, cloud services, and AI tooling.
                </p>
            </header>

            <div className={styles.grid}>
                {skillGroups.map((group, index) => (
                    <article className={styles.card} key={group.title}>
                        <div className={styles.cardTop}>
                            <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                            <span className={styles.command}>$ {group.command}</span>
                        </div>
                        <h3>{group.title}</h3>
                        <p>{group.summary}</p>
                        <ul className={styles.skillList}>
                            {group.skills.map((skill) => (
                                <li className={styles.skill} key={skill}>
                                    <i aria-hidden="true" />
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    );
}
