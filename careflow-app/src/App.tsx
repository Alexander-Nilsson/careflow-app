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

  const { isAuthenticated, isLoading, logout } = useAuth0();
  const TIMEOUT = 60 * 1000; // 1 hour in milliseconds
  let timeoutId: number | undefined;;

  // updates activity by user
  const updateActivity = () => {
    if (isAuthenticated) {
      localStorage.setItem('lastActivity', Date.now().toString());

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = window.setTimeout(checkActivity, TIMEOUT);
    }
  };

  // runs after an hour of inactivity and logs the user out
  const checkActivity = () => {
    const lastActivity = localStorage.getItem('lastActivity');
    if (lastActivity) {
      const elapsed = Date.now() - parseInt(lastActivity);
      if (elapsed > TIMEOUT) {
        logout();
      }
    }
  };

  // listen for user activity
  window.addEventListener('click', updateActivity);
  window.addEventListener('keypress', updateActivity);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (isAuthenticated) updateActivity();
  }, [isLoading, isAuthenticated]);

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
