// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwUzwY1_W9qSo6EWf9Wr8aukcXSZPa19w",
  authDomain: "careflow-27efd.firebaseapp.com",
  projectId: "careflow-27efd",
  storageBucket: "careflow-27efd.appspot.com",
  messagingSenderId: "67858921910",
  appId: "1:67858921910:web:269d07fa6883a96a876917",
  measurementId: "G-V2X2T7P7EX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);

