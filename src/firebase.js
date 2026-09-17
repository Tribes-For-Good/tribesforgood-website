
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPJLGPs7idIgRvjKtMAGFl-jykZC1V2vM",
  authDomain: "contact-us-form-be23f.firebaseapp.com",
  projectId: "contact-us-form-be23f",
  storageBucket: "contact-us-form-be23f.appspot.com",
  messagingSenderId: "375479399959",
  appId: "1:375479399959:web:4c5ef02a5cf2646dfa4e52",
  measurementId: "G-7BXW3ZPTSR"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
