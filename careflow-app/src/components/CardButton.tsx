import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';


interface CardButtonProps {
  onClick: () => void;
}

function CardButton({ onClick }: CardButtonProps) {
    return (
      <a href="#" onClick={onClick} style={{ cursor: 'pointer', textDecoration: 'none' }}>
        <Card style={{ width: '18rem', margin: '200px' }}>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </a>
    );
}

export default CardButton;
