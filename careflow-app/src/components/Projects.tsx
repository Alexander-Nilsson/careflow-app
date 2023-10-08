import { useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import ShowCard from "./ShowCard";

function Projects() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const cards = [
    { id: 1, title: "Card Title 1", content: "Card content 1" },
    { id: 2, title: "Card Title 2", content: "Card content 2" },
    { id: 2, title: "Card Title 3", content: "Card content 3" },
    { id: 2, title: "Card Title 4", content: "Card content 4" },
    // Will later load data from database
  ];

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
  }, []);

  return (
    <>
      <h1>Förändringsarbeten</h1>
      {cards.map((card) => (
        <ShowCard key={card.id} title={card.title} content={card.content} />
      ))}
    </>
  );
}

export default Projects;
