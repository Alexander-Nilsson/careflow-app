import { db } from "../firebase";
import {
  Timestamp,
  DocumentReference,
  DocumentData,
  doc,
  getDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Tabs, Tab, Dropdown } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// Måste köra detta kommando i terminalen för att CircularProgressBar ska fungera: npm install --save react-circular-progressbar

import {
  Calendar,
  Folder2Open,
  GeoAltFill,
  Circle,
  CheckCircle,
  PlusLg,
} from "react-bootstrap-icons";

const buttonStyle = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "14px",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
};

const saveChecklistButtonStyle = {
  backgroundColor: "#051F6F",
  fontSize: "16px",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
  width: "100%",
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

const formGroupStyle = {
  backgroundColor: "#F4F4F4",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "10px",
};

const descriptionStyle = {
  backgroundColor: "#F4F4F4",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "10px",
};

const whiteContainerStyle = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E8E7E7",
  paddingTop: "10px",
  paddingBottom: "10px",
  paddingLeft: "15px",
  borderRadius: "10px",
};

const tagStyle = {
  marginTop: "5px",
  marginBottom: "10px",
  color: "#FFFFFF",
  fontSize: "14px",
};

const tagContainerStyle = {
  backgroundColor: "#051F6E",
  padding: "2px 10px",
  marginRight: "5px",
  borderRadius: "10px",
};

const projectMembersContainer = {
  width: "34%",
  marginTop: "30px",
  marginBottom: "20px",
  marginLeft: "3%",
  background: "#F4F4F4",
  padding: "20px",
  borderRadius: "10px",
};

interface cardModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  column: string;
  content: string;
  place: string;
  centrum: string;
  tags: Array<string>;
  date_created: Timestamp;
  checklist_plan: {
    checklist_item: Array<string>;
    checklist_done: Array<boolean>;
  };
  checklist_do: {
    checklist_item: Array<string>;
    checklist_done: Array<boolean>;
  };
  checklist_study: {
    checklist_item: Array<string>;
    checklist_done: Array<boolean>;
  };
  checklist_act: {
    checklist_item: Array<string>;
    checklist_done: Array<boolean>;
  };
  project_leader: DocumentReference<DocumentData>;
}

interface modalContentProps {
  title: string;
  tags: Array<string>;
  date_created: Timestamp;
  place: string;
  centrum: string;
  content: string;
  column: string;
  active_tab: number;
  checklist: {
    checklist_item: Array<string>;
    checklist_done: Array<boolean>;
  };
  project_leader: string;
}

interface phasePercentageProps {
  percentage: number;
}

//Function that checks if the task's checkbox should be checked or not
function getPhaseIcon(phase: number, column: string, marginLeft: number) {
  const isCheck = parseInt(column) > phase;
  const iconStyle = {
    marginLeft: `${marginLeft}px`,
    marginRight: "10px",
  };

  return isCheck ? (
    <CheckCircle style={iconStyle} />
  ) : (
    <Circle style={iconStyle} />
  );
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

// Asynchronous function that fetches the project leader's name from the database
async function getProjectLeader(
  project_leader: DocumentReference<DocumentData>
) {
  interface User {
    first_name: string;
    sur_name: string;
  }

  if (project_leader && project_leader.id) {
    const userReference = doc(db, "users", project_leader.id);

    try {
      const userDoc = await getDoc(userReference);
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        return userData.first_name + " " + userData.sur_name;
      } else {
        console.error("User document not found.");
      }
    } catch (error) {
      console.error("Error fetching user document:", error);
    }
  }

  return null;
}

