import { motion } from 'framer-motion';

const designSkills = [
  { name: 'Brand Identity', level: 95 },
  { name: 'UI/UX Design', level: 90 },
  { name: 'Logo Design', level: 95 },
  { name: 'Typography', level: 88 },
  { name: 'Color Theory', level: 92 },
  { name: 'Adobe Creative Suite', level: 90 },
];

const developmentSkills = [
  { name: 'React/Next.js', level: 92 },
  { name: 'TypeScript', level: 88 },
  { name: 'Tailwind CSS', level: 95 },
  { name: 'JavaScript', level: 90 },
  { name: 'Responsive Design', level: 93 },
  { name: 'Performance Optimization', level: 87 },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 relative bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-montserrat">
            <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-gray-400 text-lg font-inter">
            A blend of creative vision and technical expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Design Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#1a1a1a] rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white font-montserrat">Design</h3>
            </div>
            <div className="space-y-6">
              {designSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 font-medium font-inter">{skill.name}</span>
                    <span className="text-purple-400 font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                      className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Development Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#1a1a1a] rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white font-montserrat">Development</h3>
            </div>
            <div className="space-y-6">
              {developmentSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 font-medium font-inter">{skill.name}</span>
                    <span className="text-cyan-400 font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                      className="h-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
