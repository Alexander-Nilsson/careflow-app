import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressBar from 'react-bootstrap/ProgressBar';

import { collection, query, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useEffect } from "react";

/* TODO
- What happens if multiple "goal" documents are marked with active = true?
- Loading / Feedback when loading project data / goal data or failed load
- Now the counter is showing all completed projects from all years, 
  should maybe check only current year

*/



function ProgressSection() {
  //Variables to count all completed projects and set year + goal
  const [completedProjects, setCompletedProjects] = useState(0);
  const [goal, setGoal] = useState(0);
  const [year, setYear] = useState(0);


  // You can define your project data here
  const progressSectionStyle = {
    backgroundColor: "lightgrey",
    width: "700px",
    height: "250px",
    borderRadius: "10px",
    padding: "10px",
    margin: "10px",
    marginTop: "0px",
  };


  // Function to fetch data on current year + goal
  async function getGoal() {
    const a = query(collection(db, "goals"));
    const querySnapshot = await getDocs(a);
    querySnapshot.forEach((doc) => {
      if (doc.data().active === true) { //Current year is marked as active in firestore
        setGoal(doc.data().goal);
        setYear(doc.data().year);
      }
    });
  }


  async function countProjects() { //Function to count all completed projects
    const q = query(collection(db, "projects")); //create a query    
    const querySnapshot = await getDocs(q); //use the query to fetch the items

    setCompletedProjects(0); // Set count to 0 incase function is run again during runtime

    querySnapshot.forEach((doc) => { //Loop through all projects
      if (doc.data().closed) //Only increase counter on completed projects
        setCompletedProjects((prev) => (prev + 1)); //Set counter to +1. Prev is used for react to render after database read
    });
    // setCompletedPercentage( (completedProjects / goal) * 100 );

  }


  useEffect(() => {

    getGoal();
    countProjects();
  }, [setCompletedProjects, setGoal, setYear]);

  return (

    // TODO: Replace text with data from database, ex "goals" collection
    <div style={progressSectionStyle}>
      <h2>Framsteg för Region Östergötland {year}</h2>
      <h3>Avslutade förbättringsarbeten: {completedProjects}</h3>
      <ProgressBar animated now={(completedProjects / goal) * 100} label={`${(completedProjects / goal) * 100}%`} />
      <h4>Mål till 31 December {year}: {goal}</h4>


    </div>
  );
}

export default ProgressSection;