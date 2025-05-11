import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import GradientEllipses from "../components/GradientEllipses";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserProfile, getUserTopItems, getFollowedArtists } from "../utils/spotify"; // Importa las funciones necesarias

const UserProfile: React.FC = () => {
  const { uid, email } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [topArtists, setTopArtists] = useState<any[]>([]);
  const [topTracks, setTopTracks] = useState<any[]>([]);
  const [followedArtists, setFollowedArtists] = useState<any[]>([]);

  useEffect(() => {
    if (!uid) {
      router.push('/login');
    } else {
      // Cargar el perfil del usuario
      getUserProfile()
        .then(profile => {
          setUserProfile(profile);
        })
        .catch(error => {
          console.error("Error fetching user profile:", error);
        });

      // Obtener los artistas más escuchados
      getUserTopItems('artists', 'medium_term', 15)
        .then(artists => {
          setTopArtists(artists);
        })
        .catch(error => {
          console.error("Error fetching top artists:", error);
        });

      // Obtener las canciones más escuchadas
      getUserTopItems('tracks', 'medium_term', 15)
        .then(tracks => {
          setTopTracks(tracks);
        })
        .catch(error => {
          console.error("Error fetching top tracks:", error);
        });

      // Obtener los artistas seguidos
      getFollowedArtists(15)
        .then(artists => {
          setFollowedArtists(artists);
        })
        .catch(error => {
          console.error("Error fetching followed artists:", error);
        });
    }
  }, [uid, router]);

  if (!uid || !userProfile) {
    return null; // O un loading spinner si lo prefieres
  }

  return (
    <div className="flex flex-col pb-20 bg-neutral-950 overflow-x-hidden pl-5">
      <div className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-70">
        <Header />
      </div>
      <GradientEllipses />

      <div className="flex flex-row mt-48 ml-10 max-w-full max-md:mt-10 relative z-20">
        <div className="flex flex-col text-white w-[671px] max-md:mt-10">
          {/* Foto de perfil */}
          <div className="w-24 h-24 bg-gray-900 rounded-full shadow-lg mb-6 flex items-center justify-center">
            <img
              src={userProfile.images?.[0]?.url || '/default-avatar.png'}
              alt="Profile Picture"
              className="w-full h-full object-cover rounded-full transition-all duration-400 ease-in-out hover:scale-105 hover:shadow-xl"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">{userProfile.display_name || (email ? email.split('@')[0] : 'Usuario')}</h1>
          <p className="mt-2 text-lg md:text-xl font-light text-gray-300 text-center">
            Bienvenido a tu perfil. Aquí puedes ver tus detalles de usuario y gestionar tu cuenta.
          </p>
        </div>
      </div>

      <div className="relative ml-10">
        <img
          loading="lazy"
          src={userProfile.images?.[0]?.url || '/images/image 5.png'}  // Reemplaza con la imagen del usuario
          alt="Descripción de la imagen"
          className="max-w-[510px] w-full h-auto absolute top-[-290px] left-[1155px] z-6 bg-fixed bg-center bg-cover" // Ajuste de tamaño
        />
      </div>

      {/* Mostrar los artistas más escuchados */}
      <div className="mt-8 pl-5">
        <h2 className="text-2xl font-semibold text-gray-200">Artistas más escuchados</h2>
        <div className="bg-black bg-opacity-50 p-4 rounded-lg mt-4 space-y-4 border-t-4 border-gray-600">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {topArtists.map((artist: any) => (
              <div key={artist.id} className="flex items-center space-x-4 hover:scale-105 transition-all duration-300 ease-in-out">
                <img src={artist.images[0]?.url || '/default-avatar.png'} alt={artist.name} className="w-16 h-16 rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg" />
                <p className="text-lg text-gray-300">{artist.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mostrar las canciones más escuchadas */}
      <div className="mt-8 pl-5">
        <h2 className="text-2xl font-semibold text-gray-200">Canciones más escuchadas</h2>
        <div className="bg-black bg-opacity-50 p-4 rounded-lg mt-4 space-y-4 border-t-4 border-gray-600">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {topTracks.map((track: any) => (
              <div key={track.id} className="flex items-center space-x-4 hover:scale-105 transition-all duration-300 ease-in-out">
                <img src={track.album.images[0]?.url || '/default-avatar.png'} alt={track.name} className="w-16 h-16 rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg" />
                <p className="text-lg text-gray-300">{track.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mostrar los artistas seguidos */}
      <div className="mt-8 pl-5">
        <h2 className="text-2xl font-semibold text-gray-200">Artistas Seguidos</h2>
        <div className="bg-black bg-opacity-50 p-4 rounded-lg mt-4 space-y-4 border-t-4 border-gray-600">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {followedArtists.map((artist: any) => (
              <div key={artist.id} className="flex items-center space-x-4 hover:scale-105 transition-all duration-300 ease-in-out">
                <img src={artist.images[0]?.url || '/default-avatar.png'} alt={artist.name} className="w-16 h-16 rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg" />
                <p className="text-lg text-gray-300">{artist.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer className="fixed bottom-0 left-0 w-full z-50 bg-black bg-opacity-70" />
    </div>
  );
};

export default UserProfile;
