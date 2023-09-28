// import Navbar from 'react-bootstrap/Navbar';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom'; //Replaces anchor link a.k.a <a>. href needs to be changed to "to"
import React, { useState } from 'react';

function NavigationBar() {

  const linkStyle = {
    color: 'white',
    fontSize: '24px', // Change to your desired font size
    padding: '1em',
    fontWeight: 'bold',
    textDecoration: 'none',
  };

  return (
    <Navbar expand="lg" variant="dark" style={{ backgroundColor: '#0a206a' }} >
      <Link to="/">
        <img
          alt=""
          src="CareFlow_Vit.png"
          width="220"
          height="80"
          margin-left="300px"
          className="d-inline-block align-top"
        />
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="">
          <Link to="/start" className="" style={linkStyle}>Start</Link>
          <Link to="/forandringsarbeten" className="" style={linkStyle}>Förändringar</Link>
          <Link to="/arkiv" className="" style={linkStyle}>Arkiv</Link>
          <Link to="/guide" className="" style={linkStyle}>Guide</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default NavigationBar;
