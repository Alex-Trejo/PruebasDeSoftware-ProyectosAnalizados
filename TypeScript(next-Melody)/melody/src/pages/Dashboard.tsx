import React, { useState, useEffect } from 'react';
import Layout from './LayoutDashB';
import MusicGenre from '../components/MusicGenre';
import { SongCard } from '../components/SongCard';

import Marquee from '../components/Marquee';
import { search } from '../utils/spotify';

const Dashboard: React.FC = () => {
  const [query, setQuery] = useState<string>('');  // Estado para el texto de búsqueda
  const [searchResults, setSearchResults] = useState<any>(null);  // Estado para almacenar los resultados de búsqueda
  const [token] = useState<string | null>(null); // Estado para el token de Spotify
  const [player, setPlayer] = useState<any>(null); // Estado para el objeto del reproductor
  const [deviceId, setDeviceId] = useState<string | null>(null); // Estado para el device ID

  // Conectar el reproductor
  const connectPlayer = () => {
    if (!token) {
      console.error("Token is null or undefined");
      return;
    }
  
    const newPlayer = new window.Spotify.Player({
      name: 'Dashboard Player',
      getOAuthToken: (cb) => {
        cb(token); // Usa el token solo si no es null
      },
      volume: 0.5,
    });
  
    newPlayer.connect().then(() => {
      console.log('Player connected');
      setPlayer(newPlayer);
    });
  
    newPlayer.on('ready', ({ device_id }) => {
      console.log('Player is ready with device ID', device_id);
      setDeviceId(device_id);
    });
  };

  // Desconectar el reproductor
  const disconnectPlayer = () => {
    if (player) {
      player.disconnect(); // Desconectar el reproductor
      console.log('Player disconnected');
      setPlayer(null); // Limpiar el estado
    }
  };

  // Iniciar o detener la reproducción
  const handlePlay = async (songUri: string) => {
    if (!player || !deviceId) {
      console.error('Player or device ID not available');
      return;
    }

    try {
      const requestBody = {
        uris: [songUri], // URI del track
        position_ms: 0, // Reproducir desde el inicio
      };

      if (typeof player.play === 'function') {
        await player.play(requestBody);
        console.log('Track is playing');
      } else {
        console.error('play() is not a function');
      }
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await search(query, 'track');
      if (response.tracks) {
        setSearchResults(response.tracks.items);
      }
    } catch (error) {
      console.error('Error searching songs:', error);
    }
  };

  useEffect(() => {
    // Conectar el reproductor cuando el componente se monte
    if (token) {
      connectPlayer();
    }

    return () => {
      // Limpiar cuando el componente se desmonte
      disconnectPlayer();
    };
  }, [token]);

  return (
    <Layout>
      <div className="relative top-[-110px]">
        <Marquee />
      </div>
      <section className="flex gap-5 items-start self-center px-5 mt-12 w-full text-white max-w-[1360px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <h1 className="flex-auto self-start text-7xl max-md:max-w-full max-md:text-4xl">
          Busqueda de <span className="text-7xl">Canciones</span>
        </h1>
        <MusicGenre />
      </section>

      <section className="flex justify-center mt-8 w-full">
        <input
          type="text"
          placeholder="Busca tu canción..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 w-1/2 text-black rounded-lg"
        />
        <button
          onClick={handleSearch}
          className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          Buscar
        </button>
      </section>

      {searchResults && searchResults.length > 0 && (
 <section className="mt-24 w-full max-w-[1360px] mx-auto px-4">
 <h2 className="text-3xl font-semibold text-white mb-8 text-center">
   Resultados de búsqueda
 </h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
   {searchResults.map((song: any, index: number) => (
     <SongCard
       key={index}
       title={song.name}
       artist={song.artists.map((artist: any) => artist.name).join(", ")}
       album={song.album.name}
       coverUrl={song.album.images[0].url}
       songUri={song.uri}
       onPlay={handlePlay}
     />
   ))}
 </div>
</section>

   
      )}
    </Layout>
  );
};

export default Dashboard;
