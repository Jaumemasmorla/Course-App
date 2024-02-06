import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "....",
  messagingSenderId: "...",
  appId: "..."
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);