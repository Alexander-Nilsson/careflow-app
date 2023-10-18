import { useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import ShowCard from "./ShowCard";
import KanbanBoard from "./KanbanBoard";
import CreateNewProject from "./CreateNewProject";

function Projects() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

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
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    // if (!user) navigate("/login");
    fetchProjects();
  }, [user, loading]);

  return (
    <>
      {loading ? (
        <p>Loading...</p> // Show a loading indicator
      ) : (
        <h1>Förändringsarbeten</h1>
      )}
      {/*<CreateNewProject />*/}
      <KanbanBoard />;
    </>
  );
}

export default Projects;
