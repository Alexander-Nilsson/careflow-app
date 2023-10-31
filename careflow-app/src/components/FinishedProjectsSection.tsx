import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HelpPopover from "./HelpPopover";

function FinishedProjectsSection() {
    const FinishedProjectsSectionStyle = {
        backgroundColor: "lightblue",
        width: "1120px",
        height: "250px",
        borderRadius: "10px",
        margin: "20px",
        marginTop: "10px",
        
    };

    return (
        <div style={FinishedProjectsSectionStyle}>
            <h1>Färdiga projekt
            <div style={{ display: 'inline-block', marginLeft: '10px' }}>
            <HelpPopover content = "Här kommer det vara en informationsruta som hjälper användaren att navigera bland avslutade projekt"/>
            </div>
            </h1>
            
        </div>
    );
}

export default FinishedProjectsSection;