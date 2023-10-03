import React from "react";
import UserData from "./FetchUserData"; // Import the MovieList component
import FetchUserData from "./FetchUserData";

function StartPage() {
  return (
    <div className="StartPage">
      <FetchUserData />
    </div>
  );
}

export default StartPage;
