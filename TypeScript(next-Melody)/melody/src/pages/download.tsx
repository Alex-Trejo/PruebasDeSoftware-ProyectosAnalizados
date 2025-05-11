import React from 'react';
import {Header}  from '../components/Header';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import DownloadSteps from '../components/DownloadSteps';
import DownloadForm from '../components/DownloadForm';
import Footer from '../components/Footer';
import GradientEllipses from '../components/GradientEllipses';
import Marquee from '../components/Marquee';

const MelodyMusicPlatform: React.FC = () => {
  return (
    <div className="flex flex-col pb-20 bg-neutral-950 relative">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <GradientEllipses className="absolute top-0 left-0 z-0 w-full h-full"/>
      <main className="relative z-10" >
        
        <Hero />
        <div className="relative top-[50px]">
      <Marquee />
      </div>

        
        <HowItWorks />
        <DownloadSteps />
        <DownloadForm />
      </main>
      <Footer />
    </div>
    );
    };
    
    export default MelodyMusicPlatform;