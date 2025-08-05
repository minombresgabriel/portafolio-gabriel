'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';

const TypeAnimation = dynamic(
  () =>
    import('react-type-animation').then((mod) => mod.TypeAnimation), // ✅ Importa el named export correctamente
  { ssr: false }
);


const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white py-16 md:py-28 px-6 md:px-20 text-center overflow-hidden">

      {/* Fondo partículas futuristas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.15),transparent_70%)]"></div>

        {/* Partículas y scanner SOLO en desktop para no frenar móvil */}
        <div className="hidden md:block absolute inset-0 animate-[floatParticles_14s_linear_infinite] bg-[url('/images/particles.svg')] opacity-25"></div>
        <div className="hidden md:block absolute inset-0 bg-[linear-gradient(120deg,rgba(255,0,255,0.08)_25%,transparent_25%,transparent_50%,rgba(0,255,255,0.08)_50%,rgba(255,0,255,0.08)_75%,transparent_75%,transparent)] bg-[length:40px_40px] animate-[scan_6s_linear_infinite]"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <Image
          src="/images/gabriel.png"
          alt="Gabriel Ramírez"
          width={160}
          height={160}
          sizes="(max-width: 768px) 96px, 160px"
          placeholder="blur"
          blurDataURL="/images/gabriel-blur.jpg"
          className="rounded-full mx-auto mb-6 border-4 border-cyan-400 shadow-[0_0_15px_#00f0ff,0_0_30px_#00f0ff] hover:shadow-[0_0_25px_#00f0ff,0_0_40px_#ff00ff] transition-all duration-500"
          priority
        />

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight drop-shadow-[0_0_2px_#00f0ff]">
          Gabriel Ramírez
        </h1>

        {/* Animación de texto */}
        <TypeAnimation
          sequence={[
            'Full Stack Developer - MERN',
            2000,
            'Backend Specialist in APIs and Automation',
            2000,
            'Professional and Scalable Web Applications',
            2000,
          ]}
          wrapper="h2"
          speed={50}
          className="text-xl md:text-2xl font-medium text-cyan-400 mb-8"
          repeat={Infinity}
        />

        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300 mb-10">
          I am a Full Stack Developer with experience in developing systems that digitize processes and increase revenue. I work with modern technologies to deliver robust, scalable, and professional web products for real businesses.
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="#projects"
            className="w-full max-w-[250px] sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 text-center shadow-[0_0_10px_#00f0ff]"
          >
            See my projects
          </a>
          <a
            href="#contact"
            className="w-full max-w-[250px] sm:w-auto border border-white hover:bg-white hover:text-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 text-center shadow-[0_0_5px_#ff00ff]"
          >
            Contact me
          </a>
        </div>
      </div>

      {/* Animaciones extras */}
      <style jsx>{`
        @keyframes scan {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        @keyframes floatParticles {
          0% { background-position: 0 0; }
          100% { background-position: 100% 100%; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
