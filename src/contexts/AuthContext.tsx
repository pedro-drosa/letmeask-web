import {createContext, ReactNode, useEffect, useState} from 'react';

import {firebase, auth} from '../services/firebase';

export const AuthContext = createContext({} as AuthContextType);

type UserType = {
  id: string,
  name: string,
  avatar: string,
}

type AuthContextType = {
  user: UserType | undefined;
  signInWithgoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export function AuthcontextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<UserType>();

  useEffect(()=> {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        const {displayName, photoURL, uid} = user;

        if(!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }
      
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, []);

  async function signInWithgoogle() {

    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
      
    if(result.user) {
      const {displayName, photoURL, uid} = result.user;

      if(!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }
      
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      })
    }
  }

  return (
    <AuthContext.Provider value={{user, signInWithgoogle}}>
      {props.children}
    </AuthContext.Provider>
  )
}