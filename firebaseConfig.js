// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "@firebase/auth";
import { getDatabase } from "@firebase/database";
import { getStorage } from "@firebase/storage";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAl2od2NHWnAu84fTH9sk7MxGkxzd0aeQ4",
  authDomain: "ellp-app.firebaseapp.com",
  databaseURL:
    "https://ellp-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ellp-app",
  storageBucket: "ellp-app.firebasestorage.app",
  messagingSenderId: "491263380880",
  appId: "1:491263380880:web:2659998c11480840207715",
  measurementId: "G-Y13VT5G9N1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Export Firebase api
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const firestoreDb = getFirestore(app);
