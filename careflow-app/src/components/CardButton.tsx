import Card from "react-bootstrap/Card";
import { PersonFill } from "react-bootstrap-icons";
import "./CardButton.css";
import PaperClipComponent from "./Paperclip";
import CommentIconComponent from "./CommentIcon";
import ListIconComponent from "./ListIcon";
import { Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import TrashIcon from "../icons/Trashicon";
import { ImprovementWork, deleteProject } from "../ImprovementWorkLib";
import { useAuth0 } from "@auth0/auth0-react";
import CardDeleteModal from "./CardDeleteModal";

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
  improvementWork: ImprovementWork;
  isAdmin: boolean;
  modalToggle: () => void;
}

function CardButton({
  title,
  tags,
  date_created,
  improvementWork,
  isAdmin,
  modalToggle,
}: CardButtonProps) {
  const [showModal, setShowModal] = useState(false); // State variable to control modal visibility

  const handleButtonClick = () => {
    setShowModal(true); // Show the modal when the button is clicked
    console.log("Trash icon clicked!", isAdmin);
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal when needed
    console.log("modalClose");
  };

  const formattedDate = date_created.toDate().toLocaleString().slice(0, 10); //Format the date into a string only first 10 char

  const [mouseIsOver, setMouseIsOver] = useState(false);
  const handleMouseEnter = () => {
    setMouseIsOver(true);
  };

  const handleMouseLeave = () => {
    setMouseIsOver(false);
  };

  return (
    <a href="#" style={{ cursor: "pointer", textDecoration: "none" }}>
      {/* Kom ihåh att ändra CSS storleken om ni ändrar style size */}
      <Card
        style={{
          width: "16vw",
          maxWidth: "300px",
          minWidth: "150px",
          borderRadius: "15px",

          margin: "1vw",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="outerContainer" onClick={modalToggle}>
          <div
            className="tags"
            style={{ marginLeft: "10px", marginTop: "10px" }}
          >
            {tags.slice(0, 2).map((tag, index) => (
              <React.Fragment key={index}>
                <span style={TagContainerStyle}>{tag}</span>
              </React.Fragment>
            ))}
          </div>
          <div
            className="title"
            style={{
              marginLeft: "10px",
              marginTop: "5px",
              fontSize: "15px",
            }}
          >
            {title}
          </div>

          <div className="bottomContainer" style={{ marginLeft: "10px" }}>
            {formattedDate}
          </div>
        </div>

        <div>
          {mouseIsOver && isAdmin && (
            <div>
              <button
                onClick={handleButtonClick}
                className="stroke-black absolute right-4 top-8 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
              >
                <TrashIcon />
              </button>
              {/* Render CardDeleteModal conditionally */}
              {showModal && (
                <CardDeleteModal
                  show={showModal}
                  onHide={handleCloseModal}
                  impWorkId={improvementWork.id.toString()}
                />
              )}
            </div>
          )}
        </div>
      </Card>
    </a>
  );
}

export default CardButton;
