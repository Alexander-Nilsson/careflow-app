import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ProfileSection() {
    const profileSectionStyle = {
        backgroundColor: "lightblue",
        width: "500px",
        height: "250px",
        borderRadius: "10px",
        margin: "20px",
    };

    return (
        <div style={profileSectionStyle}>
            <h1>Min Profil</h1>
            <h3>Namn</h3>
            <h3>Avdelning</h3>
        </div>
    );
}

export default ProfileSection;