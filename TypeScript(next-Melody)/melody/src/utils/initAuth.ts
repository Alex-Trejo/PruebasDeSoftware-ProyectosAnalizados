// utils/initAuth.ts
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Asegúrate de que esta ruta sea correcta
import { AppDispatch } from '../redux/store'; // Importa el tipo AppDispatch desde tu store
import { loginSuccess, loginFailure } from '../redux/slices/authSlice';

const initAuth = (dispatch: AppDispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Usuario autenticado
      dispatch(loginSuccess({ uid: user.uid, email: user.email ?? '' }));
    } else {
      // Usuario no autenticado
      dispatch(loginFailure('No user found'));
    }
  });
};

export default initAuth;
