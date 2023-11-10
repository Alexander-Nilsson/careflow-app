import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HelpPopover from "./HelpPopover";
import ProjectCard from "./ProjectCard";
import { ProjectCardProps } from "./ProjectCard";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth0 } from "@auth0/auth0-react";

function DisplayAllProjects() {
  const [projects, setProjects] = useState<ProjectCardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 12; // Adjust this based on your layout
  const { user } = useAuth0();

  const fetchData = async () => {
    const projectsCollectionRef = collection(db, "projects");
    if (user?.name) {
      const q = query(
        projectsCollectionRef,
        where("project_members", "array-contains", user.name)
      );

      try {
        const querySnapshot = await getDocs(q);

        const projectsData: ProjectCardProps[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const project: ProjectCardProps = {
            title: data.title,
            date_created: data.date_created,
            place: data.place,
            tags: data.tags,
            phase: data.phase,
          };

          projectsData.push(project);
        });
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const projectsSectionStyle = {
    background: "rgba(255, 255, 255, 0.70)",
    width: "97%",
    height: "35rem",
    borderRadius: "10px",
    margin: "20px",
    padding: "10px",
    overflowX: "auto" as "auto",
    boxShadow: "0px 0px 10px rgba(100, 100, 100, 0.2)",
  };

  const projectsContainerStyle = {
    display: "flex" as "flex",
    flexDirection: "row" as "row",
    flexWrap: "wrap" as "wrap",
    maxWidth: "100%",
    overflowX: "auto" as "auto",
    paddingBottom: "1rem",
    marginTop: "25px",
    marginLeft: "10px",
    marginRight: "10px",
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalProjects = projects.length;
  const lastProjectIndex = currentPage * projectsPerPage;
  const firstProjectIndex = lastProjectIndex - projectsPerPage;
  const currentProjects = projects.slice(firstProjectIndex, lastProjectIndex);

  return (
    <div style={projectsSectionStyle}>
      <div style={projectsContainerStyle}>
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
      <div style={{ marginTop: "10px", alignItems: "center"}}>
        <div style={{ marginLeft: "10px" , marginBottom: "-25px"}}>Antal: <strong>{totalProjects}</strong></div>
        <div style={{ textAlign: "center" }}>
          {Array.from({ length: Math.ceil(totalProjects / projectsPerPage) }).map(
            (page, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                style={{
                  marginBottom: "5px",
                  padding: "5px 10px",
                  backgroundColor: currentPage === index + 1 ? "#051F6E" : "white",
                  color: currentPage === index + 1 ? "white" : "#051F6E",
                  border: "1px solid #051F6E",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayAllProjects;
