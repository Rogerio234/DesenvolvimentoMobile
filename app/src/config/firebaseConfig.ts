import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCh7fU86ehwlkO3-veGtLGuICQnOlk9pqU",
  authDomain: "pratica02-rogeriojose.firebaseapp.com",
  projectId: "pratica02-rogeriojose",
  storageBucket: "pratica02-rogeriojose.firebasestorage.app",
  messagingSenderId: "117069832557",
  appId: "1:117069832557:android:e7b6c98fd7ff1713d23a64",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
