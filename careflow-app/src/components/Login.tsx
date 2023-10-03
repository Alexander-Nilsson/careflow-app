import LoginModal from "./LoginModal";
import { auth } from '../firebase'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {

  const navigate = useNavigate()
  const [user, loading] = useAuthState(auth);

  useEffect(() => { //useEffect is a function which runs when the component is mounted
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/start");
  });

  return (
    <>
      {loading ? (
        <p>Loading...</p> // Show a loading indicator
      ) : (
        <LoginModal />
      )}
    </>
  );
}

export default Login;
