import { getApps, initializeApp, getApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyA9n3gXB8aFAPalpJhSvn4HolQfGfY0JRo",
//   authDomain: "myproject-b32a0.firebaseapp.com",
//   projectId: "myproject-b32a0",
//   storageBucket: "myproject-b32a0.appspot.com",
//   messagingSenderId: "27559148001",
//   appId: "1:27559148001:web:fa49a872fc26232c643aa0",
//   measurementId: "G-CCHYZTV19C",
// };

const {
  VITE_API_KEY_FIREBASE,
  VITE_AUTH_DOMAiIN,
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_MESSAGING_SENDER_ID,
  VITE_APP_ID,
  VITE_MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
  apiKey: VITE_API_KEY_FIREBASE,
  authDomain: VITE_AUTH_DOMAiIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID,
  measurementId: VITE_MEASUREMENT_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
