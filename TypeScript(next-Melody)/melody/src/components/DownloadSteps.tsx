import React from 'react';

type StepProps = {
  number: string;
  description: string;
};

const Step: React.FC<StepProps> = ({ number, description }) => (
  <div className="flex flex-col grow text-white max-md:mt-10">
    <div className="text-6xl font-semibold max-md:text-4xl">{number}</div>
    <div className="mt-11 text-lg font-light max-md:mt-10">{description}</div>
  </div>
);

const DownloadSteps: React.FC = () => (
  <section className="mt-32 max-md:mt-10 max-md:max-w-full">
    <h2 className="mt-28 text-7xl text-white max-md:mt-10 max-md:max-w-full max-md:text-4xl">¿Cómo descargar una canción?</h2>
    <div className="flex gap-5 max-md:flex-col">
      <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
        <Step number="01/" description="Copia el link de tu canción a descargar." />
      </div>
      <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
        <Step number="02/" description="Inserta el link en el buscador." />
        </div>
      <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
        <Step number="03/" description="Da click al botón de descargar y listo!" />
      </div>
    </div>
  </section>
);

export default DownloadSteps;