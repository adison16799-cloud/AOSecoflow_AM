import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMw0L7PFE6_A33F2xmr5gOZKp3CrwqM7A",
  authDomain: "aosecoflow.firebaseapp.com",
  projectId: "aosecoflow",
  storageBucket: "aosecoflow.firebasestorage.app",
  messagingSenderId: "88756467348",
  appId: "1:88756467348:web:58f661f06ef297cc77a681",
  measurementId: "G-FZCJG4M2W9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
