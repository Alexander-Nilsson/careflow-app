import React from "react";
import UserData from "./FetchUserData"; // Import the MovieList component
import FetchUserData from "./FetchUserData";

function StartPage() {
  return (
    <div className="StartPage">
      <h1>Welcome to the Start Page</h1>
      <FetchUserData /> {/* Render the userdata component */}
    </div>
  );
}

export default StartPage;
