import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
            <h1>Framsteg</h1>
            
        </div>
    );
}

export default ProgressSection;