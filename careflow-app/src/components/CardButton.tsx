import Card from "react-bootstrap/Card";
import { PersonFill } from "react-bootstrap-icons";

interface CardButtonProps {
  title: string;
  tags: Array<string>;
  onClick: () => void;
}

function CardButton({ title, tags, onClick }: CardButtonProps) {
  return (
    <a
      href="#"
      onClick={onClick}
      style={{ cursor: "pointer", textDecoration: "none" }}
    >
      <Card
        style={{
          width: "18vw",
          maxWidth: "300px",
          minWidth: "150px",
          margin: "1vw",
        }}
      >
        <Card.Body>
          <Card.Title>
            <div> tags</div>
            <div> {"   " + title}</div>
            <div> Datum</div>
            <div> ikoner</div>
            <PersonFill />
          </Card.Title>
          <Card.Text>
            {
              //tags[0]
            }
          </Card.Text>
        </Card.Body>
      </Card>
    </a>
  );
}

export default CardButton;
