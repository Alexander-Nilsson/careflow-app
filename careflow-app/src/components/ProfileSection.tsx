import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateNewProject from "./CreateNewProject";
import nurseImage from "../Images/genderNeutralWorker.png";

function ProfileSection() {
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
  

  return (
    <div style={profileSectionStyle}>
      <div style={leftDivStyle}>
        <div style={circleStyle}></div>
      </div>
      <div style={rightDivStyle}>
        <h1>Min Profil</h1>
        <h3>Namn</h3>
        <h3>Avdelning</h3>
        <CreateNewProject />
      </div>
    </div>
  );
}

export default ProfileSection;