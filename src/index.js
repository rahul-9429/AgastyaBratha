// src/index.js
import React, { useEffect } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Home from './pages/Home';
import NotinlocComponent from "./pages/NotinlocComponent";
import ChatroomC from "./pages/ChatroomC";
import Documentation from "./pages/Documentation";
import Vserver from './pages/Vserver';
import UserRoom from "./pages/UserRoom.js";
import Termsc from "./pages/Termsc.js";
import Rahul from "./pages/Founder.js";
import { requestPermissionAndGetToken, onMessageListener } from './firebase';

function App(){
  useEffect(() => {
    // Request permission and get token
    requestPermissionAndGetToken();

    // Handle incoming messages
    onMessageListener().then(payload => {
      console.log('Message received. ', payload);
      // Customize notification here
      alert('Message received: ' + payload.notification.body);
    }).catch(err => console.log('Failed: ', err));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notinloc" element={<NotinlocComponent />} />
        <Route path="/chat" element={<ChatroomC />} />
        <Route path="/blogs" element={<Documentation />} />
        <Route path="/vserver" element={<Vserver />} />
        <Route path="/room/:roomName" element={<UserRoom />} />
        <Route path="/term&conditions" element={<Termsc />} />
        <Route path="/Team" element={<Rahul />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registration successful with scope: ', registration.scope);
    })
    .catch((err) => {
      console.log('Service Worker registration failed: ', err);
    });
}