// The content of the modal (Title, tags, description, members, checklist etc)
function ModalContent({
  title,
  tags,
  date_created,
  place,
  centrum,
  content,
  column,
  active_tab,
  checklist,
  project_leader,
}: modalContentProps) {
  const formattedDate = date_created.toDate().toLocaleString(); //Format the date into a string
  // Handles changes of the checkboxes in the checklist
  const [checklistDone, setChecklistDone] = useState(checklist.checklist_done);

  const handleCheckboxChange = (index: number) => {
    setChecklistDone((prevChecklistDone) => {
      const newChecklistDone = [...prevChecklistDone]; //Create a copy of the boolean's previous state
      newChecklistDone[index] = !newChecklistDone[index]; //Change the state of the copy
      return newChecklistDone; //Return the new state
    });

    //HÄR SKA DET OCKSÅ LÄGGAS TILL KOD FÖR ATT UPPDATERA DATABASEN MED NYA BOOLEAN-VÄRDET
  };

  //Calculates the phase's progress based on the number of checked tasks in the checklist
  function calculatePercentage() {
    const totalItems = checklistDone.length; //Total number of tasks in the checklist
    const trueCount = checklistDone.filter((value) => value).length; //Number of "true" in the the checklist_done array
    const percentageFinished = (trueCount / totalItems) * 100; //Calculates the percentage
    return Math.round(percentageFinished);
  }

  //Handles the modal that opens up when you create a new checklist task
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //Adds the new task to the checklist array when the "lägg till åtgärd" button is clicked
  const [newTask, setNewTask] = useState("");
  const [checklistItem, setChecklistItem] = useState(checklist.checklist_item);

  const handleSaveModal = (newTask: string) => {
    //Makes sure that the "åtgärd" field is filled before the task is added
    if (newTask.trim() !== "") {
      setShowModal(false);
      const updatedChecklistItem = [...checklistItem, newTask];
      const updatedChecklistDone = [...checklistDone, false];
      setChecklistItem(updatedChecklistItem);
      setChecklistDone(updatedChecklistDone);
      setNewTask("");
    }

    //HÄR SKA DET OCKSÅ LÄGGAS TILL KOD FÖR ATT UPPDATERA DATABASEN MED NYA CHECKLISTAN
  };

  return (
    <>
      {/* Content that is the same no matter what phase tab is active */}

      <div style={{ display: "flex" }}>
        <div style={{ width: "63%" }}>
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <div style={{ width: "60%" }}>
              <Modal.Title style={{ marginTop: "30px" }}>{title}</Modal.Title>
              <div style={tagStyle}>
                {tags.map((tag, index) => (
                  <React.Fragment key={index}>
                    <span style={tagContainerStyle}>{tag}</span>
                  </React.Fragment>
                ))}
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
              <PhasePercentage percentage={calculatePercentage()} />

              <Button
                style={buttonStyle}
                disabled={
                  active_tab !== parseInt(column) || calculatePercentage() < 100
                }
              >
                Markera fas som klar
              </Button>
            </div>
          </div>

          <Form.Group style={descriptionStyle}>
            <Form.Label>
              <b>Beskrivning</b>
            </Form.Label>
            <div style={whiteContainerStyle}>{content}</div>
          </Form.Group>
        </div>

        <div style={projectMembersContainer}>
          <Form.Group>
            <Form.Label>
              <div>
                <b>Förbättringsledare</b>
                <div style={{ marginBottom: "20px" }}>{project_leader}</div>
                <b>Förbättringsmedlemmar</b>
              </div>
            </Form.Label>
          </Form.Group>
        </div>
      </div>

      {/* Content that is different for each phase */}

      <Form>
        <Form.Group style={formGroupStyle}>
          <Form.Label>
            <b>Checklista</b>
          </Form.Label>
          <div style={whiteContainerStyle}>
            {checklistItem.map((item, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                label={item}
                checked={checklistDone[index]} //Checks if the checkbox should be filled or not based on the state-array "checklistDone"
                onChange={() => handleCheckboxChange(index)} //Handles checkbox changes
              />
            ))}
            <Button
              style={{
                backgroundColor: "#FFFFFF",
                color: "#000000",
                fontSize: "15.5px",
                padding: "0px",
                border: "none",
                cursor: "pointer",
                marginTop: "17px",
              }}
              onClick={handleShowModal}
            >
              <div style={flexAndCenter}>
                <PlusLg style={{ marginRight: "9px" }} />
                <div>Lägg till ny åtgärd</div>
              </div>
            </Button>
          </div>
        </Form.Group>

        <Modal
          show={showModal}
          onHide={handleCloseModal}
          style={{ top: "25%", fontFamily: "Avenir" }}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="d-flex justify-content-center align-items-center">
            <Form style={{ width: "90%" }}>
              <div className="mb-3 text-center">
                <label>Åtgärd</label>
                <input
                  type="text"
                  className="form-control"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                ></input>
              </div>
              {/*<div className="mb-3 text-center">
                <label>Viktning</label>
                <input
                  type="range"
                  className="form-range"
                  min="1"
                  max="10"
                ></input>
            </div>*/}
              <div className="mb-3 text-center">
                <Dropdown>
                  <Dropdown.Toggle
                    style={{
                      width: "100%",
                      backgroundColor: "#FFFFFF",
                      color: "#000000",
                      border: "1px solid #DDDDDD",
                    }}
                  >
                    Lägg till kollegor
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ width: "100%" }}>
                    <Dropdown.Item href="#/action-1">Kollega 1</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Kollega 2</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Kollega 3</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="mb-3 text-center">
                <Button
                  style={saveChecklistButtonStyle}
                  onClick={() => handleSaveModal(newTask)}
                >
                  Lägg till ny åtgärd
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        <Form.Group controlId="planeraNotes" style={formGroupStyle}>
          <Form.Label>
            <b>Anteckningar</b>
          </Form.Label>
          <textarea className="form-control" rows={3}></textarea>
        </Form.Group>

        <Form.Group controlId="planeraFile" style={formGroupStyle}>
          <Form.Label>
            <b>Bilagor</b>
          </Form.Label>
          <Form.Control type="file" />
        </Form.Group>
      </Form>

      {/* Content that is the same no matter what phase tab is active */}

      <Form.Group controlId="planeraChecklist" style={formGroupStyle}>
        <Form.Label>
          <b>Liknande förbättringsarbeten</b>
        </Form.Label>
        <div style={whiteContainerStyle}>
          Här ska det finnas förslag på liknande förbättringsarbeten
        </div>
      </Form.Group>
    </>
  );
}

