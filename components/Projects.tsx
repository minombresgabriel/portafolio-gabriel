'use client';

import Image from 'next/image';
import { projects } from '../data/projects';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative py-24 px-6 md:px-20 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-5xl font-extrabold text-center mb-20 text-white"
        >
          Featured Projects
        </motion.h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((proj, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col bg-gray-900 rounded-2xl shadow-md border border-gray-700 hover:border-cyan-400 hover:shadow-[0_0_20px_#00f0ff] overflow-hidden transition-all duration-500 group"
            >
              {/* Imagen */}
              <div className="relative w-full overflow-hidden">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  width={800}
                  height={300}
                  className="w-full h-56 object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Contenido */}
              <div className="flex flex-col flex-1 p-6">
                {/* Título */}
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {proj.title}
                </h3>

                {/* Descripción */}
                <p className="text-gray-300 mb-5 text-[15px] leading-relaxed flex-1">
                  {proj.description}
                </p>

                {/* Logros */}
                <ul className="mb-5 text-gray-400 list-disc list-inside space-y-1 text-sm">
                  {proj.achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {proj.tech.map((t, i) => (
                    <span
                      key={i}
                      className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full font-medium text-xs border border-cyan-500/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Botón GitHub */}
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm transition"
                  >
                    <FaGithub className="text-lg" /> See code on GitHub
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
