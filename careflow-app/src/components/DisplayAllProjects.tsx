import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProjectCard from "./ProjectCard";
import "../styles/DisplayAllProjects.css";
import '../font/font.css';
import { ArchiveFilterState, ImprovementWork, filterAll, filterOnTags, findCentrumOptions, findClinicOptions, findPlaceOptions, findTagOptions, getAllImprovementWorks, sortByDateCreated, sortByOldestDate, sortByTitleAscending, sortByTitleDescending } from "../ImprovementWorkLib";

import { ProjectCardProps } from "./ProjectCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/DisplayAllProjects.css";
import "../font/font.css";
import { UserInfoType, fetchUser } from "./Start";

function DisplayAllProjects() {

  const [allImprovementWorks, setAllImprovementWorks] = useState<ImprovementWork[]>([]);
  const [filteredImprovementWorks, setFilteredImprovementWorks] = useState<ImprovementWork[]>([]);
  const [currentProjects, setCurrentProjects] = useState<ImprovementWork[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 12; // Adjust this based on your layout
  const { user } = useAuth0();
  const [totalProjects, setTotalProjects] = useState<number>(0)

  const [tagOptions, setTagOptions] = useState<string[]>([]);
  const [placeOptions, setPlaceOptions] = useState<string[]>([]);
  const [clinicOptions, setClinicOptions] = useState<string[]>([]);
  const [centrumOptions, setCentrumOptions] = useState<string[]>([]);

  // const closedOptions:string[] = ["all", "open", "closed"]

  const [sortBy, setSortBy] = useState<
    "date_created" | "oldest_date" | "ascending" | "descending">("date_created");

  const [filterState, setFilterState] = useState<ArchiveFilterState>({
    clinic: "all_clinics",
    centrum: "all_centrums",
    tag: "all_tags",
    place: "all_places",
    closed: "all"
  });

  const fetchData = async () => {
    // if (user?.name) {
    const fetchedImprovementWorks: ImprovementWork[] | null = await getAllImprovementWorks();
    setAllImprovementWorks(fetchedImprovementWorks);
    setFilteredImprovementWorks(fetchedImprovementWorks)
    const tags = findTagOptions(fetchedImprovementWorks)
    setTagOptions(tags);
    const places = findPlaceOptions(fetchedImprovementWorks)
    setPlaceOptions(places);
    const clinic = findClinicOptions(fetchedImprovementWorks)
    setClinicOptions(clinic);
    const centrum = findCentrumOptions(fetchedImprovementWorks)
    setCentrumOptions(centrum);
    // }
  };
  useEffect(() => {
    if (filteredImprovementWorks) {
      setTotalProjects(filteredImprovementWorks.length)
      const lastProjectIndex = currentPage * projectsPerPage;
      const firstProjectIndex = lastProjectIndex - projectsPerPage;
      setCurrentProjects(filteredImprovementWorks.slice(firstProjectIndex, lastProjectIndex))
    }
  }, [filteredImprovementWorks]);

  useEffect(() => {
  }, [totalProjects, currentProjects]);

  // for admin func
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null); // Initialize with the type

  useEffect(() => {
    fetchData();

    // Fetch user info to check if admin
    if (user?.name) {
      fetchUser(user.name, user, setUserInfo);
    }
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // denna uppdaterar vilken tag som ska filtreras på.
  const handleTags = (event: any) => {
    setFilterState(prev => ({ ...prev, tag: event.target.value })); //när denna är färdiguppdaterad körs alltså useEffect
  }

  const handlePlace = (event: any) => {
    setFilterState(prev => ({ ...prev, place: event.target.value })); //när denna är färdiguppdaterad körs alltså useEffect
  }

  const handleClinic = (event: any) => {
    setFilterState(prev => ({ ...prev, clinic: event.target.value })); //när denna är färdiguppdaterad körs alltså useEffect
  }

  const handleCentrum = (event: any) => {
    setFilterState(prev => ({ ...prev, centrum: event.target.value })); //när denna är färdiguppdaterad körs alltså useEffect
  }

  const handleClosed = (event: any) => {
    setFilterState(prev => ({ ...prev, closed: event.target.value })); //när denna är färdiguppdaterad körs alltså useEffect
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("sortera!")
    const selectedSortOption = event.target.value as
      | "date_created"
      | "oldest_date"
      | "ascending"
      | "descending";
    setSortBy(selectedSortOption);

    console.log(selectedSortOption)
    if (selectedSortOption === "oldest_date") {
      const sortedProjects = sortByOldestDate(allImprovementWorks);
      setFilteredImprovementWorks(sortedProjects);
    } else if (selectedSortOption === "date_created") {
      const sortedProjects = sortByDateCreated(allImprovementWorks);
      setFilteredImprovementWorks(sortedProjects);
    } else if (selectedSortOption === "ascending") {
      const sortedProjects = sortByTitleAscending(allImprovementWorks);
      setFilteredImprovementWorks(sortedProjects);
    } else if (selectedSortOption === "descending") {
      const sortedProjects = sortByTitleDescending(allImprovementWorks);
      setFilteredImprovementWorks(sortedProjects);
    }
  };

  useEffect(() => {
    const works: ImprovementWork[] = filterAll(allImprovementWorks, filterState, "date_created")
    setFilteredImprovementWorks(works)
  }, [filterState])

  return (
    <div className="projects-section">
      <div className="d-flex flex-wrap justify-content-end">
        <div className="ml-2 mt-2">
          {/* <label htmlFor="sortDropdown" className="form-label me-2">
            Sortera:
          </label> */}
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
        <div className="ml-2 mt-2">
          <select className="form-select" aria-label="Filtrera" onChange={handleClosed}>
            <option selected value="all">Öppna och stängda</option>
            <option value="open">Visa öppna</option>
            <option value="closed">Visa stängda</option>
          </select>
        </div>
        <div className="ml-2 mt-2">
          <select className="form-select" aria-label="Filtrera" onChange={handleTags}>
            <option selected value="all_tags">Visa alla taggar</option>
            {
              tagOptions.map((tag) => (
                <option key={tag} value={tag}> {tag}</option>
              ))
            }
          </select>
        </div>
        <div className="ml-2 mt-2">
          <select className="form-select" aria-label="Filtrera" onChange={handlePlace}>
            <option selected value="all_places">Visa alla platser</option>
            {
              placeOptions.map((place) => (
                <option key={place} value={place}> {place}</option>
              ))
            }

          </select>
        </div>
        <div className="ml-2 mt-2">
          <select className="form-select" aria-label="Filtrera" onChange={handleClinic}>
            <option selected value="all_clinics">Visa alla kliniker</option>
            {
              clinicOptions.map((clinic) => (
                <option key={clinic} value={clinic}> {clinic}</option>
              ))
            }

          </select>
        </div>
        <div className="ml-2 mt-2">
          <select className="form-select" aria-label="Filtrera" onChange={handleCentrum}>
            <option selected value="all_centrums">Visa alla centrum</option>
            {
              centrumOptions.map((centrum) => (
                <option key={centrum} value={centrum}> {centrum}</option>
              ))
            }
          </select>
        </div>
      </div>
      <div className="projects-container">
        {currentProjects.map((project, index) => (
          <div
            className="col-md-6 col-lg-3"
            style={{ marginRight: "0%", }}
            key={index}
          >
            <div style={{ margin: "1%" }}>
              <ProjectCard
                title={project.title}
                date_created={project.date_created}
                place={project.place}
                tags={project.tags}
                phase={project.phase}
                displayPhaseImage={true}
                improvementWork={project}
                isAdmin={userInfo?.admin || false} // Use a default value if userInfo is not available
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        <div style={{ marginLeft: "1px", marginBottom: "5px" }}>
          Antal: <strong>{totalProjects}</strong>
        </div>
        <div className="pagination-buttons">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="pagination-arrow"
            disabled={currentPage === 1}
          >
            {"<"} {/* Left arrow */}
          </button>
          {Array.from({
            length: Math.ceil(totalProjects / projectsPerPage),
          }).map((page, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className="pagination-number"
              style={{
                backgroundColor:
                  currentPage === index + 1 ? "#051F6E" : "white",
                color: currentPage === index + 1 ? "white" : "#051F6E",
              }}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="pagination-arrow"
            disabled={
              currentPage === Math.ceil(totalProjects / projectsPerPage)
            }
          >
            {">"} {/* Right arrow */}
          </button>
        </div >
      </div >
    </div >
  );
}

export default DisplayAllProjects;
