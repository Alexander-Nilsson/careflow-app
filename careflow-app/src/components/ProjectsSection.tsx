import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HelpPopover from "./HelpPopover";

function ProjectsSection() {
    // You can define your project data here
    const projectsSectionStyle = {
        backgroundColor: "lightblue",
        width: "1120px",
        height: "250px",
        borderRadius: "10px",
        margin: "20px",
    };

    return (
        <div style={projectsSectionStyle}>
            <h1>Pågående förbättringsarbeten
            <div style={{ display: 'inline-block', marginLeft: '10px' }}>
            <HelpPopover content = "Här kommer det vara en informationsruta som hjälper användaren att navigera bland pågående projekt"/>
            </div>
            </h1>
            
        </div>
    );
}

export default ProjectsSection;