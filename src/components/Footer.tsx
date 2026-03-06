import React from 'react';
import { Code2, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#030712] border-t border-white/5 pt-20 pb-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <Code2 className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">CPG CU</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Empowering the next generation of developers at Chittagong University through innovation and collaboration.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
                <Github size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-slate-500 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#features" className="text-slate-500 hover:text-white transition-colors">Services</a></li>
              <li><a href="#projects" className="text-slate-500 hover:text-white transition-colors">Projects</a></li>
              <li><a href="#team" className="text-slate-500 hover:text-white transition-colors">Our Team</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Community</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-500 hover:text-white transition-colors">Join Discord</a></li>
              <li><a href="#" className="text-slate-500 hover:text-white transition-colors">Events</a></li>
              <li><a href="#" className="text-slate-500 hover:text-white transition-colors">Hackathons</a></li>
              <li><a href="#" className="text-slate-500 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-slate-500 mb-6">Stay updated with our latest news and events.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 w-full"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm">
            © 2024 CPG CU. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-600 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-600 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
