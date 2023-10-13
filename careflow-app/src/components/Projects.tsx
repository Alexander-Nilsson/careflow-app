import { useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import ShowCard from "./ShowCard";
import CreateNewProject from "./CreateNewProject";
import { useAuth0 } from '@auth0/auth0-react';

function Projects() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth0();

  //Column titles
  const columns = [
    { id: 1, title: 'Förslag' },
    { id: 2, title: 'Planera' },
    { id: 3, title: 'Genomföra' },
    { id: 4, title: 'Studera' },
    { id: 5, title: 'Agera' },
  ];

  // Only temporary. Cards will later on be fetched from database
  const cards = [
    { id: 1, title: "Card Title 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", column: 1 },
    { id: 2, title: "Card Title 2", content: "Card content 2", column: 2 },
    { id: 2, title: "Card Title 3", content: "Card content 3", column: 3 },
    { id: 2, title: "Card Title 4", content: "Card content 4", column: 4 },
    { id: 2, title: "Card Title 5", content: "Card content 5", column: 1 },
    { id: 2, title: "Card Title 6", content: "Card content 5", column: 2 },
    { id: 2, title: "Card Title 6", content: "Card content 5", column: 5 },
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
    if (isLoading) {
      // maybe trigger a loading screen
      return;
    }
    if (!isAuthenticated) {
      navigate("/login")
    };
    fetchProjects();

  }, [user, isLoading]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p> // Show a loading indicator
      ) : (
        <>
          <CreateNewProject />
          <div className="card-grid-container">
            {columns.map(column => (
              <div key={column.id} className={`column-${column.id}`}>
                <h2>{column.title}</h2>
                {cards
                  .filter(card => card.column === column.id)
                  .map(card => (
                    <ShowCard
                      key={card.id}
                      title={card.title}
                      content={card.content}
                      column={card.column}
                    />
                  ))}
              </div>
            ))}
          </div>
        </>
      )}




    </>
  );
}

export default Projects;
