import { useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { collection,  query, where, getDocs, setDoc, doc } from 'firebase/firestore';

import { auth, firestore } from '../utils/firebaseConfig';
import { Header } from '../components/Header';
import GradientEllipses from '../components/GradientEllipses';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    try {
      // Verificar si el usuario ya existe
      const q = query(collection(firestore, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        throw new Error('El usuario ya está registrado.');
      }
  
      // Registrar usuario
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Almacenar usuario en Firestore
        await setDoc(doc(firestore, 'users', user.uid), {
          email: user.email,
          // Agrega más campos si es necesario
        });
  
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
    setLoading(false);
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  const handleGithubRegister = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="grid h-screen w-screen place-items-center bg-slate-800 px-4 text-sm font-medium">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="w-full max-w-sm rounded-lg bg-slate-700/30 shadow mb-[-40px]">
        <form className="p-4 md:p-5 lg:p-6">
          <div className="grid gap-y-4"> {/* Increased gap for better spacing */}
            <button
              className="flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-300 transition hover:text-purple-400"
              type="button"
              onClick={handleGithubRegister}
            >
              <svg
                style={{ color: 'rgb(203, 213, 225)' }}
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                  fill="#cbd5e1"
                ></path>
              </svg>
              Sign up with Github
            </button>
            <button
              className="flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-300 transition hover:text-purple-400"
              type="button"
              onClick={handleGoogleRegister}
            >
              <svg
                style={{ color: 'rgb(203, 213, 225)' }}
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-google"
                viewBox="0 0 16 16"
              >
                <path
                  d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.867 4.867 0 0 0-.086 1.348c.092.565.404 1.048.883 1.338-.82-.03-1.588-.261-2.284-.63v.064c0 2.245 1.594 4.114 3.727 4.541-.387.106-.794.163-1.21.163-.296 0-.585-.028-.868-.081.586 1.835 2.281 3.164 4.26 3.204a8.03 8.03 0 0 0 8-8c0-.518-.059-1.021-.159-1.52l-.236.002z"
                ></path>
              </svg>
              Sign up with Google
            </button>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded-lg border border-slate-600 bg-slate-700 py-2 px-4 text-slate-300 placeholder:text-slate-500 mb-2"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-lg border border-slate-600 bg-slate-700 py-2 px-4 text-slate-300 placeholder:text-slate-500 mb-2"
              />
              <button
                type="button"
                onClick={handleRegister}
                className="w-full rounded-md bg-blue-600 py-2 px-4 text-white transition hover:bg-blue-700"
              >
                {loading ? 'Loading...' : 'Register'}
              </button>
              {error && <div className="text-red-500">{error}</div>}
            </div>
          </div>
        </form>
      </div>
      <GradientEllipses />
    </div>
  );
};

export default Register;
