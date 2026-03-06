import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Twitter, Github } from 'lucide-react';

const Team = () => {
  const members = [
    {
      name: "Dr. Shahadat Hossain",
      role: "Chief Advisor",
      image: "https://picsum.photos/seed/person1/400/400",
      socials: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
      name: "Karim Noman",
      role: "President",
      image: "https://picsum.photos/seed/person2/400/400",
      socials: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
      name: "Sarah Ahmed",
      role: "General Secretary",
      image: "https://picsum.photos/seed/person3/400/400",
      socials: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
      name: "Tanvir Hasan",
      role: "Technical Lead",
      image: "https://picsum.photos/seed/person4/400/400",
      socials: { twitter: "#", linkedin: "#", github: "#" }
    }
  ];

  return (
    <section id="team" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-4">Our Leaders</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Meet the <span className="gradient-text">Core Team</span></h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            The dedicated individuals working behind the scenes to make CPG CU a success.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 text-center group"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full relative z-10 border-2 border-white/10"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
              <p className="text-indigo-400 text-sm font-medium mb-6">{member.role}</p>
              
              <div className="flex justify-center gap-4">
                <a href={member.socials.twitter} className="p-2 rounded-full bg-white/5 hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-400 transition-all">
                  <Twitter size={18} />
                </a>
                <a href={member.socials.linkedin} className="p-2 rounded-full bg-white/5 hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-400 transition-all">
                  <Linkedin size={18} />
                </a>
                <a href={member.socials.github} className="p-2 rounded-full bg-white/5 hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-400 transition-all">
                  <Github size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
