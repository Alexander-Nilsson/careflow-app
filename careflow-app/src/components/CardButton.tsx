import Card from "react-bootstrap/Card";
import { PersonFill } from "react-bootstrap-icons";
import "./CardButton.css";

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
      {/* Kom ihåh att ändra CSS storleken om ni ändrar style size */}
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
            <div className="outerContainer">
              <div className="tags"> tags</div>
              <div className="title"> {"   " + title}</div>
              <div className="bottomContainer">
                <div className="dateAndIcons">
                  <div className="date">Date</div>
                  <div className="icons">Icon</div>
                </div>
                <div className="profilCard">
                  <PersonFill />
                </div>
              </div>
            </div>
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
