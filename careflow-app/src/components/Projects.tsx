import { useEffect } from "react";
import { collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import ShowCard from "./ShowCard";
import CreateNewProject from "./CreateNewProject";


class Project {

  id: String;
  title: String;
  description: String;
  phase: number;

  constructor (id: string, title: string, description : string, phase : number){
    //tags : Array<string>, projectMembers : Array<string>, projectLeader : Array<string>, place : string, notesStudy : string, notesDo : string, notesPlan : string, notesAct : string, iteration : number, filesStudy : Array<string>, filesDo : Array<string>, filesPlan : Array<string>, filesAct : Array<string>, dateCreated : Date, comments : Array<string>, closed : boolean, clinic : string, centrum : string) {
 
    this.id = id;
    this.title = title;
    this.description = description;
    this.phase = phase;
  }
  toString() {
      return this.title + ', ' + this.description + ', ' + this.phase;
  }
}

function Projects() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

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

  let cardIDs : Array<any> = [];


  // // example of how to fetch from the db.
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
    fetchProjectByID();
    

  }

  //Firebase project converter
  const projectConverter = {
    toFirestore: (projectData : any) => {
        return {
          id: projectData.id,
          title: projectData.title,
          description: projectData.description,
          phase: projectData.phase
            };
    },
    fromFirestore: (snapshot : any, options : any) => {
        const data = snapshot.data(options);
        return new Project(data.id, data.title, data.description, data.phase);
    }
  };
  
  // const ref = doc(db, "projects","LA").withConverter(projectConverter);
  //   const docSnap = await getDocs(ref);
  //   if (docSnap.exists()) {
  //     // Convert to City object
  //     const project = docSnap.data();
  //     // Use a City instance method
  //     console.log(project.toString());
  //   } else {
  //     console.log("No such document!");
  //   }
  
  let projectList : Array<any> = [];

  async function fetchProjectByID(){

    console.log("ID array length: ", cardIDs.length);
    for (let i = 0; i < cardIDs.length; i++)
    {
      console.log("Hämtar in enskild data");
      let id = cardIDs[i];
      console.log(id);
      const projectReference = doc(db, "projects", id).withConverter(projectConverter);
      const querySnapshot = await getDoc(projectReference);
      if(querySnapshot.exists()) {
        const projectData = querySnapshot.data();
        projectList.push(projectData);
        printProjects(projectList);
        console.log("Titel: " + projectData.title);
      } else {
        console.log("No such document!");
      }
      
    }

  }

  //test function for printing projects from the list
  function printProjects(projectList : Array<any>){

    for (let i = 0; i < projectList.length; i++)
    {
      console.log("Projekttitel: " , projectList[i].title);
    }

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

      <CreateNewProject />
        
      <div className="card-grid-container">
        <p>{projectList.length}</p>
          {columns.map(column => (
              <div key={column.id} className={`column-${column.id}`}>
                  <h2>{column.title}</h2>
                  {projectList
                      .filter(project => project.phase === column.id)
                      .map(project => (
                          <ShowCard
                              key={project.id}
                              title={project.title}
                              content={project.description}
                              column={project.phase}
                          />
                      ))}
              </div>
          ))}
      </div>
    </>
  );
}

export default Projects;
