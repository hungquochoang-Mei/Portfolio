import React from 'react';
import { motion } from 'motion/react';

export default function S5Reflection({ data }: { data: any }) {
  const moodImg = data.images.find((i: any) => i.id === 14);

  return (
    <section 
      id={data.id} 
      className="slide-section relative w-full min-h-screen py-24 px-6 md:px-12 lg:px-24 z-10"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 relative">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-2/5 h-fit lg:sticky lg:top-32 liquid-glass rounded-[1.25rem] p-2"
        >
          <div className="aspect-[4/5] relative rounded-[1rem] overflow-hidden">
            {moodImg?.filename ? (
              <img src={moodImg.filename} alt="Mood" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" />
            ) : (
              <div className="w-full h-full bg-white/5 flex items-center justify-center font-serif text-white/50">Reflection Mood</div>
            )}
            
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
              <h2 className="font-serif italic text-3xl md:text-4xl text-white mb-2">
                {data.primaryTitle}
              </h2>
            </div>
          </div>
        </motion.div>

        <div className="w-full lg:w-3/5 flex flex-col space-y-8 pb-24">
          {data.content.map((qa: any, index: number) => {
            return (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                key={index} 
                className="liquid-glass rounded-[1.25rem] p-8 md:p-10"
              >
                <h4 className="title-serif text-2xl md:text-3xl mb-6">
                  {qa.q}
                </h4>
                <div className="reflection-quote font-sans font-normal text-white/95 text-lg md:text-xl leading-relaxed drop-shadow-md">
                  {qa.a}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
