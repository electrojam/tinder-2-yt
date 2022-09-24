import React, { createContext, useContext, useEffect, useState } from 'react'
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, auth, signInWithCredential } from "../firebase";
import { getAuth } from 'firebase/auth';

const AuthContext = createContext({})

WebBrowser.maybeCompleteAuthSession();

const config = {
    iosClientId: '880121436414-jqecr8nt75geo7d2oa0g1nn2dpap49t7.apps.googleusercontent.com',
    androidClientId: '880121436414-beg9odk1pq92fvr5f5qbk18rauiimjpf.apps.googleusercontent.com',
    expoClientId: '880121436414-vgk7if3aoijokehtu3iv26b159s6qvpt.apps.googleusercontent.com',
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
  }

export const AuthProvider = ({ children }) => {
  const [request, response, promptAsync] = Google.useAuthRequest(config)
  const [error, setError] = useState()

  // useEffect(() => {
  //   if (response?.type === 'success') {
  //     const { idToken, accessToken } = response?.authentication;
  //     const credential = GoogleAuthProvider.credential(idToken, accessToken);
  //     signInWithCredential(auth, credential);
  //   } else {
  //       setError(response?.error)
  //   }

  // }, [response]);

  const signInWithGoogle = async () => {
    console.log("se dio click en botón LogIn");
    promptAsync({ showInRevents: true });
  }

  return (
    <AuthContext.Provider
      value={{
        user: null,
        signInWithGoogle,
      }}
    >
      { children }
    </AuthContext.Provider>
    
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}