import React from 'react';
import { motion } from 'motion/react';

export default function S3Award({ data }: { data: any }) {
  const championImg = data.images.find((i: any) => i.id === 5);
  const stageImg = data.images.find((i: any) => i.id === 6);
  const momentImg = data.images.find((i: any) => i.id === 7);

  return (
    <section 
      id={data.id} 
      className="slide-section relative w-full min-h-screen py-24 px-6 md:px-12 lg:px-24 flex items-center z-10"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-start lg:items-stretch h-full">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-5/12 flex flex-col h-[70vh] liquid-glass rounded-[1.25rem] p-8 md:p-10"
        >
          <div className="mb-8 shrink-0">
            <h2 className="title-serif text-3xl md:text-4xl text-white mb-4">
              {data.primaryTitle}
            </h2>
            {data.description && (
              <p className="font-sans font-normal text-white/95 text-[15px] md:text-base leading-relaxed drop-shadow-md">
                {data.description}
              </p>
            )}
          </div>

          <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
            {data.content.map((item: string, idx: number) => {
              let tag = '';
              let rest = item;
              if (item.includes('Quán quân')) { tag = 'CHAMP'; rest = item.replace('Quán quân ', ''); }
              else if (item.includes('Champ - ')) { tag = 'CHAMP'; rest = item.replace('Champ - ', ''); }
              else if (item.includes('Giải Nhì')) { tag = 'SECOND'; rest = item.replace('Giải Nhì ', ''); }
              else if (item.includes('Quý quân')) { tag = 'THIRD'; rest = item.replace('Quý quân ', ''); }
              else if (item.includes('Top 12')) { tag = 'TOP 12'; rest = item.replace('Top 12 ', ''); }
              
              return (
                <div key={idx} className="award-item flex gap-4 items-center">
                  <span className="award-tag">{tag || 'AWARD'}</span>
                  <span className="font-sans text-base md:text-[17px] text-white leading-snug drop-shadow-md">{rest}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-7/12 h-[70vh] grid grid-cols-2 grid-rows-2 gap-4 lg:gap-6"
        >
          <div className="col-span-1 row-span-2 liquid-glass rounded-[1.25rem] overflow-hidden relative group p-2">
            <div className="w-full h-full rounded-[1rem] overflow-hidden relative">
              {championImg?.filename ? (
                <img src={championImg.filename} alt="Champion" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" />
              ) : (
                <div className="w-full h-full bg-white/5 flex items-center justify-center font-serif text-white/50">Main Award</div>
              )}
            </div>
          </div>
          
          <div className="col-span-1 row-span-1 liquid-glass rounded-[1.25rem] overflow-hidden relative group p-2">
            <div className="w-full h-full rounded-[1rem] overflow-hidden relative">
              {stageImg?.filename ? (
                <img src={stageImg.filename} alt="Stage" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" />
              ) : (
                <div className="w-full h-full bg-white/5 flex items-center justify-center font-serif text-white/50">Stage</div>
              )}
            </div>
          </div>

          <div className="col-span-1 row-span-1 liquid-glass rounded-[1.25rem] overflow-hidden relative group p-2">
            <div className="w-full h-full rounded-[1rem] overflow-hidden relative">
              {momentImg?.filename ? (
                <img src={momentImg.filename} alt="Moment" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" />
              ) : (
                <div className="w-full h-full bg-white/5 flex items-center justify-center font-serif text-white/50">Moment</div>
              )}
            </div>
          </div>
        </motion.div>

      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255, 0.05); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255, 0.2); border-radius: 4px; }
      `}} />
    </section>
  );
}
