

import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useDatabaseValue } from "@react-query-firebase/database";
import { getDatabase, onValue, ref, set } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyDPiIqWs7A1gs4ituLrwcK_BgrjqvKOEKc",
  authDomain: "courses-app-9f186.firebaseapp.com",
  databaseURL: "https://courses-app-9f186-default-rtdb.firebaseio.com",
  projectId: "courses-app-9f186",
  storageBucket: "courses-app-9f186.appspot.com",
  messagingSenderId: "490447294185",
  appId: "1:490447294185:web:1b443a7fe6ca13a0242a78",
  measurementId: "G-9YEWWD2NL7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);






export const useData = (path, transform) => {
    const { data, isLoading, error } = useDatabaseValue([path], ref(database, path), { subscribe: true });
    const value = (!isLoading && !error && transform) ? transform(data) : data;
  
    return [ value, isLoading, error ];
  
 
};