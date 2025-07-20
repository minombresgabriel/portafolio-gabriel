import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import About from '../components/About';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import LatestBlogPosts from '../components/LatestBlogPosts'; 




export default function Home() {
  return (

    
    <main>
      <Hero />
      <Projects />
      <Skills />
      <About />
      <LatestBlogPosts /> 
      <ContactForm />
      <Footer />


    </main>
  );
}
