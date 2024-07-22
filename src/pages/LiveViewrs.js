import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0LvKUgugXh3BwqjVrREcwlGgEplSemRU",
    authDomain: "es-project-7d0c1.firebaseapp.com",
    databaseURL: "https://es-project-7d0c1-default-rtdb.firebaseio.com",
    projectId: "es-project-7d0c1",
    storageBucket: "es-project-7d0c1.appspot.com",
    messagingSenderId: "790953467909",
    appId: "1:790953467909:web:3585a505f6f442e455fc6c",
    measurementId: "G-WQEDPJVKC9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const LiveViewers = () => {
  const [viewerCount, setViewerCount] = useState(0);

  useEffect(() => {
    const viewersRef = ref(database, 'viewers');

    // incrementing viewer count 
    fetch('/api/viewers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action: 'increment' })
    });

    onValue(viewersRef, (snapshot) => {
      setViewerCount(snapshot.val() || 0);
    });

    // decrementing viewer count
    return () => {
      fetch('/api/viewers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'decrement' })
      });
    };
  }, []);

  return (
     
        <span id="viewerCount">{viewerCount}</span> 
     
  );
};

export default LiveViewers;
