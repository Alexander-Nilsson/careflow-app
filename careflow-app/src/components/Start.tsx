import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateNewProject from "./CreateNewProject";
import { useAuth0 } from '@auth0/auth0-react';
import { collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import ProfileSection from "./ProfileSection";
import ProjectsSection from "./ProjectsSection";
import IdeasAndProgressSection from "./IdeasAndProgressSection";
import FinishedProjectsSection from "./FinishedProjectsSection";
import {db} from '../firebase'

function Start() {
  const startStyle = {
    backgroundColor: "white",

  };
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth0();

  //fetches the user data from database, based on the hsa-ID
  async function getUser(username:string){
    const docRef = doc(db, "users", username);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
  }

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isAuthenticated) {
      navigate("/login")
    } else {
      if (user?.name) {
        getUser(user.name)
      }
    };

  }, [isAuthenticated, isLoading, user]);

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
