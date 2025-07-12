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
  SiMysql 
} from 'react-icons/si';

import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const skillGroups = [
  {
    title: '',
    gradient: 'from-blue-500 to-blue-700',
    skills: [
      { icon: <FaReact />, name: 'React', color: '#61dafb' },
      { icon: <SiNextdotjs />, name: 'Next.js', color: '#000000' },
      { icon: <SiTailwindcss />, name: 'Tailwind CSS', color: '#38bdf8' },
      { icon: <SiBootstrap />, name: 'Bootstrap', color: '#7952b3' },
    ],
  },
  {
    title: '',
    gradient: 'from-green-500 to-green-700',
    skills: [
      { icon: <FaNode />, name: 'Node.js', color: '#339933' },
      { icon: <FaDatabase />, name: 'Express', color: '#000000' },
      { icon: <SiDotnet />, name: '.NET Core', color: '#512bd4' },
    ],
  },
  {
    title: '',
    gradient: 'from-purple-500 to-purple-700',
    skills: [
      { icon: <SiMongodb />, name: 'MongoDB', color: '#47a248' },
      { icon: <FaDatabase />, name: 'SQL Server', color: '#cc2927' },
      { icon: <SiPostgresql />, name: 'PostgreSQL', color: '#336791' },
      { icon: <SiMysql />, name: 'MySQL', color: '#00758F' }, 

    ],
  },
  {
    title: '',
    gradient: 'from-gray-500 to-gray-700',
    skills: [
      { icon: <FaAws />, name: 'AWS (básico)', color: '#ff9900' },
      { icon: <SiVercel />, name: 'Vercel', color: '#000000' },
      { icon: <FaWordpress />, name: 'WordPress', color: '#21759b' },
    ],
  },
];



const Skills = () => {
  return (
    <section
      id="skills"
      className="relative py-24 px-6 md:px-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      <h2 className="text-5xl font-extrabold text-center mb-20 text-gray-900 tracking-tight select-none">
        Habilidades Técnicas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 z-10 relative">
        {skillGroups.map((group, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.3 }}
            viewport={{ once: true }}
          >
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.1}
              scale={1.05}
              transitionSpeed={3000}
              glareColor="#ffffff"
              glarePosition="all"
              className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-3xl shadow-lg p-10 cursor-pointer"
            >
              <h3
                className={`text-3xl font-semibold mb-8 bg-clip-text text-transparent bg-gradient-to-r ${group.gradient} select-none`}
              >
                {group.title}
              </h3>
              <div className="flex flex-wrap justify-center gap-8 text-gray-700">
                {group.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    whileHover={{
                      scale: 1.3,
                      color: skill.color,
                      textShadow:
                        '0 0 8px ' + skill.color,
                    }}
                    className="flex flex-col items-center space-y-2 text-center select-none cursor-default"
                    title={skill.name}
                  >
                    <div
                      style={{ color: skill.color }}
                      className="text-6xl drop-shadow-md"
                    >
                      {skill.icon}
                    </div>
                    <span className="text-base font-semibold tracking-wide">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
