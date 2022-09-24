import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB5DXA3Ix-hHS33K_ue-vtQEM3DM9Z6kkA",
  authDomain: "tinder-2-yt-27bcb.firebaseapp.com",
  projectId: "tinder-2-yt-27bcb",
  storageBucket: "tinder-2-yt-27bcb.appspot.com",
  messagingSenderId: "1062740044906",
  appId: "1:1062740044906:web:87f25d97a9670573432e13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore()

export { auth, db, GoogleAuthProvider, signInWithCredential }

