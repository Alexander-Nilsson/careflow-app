import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Start from './components/Start';
import Login from './components/Login'
import Projects from './components/Projects';
import firebase from 'firebase/app';
import 'firebase/firestore';

function App() {
  // firebase stuff...
  const firebaseConfig = {
    apiKey: "AIzaSyD_VmL7OhFcnqzzsmyowA4v0aMHf2MVXDs",
    authDomain: "careflow-60a15.firebaseapp.com",
    projectId: "careflow-60a15",
    storageBucket: "careflow-60a15.appspot.com",
    messagingSenderId: "100218090999",
    appId: "1:100218090999:web:fef937f15602aa48a0aaf2"
  };
  firebase.initializeApp(firebaseConfig);

  // the app...
  return (
    <>
      <NavigationBar />
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/start" element={<Start />} />
          <Route path="/forandringsarbeten" element={<Projects />} />
        </Routes>
      </div>
    </>

  );
}

export default App;
