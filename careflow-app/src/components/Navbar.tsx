import React, { useState } from 'react';
import { NavLink , Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useAuth0 } from '@auth0/auth0-react';
import { BsBell } from 'react-icons/bs';
import Notification from './Notification';

function NavigationBar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const { logout } = useAuth0();

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleLogout = () => {
    logout();
  };

  const linkStyle = {
    color: 'white',
    fontSize: '22px',
    fontWeight: 'bold',
    textDecoration: 'none',
    cursor: 'pointer',
    fontFamily: 'Avenir',
  };

  return (
    <>
      <style>
        {`
          .active-link {
            border-bottom: 2px solid white; /* Adjust as needed */
          }
        `}
      </style>
      <Navbar expand="lg" variant="dark" style={{ backgroundColor: '#0a206a' }}>
        <Link to="/start">
          <img
            alt=""
            src="CareFlow_Vit.png"
            width="220"
            height="80"
          />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className='d-flex'>
          <Nav className="d-flex flex-grow-1">
            <NavLink to="/start" style={linkStyle} className={({ isActive }) => isActive ? 'active-link p-4' : 'p-4'}>
              Hem
            </NavLink>
            <NavLink to="/forandringsarbeten" style={linkStyle} className={({ isActive }) => isActive ? 'active-link p-4' : 'p-4'}>
              Mina förbättringsarbeten
            </NavLink>
            <NavLink to="/arkiv" style={linkStyle} className={({ isActive }) => isActive ? 'active-link p-4' : 'p-4'}>
              Alla förbättringsarbeten
            </NavLink>
            <Nav.Link onClick={toggleNotifications}>
              <BsBell style={{ color: 'white', fontSize: '22px', marginTop: '20px' }}/>
              {showNotifications && <Notification/>}
            </Nav.Link>
            <a style={linkStyle} onClick={handleLogout} className="p-4">
              Logga ut
            </a>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavigationBar;
