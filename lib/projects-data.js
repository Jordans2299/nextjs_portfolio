import arbiterImg from '../public/images/arbiter_telescope_purple.png';
import playerPayHomeImg from '../public/images/player_pay_home.png';
import playerPayProfileImg from '../public/images/player_pay_profile.png';
import doseImg from '../public/images/daily_dose.png';
import forumImg from '../public/images/intramuralcs.png';
import moneyImg from '../public/images/money_pool.png';
import smileImg from '../public/images/smile.png';
import odinImg from '../public/images/odin_office.png';
import quizImg from '../public/images/quiz.png';

export const projects = [
    {
        slug: 'arbiter',
        title: 'Arbiter',
        category: 'iOS · Local LLM Assistant',
        image: arbiterImg,
        imageAlt: 'Screens showcasing Arbiter, the on-device AI assistant',
        status: 'early-access',
        statusLabel: 'Early Access',
        metrics: '1,000+ downloads  ·  Built solo in ~3 months  ·  Live on the App Store',
        description: 'Privacy-first offline AI assistant for iPhone. Every conversation stays fully on-device with no data ever leaving the phone. Swap between open-source models tailored to your workflow or needs.',
        bullets: [
            'Real-time web search to augment on-device generation',
            'Support for reasoning models, vision models, and file analysis',
            'Siri integration with background execution optimizations',
            'Runs quantized LLMs via MLX framework and a llama.cpp Swift wrapper',
        ],
        tech: ['Swift', 'SwiftUI', 'Core ML', 'MLX', 'llama.cpp', 'Firebase'],
        links: {
            appStore: 'https://apps.apple.com/us/app/arbiter-offline-private-ai/id6747954532',
            website: 'https://www.askarbiter.ai/',
        },
        repoKey: null,
    },
    {
        slug: 'player-pay',
        title: 'Player Pay',
        category: 'Sports Data · Salary Intelligence',
        image: playerPayHomeImg,
        imageAlt: 'Player Pay dashboard with NBA and WNBA salary data',
        gallery: [
            {
                image: playerPayProfileImg,
                alt: 'Player Pay WNBA profile showing salary, contract, and career earnings analysis',
            },
        ],
        status: 'completed',
        statusLabel: 'Live',
        metrics: 'NBA + WNBA  ·  Automated salary data  ·  Live at playerpay.io',
        description: 'NBA and WNBA salary intelligence platform for exploring player contracts, team cap sheets, league rankings, and historical earnings. Automated data pipelines keep salary records current while a fast, responsive interface makes complex contract data easy to compare.',
        bullets: [
            'Searchable and sortable salary data across NBA and WNBA players and teams',
            'Detailed player profiles with career earnings, contract values, salary history, and cap impact',
            'Interactive charts for league trends, top earners, and team payroll analysis',
            'Scheduled scraping and GitHub Actions workflows keep the underlying salary data current',
        ],
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Cheerio', 'GitHub Actions'],
        links: {
            live: 'https://playerpay.io/',
            source: 'https://github.com/Jordans2299/wnba_tracker',
        },
        repoKey: 'wnba_tracker',
    },
    {
        slug: 'daily-dose',
        title: 'Daily Dose',
        category: 'Web Development · AI Newsletter',
        image: doseImg,
        imageAlt: 'Daily Dose AI newsletter app screenshot',
        status: 'completed',
        statusLabel: 'Completed',
        description: 'Automated daily email newsletter that fetches articles from external APIs, summarizes them, and leverages OpenAI for a comprehensive and engaging result. The app runs on an AWS EC2 instance using Docker containers.',
        tech: ['Python', 'Flask', 'Next.js', 'HTML', 'CSS', 'AWS EC2', 'Docker'],
        links: {
            live: 'https://getthedailydose.com',
            source: 'https://github.com/Jordans2299/daily_dose_backend',
        },
        repoKey: 'daily_dose_backend',
    },
    {
        slug: 'cs-forum',
        title: 'CS Forum',
        category: 'Web Development',
        image: forumImg,
        imageAlt: 'CS Forum website screenshot',
        status: 'completed',
        statusLabel: 'Completed',
        description: 'Discover a comprehensive forum website where users can ask and answer CS related questions. Our platform supports image uploading, CRUD operations, pagination, user authentication, and post sorting/searching capabilities.',
        tech: ['PHP', 'Laravel', 'CSS', 'MySQL', 'HTML', 'Javascript'],
        links: {
            live: 'http://forum.jordanstoneportfolio.com',
            source: 'https://github.com/Jordans2299/intramuralCS',
        },
        repoKey: 'intramuralcs',
    },
    {
        slug: 'ethereum-money-pool',
        title: 'Ethereum Money Pool',
        category: 'Web Development / Smart Contracts',
        image: moneyImg,
        imageAlt: 'Ethereum Money Pool app screenshot',
        status: 'completed',
        statusLabel: 'Completed',
        description: 'Ethereum Money Pool platform uses smart contracts for secure, decentralized transactions. Create custom pools, invite participants with wallet addresses, and a random selection algorithm determines the winner who receives the entire pool.',
        tech: ['Next.js', 'Solidity', 'Javascript', 'CSS', 'HTML', 'Tailwind'],
        links: {
            live: 'https://money.jordanstoneportfolio.com',
            source: 'https://github.com/Jordans2299/Money-pool-solidity-nextjs',
        },
        repoKey: 'money-pool-solidity-nextjs',
    },
    {
        slug: 'world-happiness',
        title: 'World Happiness',
        category: 'Web Development',
        image: smileImg,
        imageAlt: 'World Happiness data visualization screenshot',
        status: 'completed',
        statusLabel: 'Completed',
        description: 'Provides interactive visualizations and informative descriptions based on happiness index data. Explore global happiness trends and patterns, as well as the factors that contribute to overall happiness with our user-friendly platform.',
        tech: ['D3.js', 'Javascript', 'CSS', 'HTML', 'Bootstrap', 'Python'],
        links: {
            live: 'https://smile.jordanstoneportfolio.com',
            source: 'https://github.com/Jordans2299/smile-visualizations',
        },
        repoKey: 'smile-visualizations',
    },
    {
        slug: 'odin-office',
        title: 'Odin Office - AI Email Writer',
        category: 'Browser Extension',
        image: odinImg,
        imageAlt: 'Odin Office Chrome extension screenshot',
        status: 'in-progress',
        statusLabel: 'In Progress',
        description: "Odin Office, a Chrome extension, uses OpenAI's GPT-3 API to generate personalized emails. Integrated with Gmail, it offers professional communication without typing.",
        tech: ['Javascript', 'CSS', 'HTML', 'OpenAI API'],
        links: {
            live: 'https://chrome.google.com/webstore/detail/odin-office-gpt-3-email-a/ifcmjhbpkjjpfmfkfakbgighemgioein?hl=en',
            source: 'https://github.com/Jordans2299/email_gpt3_extension',
        },
        repoKey: 'email_gpt3_extension',
    },
    {
        slug: 'quiz-app',
        title: 'Quiz App',
        category: 'Web Development',
        image: quizImg,
        imageAlt: 'Quiz app screenshot',
        status: 'completed',
        statusLabel: 'Completed',
        description: 'This app provides a fun way to test your knowledge. It fetches 10 random questions using an external API and scores your answers at the end, offering an engaging user experience. Give it a try and see how you fare!',
        tech: ['Vue.js', 'Javascript', 'CSS', 'HTML'],
        links: {
            live: 'https://quiz.jordanstoneportfolio.com',
            source: 'https://github.com/Jordans2299/quiz_app',
        },
        repoKey: 'quiz_app',
    },
];

export function getProjectBySlug(slug) {
    return projects.find((project) => project.slug === slug) || null;
}
