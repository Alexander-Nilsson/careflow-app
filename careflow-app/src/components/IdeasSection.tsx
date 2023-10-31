import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HelpPopover from "./HelpPopover";

function IdeasSection() {
    // You can define your project data here
    const ideasSectionStyle = {
        backgroundColor: "lightblue",
        width: "400px",
        height: "250px",
        borderRadius: "10px",
        margin: "10px",
        marginLeft: "20px",
        marginTop: "0px",
    };

    return (
        <div style={ideasSectionStyle}>
            <h1>Ideer
            <div style={{ display: 'inline-block', marginLeft: '10px' }}>
            <HelpPopover content = "Här kommer det vara en informationsruta som hjälper användaren att skicka in nya idéer"/>
            </div>
            </h1>
            
        </div>
    );
}

export default IdeasSection;