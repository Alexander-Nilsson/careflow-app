import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HelpPopover from "./HelpPopover"; import ProjectCard from "./ProjectCard";
import { useAuth0 } from '@auth0/auth0-react';
import {ImprovementWork, getUserImprovementWorks } from "../ImprovementWorkLib";

function FinishedProjectsSection() {
    const [improvementWorks, setImprovementWork] = useState<ImprovementWork[]>([]);

    const { user } = useAuth0();

    const fetchData = async () => {
        if (user?.name) {
            const fetchedImprovementWorks: ImprovementWork[] | null = await getUserImprovementWorks(user.name, true)
            if (fetchedImprovementWorks) setImprovementWork(fetchedImprovementWorks)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    const projectsSectionStyle = {
        background: 'rgba(255, 255, 255, 0.70)',
        width: "97%",
        height: "20rem",
        borderRadius: "10px",
        margin: "20px",
        padding: "10px",
        overflowX: "auto" as "auto",
        boxShadow: '0px 0px 10px rgba(100, 100, 100, 0.2)',
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
            <h1 style={titleStyle}>Avslutade förbättringsarbeten
                <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                    <HelpPopover content="Här kommer det vara en informationsruta som hjälper användaren att navigera bland avslutade projekt" />
                </div>
            </h1>

            <div style={projectsContainerStyle}>
                {improvementWorks.map((improvementWork, index) => (
                    <div className="col-md-6 col-lg-3" style={{ marginRight: "1%" }} key={index}>
                        <ProjectCard
                            title={improvementWork.title}
                            date_created={improvementWork.date_created}
                            place={improvementWork.place}
                            tags={improvementWork.tags}
                            phase={improvementWork.phase}
                            displayPhaseImage={true}
                        />
                    </div>
                ))}

            </div>

        </div>
    );
}

export default FinishedProjectsSection;