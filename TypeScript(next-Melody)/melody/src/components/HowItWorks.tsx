import React from 'react';

const HowItWorks: React.FC = () => (
  <section className="flex flex-col px-14 mt-24 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
    <div className="self-start ml-4 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-3/5 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch my-auto text-white max-md:mt-10 max-md:max-w-full">
            <h2 className="text-7xl max-md:max-w-full max-md:text-4xl">¿Cómo funciona Melody?</h2>
            <p className="mt-12 text-lg font-light leading-7 max-md:mt-10 max-md:max-w-full">
              Melody Music Downloade, está diseñado para brindar la mejor calidad de música mp3. Sigue estos pasos sencillos para acceder a tu música favorita de manera gratuita.
            </p>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-2/5 max-md:ml-0 max-md:w-full">
          <div className="flex relative flex-col grow justify-center items-start  border-solid min-h-[416px] max-md:mt-10 max-md:max-w-full">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/279e471732afcde23694b643c6897fa31e6bab272b61ff29348ceda6af6fe988?apiKey=a78f6d67d7bc412983425b620122d734&&apiKey=a78f6d67d7bc412983425b620122d734" className="z-10 mt-0 w-full aspect-square max-md:max-w-full" alt="Foreground" />
          </div>
        </div>
      </div>
    </div>
  </section>
  );

  export default HowItWorks;