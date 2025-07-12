'use client';

import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-gray-950 to-gray-900 text-white py-28 px-6 md:px-20 text-center overflow-hidden">
      {/* Fondo decorativo SVG */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          fill="none"
          viewBox="0 0 1200 120"
        >
          <path d="M0,0L1200,80L1200,120L0,120Z" fill="white" />
        </svg>
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <Image
          src="/images/gabriel.png"
          alt="Gabriel Ramírez"
          width={160}
          height={160}
          className="rounded-full mx-auto mb-6 border-4 border-white shadow-xl hover:scale-105 transition-transform duration-300"
          priority
        />

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
          Gabriel Ramírez
        </h1>

        <TypeAnimation
          sequence={[
            'Full Stack Developer - MERN',
            2000,
            'Especialista Backend en APIs y Automatización',
            2000,
            'Aplicaciones Web Profesionales y Escalables',
            2000,
          ]}
          wrapper="h2"
          speed={50}
          className="text-xl md:text-2xl font-medium text-cyan-400 mb-8"
          repeat={Infinity}
        />

        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-400 mb-10">
          Soy Full Stack Developer con experiencia en desarrollo de sistemas que digitalizan procesos y aumentan ingresos. Trabajo con tecnologías modernas para entregar productos web robustos, escalables y profesionales para negocios reales.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="#projects"
            className="w-full max-w-[250px] sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 text-center"
          >
            Ver mis proyectos
          </a>
          <a
            href="#contact"
            className="w-full max-w-[250px] sm:w-auto border border-white hover:bg-white hover:text-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 text-center"
          >
            Contáctame
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
