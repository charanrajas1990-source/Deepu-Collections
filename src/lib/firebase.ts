import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyANG0jhgKC9DX5YTZ3fu6bDHOkFadyTyn8",
  authDomain: "deepu-collections.firebaseapp.com",
  projectId: "deepu-collections",
  storageBucket: "deepu-collections.firebasestorage.app",
  messagingSenderId: "893628997673",
  appId: "1:893628997673:web:1e8ccf947547f069f43c38"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
