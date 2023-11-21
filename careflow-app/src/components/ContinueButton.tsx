import { Button } from "react-bootstrap";
import rightArrow from "../Images/right-arrow.png";


const ButtonStyle: React.CSSProperties = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "20px",
  padding: "15px",
  border: "none",
  cursor: "pointer",
  marginBottom: "0px",
  display: "flex", // Added for inline elements
  alignItems: "center", // Added to align items vertically
};

interface ContinueButtonProps {
  onClick: () => void;
}

function ContinueButton({ onClick }: ContinueButtonProps) {
  return (
    <Button id="NyttFörbättringsarbete" onClick={onClick} style={ButtonStyle}>
      <img src={rightArrow} alt="Arrow"
        style={{ width: "20px", height: "20px", marginRight: "10px", filter: 'invert(100%)' }}
      />
      Fortsätt där jag slutade
    </Button>
  );
}

export default ContinueButton;
