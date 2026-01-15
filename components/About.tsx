import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-inter">
            I specialize in creating compelling brand identities that resonate with audiences and 
            building robust frontend solutions that bring those identities to life. My dual expertise 
            allows me to approach every project with a holistic understanding of both the creative 
            and technical aspects, ensuring seamless integration from concept to execution.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
