import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
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

const ButtonStyle = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "14px",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
};

const SaveChecklistButtonStyle = {
  backgroundColor: "#051F6F",
  fontSize: "16px",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
  width: "100%",
};

const IconStyle = {
  width: "15px",
  height: "15px",
  marginRight: "7px",
  marginTop: "0px",
};

const FlexAndCenter = {
  display: "flex",
  alignItems: "center",
};

const FormGroupStyle = {
  backgroundColor: "#F4F4F4",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "10px",
};

const DescriptionStyle = {
  backgroundColor: "#F4F4F4",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "10px",
};

const WhiteContainerStyle = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E8E7E7",
  paddingTop: "10px",
  paddingBottom: "10px",
  paddingLeft: "15px",
  borderRadius: "10px",
};

const TagStyle = {
  marginTop: "5px",
  marginBottom: "10px",
  color: "#FFFFFF",
  fontSize: "14px",
};

const TagContainerStyle = {
  backgroundColor: "#051F6E",
  padding: "2px 10px",
  marginRight: "5px",
  borderRadius: "10px",
};

const ProjectMembersContainer = {
  width: "34%",
  marginTop: "30px",
  marginBottom: "20px",
  marginLeft: "3%",
  background: "#F4F4F4",
  padding: "20px",
  borderRadius: "10px",
};

interface CardModalProps {
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
}

interface ModalContentProps {
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
}

interface PhasePercentageProps {
  percentage: number;
}

// Funktion som kollar om ikonen bredvid fasen ska vara checkad eller inte
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

