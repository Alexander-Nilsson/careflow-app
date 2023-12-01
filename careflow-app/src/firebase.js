import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyADTE4HdNKZkQAjQ90ki94lXstv_JdVQqg",
    authDomain: "careflow-2.firebaseapp.com",
    projectId: "careflow-2",
    storageBucket: "careflow-2.appspot.com",
    messagingSenderId: "230984333882",
    appId: "1:230984333882:web:c07ee89e6a649a45ec5303",
    measurementId: "G-5Q7SQNQLYE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const fileStorage = getStorage(app);


export { db, fileStorage }