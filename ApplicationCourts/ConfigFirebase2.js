// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTWHZgy8_08up98-7xNkCjJfLNboshC5Y",
  authDomain: "loginfirebase-222bd.firebaseapp.com",
  projectId: "loginfirebase-222bd",
  storageBucket: "loginfirebase-222bd.appspot.com",
  messagingSenderId: "505324618370",
  appId: "1:505324618370:web:3979cb7c5c0fe8c27daa9b",
  measurementId: "G-W5M3GTWD40"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)