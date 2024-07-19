importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js');

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

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
