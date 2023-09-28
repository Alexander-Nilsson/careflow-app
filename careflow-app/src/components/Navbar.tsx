import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, useMatch, useResolvedPath } from 'react-router-dom'; //Replaces anchor link a.k.a <a>. href needs to be changed to "to"

function NavigationBar() {
  const linkStyle = {
    color: 'white', // Change to your desired text color
    fontSize: '24px', // Change to your desired font size
    padding: '1em',
    fontWeight: 'bold'
  };

  return (
    <>
      <Navbar fixed="top" className="bg-body-tertiary justify-content-between">
        <CustomLink to="/">
          <img
            alt=""
            src="CareFlow_Vit.png"
            width="220"
            height="80"
            margin-left="300px"
            className="d-inline-block align-top"
          />
        </CustomLink>
        <Nav>
        <CustomLink to="/projekt" className="ml-auto" style={linkStyle}>Projekt</CustomLink>
        <CustomLink to="/arkiv" className="ml-auto" style={linkStyle}>Arkiv</CustomLink>
        <CustomLink to="/profil" className="ml-auto" style={linkStyle}>Profil</CustomLink>
          <CustomLink to="/loggain" className="ml-auto" style={linkStyle}>Logga in</CustomLink>



        </Nav>
      </Navbar>
    </>
  );
}
interface CustomLinkProps {
    to: string;
    children: React.ReactNode;
    [key: string]: any; // Allows for additional props
  }
  
  function CustomLink({ to, children, ...props }: CustomLinkProps) {
    const resolvedPath =  useResolvedPath(to)
    const isActive = useMatch({path:resolvedPath.pathname, end:true})

  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    );
  }
  



export default NavigationBar;
