// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// require('dotenv').config();

// const apiKey = process.env.API_KEY; 
console.log("API Key:", process.env.REACT_APP_FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY_API_KEY,
  authDomain: "es-project-7d0c1.firebaseapp.com",
  databaseURL: "https://es-project-7d0c1-default-rtdb.firebaseio.com",
  projectId: "es-project-7d0c1",
  storageBucket: "es-project-7d0c1.appspot.com",
  messagingSenderId: "790953467909",
  appId: "1:790953467909:web:3585a505f6f442e455fc6c",
  measurementId: "G-WQEDPJVKC9",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const requestPermissionAndGetToken = async () => {
    try {
        const currentToken = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' });
        if (currentToken) {
            console.log('FCM Token:', currentToken);
        } else {
            console.log('No registration token available. Request permission to generate one.');
        }
    } catch (err) {
        console.log('An error occurred while retrieving token. ', err);
    }
};

const onMessageListener = () => 
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });

export { requestPermissionAndGetToken, onMessageListener };
