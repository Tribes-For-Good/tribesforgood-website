import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWwjNeVezIoP0PAaz2dmChfifBDShfLgo",
  authDomain: "tribesforgood-b0489.firebaseapp.com",
  projectId: "tribesforgood-b0489",
  storageBucket: "tribesforgood-b0489.firebasestorage.app",
  messagingSenderId: "977446780951",
  appId: "1:977446780951:web:9bc5f21e4af25867a71c52",
  measurementId: "G-HP8Z67219Z"
};

const app = initializeApp(firebaseConfig, "tribes");
export const dbTribes = getFirestore(app);
