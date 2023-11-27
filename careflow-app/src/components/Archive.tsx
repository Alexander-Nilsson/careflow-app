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
    width: "90%",
    height: "60%",
    marginLeft: "5%", // 5% margin on the left
    marginRight: "5%", // 5% margin on the right
  }

  const scrollBarStyles = `
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-thumb {
        background: #A9A9A9;
        border-radius: 4px;  
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 2px; 
    }
`;

return (
    <div>
      <img
        className="background-gradient"
        alt=""
        src="./background-gradient.png"
      />
      <style>{scrollBarStyles}</style>
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