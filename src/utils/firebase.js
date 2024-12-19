// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMYhNxlhvl0UPGpWGmyFqo28BkT455NR8",
  authDomain: "app-cogni-kids.firebaseapp.com",
  projectId: "app-cogni-kids",
  storageBucket: "app-cogni-kids.firebasestorage.app",
  messagingSenderId: "992207657150",
  appId: "1:992207657150:web:5cdeb8a5d466f103cda6ef"
};

// Initialize Firebase


// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(initFirebase);