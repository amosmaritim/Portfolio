import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Brand Identity Project',
    description: 'Complete brand identity design including logo, color palette, and brand guidelines for a modern tech startup.',
    image: '/pictures/Brand Identity Project.png',
    tags: ['Branding', 'Logo Design', 'UI/UX'],
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with modern design, seamless user experience, and optimized performance.',
    image: '/pictures/E-Commerce Platform.png',
    tags: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: 3,
    title: 'Creative Portfolio Website',
    description: 'Stunning portfolio website showcasing creative work with smooth animations and responsive design.',
    image: '/pictures/Creative Portfolio Website.png',
    tags: ['Web Design', 'React', 'Framer Motion'],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-montserrat">
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg font-inter">
            A showcase of my recent work
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group bg-[#1a1a1a] rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const fallback = target.parentElement?.querySelector('.fallback-placeholder');
                    if (fallback) {
                      (fallback as HTMLElement).style.display = 'flex';
                    }
                    target.style.display = 'none';
                  }}
                />
                <div className="fallback-placeholder absolute inset-0 flex items-center justify-center" style={{ display: 'none' }}>
                  <div className="text-center p-6">
                    <svg
                      className="w-16 h-16 mx-auto text-purple-400/50 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-gray-400 text-sm">Project Image</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white font-montserrat group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 font-inter leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-medium border border-purple-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
