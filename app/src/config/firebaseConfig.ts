import { initializeApp } from "firebase";
import { getAuth } from 'firebase/auth';
import { getFireStore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC4REQjBNbV9xh6uLBPr2CkJE8uWyFwZVo",
  authDomain: "app-teste-1582c.firebaseapp.com",
  projectId: "app-teste-1582c",
  storageBucket: "app-teste-1582c.firebasestorage.app",
  messagingSenderId: "479267661029",
  appId: "1:479267661029:web:64942595c195c81520a00c",
  measurementId: "G-WYE0R0L1EX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)