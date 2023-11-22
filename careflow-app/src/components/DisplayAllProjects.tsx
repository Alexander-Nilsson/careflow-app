import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HelpPopover from "./HelpPopover";
import ProjectCard from "./ProjectCard";
import { ProjectCardProps } from "./ProjectCard";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/DisplayAllProjects.css";
import '../font/font.css';
import {ImprovementWork, getAllImprovementWorks } from "../ImprovementWorkLib";


function DisplayAllProjects() {

  const [improvementWorks, setImprovementWorks] = useState<ImprovementWork[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 12; // Adjust this based on your layout
  const { user } = useAuth0();

  const fetchData = async () => {
    if (user?.name) {
      const fetchedImprovementWorks: ImprovementWork[] | null = await getAllImprovementWorks();
      if (fetchedImprovementWorks) setImprovementWorks(fetchedImprovementWorks);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalProjects = improvementWorks.length;
  const lastProjectIndex = currentPage * projectsPerPage;
  const firstProjectIndex = lastProjectIndex - projectsPerPage;
  const currentProjects = improvementWorks.slice(firstProjectIndex, lastProjectIndex);

  return (
    <div className= "projects-section">
      <div className= "projects-container">
        {currentProjects.map((project, index) => (
          <div
            className="col-md-6 col-lg-3"
            style={{ marginRight: "0%", marginBottom: "1%"}}
            key={index}
          >
            <ProjectCard
              title={project.title}
              date_created={project.date_created}
              place={project.place}
              tags={project.tags}
              phase={project.phase}
              displayPhaseImage={true}
            />
          </div>
        ))}
      </div>
  
      {/* Pagination */}
    <div className="pagination-container">
      <div style={{ marginLeft: "10px", marginBottom: "5px" }}>Antal: <strong>{totalProjects}</strong></div>
      <div className="pagination-buttons">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className= "pagination-arrow"
          disabled={currentPage === 1}
        >
          {"<"} {/* Left arrow */}
        </button>
        {Array.from({ length: Math.ceil(totalProjects / projectsPerPage) }).map(
          (page, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className= "pagination-number"
              style={{
                backgroundColor: currentPage === index + 1 ? "#051F6E" : "white",
                color: currentPage === index + 1 ? "white" : "#051F6E",
              }}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className= "pagination-arrow"
          disabled={currentPage === Math.ceil(totalProjects / projectsPerPage)}
        >
          {">"} {/* Right arrow */}
        </button>
      </div>
    </div>
  </div>
  );
}

export default DisplayAllProjects;
