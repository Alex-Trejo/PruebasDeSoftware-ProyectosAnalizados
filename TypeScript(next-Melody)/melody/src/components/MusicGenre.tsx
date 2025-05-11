import React from 'react';

interface GenreButtonProps {
genre: string;
}

const GenreButton: React.FC<GenreButtonProps> = ({ genre }) => (
<button className="px-5 py-2.5 whitespace-nowrap border border-solid border-neutral-400 rounded-[50px]">
    {genre}
</button>
);

const MusicGenre: React.FC = () => {
const genres = ['Rock', 'Pop', 'K-Pop', 'Jazz', 'Funk'];

return (
    <div className="flex gap-4 self-end mt-32 text-base max-md:flex-wrap max-md:mt-10">
    <div className="grow my-auto text-xl">Music Genre</div>
    {genres.map((genre) => (
        <GenreButton key={genre} genre={genre} />
    ))}
    </div>
);
};

export default MusicGenre;