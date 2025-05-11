import React from 'react';

interface ArtistCardProps {
  name: string;
  imageUrl: string;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ name, imageUrl }) => {
  return (
    <div className="flex flex-col flex-1 items-center">
      <img loading="lazy" src={imageUrl} className="w-36 rounded-full aspect-[1.12]" alt={`${name} profile`} />
      <div className="mt-4">{name}</div>
    </div>
  );
};

export default ArtistCard;