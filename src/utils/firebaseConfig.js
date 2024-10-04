//firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCHNDj-JldHwR-N3QDXmMLLECspst8Cpo0",
  authDomain: "nlw-orders.firebaseapp.com",
  projectId: "nlw-orders",
  storageBucket: "nlw-orders.appspot.com",
  messagingSenderId: "530236145816",
  appId: "1:530236145816:web:c737cf288951bfde2710ed",
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Inicialize o Firestore
const db = getFirestore(app);

export { db };
