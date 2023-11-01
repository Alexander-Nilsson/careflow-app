import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateNewProject from "./CreateNewProject";
import { useAuth0 } from '@auth0/auth0-react';

import ProfileSection from "./ProfileSection";
import ProjectsSection from "./ProjectsSection";
import IdeasAndProgressSection from "./IdeasAndProgressSection";
import FinishedProjectsSection from "./FinishedProjectsSection";

function Start() {
  const startStyle = {
    backgroundColor: "white",

};
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth0();


  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isAuthenticated) {
      navigate("/login")
    } else {
      console.log(user?.name) // do something, for example fetch the user data from firebase based on the user's nickname
    };

  }, [isAuthenticated, isLoading]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p> // Show a loading indicator
      ) : (
        <div style={startStyle}>
          <ProfileSection />
          {/* <CreateNewProject /> */}
          <ProjectsSection />
          <IdeasAndProgressSection />
          <FinishedProjectsSection />
        </div>
      )}
    </>
  );
}

export default Start;
