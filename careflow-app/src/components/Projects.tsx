import { SetStateAction, useEffect, useState } from "react";
import { collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import ShowCard from "./ShowCard";
import CreateNewProject from "./CreateNewProject";
import { render } from "react-dom";
import { Timestamp } from "firebase/firestore";

class Project {
  id: String;
  title: String;
  description: String;
  phase: number;
  place: String;
  centrum: String;
  tags: Array<string>;
  date_created: Timestamp;

  constructor(
    id: string,
    title: string,
    description: string,
    phase: number,
    place: string,
    centrum: string,
    tags: Array<string>,
    date_created: Timestamp
  ) {
    //tags : Array<string>, projectMembers : Array<string>, projectLeader : Array<string>, place : string, notesStudy : string, notesDo : string, notesPlan : string, notesAct : string, iteration : number, filesStudy : Array<string>, filesDo : Array<string>, filesPlan : Array<string>, filesAct : Array<string>, dateCreated : Date, comments : Array<string>, closed : boolean, clinic : string, centrum : string) {

    this.id = id;
    this.title = title;
    this.description = description;
    this.phase = phase;
    this.place = place;
    this.centrum = centrum;
    this.tags = tags;
    this.date_created = date_created;
  }

  toString() {
    return (
      this.title +
      ", " +
      this.description +
      ", " +
      this.phase +
      ", " +
      this.place +
      ", " +
      this.centrum
    );
  }
}

function Projects() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  //Column titles
  const columns = [
    { id: 1, title: "Förslag" },
    { id: 2, title: "Planera" },
    { id: 3, title: "Genomföra" },
    { id: 4, title: "Studera" },
    { id: 5, title: "Agera" },
  ];

  let cardIDs: Array<any> = [];

  // Fetch all projects and store their ID's
  async function fetchProjects() {
    const q = query(collection(db, "projects")); //create a query

    const querySnapshot = await getDocs(q); //use the query to fetch the items

    let i = 0;
    querySnapshot.forEach((doc) => {
      //do something with the response
      // doc.data() is never undefined for query doc snapshots
      cardIDs.push(doc.id);
      console.log("Pushat till ID: ", cardIDs[i]);
      console.log("Hämtar in: ", doc.id, " => ", doc.data());
      i++;
    });
    const proj = fetchProjectByID();

    return proj;
  }

  //Firebase project converter, converting the data into instance of Project
  const projectConverter = {
    toFirestore: (projectData: any) => {
      return {
        id: projectData.id,
        title: projectData.title,
        description: projectData.description,
        phase: projectData.phase,
        place: projectData.place,
        centrum: projectData.centrum,
        tags: projectData.tags,
        date_created: projectData.date_created,
      };
    },
    fromFirestore: (snapshot: any, options: any) => {
      const data = snapshot.data(options);
      return new Project(
        data.id,
        data.title,
        data.description,
        data.phase,
        data.place,
        data.centrum,
        data.tags,
        data.date_created
      );
    },
  };


  // Fetching each project by ID, converting them into objects and storing them in array
  const [projectList, setProjectList] = useState([] as Array<any>);
  console.log("zzz Init: ", projectList.length);

  async function fetchProjectByID() {
    let projectList: Array<any> = [];
    console.log("ID array length: ", cardIDs.length);
    for (let i = 0; i < cardIDs.length; i++) {
      let id = cardIDs[i];
      console.log("Project ID: ", id);
      const projectReference = doc(db, "projects", id).withConverter(
        projectConverter
      );
      const querySnapshot = await getDoc(projectReference);
      if (querySnapshot.exists()) {
        const projectData = querySnapshot.data();

        projectList.push(projectData);

        console.log("zzz Push: ", projectList.length);
      } else {
        console.log("No such document!");
      }
    }
    setProjectList(projectList);
  }


  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }

    fetchProjects();
  }, [loading, user]);
  console.log("zzz Read: ", projectList.length);
  return (
    <>
      {loading ? (
        <p>Loading...</p> // Show a loading indicator
      ) : (
        <h1>Förändringsarbeten</h1>
      )}

      {/* Removed */}
      {/* <CreateNewProject /> */}

      <div className="card-grid-container">
        <p>{}</p>
        {columns.map((column) => (
          <div key={column.id} className={`column-${column.id}`}>
            <h2>{column.title}</h2>
            {projectList
              .filter((project) => project.phase === column.id)
              .map((project) => (
                <ShowCard
                  key={project.id}
                  title={project.title}
                  content={project.description}
                  column={project.phase}
                  place={project.place}
                  centrum={project.centrum}
                  tags={project.tags}
                  date_created={project.date_created}
                />
              ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Projects;
