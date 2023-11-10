import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const contentStyle = {
    marginTop: '20px',
    width: "90%",
    height: "60%",
    marginLeft: '5%', // 5% margin on the left
    marginRight: '5%' // 5% margin on the right
  }

  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();
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
      // console.log("Document data:", docSnap.data());
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
      navigate("/login");
    } else {
      if (user?.name) {
        getUser(user.name);
      }
    };

  }, [isAuthenticated, user]);

  return (
    
    <div>
      <img
        className="background-gradient"
        alt=""
        src="./background-gradient.jpeg"
      />
      {isAuthenticated && userInfo ? (
        <div style={contentStyle}>
          <ProfileSection/>
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
    </div>
  );
}

export default Start;
