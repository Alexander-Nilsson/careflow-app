import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateNewProject from "./CreateNewProject";
import { useAuth0 } from '@auth0/auth0-react';
import { doc, getDoc } from "firebase/firestore";
import ProfileSection from "./ProfileSection";
import ProjectsSection from "./ProjectsSection";
// import IdeasAndProgressSection from "./IdeasAndProgressSection";
import FinishedProjectsSection from "./FinishedProjectsSection";
import { db } from '../firebase'
import IdeasSection from "./IdeasSection";
import ProgressSection from "./ProgressSection";

export type UserInfoType = {
  hsaID: string | undefined;
  admin: any;
  centrum: any;
  clinic: any;
  email: any;
  first_name: any;
  phone_number: any;
  place: any;
  profession: any;
  sur_name: any;
};

function Start() {
  const startStyle = {
    backgroundColor: "white",

  };

  const ideasAndProgressSectionStyle = {
    display: "flex",
  };

  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null); // Initialize with the type

  //fetches the user data from database, based on the hsa-ID
  async function getUser(username: string) {
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = {
        hsaID: user?.name,
        admin: docSnap.data().admin,
        centrum: docSnap.data().centrum,
        clinic: docSnap.data().clinic,
        email: docSnap.data().email,
        first_name: docSnap.data().first_name,
        phone_number: docSnap.data().phone_number,
        place: docSnap.data().place,
        profession: docSnap.data().profession,
        sur_name: docSnap.data().sur_name
      }
      setUserInfo(userData);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  useEffect(() => {
    // if (isLoading) {
    //   return;
    // }
    if (!isAuthenticated) {
      navigate("/login")
    } else {
      if (user?.name) {
        getUser(user.name)
      }
    };

  }, [isAuthenticated, user]);

  return (
    <>
      {isAuthenticated && userInfo ? (
        <div style={startStyle}>
          <ProfileSection />
          {/* <CreateNewProject /> */}
          <ProjectsSection />
          <div className="d-flex mr-2">
          <IdeasSection userInfo={userInfo} />
          <ProgressSection />
          </div>
          <FinishedProjectsSection />
        </div>
      ) : (
        <p>Loading...</p> // Show a loading indicator
      )}
    </>
  );
}

export default Start;
