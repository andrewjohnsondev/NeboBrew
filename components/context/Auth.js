import { createContext, useContext } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../config/firebase';

const authUserContext = createContext({});

export function AuthUserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setUser(null);
      }
      setLoadingUser(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  return <authUserContext.Provider value={{ user, signUp, logout, login, resetPassword, loadingUser }}>{children}</authUserContext.Provider>;
}

export const useAuth = () => useContext(authUserContext);
