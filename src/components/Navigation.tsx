import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const SECTIONS = [
  { id: 's1', label: 'Home' },
  { id: 's2', label: 'About' },
  { id: 's3', label: 'Award' },
  { id: 's4', label: 'Project' },
  { id: 's5', label: 'Reflection' },
  { id: 's6', label: 'Contact' }
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('s1');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const offsetTop = top + window.scrollY;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + bottom - top) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-0 w-full z-50 px-6 md:px-10 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]"
    >
      <div className="flex justify-start">
        <div className="w-12 h-12 liquid-glass rounded-full flex items-center justify-center font-serif italic text-2xl text-white">
          m
        </div>
      </div>
      
      <div className="hidden md:flex justify-center">
        <div className="liquid-glass rounded-full px-2 py-2 flex items-center">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-6 py-2.5 text-base font-medium font-sans transition-all duration-300 rounded-full whitespace-nowrap ${
                activeSection === section.id 
                  ? 'bg-white/10 text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="hidden md:flex justify-end">
        <a 
          href="https://drive.google.com/drive/folders/1_7buj6ZjnaOG30KPQe9lSaZrR9ixiQX3?usp=drive_link" 
          target="_blank" 
          rel="noopener noreferrer"
          className="gap-2 text-sm font-medium liquid-glass-strong px-5 py-2.5 rounded-full text-white cursor-pointer hover:bg-white/10 transition-colors whitespace-nowrap"
        >
          Google Drive
        </a>
      </div>
    </motion.nav>
  );
}
