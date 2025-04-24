// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUrQh2yzuwz3rlEOGi-3wgHNGbjKE6hSY",
  authDomain: "proyectotitulacion-17fd9.firebaseapp.com",
  projectId: "proyectotitulacion-17fd9",
  storageBucket: "proyectotitulacion-17fd9.firebasestorage.app",
  messagingSenderId: "929479900703",
  appId: "1:929479900703:web:b36b4135461bc94c6c9f2a",
  measurementId: "G-JQEG29CRJH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
// Initialize Cloud Firestore and get a reference to the service
// Initialize Firebase Authentication and get a reference to the service
export default auth; // Export the auth object for use in your components
export { firestore }; // Export Firestore for use in your components
