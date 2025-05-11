import React from 'react';

const DownloadForm: React.FC = () => (
  <form className="flex flex-col items-center mt-24 max-md:mt-10">
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e92a8501dbab4103971ae13eabfb670a4f04be5714710fb2129148b85252fed?apiKey=a78f6d67d7bc412983425b620122d734&&apiKey=a78f6d67d7bc412983425b620122d734" className="mt-32 max-w-full aspect-[0.83] w-[403px] max-md:mt-10" alt="Download illustration" />
    <div className="flex gap-4 p-3 mt-24 text-base font-light rounded-2xl border border-purple-800 border-solid bg-zinc-300 bg-opacity-20 text-zinc-600 max-md:flex-wrap max-md:mt-10">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/dcfe91939bf6aa9f3becfa517d028a6707b6d080f415de253ea48e101d4dd40f?apiKey=a78f6d67d7bc412983425b620122d734&&apiKey=a78f6d67d7bc412983425b620122d734" className="shrink-0 w-6 aspect-square" alt="" />
      <input type="text" className="flex-auto my-auto max-md:max-w-full bg-transparent border-none" placeholder="Link de tu cancion" aria-label="Link de tu cancion" />
    </div>
    <button type="submit" className="px-5 py-2 mt-11 text-xl font-bold text-white whitespace-nowrap rounded-[55px] max-md:mt-10">
      Download
    </button>
  </form>
);

export default DownloadForm;