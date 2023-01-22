
import Head from 'next/head'
import Navbar from "../components/navbar.jsx";
import About from "../components/about.jsx";
import Projects from "../components/projects.jsx";
import HorzontalFeed from '../components/horzontalFeed.jsx';
import Timeline from '../components/timeline.jsx';
import Contact from '../components/contact.jsx';
import Footer from '../components/footer.jsx';


export default function Home() {

  return (
    <div className='page-container'>
      <Head>
        <title>Jordan's Portfolio</title>
        
        <script src="https://kit.fontawesome.com/1c37cb57ef.js" crossorigin="anonymous"></script>
      </Head>
      <Navbar />
      <About />
      <HorzontalFeed />
      <Projects/>
      <Timeline />
      <Contact />
      <Footer />
    </div>
  )
}
