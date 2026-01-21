// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCteJhU_NM2QiejbgG00l15eS6jgOEvpsw",
  authDomain: "blackwell-demo-eb36b.firebaseapp.com",
  projectId: "blackwell-demo-eb36b",
  storageBucket: "blackwell-demo-eb36b.firebasestorage.app",
  messagingSenderId: "259512695446",
  appId: "1:259512695446:web:8bee0798b0c8d97ce320b7",
  measurementId: "G-581HMMZM62",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
