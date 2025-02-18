import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtsbDZT9L2610-5GrD3kesLaWrbdDX-D8",
  authDomain: "dzeno-s-store.firebaseapp.com",
  projectId: "dzeno-s-store",
  storageBucket: "dzeno-s-store.firebasestorage.app",
  messagingSenderId: "362454007219",
  appId: "1:362454007219:web:4cf4e6635b5fe4d2289fc6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