// Funktion som returnerar den cirkulära progress-baren
function PhasePercentage({ percentage }: PhasePercentageProps) {
  return (
    <>
      <div style={{ width: 120, height: 120 }}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={{
            path: {
              // Färgen på progress-cirkeln
              stroke: `rgba(5, 31, 110)`,
            },
            trail: {
              // Färgen på cirkeln i bakgrunden
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

// Innehållet i modalen
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
}: ModalContentProps) {
  const formattedDate = date_created.toDate().toLocaleString(); //Format the date into a string
  // Hanterar förändringar av checkboxarna i checklistan
  const [checklistDone, setChecklistDone] = useState(checklist.checklist_done);

  const handleCheckboxChange = (index: number) => {
    setChecklistDone((prevChecklistDone) => {
      const newChecklistDone = [...prevChecklistDone]; // Skapa en kopia av booleanens tidigare state
      newChecklistDone[index] = !newChecklistDone[index]; // Ändra kopians state
      return newChecklistDone; // Returnera det nya statet
    });

    //HÄR SKA DET OCKSÅ LÄGGAS TILL KOD FÖR ATT UPPDATERA DATABASEN MED NYA BOOLEAN-VÄRDET
  };

  // Räknar ut fasens progress i procent baserat på antal gjorda tasks i checklistan
  function calculatePercentage() {
    const totalItems = checklistDone.length; // Räknar totala antalet objekt i checklist_done-arrayen
    const trueCount = checklistDone.filter((value) => value).length; // Räknar antalet "true" i checklist_done-arrayen
    const percentageFinished = (trueCount / totalItems) * 100; // Beräknar hur mycket av fasen som är avklarad (i procent)

    return Math.round(percentageFinished);
  }

  // Hanterar modalen som öppnas när man skapar en ny checklist task
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Gör så att den nya tasken läggs till i checklist-arrayen när man klickar på "lägg till åtgärd"-knappen
  const [newTask, setNewTask] = useState("");
  const [checklistItem, setChecklistItem] = useState(checklist.checklist_item);

  const handleSaveModal = (newTask: string) => {
    //Ser till så att åtgärdsfältet är ifyllt innan tasken läggs till
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
      {/* Innehåll som är samma oberoende fas */}

      <div style={{ display: "flex" }}>
        <div style={{ width: "63%" }}>
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <div style={{ width: "60%" }}>
              <Modal.Title style={{ marginTop: "30px" }}>{title}</Modal.Title>
              <div style={TagStyle}>
                {tags.map((tag, index) => (
                  <React.Fragment key={index}>
                    <span style={TagContainerStyle}>{tag}</span>
                  </React.Fragment>
                ))}
              </div>
              <div>
                <div style={FlexAndCenter}>
                  <Calendar style={IconStyle} />
                  <div>
                    <label>{formattedDate}</label>
                  </div>
                </div>
                <div style={FlexAndCenter}>
                  <Folder2Open style={IconStyle} />
                  <div>
                    <label>{centrum}</label>
                  </div>
                </div>
                <div style={FlexAndCenter}>
                  <GeoAltFill style={IconStyle} />
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
                style={ButtonStyle}
                disabled={
                  active_tab !== parseInt(column) || calculatePercentage() < 100
                }
              >
                Markera fas som klar
              </Button>
            </div>
          </div>

          <Form.Group controlId="planeraDescription" style={DescriptionStyle}>
            <Form.Label>
              <b>Beskrivning</b>
            </Form.Label>
            <div style={WhiteContainerStyle}>{content}</div>
          </Form.Group>
        </div>

        <div style={ProjectMembersContainer}>
          <Form.Group controlId="projectMembersForm">
            <Form.Label>
              <div>
                <b>Medlemmar</b>
              </div>
            </Form.Label>
          </Form.Group>
        </div>
      </div>

      {/* Innehåll specifikt för den aktuella fasen */}

      <Form>
        <Form.Group controlId="planeraChecklist" style={FormGroupStyle}>
          <Form.Label>
            <b>Checklista </b>
          </Form.Label>
          <div style={WhiteContainerStyle}>
            {checklistItem.map((item, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                label={item}
                checked={checklistDone[index]} //Kollar om checkboxen ska vara ifylld eller inte baserat på state-arrayen checklistDone
                onChange={() => handleCheckboxChange(index)} //Hantera checkbox-förändring
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
              <div style={FlexAndCenter}>
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
              <div className="mb-3 text-center">
                <label>Viktning</label>
                <input
                  type="range"
                  className="form-range"
                  min="1"
                  max="10"
                ></input>
              </div>
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
                  style={SaveChecklistButtonStyle}
                  onClick={() => handleSaveModal(newTask)}
                >
                  Lägg till ny åtgärd
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        <Form.Group controlId="planeraNotes" style={FormGroupStyle}>
          <Form.Label>
            <b>Anteckningar</b>
          </Form.Label>
          <textarea className="form-control" rows={3}></textarea>
        </Form.Group>

        <Form.Group controlId="planeraFile" style={FormGroupStyle}>
          <Form.Label>
            <b>Bilagor</b>
          </Form.Label>
          <Form.Control type="file" />
        </Form.Group>
      </Form>

      {/* Innehåll som är samma oberoende av fas */}

      <Form.Group controlId="planeraChecklist" style={FormGroupStyle}>
        <Form.Label>
          <b>Liknande förbättringsarbeten</b>
        </Form.Label>
        <div style={WhiteContainerStyle}>
          Här ska det finnas förslag på liknande förbättringsarbeten
        </div>
      </Form.Group>
    </>
  );
}

// Modalen för förbättringsarbetet
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
  checklist_plan,
  checklist_do,
  checklist_study,
  checklist_act,
}: CardModalProps) {
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

          {/* Planera-taben */}
          <Tab
            eventKey="phase2"
            title={
              <span style={FlexAndCenter}>
                {getPhaseIcon(2, column, 35)}
                Planera
              </span>
            }
          >
            {/* Innehållet i planera-taben */}

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
            />
          </Tab>

          {/*------ GENOMFÖRA ------*/}

          {/* Genomföra-taben */}
          <Tab
            eventKey="phase3"
            title={
              <span style={FlexAndCenter}>
                {getPhaseIcon(3, column, 20)}
                Genomföra
              </span>
            }
          >
            {/* Innehållet i genomföra-taben */}
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
            />
          </Tab>

          {/*------STUDERA ------*/}

          {/* Studera-taben */}

          <Tab
            eventKey="phase4"
            title={
              <span style={FlexAndCenter}>
                {getPhaseIcon(4, column, 30)}
                Studera
              </span>
            }
          >
            {/* Innehållet i studera-taben */}
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
            />
          </Tab>

          {/*------- AGERA ------*/}

          {/* Agera-taben */}

          <Tab
            eventKey="phase5"
            title={
              <span style={FlexAndCenter}>
                {getPhaseIcon(5, column, 40)}
                Agera
              </span>
            }
          >
            {/* Innehållet i agera-taben */}
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
            />
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} style={ButtonStyle}>
          Spara
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CardModal;
