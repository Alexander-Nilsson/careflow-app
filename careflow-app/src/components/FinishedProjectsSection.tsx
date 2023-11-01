import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProjectCard from "./ProjectCard";
import { ProjectCardProps } from "./ProjectCard";
import {db} from "../firebase";
import {collection, getDocs} from "firebase/firestore";


function FinishedProjectsSection() {
    const [projects, setProjects] = useState<ProjectCardProps[]>([]);
   
    const fetchData = async () => {
        const projectsCollectionRef = collection(db, "projects");

        try {
            const querySnapshot = await getDocs(projectsCollectionRef);
            const projectsData: ProjectCardProps[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.closed) {
                    const project: ProjectCardProps = {
                        title: data.title,
                        date_created: data.date_created,
                        place: data.place,
                        tags: data.tags,
                        phase: data.phase,
                       
                    }; 
                    
                    projectsData.push(project);
                }                
            
            });
            setProjects(projectsData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); 

   

    const projectsSectionStyle = {
        backgroundColor: "lightblue",
        width: "97%",
        height: "20rem",
        borderRadius: "10px",
        margin: "20px",
        padding: "10px",
        overflowX: "auto" as "auto", 
    };

    const scrollBarStyles = `
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-thumb {
        background: #A9A9A9;
        border-radius: 4px;  
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 2px; 
    }
`;

    const projectsContainerStyle = {
        display: "flex" as "flex",
        flexDirection: "row" as "row",
        maxWidth: "100%", // Set a maximum width to prevent overflowing
        overflowX: "auto" as "auto", 
        paddingBottom: "1rem"
    };

    const titleStyle = {
        fontFamily: "Avenir",
        marginLeft: "10px",
        marginTop: "10px",
        marginBottom: "1.5rem",
        fontSize: "2rem",
    }; 
       

     return (
        <div style={projectsSectionStyle}>
            <style>{scrollBarStyles}</style>
            <h1 style={titleStyle}>Avslutade förbättringsarbeten</h1>
            
            <div style={projectsContainerStyle}>
                {projects.map((project, index) => (
                    <div className="col-md-6 col-lg-3" style={{marginRight: "1%"}} key={index}>
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
          
        </div>
    );
}

export default FinishedProjectsSection;