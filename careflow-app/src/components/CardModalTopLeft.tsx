import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { Modal, Button, Form, Tabs, Tab } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// Måste köra detta kommando i terminalen för att CircularProgressBar ska fungera: npm install --save react-circular-progressbar

import {
  Calendar,
  Folder2Open,
  GeoAltFill,
  CheckCircle,
  BarChart,
  Lightbulb,
  Bullseye,
} from "react-bootstrap-icons";

const iconCircleStyle = {
  borderRadius: "50%",
  width: "25px",
  height: "25px",
  border: "0.5px solid #AEAEAE",
  marginRight: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FFFFFF",
};

const buttonStyle = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "14px",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
};

const iconStyle = {
  width: "15px",
  height: "15px",
  marginRight: "7px",
  marginTop: "0px",
};

const flexAndCenter = {
  display: "flex",
  alignItems: "center",
};

const descriptionStyle = {
  backgroundColor: "#F4F4F4",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "10px",
};

const whiteDescriptionContainerStyle = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E8E7E7",
  borderTop: "none",
  paddingTop: "20px",
  paddingBottom: "10px",
  paddingLeft: "15px",
  borderBottomLeftRadius: "10px",
  borderBottomRightRadius: "10px",
};

const tagStyle: React.CSSProperties = {
  marginTop: "5px",
  color: "#FFFFFF",
  fontSize: "14px",
  display: "flex",
  flexWrap: "wrap",
};

const tagContainerStyle = {
  backgroundColor: "#051F6E",
  padding: "2px 10px",
  marginRight: "5px",
  marginBottom: "8px",
  borderRadius: "10px",
};

const addTagContainerStyle = {
  backgroundColor: "#AEAEAE",
  padding: "2px 10px",
  marginRight: "5px",
  marginBottom: "8px",
  borderRadius: "10px",
};

const saveTagButtonStyle = {
  backgroundColor: "#051F6F",
  fontSize: "16px",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
  width: "100%",
};

interface cardModalTopLeftProps {
  title: string;
  phase: number;
  place: string;
  centrum: string;
  updatedTags: Array<string>;
  setUpdatedTags: React.Dispatch<React.SetStateAction<string[]>>;
  date_created: Timestamp;
  goal: Array<string>;
  ideas: {
    text: string;
    checked: boolean;
  }[];
  measure: Array<string>;
  active_tab: number;
  percentage: number;
  handleIdeaClick: (index: number) => void;
  id: string;
  handlePhaseUpdate: (phase: number) => void;
}

interface phasePercentageProps {
  percentage: number;
}

//Function that returns the circular progress bar
function PhasePercentage({ percentage }: phasePercentageProps) {
  return (
    <>
      <div style={{ width: 120, height: 120 }}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={{
            path: {
              //Color of the progress circle
              stroke: `rgba(5, 31, 110)`,
            },
            trail: {
              //Color of the circle in the background
              stroke: "#AEAEAE",
            },
            text: {
              fill: "#AEAEAE",
              fontSize: "25px",
            },
          }}
        />
      </div>
    </>
  );
}

