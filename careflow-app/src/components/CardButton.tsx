import Card from "react-bootstrap/Card";
import { PersonFill } from "react-bootstrap-icons";
import "./CardButton.css";
import { Timestamp } from "firebase/firestore";

interface CardButtonProps {
  title: string;
  tags: Array<string>;
  date_created: Timestamp;
  onClick: () => void;
}


function CardButton({ title, tags, date_created, onClick }: CardButtonProps) {
  const formattedDate = date_created.toDate().toLocaleString().slice(0, 10); //Format the date into a string only first 10 char
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
          borderRadius: "15px",

          margin: "1vw",
        }}
      >
       
         
                    <div className="outerContainer">
              <div className="tags"> tags</div>
              <div className="title"> {"   " + title}</div>
              <div className="bottomContainer">
                <div className="dateAndIcons">
                  <div className="date"> 
                    <label>{formattedDate}</label> 
                  </div>
                  <div className="icons">Icon</div>
                </div>
                <div className="profilCard">
                  <PersonFill/>
                </div>
              </div>
            </div>
       
      </Card>
    </a>
  );
}

export default CardButton;
