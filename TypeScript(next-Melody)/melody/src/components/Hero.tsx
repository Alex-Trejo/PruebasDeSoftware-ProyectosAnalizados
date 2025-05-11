import React from 'react';

const Hero: React.FC = () => (
  <section className="flex flex-col mt-48 ml-8 max-w-full text-white w-[556px] max-md:mt-10">
    <h1 className="text-7xl max-md:max-w-full max-md:text-4xl">Melody.</h1>
    <h2 className="mt-4 text-6xl max-md:max-w-full max-md:text-4xl">Music downloader.</h2>
    <div className="relative ml-10 ">
          <img
            loading="lazy"
            src="/images/image 5.png"
            alt="Descripción de la imagen"
            className="max-w-[550px] h-auto absolute top-[-480px] left-[605px] z-6 "
          />
        </div>
  </section>
);

export default Hero;