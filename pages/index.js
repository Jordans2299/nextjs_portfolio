
import Head from 'next/head'
import Script from 'next/script'
import { useEffect } from 'react';
import Navbar from "../components/navbar.jsx";
import About from "../components/about.jsx";
import Projects from "../components/projects.jsx";
import GithubPortfolio from "../components/githubPortfolio.jsx";
import Timeline from '../components/timeline.jsx';
import Blog from '../components/blog.jsx';
import Contact from '../components/contact.jsx';
import Footer from '../components/footer.jsx';
import useGithubPortfolio from '../lib/use-github-portfolio.js';


export default function Home() {
  const github = useGithubPortfolio();

  // The GitHub section grows once its async data resolves, which shifts
  // everything below it (Timeline, Blog, Contact) further down the page.
  // Re-apply the hash scroll after that data settles so a link like
  // /#articles doesn't land short, on top of Timeline.
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView();
  }, [github.loading]);

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
      <Blog />
      <Contact />
      <Footer />
    </div>
  )
}
