import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "CU Campus Connect",
      category: "Mobile App",
      description: "A centralized platform for CU students to access academic resources and campus news.",
      image: "https://picsum.photos/seed/app/800/600",
      tags: ["React Native", "Firebase", "Node.js"]
    },
    {
      title: "CPG Contest Engine",
      category: "Web Platform",
      description: "In-house competitive programming platform for hosting internal contests and tracking progress.",
      image: "https://picsum.photos/seed/code/800/600",
      tags: ["Next.js", "PostgreSQL", "Docker"]
    },
    {
      title: "Smart Library System",
      category: "IoT / Web",
      description: "Automated book tracking and reservation system for the departmental library.",
      image: "https://picsum.photos/seed/library/800/600",
      tags: ["React", "Python", "Raspberry Pi"]
    }
  ];

  return (
    <section id="projects" className="section-padding bg-[#030712]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-4">Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-bold">Featured <span className="gradient-text">Projects</span></h3>
          </div>
          <button className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors flex items-center gap-2">
            View All Projects <ExternalLink size={20} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card overflow-hidden group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] to-transparent opacity-60" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-indigo-600/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-white/10 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all">
                    <Github size={20} />
                  </button>
                  <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
