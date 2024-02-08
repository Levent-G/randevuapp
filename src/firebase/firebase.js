// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-yaZQ9M7NjTnbeG7Aql0nM9xPRrd77CI",
  authDomain: "randevuapp-bbecc.firebaseapp.com",
  projectId: "randevuapp-bbecc",
  storageBucket: "randevuapp-bbecc.appspot.com",
  messagingSenderId: "55851006798",
  appId: "1:55851006798:web:e3576ec0f6c68890ccfc1f",
  measurementId: "G-D06MR0H1TW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
