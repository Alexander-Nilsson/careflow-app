import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProjectCard from "./ProjectCard";
import "../styles/DisplayAllProjects.css";
import '../font/font.css';
import { ImprovementWork, filterOnTags, findTagOptions, getAllImprovementWorks } from "../ImprovementWorkLib";

import { ProjectCardProps } from "./ProjectCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/DisplayAllProjects.css";
import "../font/font.css";
import { UserInfoType, fetchUser } from "./Start";

function DisplayAllProjects() {

  const [improvementWorks, setImprovementWorks] = useState<ImprovementWork[]>([]);
  const [filteredImprovementWorks, setFilteredImprovementWorks] = useState<ImprovementWork[]>([]);
  const [currentProjects, setCurrentProjects] = useState<ImprovementWork[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 12; // Adjust this based on your layout
  const { user } = useAuth0();
  const [tagOptions, setTagOptions] = useState<string[]>([]);
  const [tagFilter, setTagFilter] = useState<string>("all_tags")
  const [totalProjects, setTotalProjects] = useState<number>(0)


  const fetchData = async () => {
    if (user?.name) {
      const fetchedImprovementWorks: ImprovementWork[] | null = await getAllImprovementWorks();
      setImprovementWorks(fetchedImprovementWorks);
      setFilteredImprovementWorks(fetchedImprovementWorks)
      const tags = findTagOptions(fetchedImprovementWorks);
      setTagOptions(tags);
    }
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
      //console.log(user);
      fetchUser(user.name, user, setUserInfo);
      console.log("User info:", userInfo);
    }
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // denna uppdaterar vilken tag som ska filtreras på.
  const handleTags = (event: any) => {
    setTagFilter(event.target.value)
  }

  useEffect(() => {
    const works: ImprovementWork[] = filterOnTags(improvementWorks, tagFilter, "date_created")
    setFilteredImprovementWorks(works)
  }, [tagFilter])

  return (
    <div className="projects-section">
      <div className="d-flex">
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
      </div>
      <div className="projects-container">
        {currentProjects.map((project, index) => (
          <div
            className="col-md-6 col-lg-3"
            style={{ marginRight: "0%", }}
            key={index}
          >
            <div style={{margin: "1%"}}>
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
