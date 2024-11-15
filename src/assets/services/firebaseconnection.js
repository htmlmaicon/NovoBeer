// firebaseconnection.js

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Configuração do Firebase para o novo projeto
const firebaseConfig = {
  apiKey: "AIzaSyDkCoNlzFAcGIVax7ElSGcqh1Yzy8f5M7Q",
  authDomain: "berrmapper.firebaseapp.com",
  projectId: "berrmapper",
  storageBucket: "berrmapper.firebasestorage.app",
  messagingSenderId: "543205407190",
  appId: "1:543205407190:web:3a1bf8a8ac812138898c77",
  measurementId: "G-KLZK4NME4V"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Exporte as funções e o objeto de autenticação
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup };
