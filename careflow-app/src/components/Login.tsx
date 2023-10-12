import LoginModal from "./LoginModal";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

function Login() {

  const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (isAuthenticated){ 
      navigate("/start")
    };
  });

  return (
    <>
      {isLoading ? (
        <p>Loading...</p> // Show a loading indicator
      ) : (
        <LoginModal />
      )}
    </>
  )
}

export default Login;
