
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth }   from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3IbydRhumJ4X2uYZZu-pPCWHKtU0l77I",
  authDomain: "bachelor-prototype2022.firebaseapp.com",
  projectId: "bachelor-prototype2022",
  storageBucket: "bachelor-prototype2022.appspot.com",
  messagingSenderId: "1020701601497",
  appId: "1:1020701601497:web:15f0eb0f78ca49527498c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authorize = getAuth(app);
export const db = getFirestore(app)
