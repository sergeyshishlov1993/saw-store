import { getApps, initializeApp, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA9n3gXB8aFAPalpJhSvn4HolQfGfY0JRo",
  authDomain: "myproject-b32a0.firebaseapp.com",
  projectId: "myproject-b32a0",
  storageBucket: "myproject-b32a0.appspot.com",
  messagingSenderId: "27559148001",
  appId: "1:27559148001:web:fa49a872fc26232c643aa0",
  measurementId: "G-CCHYZTV19C",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
