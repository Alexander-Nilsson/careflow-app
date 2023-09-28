import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
     <Navbar/>
       <div>
     <Routes>        
       {/* <Route path="/"  element={<Profile/>} /> */}
       {/* <Route path="/favourites"  element={<Projects />}/> */}
       {/* <Route path="/cart"  element={<Archive/>}/> */}
     </Routes>
     </div>
     </>
    
   );
}

export default App;
