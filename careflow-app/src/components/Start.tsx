import { useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import CreateNewProject from "./CreateNewProject";
import ProfileSection from "./ProfileSection";
import ProjectsSection from "./ProjectsSection";
import IdeasAndProgressSection from "./IdeasAndProgressSection";
import FinishedProjectsSection from "./FinishedProjectsSection";
import { useAuth0 } from '@auth0/auth0-react';

function Start() {
  const startStyle = {
    backgroundColor: "white",

  };
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  // const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (isLoading) {
      // maybe trigger a loading screen
      return;
    }

    if (user) {
      console.log(user)
    }
    // if (!user) navigate("/login");
  }, [user, isLoading]);

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