//The project modal
function CardModal({
  show,
  onHide,
  title,
  column,
  content,
  place,
  centrum,
  tags,
  date_created,
  project_leader,
  checklist_plan,
  checklist_do,
  checklist_study,
  checklist_act,
}: cardModalProps) {
  const [projectLeaderName, setProjectLeaderName] = useState<string>("");

  useEffect(() => {
    const fetchProjectLeader = async () => {
      const name = await getProjectLeader(project_leader);
      if (name !== null) {
        setProjectLeaderName(name);
      }
    };

    fetchProjectLeader();
  }, [project_leader]);

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Body
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          fontFamily: "Avenir",
        }}
      >
        <Tabs defaultActiveKey={"phase" + column} justify>
          {/*------ PLANERA ------*/}
          <Tab
            eventKey="phase2"
            title={
              <span style={flexAndCenter}>
                {getPhaseIcon(2, column, 35)}
                Planera
              </span>
            }
          >
            <ModalContent
              title={title}
              tags={tags}
              date_created={date_created}
              place={place}
              centrum={centrum}
              content={content}
              column={column}
              active_tab={2}
              checklist={checklist_plan}
              project_leader={projectLeaderName}
            />
          </Tab>

          {/*------ GENOMFÖRA ------*/}

          <Tab
            eventKey="phase3"
            title={
              <span style={flexAndCenter}>
                {getPhaseIcon(3, column, 20)}
                Genomföra
              </span>
            }
          >
            <ModalContent
              title={title}
              tags={tags}
              date_created={date_created}
              place={place}
              centrum={centrum}
              content={content}
              column={column}
              active_tab={3}
              checklist={checklist_do}
              project_leader={projectLeaderName}
            />
          </Tab>

          {/*------STUDERA ------*/}

          <Tab
            eventKey="phase4"
            title={
              <span style={flexAndCenter}>
                {getPhaseIcon(4, column, 30)}
                Studera
              </span>
            }
          >
            <ModalContent
              title={title}
              tags={tags}
              date_created={date_created}
              place={place}
              centrum={centrum}
              content={content}
              column={column}
              active_tab={4}
              checklist={checklist_study}
              project_leader={projectLeaderName}
            />
          </Tab>

          {/*------- AGERA ------*/}

          <Tab
            eventKey="phase5"
            title={
              <span style={flexAndCenter}>
                {getPhaseIcon(5, column, 40)}
                Agera
              </span>
            }
          >
            <ModalContent
              title={title}
              tags={tags}
              date_created={date_created}
              place={place}
              centrum={centrum}
              content={content}
              column={column}
              active_tab={5}
              checklist={checklist_act}
              project_leader={projectLeaderName}
            />
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} style={buttonStyle}>
          Spara
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CardModal;
