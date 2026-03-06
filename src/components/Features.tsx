import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Cpu, Globe, Shield, Database, Layout } from 'lucide-react';

const Features = () => {
  const services = [
    {
      icon: <Terminal />,
      title: "Competitive Programming",
      description: "Master algorithms and data structures through regular contests and training sessions.",
      color: "from-blue-500/20 to-indigo-500/20"
    },
    {
      icon: <Layout />,
      title: "Web Development",
      description: "Build modern, responsive, and high-performance web applications using the latest stacks.",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: <Globe />,
      title: "App Development",
      description: "Create cross-platform mobile experiences that users love with Flutter and React Native.",
      color: "from-emerald-500/20 to-teal-500/20"
    },
    {
      icon: <Cpu />,
      title: "Machine Learning",
      description: "Explore the world of AI and data science with hands-on projects and research.",
      color: "from-orange-500/20 to-red-500/20"
    },
    {
      icon: <Database />,
      title: "Backend Systems",
      description: "Learn to design scalable architectures and manage complex database systems.",
      color: "from-cyan-500/20 to-blue-500/20"
    },
    {
      icon: <Shield />,
      title: "Cyber Security",
      description: "Understand the fundamentals of network security and ethical hacking practices.",
      color: "from-indigo-500/20 to-purple-500/20"
    }
  ];

  return (
    <section id="features" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Our <span className="gradient-text">Specializations</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            We offer a wide range of learning paths to help you find your passion and excel in the tech industry.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 glass-card hover:bg-white/[0.08] transition-all relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 group-hover:text-white transition-all">
                  {React.cloneElement(service.icon as React.ReactElement, { size: 28 })}
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">{service.title}</h4>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
