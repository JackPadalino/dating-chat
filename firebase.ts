// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAKaLl_nsGIWfaSks0VBi6v3Y99zcJ3gg",
  authDomain: "dating-chat-a1047.firebaseapp.com",
  projectId: "dating-chat-a1047",
  storageBucket: "dating-chat-a1047.appspot.com",
  messagingSenderId: "1018058573",
  appId: "1:1018058573:web:70936eb6af4ae38325c904",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
