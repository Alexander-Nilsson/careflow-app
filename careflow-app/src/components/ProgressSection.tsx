import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressBar from 'react-bootstrap/ProgressBar';

function ProgressSection() {
    // You can define your project data here
    const progressSectionStyle = {
        backgroundColor: "lightblue",
        width: "700px",
        height: "250px",
        borderRadius: "10px",
        margin: "10px",
        marginTop: "0px",

    };

    return (
        
        <div style={progressSectionStyle}>
            <h1>Framsteg för Region Östergötland 2023</h1>
            <ProgressBar animated now={30} label={`${30}%`} />
            
        </div>
    );
}

export default ProgressSection;