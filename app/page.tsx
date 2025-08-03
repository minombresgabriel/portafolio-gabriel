import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import About from '../components/About';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import LatestBlogPosts from '../components/LatestBlogPosts'; 
import Navbar from '@/components/Navbar';



export default function Home() {
  return (

    
    <main>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <LatestBlogPosts /> 
      <ContactForm />
      <Footer />


    </main>
  );
}
