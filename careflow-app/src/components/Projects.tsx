// import { db } from "../firebase";
import { createContext, useEffect, useState } from "react";
// import {
//   collection,
//   query,
//   getDocs,
//   where,
//   doc,
//   getDoc,
//   Timestamp,
//   DocumentReference,
//   DocumentData,
// } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import KanbanBoard from "./KanbanBoard";
// import { Id } from "../types";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllProjects, Project, sortByDateCreated, sortByOldestDate } from "../ImprovementWorkLib";
import FinishedProjectsSection from "./FinishedProjectsSection";
import TitleBox from "./TitleBox";

// Context to pass functions to KANBAN
export interface ProjectContextType {
  projectList: Project[];
  setProjectList: React.Dispatch<React.SetStateAction<Project[]>>;
}

export const ProjectContext = createContext<ProjectContextType | null>(null);

// interface User {
//   first_name: string;
//   sur_name: string;
// }

// class Project {
//   id: Id;
//   title: string;
//   description: string;
//   phase: Id;
//   place: string;
//   centrum: string;
//   tags: Array<string>;
//   date_created: Timestamp;
//   result_measurements: string;
//   notes_plan: string;
//   notes_do: string;
//   notes_study: string;
//   notes_act: string;
//   project_leader: DocumentReference<DocumentData>;
//   project_members: Array<string>;
//   checklist_plan: {
//     checklist_item: Array<string>;
//     checklist_done: Array<boolean>;
//     checklist_members: Array<string>;
//   };
//   checklist_do: {
//     checklist_item: Array<string>;
//     checklist_done: Array<boolean>;
//     checklist_members: Array<string>;
//   };
//   checklist_study: {
//     checklist_item: Array<string>;
//     checklist_done: Array<boolean>;
//     checklist_members: Array<string>;
//   };
//   checklist_act: {
//     checklist_item: Array<string>;
//     checklist_done: Array<boolean>;
//     checklist_members: Array<string>;
//   };

//   constructor(
//     id: Id,
//     title: string,
//     description: string,
//     phase: number,
//     place: string,
//     centrum: string,
//     tags: Array<string>,
//     date_created: Timestamp,
//     result_measurements: string,
//     notes_plan: string,
//     notes_do: string,
//     notes_study: string,
//     notes_act: string,
//     project_leader: DocumentReference<DocumentData>,
//     project_members: Array<string>,
//     checklist_plan: {
//       checklist_item: Array<string>;
//       checklist_done: Array<boolean>;
//       checklist_members: Array<string>;
//     },
//     checklist_do: {
//       checklist_item: Array<string>;
//       checklist_done: Array<boolean>;
//       checklist_members: Array<string>;
//     },
//     checklist_study: {
//       checklist_item: Array<string>;
//       checklist_done: Array<boolean>;
//       checklist_members: Array<string>;
//     },
//     checklist_act: {
//       checklist_item: Array<string>;
//       checklist_done: Array<boolean>;
//       checklist_members: Array<string>;
//     }
//   ) {
//     this.id = id;
//     this.title = title;
//     this.description = description;
//     this.phase = phase;
//     this.place = place;
//     this.centrum = centrum;
//     this.tags = tags;
//     this.date_created = date_created;
//     this.result_measurements = result_measurements;
//     this.notes_plan = notes_plan;
//     this.notes_do = notes_do;
//     this.notes_study = notes_study;
//     this.notes_act = notes_act;
//     this.project_leader = project_leader;
//     this.project_members = project_members;
//     this.checklist_plan = checklist_plan;
//     this.checklist_do = checklist_do;
//     this.checklist_study = checklist_study;
//     this.checklist_act = checklist_act;
//   }
// }



