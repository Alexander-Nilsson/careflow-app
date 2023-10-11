import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { signedIn, signOutUser } from '../firebase';
import { useAuth0 } from '@auth0/auth0-react';
// import clientID from '../auth0';


function NavigationBar() {

  const navigate = useNavigate();

  const linkStyle = {
    color: 'white',
    fontSize: '24px', // Change to your desired font size
    padding: '1em',
    fontWeight: 'bold',
    textDecoration: 'none',
  };

  const { logout, isAuthenticated} = useAuth0();

  // logout({
  //   "federated": true,
  // });

  async function handleLogout(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    // window.location.href = `https://dev-ni7jkmfx0oybqzdf.us.auth0.com/v2/logout?client_id=mkmVvsZQwku14qYIH34tA4kPKdTzejse&returnTo=${encodeURIComponent(window.location.origin)}`
    // await signOutUser()
    // navigate("/login")
  }

  return (
    <Navbar expand="lg" variant="dark" className="d-flex" style={{ backgroundColor: '#0a206a' }} >
      <Link to="/start">
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
          <Link to="/start" style={linkStyle} >Start</Link>
          <Link to="/forandringsarbeten" style={linkStyle} >Förändringar</Link>
          <Link to="/arkiv" style={linkStyle} >Arkiv</Link>
          <Link to="/guide" className="flex-grow-1" style={linkStyle} >Guide</Link>
          <a href="/" style={linkStyle} onClick={() => logout()}>Logga ut</a>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default NavigationBar;
