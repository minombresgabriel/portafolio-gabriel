'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, t, toggle } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: 'https://portafolio-gabriel-avq9.vercel.app/#home' },
    { name: t.nav.about, href: 'https://portafolio-gabriel-avq9.vercel.app/#about' },
    { name: t.nav.projects, href: 'https://portafolio-gabriel-avq9.vercel.app/#projects' },
    { name: t.nav.blog, href: 'https://portafolio-gabriel-avq9.vercel.app/#LatestBlogPosts' },
    { name: t.nav.contact, href: 'https://portafolio-gabriel-avq9.vercel.app/#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/40 backdrop-blur-lg border-b border-cyan-400/40 shadow-[0_0_15px_#00f0ff50]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="https://portafolio-gabriel-avq9.vercel.app/#home" className="text-cyan-400 font-extrabold text-2xl tracking-wide hover:text-cyan-300 transition-colors">
          GABRIEL
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-white hover:text-cyan-400 transition-colors duration-300 group"
            >
              {link.name}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {/* Language toggle */}
          <button
            onClick={toggle}
            className="flex items-center gap-1 text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="Toggle language"
          >
            <span className={lang === 'es' ? 'text-cyan-400' : 'text-gray-500'}>ES</span>
            <span className="text-gray-600">|</span>
            <span className={lang === 'en' ? 'text-cyan-400' : 'text-gray-500'}>EN</span>
          </button>
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggle}
            className="flex items-center gap-1 text-sm font-semibold text-gray-400"
            aria-label="Toggle language"
          >
            <span className={lang === 'es' ? 'text-cyan-400' : 'text-gray-500'}>ES</span>
            <span className="text-gray-600">|</span>
            <span className={lang === 'en' ? 'text-cyan-400' : 'text-gray-500'}>EN</span>
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/10 backdrop-blur-lg border-t border-cyan-400/40 shadow-lg"
          >
            <div className="flex flex-col items-center gap-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white text-lg hover:text-cyan-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
