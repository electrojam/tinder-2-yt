import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, auth, signInWithCredential, signOut, onAuthStateChanged } from "../firebase";
import { getAuth } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';

const AuthContext = createContext({})

WebBrowser.maybeCompleteAuthSession();

const config = {
    iosClientId: '726112814589-a5beg1j05d3cau03sssdv880revjmqk5.apps.googleusercontent.com',
    androidClientId: '726112814589-1g36gg9dp9586ru3ocvth6emm5lm2poc.apps.googleusercontent.com',
    expoClientId: '726112814589-gf9h04ol7tipcoigjracmt5bi6kih16d.apps.googleusercontent.com',
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
  }

export const AuthProvider = ({ children }) => {

const [request, response, promptAsync] = Google.useAuthRequest(config);
const [error, setError] = useState();
const [user, setUser] = useState();
const [loadingInitial, setLoadingInitial] = useState(true);
const [loading, setLoading] = useState(false);

useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }

    setLoadingInitial(false);
  });
}, []);

useEffect(() => {
  if (response?.type === "success") {
    const { idToken, accessToken } = response?.authentication;
    const credential = GoogleAuthProvider.credential(idToken, accessToken);
    signInWithCredential(auth, credential);
  } else {
    setError(response?.error);
  }

  setLoading(false);
}, [response]);

const logout = () => {
  setLoading(true);
  signOut(auth)
    .catch((error) => setError(error))
    .finally(() => setLoading(false));
};

const memoedValue = useMemo(
  () => ({
    user,
    loading,
    error,
    logout,
    signInWithGoogle: () => {
      setLoading(true);
      promptAsync({ showInRevents: true });
    },
  }),
  [user, loading, error]
);

return (
  <AuthContext.Provider value={memoedValue}>
    {!loadingInitial && children}
  </AuthContext.Provider>
);
};

export default function useAuth() {
  return useContext(AuthContext)
}