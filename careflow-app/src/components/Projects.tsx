import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KanbanBoard from "./KanbanBoard";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getAllProjects,
  Project,
  sortByDateCreated,
  sortByOldestDate,
  sortByTitleAscending,
  sortByTitleDescending,
} from "../ImprovementWorkLib";
import { getAllImprovementWorks, ImprovementWork } from "../ImprovementWorkLib";
import TitleBox from "./TitleBox";
import CreateNewProject from "./CreateNewProject";
import { UserInfoType, getUser } from "./Start";
import FinishedProjectsSection from "./FinishedProjectsSection";

// Context to pass functions to KANBAN
export interface ProjectContextType {
  improvementWorkList: ImprovementWork[];
  setImprovementWorkList: React.Dispatch<
    React.SetStateAction<ImprovementWork[]>
  >;
  isAdmin: boolean;
}

export const ProjectContext = createContext<ProjectContextType | null>(null);

function Projects() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [sortBy, setSortBy] = useState<
    "date_created" | "oldest_date" | "ascending" | "descending"
  >("date_created");

  // const [projectList, setProjectList] = useState<Project[]>([])

  // for admin func
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null); // Initialize with the type

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortOption = event.target.value as
      | "date_created"
      | "oldest_date"
      | "ascending"
      | "descending";
    setSortBy(selectedSortOption);

    if (selectedSortOption === "oldest_date") {
      const sortedProjects = sortByOldestDate(improvementWorkList);
      setImprovementWorkList(sortedProjects);
    } else if (selectedSortOption === "date_created") {
      const sortedProjects = sortByDateCreated(improvementWorkList);
      setImprovementWorkList(sortedProjects);
    } else if (selectedSortOption === "ascending") {
      const sortedProjects = sortByTitleAscending(improvementWorkList);
      setImprovementWorkList(sortedProjects);
    } else if (selectedSortOption === "descending") {
      const sortedProjects = sortByTitleDescending(improvementWorkList);
      setImprovementWorkList(sortedProjects);
    }
  };

  const [improvementWorkList, setImprovementWorkList] = useState<
    ImprovementWork[]
  >([]);

  async function fetchProjects() {
    if (user?.name) {
      const fetchedImprovementWorks: ImprovementWork[] | null =
        await getAllImprovementWorks();
      // console.log(fetchedImprovementWorks);
      if (fetchedImprovementWorks)
        setImprovementWorkList(fetchedImprovementWorks);
    }
  }

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Fetch user info to check if admin
    if (user?.name) {
      //console.log(user);
      getUser(user.name, user, setUserInfo);
      console.log("User info:", userInfo);
    }

    // Fetch projects only if the user is authenticated and data is not loading.
    fetchProjects();
  }, [isLoading, isAuthenticated, user]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p> // Show a loading indicator
      ) : (
        <></>
      )}
      <div
        style={{
          width: "100%",
          height: "150px",
          display: "flex",
          justifyContent: "space-between",
          //alignItems: "baseline",
          //marginTop: "20px",
          whiteSpace: "pre-line",
        }}
      >
        <TitleBox
          title={"Förändringsarbeten"}
          description="Här kan du bläddra bland pågående projekt och se vilken status de har. \n \n
        Du kan välja vilken avdelning, vårdenhet eller region som projekten ska beröra. Det finns även ett flertal filter att välja bland, som gör att du kan smalna av sökningen och göra resultaten relevanta för vad du söker. \n \n I fritext-rutan kan du skriva in sökord och få resultat relaterade till dem. 
          Projekten dyker upp som kort där en översikt med den viktigaste informationen visas. \n \n Det finns fem olika faser som ett projekt kan befinna sig i och korten flyttas mellan dem i takt med att projektet fortskrider."
        ></TitleBox>
        <div
          style={{
            width: "30%",
            height: "140px",
            margin: "0px",
            marginRight: " 4vw",
            marginTop: "2vh",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <CreateNewProject />
        </div>
      </div>
      {/* TEMP  Display "Admin user" text if the user is an admin */}
      {userInfo?.admin && <p>Admin user</p>}

      <div className="ml-2 mt-2 d-flex align-items-center">
        <label htmlFor="sortDropdown" className="form-label me-2">
          Sortera:
        </label>
        <select
          id="sortDropdown"
          value={sortBy}
          className="form-select"
          aria-label="Filtrera"
          onChange={handleSortChange}
          style={{ width: "8.5rem" }} // Adjust the width as needed
        >
          <option selected value="date_created">
            Visa senaste
          </option>
          <option value="oldest_date">Visa äldsta</option>
          <option value="ascending">Visa a-ö</option>
          <option value="descending">Visa ö-a</option>
        </select>
      </div>

      {/* <ProjectContext.Provider value={{ projectList, setProjectList }}> */}
      <ProjectContext.Provider
        value={{
          improvementWorkList,
          setImprovementWorkList,
          isAdmin: userInfo?.admin || false, // Use a default value if userInfo is not available
        }}
      >
        <KanbanBoard />
      </ProjectContext.Provider>

      {isAuthenticated && userInfo ? (
        <FinishedProjectsSection
          userInfo={userInfo}
          improvementWorks={improvementWorkList}
        />
      ) : (
        <p>Loading...</p> // Show a loading indicator
      )}
    </>
  );
}

export default Projects;
