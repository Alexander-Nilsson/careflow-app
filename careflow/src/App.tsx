import React from 'react';
import logo from './logo.svg';
import './App.css';
import './ProfileContainer.css'
import './ProgressContainer.css'
import './IdeContainer.css'
import Home from './pages/home';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes } from "react-router-dom";
import Arkiv from './pages/Arkiv';
import Startsida from './pages/Startsida';
import Projekt from './pages/Projekt';
import LoggaIn from './pages/LoggaIn';

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
  crossOrigin="anonymous"
/>
/** */

function App() {
  return (
    
    <div className="App"> 
<Navbar/>


<Routes>
  <Route path="/" element={<Startsida/>} />
  <Route path="/arkiv" element={<Arkiv/>} />
  <Route path="/projekt" element={<Projekt/>} />
  <Route path="/loggain" element={<LoggaIn/>} />
</Routes>

  
   
{/*       <header className="App-header">
      
  
    
   
      </header> */}
    
    </div>
  );
}

export default App;
