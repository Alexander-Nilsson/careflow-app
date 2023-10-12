import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateNewProject from "./CreateNewProject";
import { useAuth0 } from '@auth0/auth0-react';


function Start() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth0();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isAuthenticated) {
      navigate("/login")
    } else {
      console.log(user) // do something, for example fetch the user data from firebase based on the user's nickname
    };

  }, [isAuthenticated, isLoading]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p> // Show a loading indicator
      ) : (
        <div>
          <h1>Start</h1>
          <CreateNewProject />
        </div>
      )}
    </>
  );
}

export default Start;
