import React from 'react';
import { motion } from 'motion/react';
import FadingVideo from './FadingVideo';

export default function S1Cover({ data }: { data: any }) {
  const heroVideo = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4";

  return (
    <section 
      id={data.id} 
      className="slide-section relative w-full h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      <FadingVideo 
        src={heroVideo} 
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0" 
        style={{ width: '120%', height: '120%' }} 
      />

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-20">
        <motion.h1 
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="font-serif text-[64px] md:text-[96px] lg:text-[112px] text-white leading-[0.8] tracking-[-3px] font-normal text-center italic"
        >
          A Road<br/>
          <em>to Me.</em>
        </motion.h1>
        
        <motion.h2 
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-sm font-sans font-light tracking-[4px] uppercase opacity-60 mt-8"
        >
          {data.primaryTitle}
        </motion.h2>
      </div>
    </section>
  );
}
