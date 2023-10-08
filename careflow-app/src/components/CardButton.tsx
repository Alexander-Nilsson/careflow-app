import Card from "react-bootstrap/Card";
import { PersonFill } from "react-bootstrap-icons";

interface CardButtonProps {
  title: string;
  content: string;
  onClick: () => void;
}

function CardButton({ title, content, onClick }: CardButtonProps) {
  return (
    <a
      href="#"
      onClick={onClick}
      style={{ cursor: "pointer", textDecoration: "none" }}
    >
      <Card style={{ width: "18rem", margin: "10px" }}>
        <Card.Body>
          <Card.Title>
            <PersonFill />
            {"   " + title}
          </Card.Title>
          <Card.Text>{content}</Card.Text>
        </Card.Body>
      </Card>
    </a>
  );
}

export default CardButton;
