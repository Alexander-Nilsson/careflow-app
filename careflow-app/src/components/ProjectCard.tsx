import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { BiComment, BiFileBlank } from "react-icons/bi";
import { GrTextAlignLeft } from "react-icons/gr";
import pImage from "../Images/p.png";
import pgImage from "../Images/pg.png";
import pgsImage from "../Images/pgs.png";
import pgsaImage from "../Images/pgsa.png";
import { Id } from "../ImprovementWorkLib";
import TrashIcon from "../icons/Trashicon";

export interface ProjectCardProps {
  title: string;
  date_created: any;
  place: string;
  tags: string[];
  phase: Id;
  displayPhaseImage?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  date_created,
  place,
  tags,
  phase,
  displayPhaseImage,
}) => {
  const cardBodyStyle = {
    height: "180px",
    alignItems: "center" as "center",
  };

  const titleStyle = {
    fontFamily: "Avenir",
    fontWeight: "bold",
    marginBottom: "0rem",
    marginTop: "0.3rem",
  };

  const badgeStyle = {
    fontFamily: "Avenir",
    marginTop: "5px",
    marginBottom: "10px",
    marginRight: "0.3rem",
    backgroundColor: "#051F6E",
    color: "white",
    fontSize: "12px",
    borderRadius: "10px",
    padding: "2px 10px",
  };
  const iconContainerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const formatDate = (timestamp: any) => {
    if (timestamp instanceof Date) {
      return timestamp.toLocaleDateString("sv-SE"); // Handle if it's already a Date
    }
    return timestamp.toDate().toLocaleDateString("sv-SE");
  };

  const getPhaseImage = (phase: Id) => {
    switch (phase) {
      case 1:
        return <img src={pImage} />;
      case 2:
        return <img src={pgImage} />;
      case 3:
        return <img src={pgsImage} />;
      case 4:
        return <img src={pgsaImage} />;
    }
  };

  const [mouseIsOver, setMouseIsOver] = useState(false);
  const handleMouseEnter = () => {
    setMouseIsOver(true);
    //console.log(`Hovered over ${title} card`);
  };

  const handleMouseLeave = () => {
    setMouseIsOver(false);
    //console.log(`Left ${title} card`);
  };

  return (
    <Card onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Card.Body style={cardBodyStyle}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {tags ? (
              tags.map((tag, index) => (
                <React.Fragment key={index}>
                  <span style={badgeStyle}>{tag}</span>
                </React.Fragment>
              ))
            ) : (
              <p>Inga taggar</p>
            )}
            <Card.Title style={titleStyle}>{title}</Card.Title>
            <Card.Text style={{ fontFamily: "Avenir", marginBottom: "1rem" }}>
              {formatDate(date_created)}
            </Card.Text>
            <Card.Text style={{ fontFamily: "Avenir", margin: "0rem" }}>
              <span
                role="img"
                aria-label="Pin Emoji"
                style={{ fontSize: "15px" }}
              >
                📍
              </span>
              {place}
            </Card.Text>
            <div style={iconContainerStyle}>
              <GrTextAlignLeft
                style={{ marginLeft: "0.5rem", marginRight: "0.6rem" }}
              />
              <BiFileBlank style={{ marginRight: "0.6rem" }} />
              <BiComment style={{ marginRight: "10rem" }} />
            </div>
          </div>
          {displayPhaseImage && (
            <div
              style={{ position: "absolute", bottom: "1rem", right: "1rem" }}
            >
              {getPhaseImage(phase)}
            </div>
          )}
          <div>
            {mouseIsOver && (
              <button
                onClick={() => {
                  //deleteTask(task.id);
                }}
                className="stroke-black absolute right-4 top-8 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
              >
                <TrashIcon />
              </button>
            )}
          </div>
        </div>
        <div></div>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
