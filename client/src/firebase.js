// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

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

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(app);

// Get a reference to the firestore service, which is used to create references in your firestore bucket
export const txtDB = getFirestore(app);