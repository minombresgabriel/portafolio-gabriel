'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-gray-900 text-white py-28 px-6 md:px-20 overflow-hidden min-h-screen flex flex-col md:flex-row items-center md:items-stretch"
    >
      {/* Patrón de puntos blancos sutil */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Partículas SVG encima del patrón */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('/images/particles.svg')] bg-cover"></div>

      {/* Imagen lado izquierdo */}
      <div className="relative w-full md:w-1/2 flex justify-center items-center mb-10 md:mb-0">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          whileHover={{ scale: 1.05, rotate: 3 }}
          className="relative rounded-full border-4 border-cyan-400/80 overflow-hidden w-72 h-72 md:w-96 md:h-96 shadow-[0_0_20px_#00f0ff] hover:shadow-[0_0_35px_#00f0ff]"
        >
          <Image
            src="/images/gabriel.png"
            alt="Gabriel Ramírez"
            fill
            sizes="(max-width: 768px) 200px, 384px"
            className="object-cover md:object-center object-top rounded-full"
            priority
          />
        </motion.div>
      </div>

      {/* Texto lado derecho */}
      <motion.div
        className="w-full md:w-1/2 max-w-2xl mx-auto text-left relative z-10"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h2 className="text-5xl font-extrabold mb-8 tracking-tight text-cyan-400">
          About Me
        </motion.h2>

        <p className="text-lg leading-relaxed mb-6 text-gray-300">
          I am <strong className="text-white font-semibold">Gabriel Ramírez</strong>, a developer passionate about creating efficient and clean solutions through code. I am a Senior IT Technician with real experience in projects for companies in Latin America and Europe.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-gray-300">
          I work with technologies such as <strong className="text-cyan-400 font-semibold">MERN</strong>, <strong className="text-cyan-400 font-semibold">.NET Core</strong>, and <strong className="text-cyan-400 font-semibold">WordPress</strong>. I adapt quickly to new challenges thanks to my self-taught approach and the use of artificial intelligence tools.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-gray-300">
          In just <strong className="text-cyan-400 font-semibold">2 weeks</strong> I learned .NET Core from scratch and deployed a professional API used by real providers.
        </p>

        <p className="text-lg leading-relaxed mb-8 text-gray-300">
          My goal is to make a real and tangible impact with every solution I develop. I seek opportunities where I can add value.
        </p>

        {/* Botón futurista */}
        <div className="flex justify-center md:justify-start">
          <motion.a
            href="/Gabriel_Ramirez_CV.pdf"
            download
            whileHover={{ scale: 1.05 }}
            className="relative inline-block px-10 py-4 rounded-xl font-semibold text-white transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-xl border border-cyan-400 animate-pulse shadow-[0_0_15px_#00f0ff]"></span>
            <span className="relative z-10">Download CV</span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
