import { db } from "../firebase";
import { createContext, useEffect, useState } from "react";
import {
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import KanbanBoard from "./KanbanBoard";
import { Id } from "../types";
import { useAuth0 } from "@auth0/auth0-react";

// Context to pass functions to KANBAN
export interface ProjectContextType {
  projectList: Project[];
  setProjectList: React.Dispatch<React.SetStateAction<Project[]>>;
}

export const ProjectContext = createContext<ProjectContextType | null>(null);

class Project {
  id: Id;
  title: string;
  description: string;
  phase: Id;
  place: string;
  centrum: string;
  tags: Array<string>;
  date_created: Timestamp;

  constructor(
    id: Id,
    title: string,
    description: string,
    phase: number,
    place: string,
    centrum: string,
    tags: Array<string>,
    date_created: Timestamp
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.phase = phase;
    this.place = place;
    this.centrum = centrum;
    this.tags = tags;
    this.date_created = date_created;
  }
}

function Projects() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth0();

  const [projectList, setProjectList] = useState<Project[]>([]);

  const projectConverter = {
    toFirestore: (projectData: any) => ({
      id: projectData.id,
      title: projectData.title,
      description: projectData.description,
      phase: projectData.phase,
      place: projectData.place,
      centrum: projectData.centrum,
      tags: projectData.tags,
      date_created: projectData.date_created,
    }),
    fromFirestore: (snapshot: any, options: any) => {
      const data = snapshot.data(options);
      return new Project(
        snapshot.id,
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

  async function fetchProjects() {
    const q = query(collection(db, "projects"));
    const querySnapshot = await getDocs(q);

    // Use map to obtain all document IDs
    const ids = querySnapshot.docs.map((doc) => doc.id);

    // Fetch all projects using Promise.all for better performance.
    const projects = await Promise.all(
      ids.map(async (id) => {
        const projectReference = doc(db, "projects", id).withConverter(
          projectConverter
        );
        const snapshot = await getDoc(projectReference);

        if (snapshot.exists()) {
          return snapshot.data() as Project;
        }
        return null;
      })
    );

    // Filter out null values (if any) and set the project list state.
    setProjectList(projects.filter(Boolean) as Project[]);
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
      {isLoading ? <p>Loading...</p> : <h1>Förändringsarbeten </h1>}
      <ProjectContext.Provider value={{ projectList, setProjectList }}>
        <KanbanBoard />
      </ProjectContext.Provider>
    </>
  );
}

export default Projects;
