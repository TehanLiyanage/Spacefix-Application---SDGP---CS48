import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAgNQk250elb8rLxxiCDrz7CiTKNz0P74s",
    authDomain: "spacefix-app.firebaseapp.com",
    projectId: "spacefix-app",
    storageBucket: "spacefix-app.firebasestorage.app",
    messagingSenderId: "282490331387",
    appId: "1:282490331387:web:4f306f6fc540122479505e",
    measurementId: "G-RBBZZBN6D5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
