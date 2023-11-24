import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KanbanBoard from "./KanbanBoard";
import { useAuth0 } from "@auth0/auth0-react";
import { filterImprovementWorks, FilterState, findPlaceOptions, findTagOptions, searchImprovementWorks } from "../ImprovementWorkLib";
import {
  // getAllProjects,
  Project,
  sortByDateCreated,
  sortByOldestDate,
  sortByTitleAscending,
  sortByTitleDescending,
} from "../ImprovementWorkLib";
import { getAllImprovementWorks, ImprovementWork } from "../ImprovementWorkLib";
import TitleBox from "./TitleBox";
import CreateNewProject from "./CreateNewProject";
import { UserInfoType, fetchUser } from "./Start";
import FinishedProjectsSection from "./FinishedProjectsSection";
import ProjectsSection from "./ProjectsSection";
import CardDeleteModal from "./CardDeleteModal";
import { IoSearchOutline } from "react-icons/io5";

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
  const [improvementWorkList, setImprovementWorkList] = useState<ImprovementWork[]>([]);
  const [searchTitle, setSearchTitle] = useState<string>('');

  // for admin func
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null); // Initialize with the type
  const [allImprovementWorks, setAllImprovementWorks] = useState<ImprovementWork[]>([]);
  const [tagOptions, setTagOptions] = useState<string[]>([]);
  const [placeOptions, setPlaceOptions] = useState<string[]>([]);
  const [filterState, setFilterState] = useState<FilterState>({ 
    includeUser: true, 
    includeClinic: false,
    includeCentrum: false, 
    tagFilter: "all_tags", 
    placeFilter: "all_places", 
    closed: false });

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

  const handleTitleSearch = (searchValue: string) => {
    setSearchTitle(searchValue);
  };


  async function fetchProjects() {
    if (user?.name) {
      const fetchedImprovementWorks: ImprovementWork[] | null = await getAllImprovementWorks();
      // console.log(fetchedImprovementWorks);
      if (fetchedImprovementWorks)
        setAllImprovementWorks(fetchedImprovementWorks);
    }
  }

  const handleFilter = async (event: any) => {
    if (event.target.value === "user") {
      setFilterState(prev => ({ ...prev, includeUser: true, includeCentrum: false, includeClinic: false }));
    } else if (event.target.value === "clinic") {
      setFilterState(prev => ({ ...prev, includeClinic: true, includeCentrum: false, includeUser: false }));
    } else if (event.target.value === "centrum") {
      setFilterState(prev => ({ ...prev, includeCentrum: true, includeClinic: false, includeUser: false }));
    }

  };

  // denna uppdaterar vilken tag som ska filtreras på.
  const handleTags = (event: any) => {
    setFilterState(prev => ({ ...prev, tagFilter: event.target.value })); //när denna är färdiguppdaterad körs alltså useEffect
  }

  const handlePlace = (event: any) => {
    setFilterState(prev => ({ ...prev, placeFilter: event.target.value })); //när denna är färdiguppdaterad körs alltså useEffect
  }

  useEffect(() => {
    console.log("start")
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
      fetchUser(user.name, user, setUserInfo);
      console.log("User info:", userInfo);
    }

    // Fetch projects only if the user is authenticated and data is not loading.
    fetchProjects();
  }, [isAuthenticated]);

  useEffect(() => {
    if (allImprovementWorks.length > 0) {
      const tags = findTagOptions(allImprovementWorks)
      setTagOptions(tags);
      const places = findPlaceOptions(allImprovementWorks)
      setPlaceOptions(places);
      if (userInfo) {
        const filteredImprovementWorks: ImprovementWork[] = filterImprovementWorks(allImprovementWorks, filterState, userInfo, sortBy)
        console.log("all improvementwork")
        setImprovementWorkList(filteredImprovementWorks)
      }
    }
  }, [allImprovementWorks])

  useEffect(() => {
    console.log("2")
    if (userInfo) {
      const filteredImprovementWorks: ImprovementWork[] = filterImprovementWorks(allImprovementWorks, filterState, userInfo, sortBy)
      console.log("filter state")
      setImprovementWorkList(filteredImprovementWorks)
      
    }

  }, [filterState])

  useEffect(()=>{
    console.log("3")
    if (searchTitle) {
      const searchedImprovementWorks: ImprovementWork[] = searchImprovementWorks(allImprovementWorks, searchTitle, sortBy)
      setImprovementWorkList(searchedImprovementWorks)
    } else {
      if(userInfo){
        const filteredImprovementWorks: ImprovementWork[] = filterImprovementWorks(allImprovementWorks, filterState, userInfo, sortBy)
        console.log("search filter")
        setImprovementWorkList(filteredImprovementWorks)
      }
    }

    
  }, [searchTitle])


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


      <div className="d-flex pl-7 pr-14">
        <div className="">
          <label htmlFor="sortDropdown" className="form-label me-2">
            Sortera:
          </label>
          <select
            id="sortDropdown"
            value={sortBy}
            className="form-select"
            aria-label="Filtrera"
            onChange={handleSortChange}
          // style={{ width: "8.5rem" }} // Adjust the width as needed
          >
            <option selected value="date_created">
              Visa senaste
            </option>
            <option value="oldest_date">Visa äldsta</option>
            <option value="ascending">
              Visa a-ö
            </option>
            <option value="descending">Visa ö-a</option>
          </select>
        </div>
        <div className="ml-2">
          <label className="form-label me-2">
            Filtrera:
          </label>
          <select className="form-select" aria-label="Filtrera" onChange={handleFilter}>
            <option selected value="user">Visa mina</option>
            <option value="clinic">Visa klinikens</option>
            <option value="centrum">Visa centrets</option>
          </select>
        </div>
        <div className="ml-2 align-self-end">
          <select className="form-select" aria-label="Filtrera" onChange={handlePlace}>
            <option selected value="all_places">Visa alla platser</option>
            {
              placeOptions.map((place) => (
                <option key={place} value={place}> {place}</option>
              ))
            }

          </select>
        </div>

        <div className="ml-2 align-self-end">
          <select className="form-select" aria-label="Filtrera" onChange={handleTags}>
            <option selected value="all_tags">Visa alla taggar</option>
            {
              tagOptions.map((tag) => (
                <option key={tag} value={tag}> {tag}</option>
              ))
            }

          </select>
        </div>


        <div className="ml-auto align-self-end">
        <div className="input-group rounded">
          <input 
          type="search" 
          className="form-control rounded" 
          placeholder="Sök" 
          aria-label="Search" 
          aria-describedby="search-addon" 
          style={{ width: "20rem" }}
          value={searchTitle}
          onChange={(e) => handleTitleSearch(e.target.value)}          
          />
          <IoSearchOutline
                  style={{ fontSize: "1.5rem", marginLeft: "0.5rem", marginTop:"0.4rem" }}
           />
        </div>
        </div>
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
        <ProjectsSection
          title={"Avslutade förbättringsarbeten"}
          userInfo={userInfo}
          allImprovementWorks={allImprovementWorks}
          showClosed={true}
        />
      ) : (
        <p>Loading...</p> // Show a loading indicator
      )}
    </>
  );
}

export default Projects;
