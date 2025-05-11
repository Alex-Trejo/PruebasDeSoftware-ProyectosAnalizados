import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getTokenFromUrl, setAccessToken } from '../utils/spotify';

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = () => {
      const hash = getTokenFromUrl();
      window.location.hash = "";
      const _token = hash.access_token;

      if (_token) {
        setAccessToken(_token);
        // Guardar el token en el localStorage
        localStorage.setItem('spotify_access_token', _token);
        // Redirigir a la página principal
        router.push('/');
      } else {
        // Si no hay token, redirigir a la página de login o mostrar un error
        router.push('/login');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-neutral-950">
      <div className="text-white text-2xl">
        Autenticando...
      </div>
    </div>
  );
};

export default Callback;