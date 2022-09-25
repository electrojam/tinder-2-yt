import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithCredential, signOut, onAuthStateChanged } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

import AsyncStorage from '@react-native-async-storage/async-storage'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';

const firebaseConfig = {
  apiKey: "AIzaSyC73yye5vyOKuX6l_PbsUlPmaGSlmWUdKM",
  authDomain: "tinder-2-yt-99165.firebaseapp.com",
  projectId: "tinder-2-yt-99165",
  storageBucket: "tinder-2-yt-99165.appspot.com",
  messagingSenderId: "726112814589",
  appId: "1:726112814589:web:55d6903c54a3ede984c594"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth();
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore()

export { auth, db, GoogleAuthProvider, signInWithCredential, signOut, onAuthStateChanged }

