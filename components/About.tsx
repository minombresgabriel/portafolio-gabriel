'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';


const About = () => {

  return (
    <section
      id="about"
      className="relative bg-gradient-to-b from-gray-950 to-gray-900 text-white py-28 px-6 md:px-20 text-center overflow-hidden min-h-screen flex flex-col md:flex-row items-center md:items-stretch"
    >
      {/* Imagen lado izquierdo */}
      <div className="relative w-full md:w-1/2 h-72 md:h-auto flex justify-center items-center mb-10 md:mb-0">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, rotate: -3 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative rounded-full border-4 border-cyan-400 overflow-hidden w-72 h-72 md:w-96 md:h-96 shadow-lg shadow-cyan-500/40"
          whileHover={{ scale: 1.05, rotate: 3 }}
          tabIndex={0}
          aria-label="Foto de Gabriel Ramírez"
        >
          <Image
            src="/images/gabriel.png"
            alt="Gabriel Ramírez"
            fill
            sizes="(max-width: 768px) 280px, 384px"
            className="object-cover rounded-full"
            priority
          />
        </motion.div>
      </div>

      {/* Texto lado derecho */}
      <motion.div
        className="w-full md:w-1/2 max-w-2xl mx-auto text-left"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          custom={0}
className="text-5xl font-extrabold mb-8 tracking-tight text-cyan-400 text-center md:text-left"
        >
                    About Me
        </motion.h2>

        <motion.p custom={1} className="text-lg leading-relaxed mb-6 text-gray-300 ">
           I am <strong className="text-white font-semibold">Gabriel Ramírez</strong>,  a 24-year-old  developer who is passionate about creating efficient and clean solutions through code. I am a Senior IT Technician with real experience in projects for companies in Latin America and Europe.
        </motion.p>

        <motion.p custom={2}  className="text-lg leading-relaxed mb-6 text-gray-300">
          I work with technologies such as <strong className="text-cyan-400 font-semibold">MERN</strong>, <strong className="text-cyan-400 font-semibold">.NET Core</strong> y <strong className="text-cyan-400 font-semibold">WordPress</strong>. I adapt quickly to new challenges thanks to my self-taught approach and the use of artificial intelligence tools.
        </motion.p>

        <motion.p custom={3}  className="text-lg leading-relaxed mb-6 text-gray-300">
          In just <strong className="text-cyan-400 font-semibold">2 weeks</strong> I learned .NET Core from scratch and deployed a professional API used by real providers.
        </motion.p>

        <motion.p custom={4}  className="text-lg leading-relaxed mb-8 text-gray-300">
          My goal is to make a real and tangible impact with every solution I develop. I look for opportunities where I can add value.
        </motion.p>

<div className="flex justify-center md:justify-start">
  <motion.a
    custom={5}
    href="/Gabriel_Ramirez_CV.pdf"
    download
    className="inline-block px-10 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-400"
  >
    Download CV
  </motion.a>
</div>

      </motion.div>
    </section>
  );
};

export default About;
