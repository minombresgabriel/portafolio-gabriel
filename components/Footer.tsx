'use client';

import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900 text-gray-300 py-12 px-6 mt-0 border-t border-gray-800 overflow-hidden">
      {/* Fondo con íconos de redes grandes y transparentes */}
      <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none select-none space-x-16">
        <FaGithub size={120} />
        <FaLinkedin size={120} />
        <FaEnvelope size={120} />
      </div>

      {/* Contenido arriba del fondo */}
      <div className="relative max-w-5xl mx-auto text-center space-y-4 z-10">
        <p className="text-sm tracking-wide">
          © {year} <span className="font-semibold text-white">Gabriel Ramírez</span>. All rights reserved.
        </p>

        <p className="text-sm">
          Developed with{' '}
          <span className="text-blue-400 hover:text-blue-500 transition duration-300 font-medium cursor-pointer">
            Next.js
          </span>{' '}
          &{' '}
          <span className="text-cyan-400 hover:text-cyan-500 transition duration-300 font-medium cursor-pointer">
            Tailwind CSS
          </span>
        </p>

        <div className="flex justify-center gap-6 text-gray-400 mt-2 text-xl z-10">
          <a
            href="https://github.com/minombresgabriel"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/gabriel-ramirez-soto"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a
            href="mailto:minombresgabriel@gmail.com"
            className="hover:text-white transition"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>

          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
