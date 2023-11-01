import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressBar from 'react-bootstrap/ProgressBar';

import { collection, query, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useEffect } from "react";


function ProgressSection() {
  const [completedProjects, setCompletedProjects] = useState<number>(0);
  const [goal, setGoal] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true); //True while loading data from firebase
  const [goalNotFound, setGoalNotFound] = useState<boolean>(true); //True when no active year/goal in firebase, or more than one active goal


  const progressSectionStyle = {
    backgroundColor: "lightblue",
    width: "700px",
    height: "250px",
    borderRadius: "10px",
    padding: "50px",
    margin: "0px",
    marginTop: "0px",
  };


  // Function to fetch data on goal for current year
  async function getGoal() {
    const a = query(collection(db, "goals"));
    const querySnapshot = await getDocs(a);
    let activeGoals : number = 0; 

    querySnapshot.forEach((doc) => {
      if (doc.data().active === true) { //Current year is marked as active in firestore, year and goal set from admin page?
        activeGoals++;
        setGoal(doc.data().goal);
        setYear(doc.data().year);
      }

    });
    if (activeGoals === 1){
      setGoalNotFound(false); //Prevent render on progress when no active goal or more than one active goal
    }
  }

  //Function to count all completed projects
  async function countProjects() {
    const q = query(collection(db, "projects")); //create a query    
    const querySnapshot = await getDocs(q); //use the query to fetch the items

    setCompletedProjects(0); // Set count to 0 in case function is run again during runtime

    querySnapshot.forEach((doc) => { //Loop through all projects
      if (doc.data().closed && (doc.data().date_created.toDate().getFullYear() === 2023 || doc.data().date_created.toDate().getFullYear() === 2022)) {// && year === doc.data().date_created.toDate().getFullYear()) //Only increase counter on completed projects
        setCompletedProjects((prev) => (prev + 1)); //Set counter to +1. Prev is used for react to render after database read
      }
    });
  }

  useEffect(() => {
    async function fetchData() {
      await getGoal(); //async function ensures that goal has been fetched before fetching projects
      countProjects();
      setLoading(false); // Set loading to false when data is loaded
    }

    fetchData();
  }, [setCompletedProjects, setGoal, setYear]);


  return (
   /* 
   - Render loading when data is not fetched yet. 
   - Don't render year variable if goal data is not found/invalid
   - Don't render progress bar and info if goal data is not found/invalid
   - If goal <= 0, show 100% goal completion

   */
    <div style={progressSectionStyle}>
      {loading ? ( 
        <p>Loading data</p>
      ) : (
        <>
          <h2>Framsteg för Region Östergötland {goalNotFound ? <p> </p> : <>{year}</> } </h2>
          <h3>Avslutade förbättringsarbeten: {completedProjects}</h3>
          <>
          {goalNotFound ? ( 
            <p>No active goal</p>
            ) : (
              <>
                <ProgressBar animated now={ goal <= 0 ? 100 :(completedProjects / goal) * 100} label={`${ goal <= 0 ? 100 : (completedProjects / goal) * 100  }%`} />
                <h4>Mål till 31 December {year}: {goal}</h4>
              </>

            ) }
            </>
          
        </>
      )}
    </div>
  );
}

export default ProgressSection;