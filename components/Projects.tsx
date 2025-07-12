'use client';

import Image from 'next/image';
import { projects } from '../data/projects';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative py-24 px-6 md:px-20 bg-gradient-to-b from-white to-gray-100"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-5xl font-extrabold text-center mb-16 text-gray-900"
        >
          Proyectos Destacados
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((proj, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ease-in-out group"
            >
              <div className="overflow-hidden">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  width={800}
                  height={300}
                  className="w-full h-66 object-cover transition-transform duration-700 ease-in-out group-hover:scale-105  "
                  priority={index === 0}
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  {proj.title}
                </h3>

                <p className="text-gray-600 mb-4 text-[15px] leading-relaxed">
                  {proj.description}
                </p>

                <ul className="mb-4 text-gray-600 list-disc list-inside space-y-1 text-sm">
                  {proj.achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-6">
                  {proj.tech.map((t, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white bg-blue-600 px-4 py-2 rounded-md font-medium text-sm transition"
                  >
                    <FaGithub /> Ver código en GitHub
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
