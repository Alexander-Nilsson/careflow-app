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
          /*width: "18vw",*/
          maxWidth: "18vw",
          minWidth: "2vw",
          margin: "0.3vw",
        }}
      >
        <Card.Body>
          <Card.Title>
            <PersonFill />
            {"   " + title}
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
