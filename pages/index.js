
import Head from 'next/head'
import Script from 'next/script'
import Navbar from "../components/navbar.jsx";
import About from "../components/about.jsx";
import Projects from "../components/projects.jsx";
import GithubPortfolio from "../components/githubPortfolio.jsx";
import Timeline from '../components/timeline.jsx';
import Contact from '../components/contact.jsx';
import Footer from '../components/footer.jsx';
import useGithubPortfolio from '../lib/use-github-portfolio.js';


export default function Home() {
  const github = useGithubPortfolio();

  return (
    <div className='page-container'>
      <Head>
        <title>Jordan's Portfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/myIcon.ico" />
      </Head>
      <Script src="https://kit.fontawesome.com/1c37cb57ef.js" crossOrigin="anonymous" strategy="lazyOnload" />
      <Navbar />
      <About />
      <Projects github={github} />
      <GithubPortfolio github={github} />
      <Timeline />
      <Contact />
      <Footer />
    </div>
  )
}
