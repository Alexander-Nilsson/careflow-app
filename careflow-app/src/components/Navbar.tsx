import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { BsBell } from 'react-icons/bs'; // Import the bell icon from react-icons

function NavigationBar() {

  const linkStyle = {
    color: 'white',
    fontSize: '22px',
    fontWeight: 'bold',
    textDecoration: 'none',
    cursor: 'pointer',
    fontFamily: 'Avenir'
  };

  const { logout } = useAuth0();

  const handleLogout = () => {
    logout();
  }

  const notify = () => {
    // Implement notification function here
    
  };

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
          <Link className="p-4" to="/start" style={linkStyle} >Hem</Link>
          <Link className="p-4" to="/forandringsarbeten" style={linkStyle} >Mina förbättringsarbeten</Link>
          <div className="flex-grow-1 p-4">
            <Link className="pt-4 pb-4" to="/arkiv" style={linkStyle} >Alla förbättringsarbeten</Link>
          </div>
          <Nav.Item>
            <Nav.Link>
              <BsBell style={{ color: 'white', fontSize: '22px', marginTop: '20px' }} onClick={notify}/>
            </Nav.Link>
          </Nav.Item>
          <a className="p-4" style={linkStyle} onClick={handleLogout}>Logga ut</a>
          {/* Notification Bell */}
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;