import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Start from './components/Start';
import Login from './components/Login'
import Projects from './components/Projects';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function App() {

  const { isAuthenticated, isLoading, logout } = useAuth0();
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const id = setTimeout(() => {
    console.log('Timer expired!');
    // Do something after timer expires, like logging the user out
    // logout();
  }, 10 * 1000);  // 60 seconds

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (isAuthenticated) {
      // If there's an existing timer, clear it
      if (timerId) clearTimeout(timerId);
      
      // Set a new timer (e.g., for 1 minute)
      const id = setTimeout(() => {
        console.log('Timer expired!');
        // Do something after timer expires, like logging the user out
        // logout();
      }, 60 * 1000);  // 60 seconds

      // setTimerId(id);
    } else {
      // If user is not authenticated, clear any existing timer
      if (timerId) {
        clearTimeout(timerId);
        // setTimerId(null);  // Reset the timerId state
      }
    }

    // Cleanup effect if component gets unmounted
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [isAuthenticated, isLoading, timerId, setTimerId]);

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
