

import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getDatabase, onValue, ref, set } from 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyAYsTymR2yMzOFJbx2XzuTHdQqWOJerKp0",
    authDomain: "scheudle.firebaseapp.com",
    projectId: "scheudle",
    storageBucket: "scheudle.appspot.com",
    messagingSenderId: "1002432979288",
    appId: "1:1002432979288:web:f512629e7ae0275121052d",
    measurementId: "G-9YBJ6PY3HG"
  };
// Initialize Firebase



const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);



export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { (`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { (val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };