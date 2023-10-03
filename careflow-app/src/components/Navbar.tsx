import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom'; //Replaces anchor link a.k.a <a>. href needs to be changed to "to"
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signedIn, signOutUser } from '../firebase';
import { useEffect } from 'react';


function NavigationBar() {

  const [user, loading] = useAuthState(auth);
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
    if (signedIn()) {
      await signOutUser()
      navigate("/login")
    }
  }

  function handleLinkClick(event: React.MouseEvent<HTMLAnchorElement>, path: string) {
    if (!user) {
      event.preventDefault();
    } else {
      navigate(path);
    }
  }

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) navigate("/login");
  }, [user, loading]);

  return (
    <Navbar expand="lg" variant="dark" className="d-flex" style={{ backgroundColor: '#0a206a' }} >
      <Link to="/start" onClick={(e) => handleLinkClick(e, "/start")}>
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
          <Link to="/start" style={linkStyle} onClick={(e) => handleLinkClick(e, "/start")}>Start</Link>
          <Link to="/forandringsarbeten" style={linkStyle} onClick={(e) => handleLinkClick(e, "/start")}>Förändringar</Link>
          <Link to="/arkiv" style={linkStyle} onClick={(e) => handleLinkClick(e, "/start")}>Arkiv</Link>
          <Link to="/guide" className="flex-grow-1" style={linkStyle} onClick={(e) => handleLinkClick(e, "/start")}>Guide</Link>
          <a href="/" style={linkStyle} onClick={handleLogout}>Logga ut</a>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default NavigationBar;
