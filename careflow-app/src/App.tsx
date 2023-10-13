import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Start from './components/Start';
import Login from './components/Login'
import Projects from './components/Projects';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function App() {

  const { isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isLoading) {
      return;
    }
  }, [isAuthenticated, isLoading]);

  return (
    <>
      {isAuthenticated && <NavigationBar />}
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
