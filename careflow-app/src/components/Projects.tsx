import { useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import CreateNewProject from "./CreateNewProject";

function Projects() {
  // example of how to fetch from the db.
  async function fetchProjects() {
    const q = query(collection(db, "projects")); //create a query

    const querySnapshot = await getDocs(q); //use the query to fetch the items

    querySnapshot.forEach((doc) => {
      //do something with the response
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }

  useEffect(() => {
    //useEffect is a function which runs when the component is mounted
    fetchProjects();
  }, []);

  return (
    <>
      <h1>Förändringsarbeten</h1>
      <CreateNewProject />
    </>
  );
}

export default Projects;
