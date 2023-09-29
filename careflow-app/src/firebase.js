import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD_VmL7OhFcnqzzsmyowA4v0aMHf2MVXDs",
    authDomain: "careflow-60a15.firebaseapp.com",
    projectId: "careflow-60a15",
    storageBucket: "careflow-60a15.appspot.com",
    messagingSenderId: "100218090999",
    appId: "1:100218090999:web:fef937f15602aa48a0aaf2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {auth, db}