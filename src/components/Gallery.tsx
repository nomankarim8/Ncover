import React from 'react';
import { motion } from 'motion/react';

const Gallery = () => {
  const images = [
    { src: "https://picsum.photos/seed/event1/800/800", title: "Hackathon 2024" },
    { src: "https://picsum.photos/seed/event2/800/800", title: "Workshop on React" },
    { src: "https://picsum.photos/seed/event3/800/800", title: "Tech Talk" },
    { src: "https://picsum.photos/seed/event4/800/800", title: "Annual Meetup" },
    { src: "https://picsum.photos/seed/event5/800/800", title: "Coding Contest" },
    { src: "https://picsum.photos/seed/event6/800/800", title: "Project Showcase" },
  ];

  return (
    <section id="gallery" className="section-padding bg-[#030712]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-4">Memories</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Event <span className="gradient-text">Gallery</span></h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-bold text-lg">{image.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
