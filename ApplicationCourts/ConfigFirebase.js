// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {browserLocalPersistence, getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import { initializeAuth,getReactNativePersistence } from "firebase/auth";
import { ReactNativeAsyncStorage } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTWHZgy8_08up98-7xNkCjJfLNboshC5Y",
  authDomain: "loginfirebase-222bd.firebaseapp.com",
  projectId: "loginfirebase-222bd",
  storageBucket: "loginfirebase-222bd.appspot.com",
  messagingSenderId: "505324618370",
  appId: "1:505324618370:web:2b8788e048bdc94d7daa9b"
};




// Initialize Firebase
// export const Persistence = initializeAuth(FIREBASE_APP,{persistence:browserLocalPersistence})
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const db = getFirestore(FIREBASE_APP)