import React from 'react';

const Marquee: React.FC = () => {
  return (
    <div className="marquee-container overflow-hidden relative top-[140px]">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white" />
      <div className="relative mt-[10px] mb-[10px]">
        <div className="marquee-content flex items-center">
          {/* Contenido extendido para un movimiento más continuo */}
          <div className="relative ml-10">
            <img
              loading="lazy"
              src="/images/globe 3.svg"
              alt="Descripción de la imagen"
              className="max-w-[550px] h-auto"
            />
          </div>
          <div className="marquee-item text-2xl font-light text-white uppercase mx-5">
            new way to reach the new fan
          </div>
          <div className="relative ml-10">
            <img
              loading="lazy"
              src="/images/globe 3.svg"
              alt="Descripción de la imagen"
              className="max-w-[550px] h-auto"
            />
          </div>
          <div className="marquee-item text-2xl font-light text-white uppercase mx-5">
            new way to reach the new fan
          </div>
          <div className="relative ml-10">
            <img
              loading="lazy"
              src="/images/globe 3.svg"
              alt="Descripción de la imagen"
              className="max-w-[550px] h-auto"
            />
          </div>
          <div className="marquee-item text-2xl font-light text-white uppercase mx-5">
            new way to reach the new fan
          </div>
          <img
            loading="lazy"
            src="/images/globe 3.svg"
            className="shrink-0 w-9 aspect-square"
          />
          <div className="marquee-item text-2xl font-light text-white uppercase mx-5">
            new way to reach the new fan
          </div>
          {/* Replicar contenido para el efecto continuo */}
          <div className="marquee-item text-2xl font-light text-white uppercase mx-5">
            new way to reach the new fan
          </div>
          <div className="relative ml-10">
            <img
              loading="lazy"
              src="/images/globe 3.svg"
              alt="Descripción de la imagen"
              className="max-w-[550px] h-auto"
            />
          </div>
          <div className="marquee-item text-2xl font-light text-white uppercase mx-5">
            new way to reach the new fan
          </div>
          <img
            loading="lazy"
            src="/images/globe 3.svg"
            className="shrink-0 w-9 aspect-square"
          />
          <div className="marquee-item text-2xl font-light text-white uppercase mx-5">
            new way to reach the new fan
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
    </div>
  );
};

export default Marquee;
