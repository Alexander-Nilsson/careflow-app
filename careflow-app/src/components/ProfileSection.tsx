import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateNewProject from "./CreateNewProject";
import nurseImage from "../Images/genderNeutralWorker.png";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';



function ProfileSection() {

  const [name, setName] = useState<String>("Namn ej funnet");
  const [department, setDepartment] = useState<String>("Avdelning ej funnen");
  const [role, setRole] = useState<String>("Roll ej funnen");
  const { isAuthenticated, isLoading, user } = useAuth0();

  const profileSectionStyle = {
    backgroundColor: "lightblue",
    width: "500px",
    height: "250px",
    borderRadius: "10px",
    margin: "20px",
    display: "flex",
  };


  const leftDivStyle = {
    flex: "40%",
    padding: "10px",
  };

  const rightDivStyle = {
    flex: "60%",
    padding: "10px",
  };

  const circleStyle = {
    width: "150px",
    height: "150px",
    backgroundColor: "white",
    borderRadius: "50%", // Create a circular shape
    display: "flex",
    alignItems: "center", // Center vertically
    justifyContent: "center", // Center horizontally
    marginLeft: "15px",
    marginTop: "10px",
    backgroundImage: `url(${nurseImage})`, // Set the image as background
    backgroundSize: "cover",
  };

  async function getUser2(username: string) {
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //  console.log("Document data:", docSnap.data());
      setName(docSnap.data().first_name)
      setDepartment(docSnap.data().clinic)
      setRole(docSnap.data().profession)
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    return docSnap.data();
  }

  async function setItems() {



    if (user?.name) {


      getUser2(user.name)


    }
  }

  useEffect(() => {
    async function fetchData() {
      await setItems(); //async function ensures that goal has been fetched before fetching projects

    }

    if (user) {
      fetchData();
    }
  }, [user]);


  return (
    <div style={profileSectionStyle}>
      <div style={leftDivStyle}>
        <div style={circleStyle}></div>
      </div>
      <div style={rightDivStyle}>
        <h1>Min Profil</h1>
        <h3>{name}</h3>
        <h3>{role}</h3>
        <h3>{department}</h3>
        <CreateNewProject />
      </div>
    </div>
  );
}

export default ProfileSection;