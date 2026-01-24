// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBMIstAPBJrOboM6_Gqp9wgFUQiGBG4CYg",
  authDomain: "ram-mandir-9e7af.firebaseapp.com",
  projectId: "ram-mandir-9e7af",
  storageBucket: "ram-mandir-9e7af.firebasestorage.app",
  messagingSenderId: "1021251256891",
  appId: "1:1021251256891:web:2e5c290cfe05562d64921e",
  measurementId: "G-P120QWZM2C",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app); // ✅ Initialize storage

// Export everything you need
export { auth, googleProvider, analytics, storage };
