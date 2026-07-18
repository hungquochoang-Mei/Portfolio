import React from 'react';
import { motion } from 'motion/react';
import { Mail, Facebook, Instagram } from 'lucide-react';

export default function S6Contact({ data }: { data: any }) {
  const avatarImg = data.images.find((i: any) => i.id === 18);

  const getIcon = (idx: number) => {
    switch(idx) {
      case 0: return <Mail className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />;
      case 1: return <Facebook className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />;
      case 2: return <Instagram className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />;
      default: return <div className="w-3 h-3 rounded-full bg-white opacity-70 group-hover:opacity-100 transition-opacity" />;
    }
  };

  return (
    <section 
      id={data.id} 
      className="slide-section relative w-full min-h-screen py-24 px-6 md:px-12 lg:px-24 flex items-center justify-center z-10"
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl mx-auto flex flex-col items-center text-center"
      >
        <div className="mb-6">
          <h2 className="title-serif text-4xl md:text-5xl inline-block px-12 border-b border-white/20 pb-4">
            {data.primaryTitle}
          </h2>
        </div>

        <div className="w-40 h-40 md:w-48 md:h-48 mb-20 md:mb-24 relative group -mt-2">
          <div className="absolute inset-0 liquid-glass rounded-full animate-pulse" />
          <div className="absolute inset-2 liquid-glass rounded-full overflow-hidden flex items-center justify-center p-2">
            {avatarImg?.filename ? (
              <img src={avatarImg.filename} alt="Avatar" className="w-full h-full object-cover rounded-full mix-blend-luminosity opacity-90" />
            ) : (
              <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center text-white font-serif">Mei</div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 w-full">
          {data.content.length > 0 && (
            <motion.a 
              href={`mailto:${data.content[0].label.replace('Email: ', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Send an email to ${data.content[0].label}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-4 px-6 py-3 liquid-glass rounded-full group hover:bg-white/5 transition-colors"
            >
              {getIcon(0)}
              <span className="font-sans font-medium text-[13px] uppercase text-white tracking-[1px]">
                {data.content[0].label}
              </span>
            </motion.a>
          )}

          <div className="flex flex-wrap justify-center gap-6">
            {data.content.slice(1).map((contactItem: {label: string, link: string}, idx: number) => {
              return (
                <motion.a 
                  href={contactItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit my ${contactItem.label}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={idx}
                  className="flex items-center gap-4 px-6 py-3 liquid-glass rounded-full group hover:bg-white/5 transition-colors"
                >
                  {getIcon(idx + 1)}
                  <span className="font-sans font-medium text-[13px] uppercase text-white tracking-[1px]">
                    {contactItem.label}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>

      </motion.div>
    </section>
  );
}
