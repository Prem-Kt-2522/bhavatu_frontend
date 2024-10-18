// src/firebase.js
import { getAnalytics } from "firebase/analytics";


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_mZ2HpOYUQxWMicmvSNup5TRlaJnzvfs",
  authDomain: "bhavatuecom.firebaseapp.com",
  projectId: "bhavatuecom",
  storageBucket: "bhavatuecom.appspot.com",
  messagingSenderId: "747578764267",
  appId: "1:747578764267:web:7940801253582080bdc7ae",
  measurementId: "G-VKQXE9YC5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app); 

export const auth = getAuth();
const db=getFirestore(app);
 export {db};
