import React from 'react';
import Image from 'next/image';


interface PlaylistCardProps {
  imageUrl: string;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ imageUrl }) => {
  return (
    <div className="flex flex-col grow justify-center text-base font-light text-white max-md:mt-10">
      <div className="flex relative flex-col items-start px-11 pt-20 pb-8 w-full aspect-[0.82] max-md:px-5">
        <img loading="lazy" src={imageUrl} className="object-cover absolute inset-0 size-full" alt="Playlist cover" />
        <button className="flex relative gap-2 justify-between px-6 py-3 mt-80 border border-white border-solid rounded-[55px] max-md:px-5 max-md:mt-10" style={{ top: '80px' }}>
            <span>Play now</span>
            <Image
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/85ff9b64560bd3e04db0c13e0a00169b9a8f2c58843c1ce72c4deacd5bc202dc?apiKey=a78f6d67d7bc412983425b620122d734&&apiKey=a78f6d67d7bc412983425b620122d734"
      alt="Play now"
      width={22}
      height={22}
      unoptimized // Esto desactiva la optimización de imágenes
    />
        </button>
      </div>
    </div>
  );
};

export default PlaylistCard;