//The top left part of the modal containing title, tags, etc. as well as the tabs for purpose, goals, measurements and ideas, the "mark phase as done" button and the circular progress bar
function CardModalTopLeft({
  title,
  phase,
  place,
  centrum,
  updatedTags,
  setUpdatedTags,
  date_created,
  goal,
  measure,
  active_tab,
  percentage,
  ideas,
  handleIdeaClick,
  id,
  handlePhaseUpdate,
}: cardModalTopLeftProps) {
  const formattedDate = date_created.toDate().toLocaleString();
  //const [updatedTags, setUpdatedTags] = useState(tags);
  const [showTagModal, setShowTagModal] = useState(false);
  const [newTag, setNewTag] = useState("");

  //Handles the deletion of tags
  const handleRemoveTag = (indexToRemove: number) => {
    const updatedTagsArray = updatedTags.filter(
      (_, index) => index !== indexToRemove
    );
    setUpdatedTags(updatedTagsArray);

    // MÅSTE UPPDATERA DATABASEN HÄR OCKSÅ
  };

  const handleShowTagModal = () => {
    setShowTagModal(true);
  };
  const handleCloseTagModal = () => {
    setShowTagModal(false);
  };

  //Adds the new tag to the tag array when the "lägg till tagg" button is clicked
  const handleSaveTag = (newTag: string) => {
    //Makes sure that the input field is filled before the tag can be added
    if (newTag.trim() !== "") {
      handleCloseTagModal();
      const updatedTagsArray = [...updatedTags, newTag.toLowerCase()];
      setUpdatedTags(updatedTagsArray);
      setNewTag("");

      // MÅSTE UPPDATERA DATABASEN HÄR OCKSÅ
    }
  };

  return (
    <>
      <div style={{ width: "63%" }}>
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <div style={{ width: "60%" }}>
            <Modal.Title style={{ marginTop: "30px" }}>{title}</Modal.Title>
            <div style={tagStyle}>
              {updatedTags.map((tag, index) => (
                <React.Fragment key={index}>
                  <span style={tagContainerStyle}>
                    {tag}
                    <span
                      style={{ marginLeft: "6px" }}
                      onClick={() => handleRemoveTag(index)}
                    >
                      &times;
                    </span>
                  </span>
                </React.Fragment>
              ))}
              <span style={addTagContainerStyle} onClick={handleShowTagModal}>
                ny tagg +
              </span>
            </div>
            <div>
              <div style={flexAndCenter}>
                <Calendar style={iconStyle} />
                <div>
                  <label>{formattedDate}</label>
                </div>
              </div>
              <div style={flexAndCenter}>
                <Folder2Open style={iconStyle} />
                <div>
                  <label>{centrum}</label>
                </div>
              </div>
              <div style={flexAndCenter}>
                <GeoAltFill style={iconStyle} />
                <div>
                  <label>{place}</label>
                </div>
              </div>
            </div>
          </div>

          {/* The modal that opens up when "add new tag" is clicked */}
          <Modal
            show={showTagModal}
            onHide={handleCloseTagModal}
            style={{ top: "25%", fontFamily: "Avenir" }}
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className="d-flex justify-content-center align-items-center">
              <Form style={{ width: "90%" }}>
                <div className="mb-3 text-center">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Lägg till en tagg..."
                    style={{ fontStyle: "italic" }}
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                  ></input>
                </div>
                <div className="mb-3 text-center">
                  <Button
                    style={saveTagButtonStyle}
                    onClick={() => handleSaveTag(newTag)}
                  >
                    Lägg till tagg
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>

          {/* If the active tab is Planera the donut is shown, if not only the "Markera fas som klar" button is shown */}
          {active_tab === 2 ? ( //If active_tab is plan, show the donut
            <div
              style={{
                width: "40%",
                display: "flex",
                justifyContent: "right",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "40px",
              }}
            >
              <PhasePercentage percentage={percentage} />
              <Button
                style={buttonStyle}
                disabled={
                  phase !== active_tab ||
                  ideas.every((idea) => idea.checked === false)
                }
                onClick={() => handlePhaseUpdate(phase)}
              >
                Markera fas som klar
              </Button>
            </div>
          ) : active_tab === 5 ? ( //If active tab is act, show three different buttons
            <div
              style={{
                width: "40%",
                display: "flex",
                justifyContent: "right",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "40px",
              }}
            >
              <div style={{ width: 120, height: 120 }}></div>
              <Button
                style={buttonStyle}
                disabled={
                  phase !== active_tab ||
                  ideas.every((idea) => idea.checked === false)
                }
              >
                Markera fas som klar
              </Button>
            </div>
          ) : (
            //If active tab is do or study, show only "Markera fas som klar"

            <div
              style={{
                width: "40%",
                display: "flex",
                justifyContent: "right",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "40px",
              }}
            >
              <div style={{ width: 120, height: 120 }}></div>
              <Button
                style={buttonStyle}
                disabled={
                  phase !== active_tab ||
                  ideas.every((idea) => idea.checked === false)
                }
                onClick={() => handlePhaseUpdate(phase)}
              >
                Markera fas som klar
              </Button>
            </div>
          )}
        </div>

        <Form.Group style={descriptionStyle}>
          <Tabs defaultActiveKey="idéer" justify>
            <Tab
              eventKey="syfte"
              title={
                <span style={flexAndCenter}>
                  <div style={iconCircleStyle}>
                    <Bullseye
                      style={{
                        color: "#C71307",
                        width: "15px",
                        height: "15px",
                      }}
                    />
                  </div>
                  Syfte
                </span>
              }
            >
              <div style={whiteDescriptionContainerStyle}>Ett syfte</div>
            </Tab>
            <Tab
              eventKey="mål"
              title={
                <span style={flexAndCenter}>
                  <div style={iconCircleStyle}>
                    <CheckCircle
                      style={{
                        color: "#008000",
                        width: "15px",
                        height: "15px",
                      }}
                    />
                  </div>
                  Mål
                </span>
              }
            >
              <div style={whiteDescriptionContainerStyle}>
                {goal ? (
                  <ul style={{ listStyleType: "none", paddingLeft: "4px" }}>
                    {goal.map((item, index) => (
                      <li key={index} style={{ marginBottom: "8px" }}>
                        {"• "}
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Inga mål satta.</p>
                )}
              </div>
            </Tab>
            <Tab
              eventKey="mäta"
              title={
                <span style={flexAndCenter}>
                  <div style={iconCircleStyle}>
                    <BarChart
                      style={{
                        color: "#32308D",
                        width: "15px",
                        height: "15px",
                      }}
                    />
                  </div>
                  Mäta
                </span>
              }
            >
              <div style={whiteDescriptionContainerStyle}>
                {measure ? (
                  <ul style={{ listStyleType: "none", paddingLeft: "4px" }}>
                    {measure.map((item, index) => (
                      <li key={index} style={{ marginBottom: "8px" }}>
                        {"• "}
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Inga mätningar satta.</p>
                )}
              </div>
            </Tab>
            <Tab
              eventKey="idéer"
              title={
                <span style={flexAndCenter}>
                  <div style={iconCircleStyle}>
                    <Lightbulb
                      style={{
                        color: "#D9C515",
                        width: "15px",
                        height: "15px",
                      }}
                    />
                  </div>
                  Idéer
                </span>
              }
            >
              <div style={whiteDescriptionContainerStyle}>
                {ideas.map((idea, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={idea.text}
                    checked={idea.checked}
                    //disabled={ideas.some((idea) => idea.checked === true)} //Check if any of the idea checkboxes is checked, and if yes, disable the checkboxes
                    onChange={() => handleIdeaClick(index)}
                  />
                ))}

                {ideas.every((idea) => !idea.checked) ? (
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#C71307",
                      marginTop: "15px",
                    }}
                  >
                    Innan förbättringsarbetet kan påbörjas måste det
                    specificeras vilken idé som kommer arbetas med under denna
                    iteration.
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#008000",
                      marginTop: "15px",
                    }}
                  >
                    Nu kan du börja arbeta med förbättringarbetet!
                  </div>
                )}
              </div>
            </Tab>
          </Tabs>
        </Form.Group>
      </div>
    </>
  );
}

export default CardModalTopLeft;