function Projects() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [sortBy, setSortBy] = useState<"date_created" | "oldest_date">(
    "date_created"
  );

  const [projectList, setProjectList] = useState<Project[]>([]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortOption = event.target.value as "date_created" | "oldest_date";
    setSortBy(selectedSortOption);

    if (selectedSortOption === "oldest_date") {
      const sortedProjects = sortByOldestDate(projectList);
      setProjectList(sortedProjects);
    } else {
      const sortedProjects = sortByDateCreated(projectList);
      setProjectList(sortedProjects);
    }
  };


  // Only temporary. Cards will later on be fetched from database
  // const cards = [
  //   {
  //     id: 1,
  //     title: "Card Title 1",
  //     content:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //     column: 1,
  //   },
  //   { id: 2, title: "Card Title 2", content: "Card content 2", column: 2 },
  //   { id: 2, title: "Card Title 3", content: "Card content 3", column: 3 },
  //   { id: 2, title: "Card Title 4", content: "Card content 4", column: 4 },
  //   { id: 2, title: "Card Title 5", content: "Card content 5", column: 1 },
  //   { id: 2, title: "Card Title 6", content: "Card content 5", column: 2 },
  //   { id: 2, title: "Card Title 6", content: "Card content 5", column: 5 },
  // ];
  // let cardIDs: Array<any> = [];

  // Fetch all projects and store their ID's
  // async function fetchProjects() {
  //   const q = query(collection(db, "projects")); //create a query

  //   const querySnapshot = await getDocs(q); //use the query to fetch the items

  //   let i = 0;
  //   querySnapshot.forEach((doc) => {
  //     //do something with the response
  //     // doc.data() is never undefined for query doc snapshots
  //     cardIDs.push(doc.id);
  //     // console.log("Pushat till ID: ", cardIDs[i]);
  //     // console.log("Hämtar in: ", doc.id, " => ", doc.data());
  //     i++;
  //   });
  //   const proj = fetchProjectByID();

  //   return proj;
  // }

  //Firebase project converter, converting the data into instance of Project
  // const projectConverter = {
  //   toFirestore: (projectData: any) => ({
  //     id: projectData.id,
  //     title: projectData.title,
  //     description: projectData.description,
  //     phase: projectData.phase,
  //     place: projectData.place,
  //     centrum: projectData.centrum,
  //     tags: projectData.tags,
  //     date_created: projectData.date_created,
  //     result_measurements: projectData.result_measurements,
  //     notes_plan: projectData.notes_plan,
  //     notes_do: projectData.notes_do,
  //     notes_study: projectData.notes_study,
  //     notes_act: projectData.notes_act,
  //     project_leader: projectData.project_leader,
  //     project_members: projectData.project_members,
  //     checklist_plan: {
  //       checklist_item: projectData.checklist_plan.checklist_item,
  //       checklist_done: projectData.checklist_plan.checklist_done,
  //       checklist_members: projectData.checklist_plan.checklist_members,
  //     },
  //     checklist_do: {
  //       checklist_item: projectData.checklist_do.checklist_item,
  //       checklist_done: projectData.checklist_do.checklist_done,
  //       checklist_members: projectData.checklist_do.checklist_members,
  //     },
  //     checklist_study: {
  //       checklist_item: projectData.checklist_study.checklist_item,
  //       checklist_done: projectData.checklist_study.checklist_done,
  //       checklist_members: projectData.checklist_study.checklist_members,
  //     },
  //     checklist_act: {
  //       checklist_item: projectData.checklist_act.checklist_item,
  //       checklist_done: projectData.checklist_act.checklist_done,
  //       checklist_members: projectData.checklist_act.checklist_members,
  //     },
  //   }),
  // fromFirestore: (snapshot: any, options: any) => {
  //   const data = snapshot.data(options);

  //     const checklist_plan = {
  //       checklist_item: data.checklist_plan.checklist_item,
  //       checklist_done: data.checklist_plan.checklist_done,
  //       checklist_members: data.checklist_plan.checklist_members,
  //     };
  //     const checklist_do = {
  //       checklist_item: data.checklist_do.checklist_item,
  //       checklist_done: data.checklist_do.checklist_done,
  //       checklist_members: data.checklist_do.checklist_members,
  //     };
  //     const checklist_study = {
  //       checklist_item: data.checklist_study.checklist_item,
  //       checklist_done: data.checklist_study.checklist_done,
  //       checklist_members: data.checklist_study.checklist_members,
  //     };
  //     const checklist_act = {
  //       checklist_item: data.checklist_act.checklist_item,
  //       checklist_done: data.checklist_act.checklist_done,
  //       checklist_members: data.checklist_act.checklist_members,
  //     };

  // return new Project(
  //   snapshot.id,
  //   data.title,
  //   data.description,
  //   data.phase,
  //   data.place,
  //   data.centrum,
  //   data.tags,
  //   data.date_created,
  //   data.result_measurements,
  //   data.notes_plan,
  //   data.notes_do,
  //   data.notes_study,
  //   data.notes_act,
  //   data.project_leader,
  //   data.project_members,
  //   checklist_plan,
  //   checklist_do,
  //   checklist_study,
  //   checklist_act
  // );
  //   },
  // };

  async function fetchProjects() {
    if (user?.name) {
      const fetchedProjects: Project[] | null = await getAllProjects(false);
      if (fetchedProjects) setProjectList(fetchedProjects);
    }

    // const projectsCollectionRef = collection(db, "projects");

    // const q = query(collection(db, "projects"));
    // const memberQuery = query(projectsCollectionRef, where("project_members", "array-contains", user?.name));
    // const leaderQuery = query(projectsCollectionRef, where("project_leader", "==", user?.name));

    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   const data = doc.data();
    //   // Do something with the data from each document
    //   console.log(data);
    // });

    // Use map to obtain all document IDs

    // Promise.all([getDocs(memberQuery), getDocs(leaderQuery)])
    //                 .then(([memberSnapshot, leaderSnapshot]) => {
    //                   const querySnapshot = [...memberSnapshot.docs, ...leaderSnapshot.docs]

    //                   const ids = querySnapshot.docs.map((doc) => doc.id);

    //                 })
    // const ids = querySnapshot.docs.map((doc) => doc.id);
    // console.log(ids)

    // // fetch all project data in parallel
    // const projects = await Promise.all(
    //   ids.map(async (id) => {
    //     const projectReference = doc(db, "projects", id).withConverter(
    //       projectConverter
    //     );
    //     const snapshot = await getDoc(projectReference);

    //     if (snapshot.exists()) {
    //       const projectData = snapshot.data() as Project;
    //       const project_members = projectData.project_members;

    //       // Fetch first_name and sur_name for each project_member
    //       const memberNames = await Promise.all(
    //         project_members.map(async (userId) => {
    //           const userDocRef = doc(db, "users", userId);
    //           const userSnapshot = await getDoc(userDocRef);
    //           if (userSnapshot.exists()) {
    //             const userData = userSnapshot.data() as User;
    //             return userData.first_name + " " + userData.sur_name;
    //           } else {
    //             return "Unknown User"; // Handle non-existent user documents
    //           }
    //         })
    //       );

    //       // Update the projectData with the project_members' names
    //       projectData.project_members = memberNames;
    //       console.log(projectData)
    //       return projectData;
    //     }
    //     return null;
    //   })
    // );

    // Filter out null values (if any) and set the project list state.
    // setProjectList(projects);
  }

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Fetch projects only if the user is authenticated and data is not loading.
    fetchProjects();
  }, [isLoading, isAuthenticated, user]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p> // Show a loading indicator
      ) : (
        <TitleBox
          title={"Förändringsarbeten"}
          description="Här kan du bläddra bland pågående projekt och se vilken status de har.
        Du kan välja vilken avdelning, vårdenhet eller region som projekten ska beröra. Det finns även ett flertal filter att välja bland, som gör att du kan smalna av sökningen och göra resultaten relevanta för vad du söker. I fritext-rutan kan du skriva in sökord och få resultat relaterade till dem. 
        Projekten dyker upp som kort där en översikt med den viktigaste informationen visas. Det finns fem olika faser som ett projekt kan befinna sig i och korten flyttas mellan dem i takt med att projektet fortskrider."
        ></TitleBox>
        
      )}
      <div>
        <label htmlFor="sortDropdown">Sortera på datum:</label>
        <select id="sortDropdown" onChange={handleSortChange} value={sortBy}>
          <option value="date_created">Senaste</option>
          <option value="oldest_date">Äldsta</option>
        </select>
      </div>
      
      <ProjectContext.Provider value={{ projectList, setProjectList }}>
        <KanbanBoard />
      </ProjectContext.Provider>
      {/* <FinishedProjectsSection /> */}
    </>
  );
}

export default Projects;
