import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { signedIn, signOutUser } from '../firebase';


function NavigationBar() {

  const navigate = useNavigate();

  const linkStyle = {
    color: 'white',
    fontSize: '24px', // Change to your desired font size
    padding: '1em',
    fontWeight: 'bold',
    textDecoration: 'none',
  };

  async function handleLogout(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    await signOutUser()
    navigate("/login")
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
          <a href="/" style={linkStyle} onClick={handleLogout}>Logga ut</a>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default NavigationBar;
