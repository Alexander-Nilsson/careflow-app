import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function NavigationBar() {
  const { isAuthenticated, logout } = useAuth0();

  const linkStyle = {
    color: 'white',
    fontSize: '24px',
    padding: '1em',
    fontWeight: 'bold',
    textDecoration: 'none',
  };

  const handleLogout = () => {
    if (isAuthenticated) {
      logout(); // Just initiate the logout process, no need for 'returnTo'
    }
  };

  return (
    <Navbar expand="lg" variant="dark" className="d-flex" style={{ backgroundColor: '#0a206a' }}>
      <Link to="/">
        <img
          alt=""
          src="CareFlow_Vit.png"
          width="220"
          height="80"
          className=""
        />
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className='d-flex'>
        <Nav className="d-flex flex-grow-1">
          <Link to="/" style={linkStyle} >Home</Link>
          <Link to="/profile" style={linkStyle} >Profile</Link>
          {isAuthenticated && (
            <button onClick={handleLogout} style={linkStyle}>Log Out</button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;