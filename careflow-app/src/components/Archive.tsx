import DisplayAllProjects from "./DisplayAllProjects";
import "../styles/DisplayAllProjects.css";
import HelpPopover from "./HelpPopover";
import '../font/font.css';

function Archive() {
  const startStyle = {
    backgroundColor: "white",
  };

  const contentStyle = {
    marginTop: '20px',
  }

  return (
    
    <div>
      <img
        className="background-gradient"
        alt=""
        src="./background-gradient.png"
      />
        <div style={contentStyle}>
          <h1 className = "blue-label">
              Alla förbättringsarbeten 
              <div style={{display: "inline-block", marginLeft: "10px"}}>
                <HelpPopover content="'Alla förbättringsarbeten' är en sida där du kan se avslutade förbättringsarbeten."/>
                </div>
            </h1>
          <DisplayAllProjects />
        </div>
    </div>
  );
}

export default Archive;