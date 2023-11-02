import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


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
            <h1>Färdiga projekt</h1>
            
        </div>
    );
}

export default FinishedProjectsSection;