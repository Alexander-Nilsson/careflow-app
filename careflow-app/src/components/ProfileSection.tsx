import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateNewProject from "./CreateNewProject";
import nurseImage from "../Images/genderNeutralWorker.png";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import ContinueButton from "./ContinueButton";
import { getUser2 } from "../ImprovementWorkLib";



function ProfileSection() {

  const [name, setName] = useState<String>("Namn ej funnet");
  const [department, setDepartment] = useState<String>("Avdelning ej funnen");
  const [role, setRole] = useState<String>("Roll ej funnen");
  const { isAuthenticated, isLoading, user } = useAuth0();

  const entireSectionStyle = {
    width: "100%",
    height: "150px",
    display: 'flex',
    justifyContent: 'space-between', // Aligns children at opposite ends
    alignItems: 'center', // Aligns children vertically in the middle
    marginBottom: "20px",
  }


  const profileSectionStyle = {
    background: 'rgba(255, 255, 255, 0.70)',
    width: "500px",
    height: "140px",
    borderRadius: "10px",
    margin: "0px",
    display: "flex",
    boxShadow: '0px 0px 10px rgba(100, 100, 100, 0.2)',
    fontFamily: "Avenir",
  };

 
  const buttonSectionStyle = {
    width: "30%",
    height: "140px",
    margin: "0px",
    display: "flex",
    justifyContent: "flex-end",
  }

  const leftDivStyle = {
    flex: "20%",
    padding: "10px",
  };

  const rightDivStyle = {
    marginTop: "2%",
    flex: "60%",
    padding: "10px",
    lineHeight: "0.5", 
    marginBottom: "0.1em", 
  };  

  const circleStyle = {
    width: "120px",
    height: "120px",
    backgroundColor: "white",
    borderRadius: "50%", // Create a circular shape
    display: "flex",
    alignItems: "center", // Center vertically
    justifyContent: "center", // Center horizontally
    marginLeft: "15px",
    boxShadow: '0px 0px 10px rgba(100, 100, 100, 0.2)',
    backgroundImage: `url(${nurseImage})`, // Set the image as background
    backgroundSize: "cover",
  };

  async function getUser(username: string) { //This function stores data in a variavle called docSnap. docSnap includes all attributes of a user.
    const docRef = doc(db, "users", username);
    const docSnap = await getUser2(docRef);

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


      getUser(user.name)


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
    <div style = {entireSectionStyle}>
      <div style={profileSectionStyle}>
        <div style={leftDivStyle}>
          <div style={circleStyle}></div>
        </div>
        <div style={rightDivStyle}>
          <h3>{name}</h3>
          <p>{role}</p>
          <p>{department}</p>
        </div>
      </div>
      <div style= {buttonSectionStyle}>
         <CreateNewProject />
      </div>
    </div>
    
  );
}

export default ProfileSection;