// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const requestPermissionAndGetToken = async () => {
    try {
        const currentToken = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' });
        if (currentToken) {
            console.log('FCM Token:', currentToken);
            // Send the token to your server and update the UI if necessary
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
