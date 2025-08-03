'use client';

import {
  FaReact,
  FaNode,
  FaDatabase,
  FaWordpress,
  FaAws,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiDotnet,
  SiMongodb,
  SiPostgresql,
  SiBootstrap,
  SiVercel,
  SiMysql,
} from 'react-icons/si';

import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const skillGroups = [
  {
    gradient: 'from-cyan-400 to-blue-500',
    skills: [
      { icon: <FaReact />, name: 'React', color: '#61dafb' },
      { icon: <SiNextdotjs />, name: 'Next.js', color: '#ffffff' },
      { icon: <SiTailwindcss />, name: 'Tailwind CSS', color: '#38bdf8' },
      { icon: <SiBootstrap />, name: 'Bootstrap', color: '#7952b3' },
    ],
  },
  {
    gradient: 'from-green-400 to-emerald-500',
    skills: [
      { icon: <FaNode />, name: 'Node.js', color: '#339933' },
      { icon: <FaDatabase />, name: 'Express', color: '#ffffff' },
      { icon: <SiDotnet />, name: '.NET Core', color: '#512bd4' },
    ],
  },
  {
    gradient: 'from-purple-400 to-fuchsia-500',
    skills: [
      { icon: <SiMongodb />, name: 'MongoDB', color: '#47a248' },
      { icon: <FaDatabase />, name: 'SQL Server', color: '#cc2927' },
      { icon: <SiPostgresql />, name: 'PostgreSQL', color: '#336791' },
      { icon: <SiMysql />, name: 'MySQL', color: '#00758F' },
    ],
  },
  {
    gradient: 'from-amber-400 to-orange-500',
    skills: [
      { icon: <FaAws />, name: 'AWS (basic)', color: '#ff9900' },
      { icon: <SiVercel />, name: 'Vercel', color: '#ffffff' },
      { icon: <FaWordpress />, name: 'WordPress', color: '#21759b' },
    ],
  },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative pb-10 px-6 md:px-24 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900  overflow-hidden"
    >
      <h2 className="text-5xl font-extrabold text-center mb-20 text-white tracking-tight select-none ">
        Technical Skills
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 z-10 relative">
        {skillGroups.map((group, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Tilt
              glareEnable
              glareMaxOpacity={0.15}
              scale={1.03}
              transitionSpeed={2000}
              glareColor="#00f0ff"
              glarePosition="all"
              className="relative rounded-3xl p-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:shadow-[0_0_30px_#00f0ff] transition-all duration-500"
            >
              <div className="bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-lg p-10 border border-white/10">
                {/* Título */}
                <h3
                  className={`text-3xl font-semibold mb-8 bg-clip-text text-transparent bg-gradient-to-r ${group.gradient} select-none`}
                >
                </h3>

                {/* Lista de Skills */}
                <div className="flex flex-wrap justify-center gap-8 text-gray-300">
                  {group.skills.map((skill, i) => (
                    <motion.div
                      key={i}
                      whileHover={{
                        scale: 1.25,
                        rotate: 5,
                        color: skill.color,
                        textShadow: `0 0 12px ${skill.color}, 0 0 25px ${skill.color}`,
                      }}
                      transition={{ type: 'spring', stiffness: 250 }}
                      className="flex flex-col items-center space-y-2 text-center select-none cursor-pointer"
                      title={skill.name}
                    >
                      <div
                        style={{ color: skill.color }}
                        className="text-6xl drop-shadow-md"
                      >
                        {skill.icon}
                      </div>
                      <span className="text-base font-medium tracking-wide text-white">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
