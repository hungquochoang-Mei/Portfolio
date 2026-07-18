import React from 'react';
import { motion } from 'motion/react';

export default function S2Identity({ data }: { data: any }) {
  const portrait = data.images.find((i: any) => i.id === 2);
  const hobbyIcon = data.images.find((i: any) => i.id === 3);
  const goalIcon = data.images.find((i: any) => i.id === 4);

  return (
    <section 
      id={data.id} 
      className="slide-section relative w-full min-h-screen py-24 px-6 md:px-12 lg:px-24 flex items-center z-10"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-2/5 aspect-[4/5] liquid-glass rounded-[1.25rem] overflow-hidden relative group p-2"
        >
          <div className="w-full h-full rounded-[1rem] overflow-hidden relative">
            {portrait?.filename ? (
              <img 
                src={portrait.filename} 
                alt="Portrait" 
                className="w-full h-full object-cover object-top scale-[1.15] -translate-y-4 transition-transform duration-700 group-hover:scale-[1.2] opacity-80 mix-blend-luminosity"
              />
            ) : (
              <div className="w-full h-full bg-white/5 flex items-center justify-center font-serif text-white/50">
                Portrait
              </div>
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-3/5 flex flex-col justify-center liquid-glass rounded-[1.25rem] p-8 md:p-10"
        >
          <div className="mb-8">
            <h2 className="title-serif text-3xl md:text-4xl text-white">
              {data.primaryTitle}
            </h2>
          </div>

          <div className="space-y-4 font-sans text-white/95 text-[15px] md:text-base font-normal leading-relaxed drop-shadow-md">
            {data.content.map((item: string, idx: number) => {
              if (item.includes('Rules are made to be broken')) {
                return (
                  <p key={idx} className="text-lg md:text-xl italic opacity-100 my-6 border-l-2 pl-4 border-white/30">
                    "{item.replace('Thông điệp yêu thích của mình là ', '')}"
                  </p>
                );
              }
              const parts = item.split(':');
              if (parts.length > 1) {
                return (
                  <div key={idx} className="mb-2">
                    <strong className="text-white font-medium drop-shadow-lg">{parts[0]}:</strong>
                    {parts.slice(1).join(':')}
                  </div>
                );
              }
              return <p key={idx}>{item}</p>;
            })}
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="w-full aspect-[5/4] rounded-[0.75rem] liquid-glass flex items-center justify-center group overflow-hidden">
              {hobbyIcon?.filename ? (
                <img src={hobbyIcon.filename} alt="Hobby" className="w-full h-full object-cover opacity-80 mix-blend-luminosity transition-transform duration-500 group-hover:scale-110" />
              ) : (
                <div className="w-6 h-6 rounded-full border border-white/50" />
              )}
            </div>
            <div className="w-full aspect-[5/4] rounded-[0.75rem] liquid-glass flex items-center justify-center group overflow-hidden">
              {goalIcon?.filename ? (
                <img src={goalIcon.filename} alt="Goal" className="w-full h-full object-cover object-[center_30%] opacity-80 mix-blend-luminosity transition-transform duration-500 group-hover:scale-110" />
              ) : (
                <div className="w-6 h-6 rounded-md border border-white/50" />
              )}
            </div>
            <div className="w-full aspect-[5/4] rounded-[0.75rem] liquid-glass flex items-center justify-center group overflow-hidden">
              {data.images.find((i: any) => i.id === 23)?.filename ? (
                <img src={data.images.find((i: any) => i.id === 23).filename} alt="More" className="w-full h-full object-cover scale-[1.2] opacity-80 mix-blend-luminosity transition-transform duration-500 group-hover:scale-[1.3]" />
              ) : (
                <div className="w-full h-full rounded-md border border-white/20 bg-white/5 flex items-center justify-center text-white/40 text-xs font-serif transition-colors group-hover:bg-white/10 group-hover:text-white/70 cursor-pointer">
                  More
                </div>
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
