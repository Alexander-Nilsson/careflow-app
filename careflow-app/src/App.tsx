import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Start from './components/Start';
import Login from './components/Login'
import Projects from './components/Projects';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './firebase';
import { useEffect } from 'react';

function App() {

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      return;
    }
  }, [user, loading]);

  return (
    <>
      {/* {user && <NavigationBar />} */}
      <NavigationBar />
      <div>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/start" element={<Start />} />
          <Route path="/forandringsarbeten" element={<Projects />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
