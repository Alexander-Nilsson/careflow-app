import { useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import CreateNewProject from "./CreateNewProject";
import ProfileSection from "./ProfileSection";
import ProjectsSection from "./ProjectsSection";

function Start() {
  const startStyle = {
    backgroundColor: "white",
};
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    // if (!user) navigate("/login");
  }, [user, loading]);

  return (
    <>
      {loading ? (
        <p>Loading...</p> // Show a loading indicator
      ) : (
        <div style={startStyle}>
          <h1>Start</h1>
          <ProfileSection />
          <CreateNewProject />
          <ProjectsSection />
        </div>
      )}
    </>
  );
}

export default Start;
