import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Features } from '../components/Features';
import { Projects } from '../components/Projects';
import { Team } from '../components/Team';
import { Gallery } from '../components/Gallery';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export const Home = () => {
  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Projects />
        <Team />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};
