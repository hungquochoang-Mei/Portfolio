import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export default function S4Projects({ data }: { data: any }) {
  const [selectedProject, setSelectedProject] = useState<{ title: string; popupTitle: string; iconData: any; index: number; links?: {text: string, url: string}[]; hidePopupIcon?: boolean } | null>(null);

  return (
    <section 
      id={data.id} 
      className="slide-section relative w-full min-h-screen py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-center z-10"
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-7xl mx-auto mb-16 text-center"
      >
        <h2 className="title-serif text-4xl md:text-5xl inline-block px-12 border-b border-white/20 pb-4">
          {data.primaryTitle}
        </h2>
      </motion.div>

      <div className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
        {data.content.map((item: any, index: number) => {
          const iconId = index + 8;
          const iconData = data.images.find((i: any) => i.id === iconId);
          
          let rawTitle = typeof item === 'string' ? item : item.title;
          const parts = rawTitle.split(': ');
          const title = parts.length > 1 ? parts[1] : parts[0];
          
          const popupTitle = (typeof item === 'object' && item.popupTitle) ? item.popupTitle : title;
          let links = typeof item === 'object' ? item.links : undefined;
          
          // Backward compatibility for single link
          if (!links && typeof item === 'object' && item.link) {
            links = [{ text: item.linkText || "Xem chi tiết", url: item.link }];
          }
          
          const hidePopupIcon = typeof item === 'object' ? item.hidePopupIcon : false;

          return (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              key={index}
              onClick={() => setSelectedProject({ title, popupTitle, iconData, index, links, hidePopupIcon })}
              className="relative liquid-glass rounded-[1.25rem] p-6 flex flex-col items-center justify-center text-center min-h-[160px] cursor-pointer hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,255,255,0.05)] transition-all duration-300"
            >
              <div className="absolute top-3 right-3 text-[10px] md:text-[11px] font-sans font-medium uppercase tracking-wider text-white/70 bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                Bài {index + 1}
              </div>
              <div className="w-10 h-10 mb-4 mt-2 flex items-center justify-center rounded-[0.75rem] liquid-glass p-2">
                {iconData?.filename ? (
                  <img src={iconData.filename} alt={`Project ${index + 1} Icon`} className="w-full h-full object-contain filter invert opacity-80" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-white/50" />
                )}
              </div>
              <div className="font-sans font-semibold text-sm md:text-[15px] uppercase tracking-[1px] text-white drop-shadow-md">
                {title}
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl z-10 flex flex-col items-center text-center"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white/100 transition-colors bg-white/5 hover:bg-white/10 rounded-full"
              >
                <X size={20} />
              </button>
              
              {!selectedProject.hidePopupIcon && (
                <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-xl liquid-glass p-3">
                  {selectedProject.iconData?.filename ? (
                    <img src={selectedProject.iconData.filename} alt="Project Icon" className="w-full h-full object-contain filter invert opacity-90" />
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-white/50" />
                  )}
                </div>
              )}
              
              <h3 className="title-serif text-2xl md:text-3xl mb-4 text-white">
                {selectedProject.popupTitle}
              </h3>
              
              {selectedProject.links && selectedProject.links.length > 0 ? (
                <div className="flex flex-col gap-3 mt-4 w-full max-w-sm">
                  {selectedProject.links.map((link, idx) => (
                    <a 
                      key={idx}
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-6 py-3 rounded-full liquid-glass hover:bg-white/10 transition-colors border border-white/20 text-white font-sans text-sm md:text-base flex items-center justify-center gap-2"
                    >
                      {link.text}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="font-sans font-light text-white/70 text-sm md:text-base leading-relaxed">
                  Chi tiết dự án {selectedProject.popupTitle} sẽ được cập nhật tại đây.
                </p>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
