
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth }   from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7ITYPC86qWuarzTpz2d9URkUgh8Lds8E",
  authDomain: "bachelor-nettportal.firebaseapp.com",
  projectId: "bachelor-nettportal",
  storageBucket: "bachelor-nettportal.appspot.com",
  messagingSenderId: "1001002692651",
  appId: "1:1001002692651:web:17a87c428bfa68b6d4ba6e",
  measurementId: "G-1MKL1H39K8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authorize = getAuth(app);
export const db = getFirestore(app)
