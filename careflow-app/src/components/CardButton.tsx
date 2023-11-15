import Card from "react-bootstrap/Card";
import { PersonFill } from "react-bootstrap-icons";
import "./CardButton.css";
import PaperClipComponent from "./Paperclip";
import CommentIconComponent from "./CommentIcon";
import ListIconComponent from "./ListIcon";
import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";

const TagStyle = {
  marginTop: "5px",
  marginBottom: "10px",
  color: "white",
  fontSize: "14px",
};

const TagContainerStyle = {
  backgroundColor: "#051F6E",
  padding: "2px 10px",
  marginRight: "5px",
  borderRadius: "10px",
};

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
          width: "16vw",
          maxWidth: "300px",
          minWidth: "150px",
          borderRadius: "15px",

          margin: "1vw",
        }}
      >
        <div className="outerContainer">
          <div className="tags">
            {tags.slice(0, 2).map((tag, index) => (
              <React.Fragment key={index}>
                <span style={TagContainerStyle}>{tag}</span>
              </React.Fragment>
            ))}
          </div>
          <div className="title"> {"   " + title}</div>
          <div className="bottomContainer">
            <div className="dateAndIcons">
              <div className="date">
                <label>{formattedDate}</label>
              </div>
              <div className="icons ">
                {" "}
                <ListIconComponent />
                <PaperClipComponent />
                <CommentIconComponent />
              </div>
            </div>
            <div className="profilCard">
              <PersonFill />
            </div>
          </div>
        </div>
      </Card>
    </a>
  );
}

export default CardButton;
