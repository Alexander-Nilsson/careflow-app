import { Button } from "react-bootstrap";

const ButtonStyle: React.CSSProperties = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "40px",
  top: "400px",
  left: "400px",
  padding: "100x 100px",
  border: "none",
  cursor: "pointer",
  position: "absolute",
};


interface CardButtonProps {
  onClick: () => void;
}

function CardButton({ onClick }: CardButtonProps) {
  return (
    <Button id="ClickCard" onClick={onClick} style={ButtonStyle}>
      Card 1
    </Button>
  );
}

export default CardButton;
