import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import DualOwnership from '../components/DualOwnership';
import CaseStudies from '../components/CaseStudies';
import ArchiveStrip from '../components/ArchiveStrip';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import Navbar from '@/components/Navbar';
import SectionNav from '@/components/SectionNav';

export default function Home() {
  return (
    <main>
      <Navbar />
      <SectionNav />
      <Hero />
      <About />
      <Skills />
      <DualOwnership />
      <CaseStudies />
      <ArchiveStrip />
      <ContactForm />
      <Footer />
    </main>
  );
}
