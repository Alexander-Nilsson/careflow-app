import { Button } from "react-bootstrap";

const ButtonStyle: React.CSSProperties = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "20px",
  padding: "15px",
  border: "none",
  cursor: "pointer",
  marginBottom: "20px",
  display: "flex", // Added for inline elements
  alignItems: "center", // Added to align items vertically
};

interface CreateProjectButtonProps {
  onClick: () => void;
}

function CreateProjectButton({ onClick }: CreateProjectButtonProps) {
  return (
    <Button id="NyttFörbättringsarbete" onClick={onClick} style={ButtonStyle}>
      <img
        src="./Plus.png"
        alt="Image"
        style={{ width: "20px", height: "20px", marginRight: "10px" }}
      />
      Nytt förbättringsarbete
    </Button>
  );
}

export default CreateProjectButton;
