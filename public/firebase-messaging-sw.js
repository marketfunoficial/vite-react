importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBj-LTP-pn5MFTbBzSHvDFHskytj_PJHVc",
  authDomain: "marketfun-app.firebaseapp.com",
  projectId: "marketfun-app",
  storageBucket: "marketfun-app.firebasestorage.app",
  messagingSenderId: "449898773996",
  appId: "1:449898773996:web:6e8cada94bf937261f94c9",
  measurementId: "G-CQP158H76T"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('📬 Mensagem recebida em background:', payload);
  
  const notificationTitle = payload.notification?.title || 'Nova notificação';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    tag: payload.data?.tag || 'default',
    data: payload.data
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Notificação clicada:', event);
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        let client = clientList[0];
        for (let i = 0; i < clientList.length; i++) {
          if (clientList[i].focused) {
            client = clientList[i];
          }
        }
        return client.focus();
      }
      return clients.openWindow('/');
    })
  );
});