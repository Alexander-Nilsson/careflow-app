import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KanbanBoard from "./KanbanBoard";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllImprovementWorks, ImprovementWork } from "../ImprovementWorkLib";
import TitleBox from "./TitleBox";
import CreateNewProject from "./CreateNewProject";
import { UserInfoType, getUser } from "./Start";

// Context to pass functions to KANBAN
export interface ProjectContextType {
  improvementWorkList: ImprovementWork[];
  setImprovementWorkList: React.Dispatch<
    React.SetStateAction<ImprovementWork[]>
  >;
}

export const ProjectContext = createContext<ProjectContextType | null>(null);

function Projects() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth0();

  // for admin func
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null); // Initialize with the type

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
          alignItems: "baseline",
          marginTop: "20px",
        }}
      >
        <TitleBox
          title={"Förändringsarbeten"}
          description="Här kan du bläddra bland pågående projekt och se vilken status de har.
        Du kan välja vilken avdelning, vårdenhet eller region som projekten ska beröra. Det finns även ett flertal filter att välja bland, som gör att du kan smalna av sökningen och göra resultaten relevanta för vad du söker. I fritext-rutan kan du skriva in sökord och få resultat relaterade till dem. 
        Projekten dyker upp som kort där en översikt med den viktigaste informationen visas. Det finns fem olika faser som ett projekt kan befinna sig i och korten flyttas mellan dem i takt med att projektet fortskrider."
        ></TitleBox>
        <div
          style={{
            width: "30%",
            height: "140px",
            margin: "0px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <CreateNewProject />
        </div>
      </div>
      {/* Display "Admin user" text if the user is an admin */}
      {userInfo?.admin && <p>Admin user</p>}

      <ProjectContext.Provider
        value={{
          improvementWorkList,
          setImprovementWorkList,
        }}
      >
        <KanbanBoard />
      </ProjectContext.Provider>
      {/* <FinishedProjectsSection userInfo={userInfo} improvementWorks={improvementWorks} /> */}
    </>
  );
}

export default Projects;
