import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { BsBell } from "react-icons/bs";
import React, { useState } from "react";
import Notification from "./Notification";

function NavigationBar() {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const linkStyle = {
    color: "white",
    fontSize: "17px",
    fontWeight: "bold",
    textDecoration: "none",
    cursor: "pointer",
    fontFamily: "Avenir",
    marginBottom: "10px",
  };

  const linkStyleLogOut = {
    color: "white",
    fontSize: "17px",
    fontWeight: "bold",
    textDecoration: "none",
    cursor: "pointer",
    fontFamily: "Avenir",
    marginBottom: "10px",
    marginLeft: "0px",
    marginRight: "20px",
  };

  const { logout } = useAuth0();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      className="d-flex"
      style={{
        backgroundColor: "#0a206a",
        paddingLeft: "23px",
        height: "75px",
        paddingTop: "20px",
      }}
    >
      <Link to="/start">
        <img
          alt=""
          src="CareFlow_Vit.png"
          width="140"
          height="30"
          className=""
        />
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="d-flex">
        <Nav className="d-flex flex-grow-1">
          <Link className="p-4" to="/start" style={linkStyle}>
            Hem
          </Link>
          <Link className="p-4" to="/forandringsarbeten" style={linkStyle}>
            Mina förbättringsarbeten
          </Link>
          <div className="flex-grow-1 p-4">
            <Link className="pt-4 pb-4" to="/arkiv" style={linkStyle}>
              Alla förbättringsarbeten
            </Link>
          </div>

          <Nav.Link>
            <BsBell
              style={{ color: "white", fontSize: "22px", marginTop: "20px" }}
              onClick={toggleNotifications}
            />
          </Nav.Link>
          {showNotifications && <Notification />}

          <a className="p-4" style={linkStyleLogOut} onClick={handleLogout}>
            Logga ut
          </a>
          {/* Notification Bell */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
