import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 
 
    apiKey: "AIzaSyDA8Usn1chvmNJoRAiXkQ6at3ibZJyf6fU",
   
   
    authDomain: "careflow-testing.firebaseapp.com",
   
   
    projectId: "careflow-testing",
   
   
    storageBucket: "careflow-testing.appspot.com",
   
   
    messagingSenderId: "257256774434",
   
   
    appId: "1:257256774434:web:7ff66aede9fbc80b2ba37b",
   
   
    measurementId: "G-XQMF8822JE"
   
   
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db }