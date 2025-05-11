// src/api/users/register.ts

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../utils/firebaseConfig'; // Asegúrate de exportar `firestore` desde `firebaseConfig`
import { doc, setDoc } from 'firebase/firestore';

export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guarda el usuario en Firestore
    const userDocRef = doc(firestore, 'users', user.uid);
    await setDoc(userDocRef, {
      email: user.email,
      uid: user.uid,
      // Agrega otros campos si es necesario
    });

    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
