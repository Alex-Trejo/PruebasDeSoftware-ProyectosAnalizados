import SpotifyWebApi from 'spotify-web-api-js';

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID; // Ajusta esto a tu ID de cliente
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;// Ajusta esto a tu URI de redirección

if (!CLIENT_ID || !REDIRECT_URI) {
  throw new Error('Missing environment variables for Spotify API');
}

export const spotifyApi = new SpotifyWebApi();

const scopes = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'app-remote-control',
  'user-top-read',           // Necesario para obtener los artistas y canciones más escuchadas
  'user-follow-read',        // Necesario para obtener los artistas seguidos
  'user-read-email',         // Para obtener el correo electrónico del usuario
  'user-read-private',       // Para obtener información privada del usuario
  'user-read-playback-state',// Para obtener el estado de reproducción
  'user-modify-playback-state', // Para modificar el estado de reproducción (como play/pause)
  'user-read-currently-playing', // Para obtener la pista que está sonando
  'app-remote-control',      // Para controlar la reproducción de Spotify en dispositivos remotos
].join(' ');

export const loginUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scopes)}&response_type=token&show_dialog=true`;

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial: { [key: string]: string }, item) => {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const setAccessToken = (token: string) => {
  spotifyApi.setAccessToken(token);
};


export const getNewReleases = async (limit: number = 30) => {
  try {
    const response = await spotifyApi.getNewReleases({ limit });
    return response.albums.items; // Devuelve la lista de álbumes
  } catch (error) {
    console.error("Error fetching new releases:", error);
    throw error;
  }
};

// Función para obtener el perfil del usuario
export const getUserProfile = async () => {
  try {
    const profile = await spotifyApi.getMe();
    return profile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Función para obtener los artistas más escuchados del usuario
// Función para obtener los artistas más escuchados del usuario
export const getUserTopItems = async (type: 'artists' | 'tracks', timeRange: string = 'medium_term', limit: number = 20) => {
  try {
    let response: SpotifyApi.UsersTopArtistsResponse | SpotifyApi.UsersTopTracksResponse | undefined;

    if (type === 'artists') {
      response = await spotifyApi.getMyTopArtists({ time_range: timeRange, limit });
    } else if (type === 'tracks') {
      response = await spotifyApi.getMyTopTracks({ time_range: timeRange, limit });
    }

    // Verifica que la respuesta no sea undefined antes de acceder a items
    if (response) {
      return response.items;
    } else {
      throw new Error(`Error: No se pudo obtener los ${type} más escuchados.`);
    }
  } catch (error) {
    console.error(`Error fetching top ${type}:`, error);
    throw error;
  }
};




// Función para obtener los artistas seguidos del usuario
export const getFollowedArtists = async (limit: number = 20) => {
  try {
    const response = await spotifyApi.getFollowedArtists({ limit });
    return response.artists.items;
  } catch (error) {
    console.error('Error fetching followed artists:', error);
    throw error;
  }
};

// spotify.tsx
export const search = async (query: string, type: "album" | "artist" | "playlist" | "track") => {
  try {
    const response = await spotifyApi.search(query, [type], { limit: 20 });
    return response;  // Devuelve los resultados completos
  } catch (error) {
    console.error("Error searching for items:", error);
    throw error;
  }
};

export const getDevices = async (token: string) => {
  const response = await fetch('https://api.spotify.com/v1/me/player/devices', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error fetching devices');
  }

  const data = await response.json();
  return data.devices;
};




export const play = () => spotifyApi.play();
export const pause = () => spotifyApi.pause();
export const skipToNext = () => spotifyApi.skipToNext();
export const skipToPrevious = () => spotifyApi.skipToPrevious();
export const setVolume = (volume: number) => spotifyApi.setVolume(volume);
export const getMyCurrentPlayingTrack = () => spotifyApi.getMyCurrentPlayingTrack();