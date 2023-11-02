import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
            <h1>Ideer</h1>
            
        </div>
    );
}

export default IdeasSection;