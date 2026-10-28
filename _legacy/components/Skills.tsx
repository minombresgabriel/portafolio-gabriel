'use client';

import {
  FaReact,
  FaNode,
  FaDatabase,
  FaAws,
  FaIdCard,
  FaChartBar,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiVercel,
  SiNestjs,
  SiPrisma,
  SiTypescript,
  SiVite,
  SiStripe,
  SiRedux,
  SiRender,
  SiSupabase,
  SiDotnet,
  SiMongodb,
  SiWordpress,
} from 'react-icons/si';

import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const skillGroups = [
  {
    id: 'frontend' as const,
    gradient: 'from-cyan-400 to-blue-500',
    skills: [
      { icon: <FaReact />, name: 'React', color: '#61dafb' },
      { icon: <SiNextdotjs />, name: 'Next.js', color: '#ffffff' },
      { icon: <SiTailwindcss />, name: 'Tailwind CSS', color: '#38bdf8' },
      { icon: <SiTypescript />, name: 'TypeScript', color: '#3178c6' },
      { icon: <SiVite />, name: 'Vite', color: '#646cff' },
      { icon: <SiRedux />, name: 'Redux Toolkit', color: '#764abc' },
    ],
  },
  {
    id: 'backend' as const,
    gradient: 'from-green-400 to-emerald-500',
    skills: [
      { icon: <SiNestjs />, name: 'NestJS', color: '#e0234e' },
      { icon: <FaNode />, name: 'Node.js', color: '#339933' },
      { icon: <FaDatabase />, name: 'Express', color: '#ffffff' },
    ],
  },
  {
    id: 'payments' as const,
    gradient: 'from-purple-400 to-fuchsia-500',
    skills: [
      { icon: <SiPostgresql />, name: 'PostgreSQL', color: '#336791' },
      { icon: <SiPrisma />, name: 'Prisma', color: '#ffffff' },
      { icon: <SiStripe />, name: 'Stripe API', color: '#635bff' },
      { icon: <FaDatabase />, name: 'Webhooks / HMAC', color: '#f59e0b' },
      { icon: <FaIdCard />, name: 'KYC (SumSub)', color: '#22d3ee' },
    ],
  },
  {
    id: 'infra' as const,
    gradient: 'from-amber-400 to-orange-500',
    skills: [
      { icon: <FaAws />, name: 'AWS (basic)', color: '#ff9900' },
      { icon: <SiVercel />, name: 'Vercel', color: '#ffffff' },
      { icon: <SiRender />, name: 'Render', color: '#46e3b7' },
      { icon: <SiSupabase />, name: 'Supabase', color: '#3ecf8e' },
    ],
  },
];

const generalistSkills = [
  { icon: <SiDotnet />, name: '.NET Core', color: '#512bd4' },
  { icon: <FaDatabase />, name: 'SQL Server', color: '#a1a1aa' },
  { icon: <SiMongodb />, name: 'MongoDB', color: '#47a248' },
  { icon: <SiWordpress />, name: 'WordPress + SEO', color: '#21759b' },
  { icon: <FaChartBar />, name: 'Power BI', color: '#f2c811' },
];

const Skills = () => {
  const { t } = useLanguage();

  return (
    <section
      id="skills"
      className="scroll-mt-24 relative pb-10 px-6 md:px-24 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 overflow-hidden"
    >
      <h2 className="text-5xl font-extrabold text-center mb-20 text-white tracking-tight select-none">
        {t.skills.heading}
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
                <h3
                  className={`text-3xl font-semibold mb-8 bg-clip-text text-transparent bg-gradient-to-r ${group.gradient} select-none`}
                >
                  {t.skills.groups[group.id]}
                </h3>

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
                      <div style={{ color: skill.color }} className="text-6xl drop-shadow-md">
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/5 p-6 opacity-80"
      >
        <h3 className="mb-4 text-center font-mono text-sm uppercase tracking-widest text-gray-500">
          {t.skills.groups.generalist}
        </h3>
        <div className="flex flex-wrap justify-center gap-6 text-gray-400">
          {generalistSkills.map((skill, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 text-center" title={skill.name}>
              <div style={{ color: skill.color }} className="text-3xl opacity-80">
                {skill.icon}
              </div>
              <span className="text-xs text-gray-500">{skill.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
