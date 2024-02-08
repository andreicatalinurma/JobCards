// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-project-e9619.firebaseapp.com",
  projectId: "mern-auth-project-e9619",
  storageBucket: "mern-auth-project-e9619.appspot.com",
  messagingSenderId: "305154785499",
  appId: "1:305154785499:web:bee11671376002f73fccfe"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);