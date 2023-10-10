import { Button } from "react-bootstrap";

const ButtonStyle: React.CSSProperties = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "20px",
  top: "260px",
  left: "1000px",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  position: "absolute",
};

interface CreateProjectButtonProps {
  onClick: () => void;
}

function CreateProjectButton({ onClick }: CreateProjectButtonProps) {
  return (
    <Button id="NyttFörbättringsarbete" onClick={onClick} style={ButtonStyle}>
      Nytt förbättringsarbete
      <img
        src="./Plus.png"
        alt="Image"
        style={{ width: "20px", height: "20px", marginLeft: "15px" }}
      />
    </Button>
  );
}

export default CreateProjectButton;
