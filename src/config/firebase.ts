// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { collection, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC2MKryEjrDIV9T7xlqRT4ErbCu8XP93ZE",
  authDomain: "parish-pastoral.firebaseapp.com",
  projectId: "parish-pastoral",
  storageBucket: "parish-pastoral.appspot.com",
  messagingSenderId: "374868267409",
  appId: "1:374868267409:web:5d4202dc6eb8028cfc0a30",
  measurementId: "G-EQ52NBNPFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const parishCollectionRef = collection(db, "parish");