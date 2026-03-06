import React from 'react';
import { motion } from 'motion/react';
import { Users, Target, Zap } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <Users className="w-6 h-6 text-indigo-400" />,
      title: "Community First",
      description: "A diverse group of passionate developers helping each other grow."
    },
    {
      icon: <Target className="w-6 h-6 text-purple-400" />,
      title: "Goal Oriented",
      description: "Focused on practical skills and industry-ready project development."
    },
    {
      icon: <Zap className="w-6 h-6 text-pink-400" />,
      title: "Fast Growth",
      description: "Accelerated learning through workshops, hackathons, and mentorship."
    }
  ];

  return (
    <section id="about" className="section-padding bg-[#030712]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-4">About Us</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Building the Future of <br />
              <span className="gradient-text">Tech at CU.</span>
            </h3>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              The Computer Programming Group (CPG) at Chittagong University is more than just a club. 
              It's an ecosystem where students transform into skilled professionals. We bridge the gap 
              between academic theory and industry practice through hands-on collaboration.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 glass-card">
                <h4 className="text-3xl font-bold text-white mb-2">500+</h4>
                <p className="text-slate-500 text-sm">Active Members</p>
              </div>
              <div className="p-6 glass-card">
                <h4 className="text-3xl font-bold text-white mb-2">50+</h4>
                <p className="text-slate-500 text-sm">Projects Completed</p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 glass-card flex gap-6 group hover:bg-white/[0.08] transition-all"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
