import { Button } from "react-bootstrap";

const ButtonStyle: React.CSSProperties = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "20px",
  top: "300px",
  right: "350px",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  position: "absolute",
};

interface ContinueButtonProps {
  onClick: () => void;
}

function ContinueButton({ onClick }: ContinueButtonProps) {
  return (
    <Button id="NyttFörbättringsarbete" onClick={onClick} style={ButtonStyle}>
      Fortsätt där jag slutade
      <img
        src="./Plus.png"
        alt="Image"
        style={{ width: "20px", height: "20px", marginLeft: "15px" }}
      />
    </Button>
  );
}

export default ContinueButton;
