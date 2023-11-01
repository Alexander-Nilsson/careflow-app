import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import IdeasSection from "./IdeasSection";
import ProgressSection from "./ProgressSection";

function IdeasAndProgressSection() {
    const ideasAndProgressSectionStyle = {
        backgroundColor: "white",
        display: "flex",
        
    };

    return (
        <div style={ideasAndProgressSectionStyle}>
            <IdeasSection />
            <ProgressSection />
            
        </div>
    );
}

export default IdeasAndProgressSection;