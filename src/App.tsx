import React, { useRef } from 'react';
import data from './data/contentData.json';
import S1Cover from './components/S1Cover';
import S2Identity from './components/S2Identity';
import S3Award from './components/S3Award';
import S4Projects from './components/S4Projects';
import S5Reflection from './components/S5Reflection';
import S6Contact from './components/S6Contact';
import Navigation from './components/Navigation';
import FadingVideo from './components/FadingVideo';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={containerRef} className="relative w-full bg-black text-white overflow-x-hidden selection:bg-white/30">
      <CustomCursor />
      <Navigation />
      
      <FadingVideo 
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />
      
      <main className="w-full relative z-10">
        <S1Cover data={data.slides.s1} />
        <S2Identity data={data.slides.s2} />
        <S3Award data={data.slides.s3} />
        <S4Projects data={data.slides.s4} />
        <S5Reflection data={data.slides.s5} />
        <S6Contact data={data.slides.s6} />
      </main>

      <ScrollToTop />
      
      <footer className="relative z-10 w-full text-center py-6 text-white/50 text-xs font-sans tracking-widest uppercase">
        © {new Date().getFullYear()} A Road To Me. All Rights Reserved.
      </footer>
    </div>
  );
}
