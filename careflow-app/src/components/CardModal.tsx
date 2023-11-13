import { db } from "../firebase";
import { Id } from "../types";
import {
  Timestamp,
  DocumentReference,
  DocumentData,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Modal, Button, Form, Tabs, Tab, Dropdown } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import CardModalNotes from "./CardModalNotes";
import CardModalChecklist from "./CardModalChecklist";
import CardModalSimilarProjects from "./CardModalSimilarProjects";
import "react-circular-progressbar/dist/styles.css";
// Måste köra detta kommando i terminalen för att CircularProgressBar ska fungera: npm install --save react-circular-progressbar

import {
  Calendar,
  Folder2Open,
  GeoAltFill,
  Circle,
  CheckCircle,
  PlusLg,
  BarChart,
  Lightbulb,
  Bullseye,
} from "react-bootstrap-icons";

const IconCircleStyle = {
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
  id: Id;
  title: string;
  phase: Id;
  content: string;
  place: string;
  centrum: string;
  tags: Array<string>;
  date_created: Timestamp;
  result_measurements: string;
  notes_plan: string;
  notes_do: string;
  notes_study: string;
  notes_act: string;
  project_leader: DocumentReference<DocumentData>;
  project_members: Array<string>;
  checklist_plan: {
    checklist_item: Array<string>;
    checklist_done: Array<boolean>;
    checklist_members: Array<string>;
  };
  checklist_do: {
    checklist_item: Array<string>;
    checklist_done: Array<boolean>;
    checklist_members: Array<string>;
  };
  checklist_study: {
    checklist_item: Array<string>;
    checklist_done: Array<boolean>;
    checklist_members: Array<string>;
  };
  checklist_act: {
    checklist_item: Array<string>;
    checklist_done: Array<boolean>;
    checklist_members: Array<string>;
  };
}

interface modalContentPlanProps {
  title: string;
  phase: number;
  tags: Array<string>;
  date_created: Timestamp;
  place: string;
  centrum: string;
  content: string;
  checklist: {
    checklist_item: Array<string>;
    checklist_done: Array<boolean>;
    checklist_members: Array<string>;
  };
  project_leader: string;
  project_members: Array<string>;
  ideas: {
    text: string;
    checked: boolean;
  }[];
  handleIdeaClick: (index: number) => void;
  id: string;
  handlePhaseUpdate: (phase: number) => void;
  notes: string;
}

interface modalContentDoProps {
  title: string;
  phase: number;
  tags: Array<string>;
  date_created: Timestamp;
  place: string;
  centrum: string;
  content: string;
  project_leader: string;
  project_members: Array<string>;
  result_measurements: string;
  ideas: {
    text: string;
    checked: boolean;
  }[];
  handleIdeaClick: (index: number) => void;
  id: string;
  handlePhaseUpdate: (phase: number) => void;
  notes: string;
}

interface modalContentDoStudyActProps {
  title: string;
  phase: number;
  tags: Array<string>;
  date_created: Timestamp;
  place: string;
  centrum: string;
  content: string;
  project_leader: string;
  project_members: Array<string>;
  ideas: {
    text: string;
    checked: boolean;
  }[];
  handleIdeaClick: (index: number) => void;
  id: string;
  handlePhaseUpdate: (phase: number) => void;
  notes: string;
}

interface topLeftProps {
  title: string;
  phase: number;
  content: string;
  place: string;
  centrum: string;
  tags: Array<string>;
  date_created: Timestamp;
  active_tab: number;
  percentage: number;
  ideas: {
    text: string;
    checked: boolean;
  }[];
  handleIdeaClick: (index: number) => void;
  id: string;
  handlePhaseUpdate: (phase: number) => void;
}

interface topRightProps {
  project_leader: string;
  project_members: Array<string>;
}

interface phasePercentageProps {
  percentage: number;
}

//Function that checks if the task's checkbox should be checked or not
function getPhaseIcon(
  activePhase: number,
  projectPhase: number,
  marginLeft: number
) {
  const isChecked = projectPhase > activePhase;
  const iconStyle = {
    marginLeft: `${marginLeft}px`,
    marginRight: "10px",
  };

  return isChecked ? (
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

// Asynchronous function that fetches the project leader's name from the database (should probably move this to Projects.tsx)
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
function ModalContentPlan({
  title,
  phase,
  tags,
  date_created,
  place,
  centrum,
  content,
  checklist,
  project_leader,
  project_members,
  ideas,
  handleIdeaClick,
  id,
  handlePhaseUpdate,
  notes,
}: modalContentPlanProps) {
  // State variable needed to calculate the percentage finished
  const [checklistDone, setChecklistDone] = useState(checklist.checklist_done);

  //Calculates the phase's progress based on the number of checked tasks in the checklist
  function calculatePercentage() {
    const totalItems = checklistDone.length; //Total number of tasks in the checklist
    const trueCount = checklistDone.filter((value) => value).length; //Number of "true" in the the checklist_done array
    const percentageFinished = (trueCount / totalItems) * 100; //Calculates the percentage
    return Math.round(percentageFinished);
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <TopLeftContent
          title={title}
          phase={phase}
          tags={tags}
          date_created={date_created}
          place={place}
          centrum={centrum}
          content={content}
          active_tab={2}
          percentage={calculatePercentage()}
          ideas={ideas}
          handleIdeaClick={handleIdeaClick}
          id={id}
          handlePhaseUpdate={handlePhaseUpdate}
        />
        <TopRightContent
          project_leader={project_leader}
          project_members={project_members}
        />
      </div>

      {/* The content specific for the Plan phase */}

      {/* Checks if any idea has been chosen, and only shows the content below if that is true */}
      {ideas.some((idea) => idea.checked) ? (
        <div>
          <Form>
            <CardModalChecklist
              project_leader={project_leader}
              project_members={project_members}
              checklist={checklist}
              checklistDone={checklistDone}
              setChecklistDone={setChecklistDone}
            />

            <Form.Group style={formGroupStyle}>
              <CardModalNotes
                notes={notes}
                projectId={id}
                notesAttributeInDb={"notes_plan"}
              />
            </Form.Group>
            <FileSection />
          </Form>

          {/* --------------------------------------------------- */}

          <CardModalSimilarProjects />
        </div>
      ) : null}
    </>
  );
}

function ModalContentDo({
  title,
  phase,
  tags,
  date_created,
  place,
  centrum,
  content,
  project_leader,
  project_members,
  result_measurements,
  ideas,
  handleIdeaClick,
  id,
  handlePhaseUpdate,
  notes,
}: modalContentDoProps) {
  //Handles changes made in the text field "Uppmätt resultat"
  const [resultDataSaved, setResultDataSaved] = useState(false);
  const [updatedResult, setUpdatedResult] = useState(result_measurements);

  const handleResultInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedResult(event.target.value);
    setResultDataSaved(false);
  };

  //Updated the database with the new text in "Uppmätt resultat" when the save button is clicked
  async function updateResultInDb() {
    try {
      const projectDocRef = doc(db, "projects", id);
      await updateDoc(projectDocRef, {
        result_measurements: updatedResult,
      });
      setResultDataSaved(true);

      console.log("Document updated!", updatedResult);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <TopLeftContent
          title={title}
          phase={phase}
          tags={tags}
          date_created={date_created}
          place={place}
          centrum={centrum}
          content={content}
          active_tab={3}
          percentage={0}
          ideas={ideas}
          handleIdeaClick={handleIdeaClick}
          id={id}
          handlePhaseUpdate={handlePhaseUpdate}
        />
        <TopRightContent
          project_leader={project_leader}
          project_members={project_members}
        />
      </div>

      {/* The content specific for the Do phase */}

      {/*Checks if any idea has been chosen, and only shows the content below if that is true */}
      {ideas.some((idea) => idea.checked) ? (
        <div>
          <Form>
            <Form.Group style={formGroupStyle}>
              <Form.Label>
                <b>Uppmätt resultat</b>
              </Form.Label>
              <textarea
                className="form-control"
                rows={5}
                value={updatedResult}
                onChange={handleResultInputChange}
              ></textarea>
              <Button
                style={buttonStyle}
                onClick={() => updateResultInDb()}
                disabled={
                  result_measurements === updatedResult || resultDataSaved
                }
              >
                Spara
              </Button>
            </Form.Group>
            <Form.Group style={formGroupStyle}>
              <CardModalNotes
                notes={notes}
                projectId={id}
                notesAttributeInDb={"notes_do"}
              />
            </Form.Group>
            <FileSection />
          </Form>

          {/* ---------------------------------------- */}

          <CardModalSimilarProjects />
        </div>
      ) : null}
    </>
  );
}

function ModalContentStudy({
  title,
  phase,
  tags,
  date_created,
  place,
  centrum,
  content,
  project_leader,
  project_members,
  ideas,
  handleIdeaClick,
  id,
  handlePhaseUpdate,
  notes,
}: modalContentDoStudyActProps) {
  return (
    <>
      <div style={{ display: "flex" }}>
        <TopLeftContent
          title={title}
          phase={phase}
          tags={tags}
          date_created={date_created}
          place={place}
          centrum={centrum}
          content={content}
          active_tab={4}
          percentage={0}
          ideas={ideas}
          handleIdeaClick={handleIdeaClick}
          id={id}
          handlePhaseUpdate={handlePhaseUpdate}
        />
        <TopRightContent
          project_leader={project_leader}
          project_members={project_members}
        />
      </div>

      {/* The content specific for the Study phase */}

      {/*Checks if any idea has been chosen, and only shows the content below if that is true */}
      {ideas.some((idea) => idea.checked) ? (
        <div>
          <Form>
            <Form.Group style={formGroupStyle}>
              <Form.Label>
                <b>Analys av resultat</b>
              </Form.Label>
              <textarea className="form-control" rows={5}></textarea>
            </Form.Group>
            <Form.Group style={formGroupStyle}>
              <CardModalNotes
                notes={notes}
                projectId={id}
                notesAttributeInDb={"notes_study"}
              />
            </Form.Group>
            <FileSection />
          </Form>

          {/* ----------------------------------------- */}

          <CardModalSimilarProjects />
        </div>
      ) : null}
    </>
  );
}

function ModalContentAct({
  title,
  phase,
  tags,
  date_created,
  place,
  centrum,
  content,
  project_leader,
  project_members,
  ideas,
  handleIdeaClick,
  id,
  handlePhaseUpdate,
  notes,
}: modalContentDoStudyActProps) {
  return (
    <>
      <div style={{ display: "flex" }}>
        <TopLeftContent
          title={title}
          phase={phase}
          tags={tags}
          date_created={date_created}
          place={place}
          centrum={centrum}
          content={content}
          active_tab={5}
          percentage={0}
          ideas={ideas}
          handleIdeaClick={handleIdeaClick}
          id={id}
          handlePhaseUpdate={handlePhaseUpdate}
        />
        <TopRightContent
          project_leader={project_leader}
          project_members={project_members}
        />
      </div>

      {/* The content specific for the Act phase */}

      {/*Checks if any idea has been chosen, and only shows the content below if that is true */}
      {ideas.some((idea) => idea.checked) ? (
        <div>
          <Form>
            <Form.Group style={formGroupStyle}>
              <CardModalNotes
                notes={notes}
                projectId={id}
                notesAttributeInDb={"notes_act"}
              />
            </Form.Group>
            <FileSection />
          </Form>

          {/* --------------------------------------------*/}

          <CardModalSimilarProjects />
        </div>
      ) : null}
    </>
  );
}

//Title, tags, centrum, tabs for syfte, mål, mäta and idéer, "markera fas som klar" button
function TopLeftContent({
  title,
  phase,
  content,
  place,
  centrum,
  tags,
  date_created,
  active_tab,
  percentage,
  ideas,
  handleIdeaClick,
  id,
  handlePhaseUpdate,
}: topLeftProps) {
  const formattedDate = date_created.toDate().toLocaleString();

  return (
    <>
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
                  phase > active_tab ||
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
                  phase > active_tab ||
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
                  phase > active_tab ||
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
                  <div style={IconCircleStyle}>
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
              <div style={whiteDescriptionContainerStyle}>{content}</div>
            </Tab>
            <Tab
              eventKey="mål"
              title={
                <span style={flexAndCenter}>
                  <div style={IconCircleStyle}>
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
                Här ska målen beskrivas
              </div>
            </Tab>
            <Tab
              eventKey="mäta"
              title={
                <span style={flexAndCenter}>
                  <div style={IconCircleStyle}>
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
                Här ska mätningarna beskrivas
              </div>
            </Tab>
            <Tab
              eventKey="idéer"
              title={
                <span style={flexAndCenter}>
                  <div style={IconCircleStyle}>
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
                    disabled={ideas.some((idea) => idea.checked === true)} //Check if any of the idea checkboxes is checked, and if yes, disable the checkboxes
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

//Project leader and project members
function TopRightContent({ project_leader, project_members }: topRightProps) {
  return (
    <>
      <div style={projectMembersContainer}>
        <Form.Group>
          <Form.Label>
            <div>
              <b>Förbättringsledare</b>
              <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                {project_leader}
              </div>
              <b>Förbättringsmedlemmar</b>
              {project_members.map((member, index) => (
                <div style={{ marginTop: "10px" }}>{member}</div>
              ))}
            </div>
          </Form.Label>
        </Form.Group>
      </div>
    </>
  );
}

//Section for uploading files
function FileSection({}) {
  const [showFileModal, setShowFileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleShowFileModal = () => {
    setShowFileModal(true);
  };
  const handleCloseFileModal = () => {
    setShowFileModal(false);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSaveFile = (event: FormEvent) => {
    handleCloseFileModal();
    event.preventDefault();
    if (selectedFile) {
      // You can handle the file upload here
      console.log("Selected file:", selectedFile);
    }
  };

  return (
    <>
      <Form.Group style={formGroupStyle}>
        <Form.Label>
          <b>Bilagor</b>
        </Form.Label>
        <div style={whiteContainerStyle}>
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
            onClick={handleShowFileModal}
          >
            <div style={flexAndCenter}>
              <PlusLg style={{ marginRight: "9px" }} />
              <div>Ladda upp bilaga</div>
            </div>
          </Button>
        </div>
      </Form.Group>

      <Modal
        show={showFileModal}
        onHide={handleCloseFileModal}
        style={{ top: "25%", fontFamily: "Avenir" }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center">
          <Form style={{ width: "90%" }}>
            <div className="mb-3 text-center">
              <input
                type="file"
                className="form-control"
                id="fileInput"
                name="file"
                onChange={handleFileChange}
              />
            </div>
            <div className="mb-3 text-center">
              <input
                type="text"
                className="form-control"
                placeholder="Lägg till en beskrivande mening..."
                style={{ fontStyle: "italic" }}
              ></input>
            </div>
            <div className="mb-3 text-center">
              <Button style={saveChecklistButtonStyle} onClick={handleSaveFile}>
                Ladda upp bilaga
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

//The project modal
function CardModal({
  show,
  onHide,
  id,
  title,
  phase,
  content,
  place,
  centrum,
  tags,
  date_created,
  result_measurements,
  notes_plan,
  notes_do,
  notes_study,
  notes_act,
  project_leader,
  project_members,
  checklist_plan,
  checklist_do,
  checklist_study,
  checklist_act,
}: cardModalProps) {
  const currentPhase = typeof phase === "number" ? phase : parseInt(phase, 10);
  const projectId = typeof id === "string" ? id : id.toString();

  //Fetches information about the project leader
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

  //Keeps track on if an idea has been chosen or not, since the content of the modal will vary depending on this
  const [ideas, setIdeas] = useState([
    { text: "Här kommer det finnas en idé", checked: false },
    { text: "Här kommer det finnas en annan", checked: false },
    { text: "Och här kanske en tredje", checked: false },
  ]);

  const handleIdeaClick = (index: number) => {
    const updatedIdeas = [...ideas];
    updatedIdeas[index].checked = true;
    setIdeas(updatedIdeas);
  };

  //Makes sure that the next phase tab is displayed when the user marks a phase as done
  const [updatedProjectPhase, setUpdatedProjectPhase] =
    useState<number>(currentPhase);
  const [selectedTab, setSelectedTab] = useState<string>(
    currentPhase.toString()
  );

  useEffect(() => {
    setSelectedTab(updatedProjectPhase.toString());
  }, [updatedProjectPhase]);

  const handlePhaseUpdate = (phase: number) => {
    setUpdatedProjectPhase(phase + 1);
    updatePhaseInDb(projectId, phase + 1);
  };

  //Updates the projects phase in the database when "Markera fas som klar" is clicked
  async function updatePhaseInDb(projectId: string, newPhase: number) {
    try {
      const projectDocRef = doc(db, "projects", projectId);
      await updateDoc(projectDocRef, { phase: newPhase });

      console.log("Document updated!", newPhase);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Body
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          fontFamily: "Avenir",
        }}
      >
        <Tabs
          activeKey={selectedTab}
          onSelect={(key) => key !== null && setSelectedTab(key)}
          justify
        >
          {/*------ PLANERA ------*/}
          <Tab
            eventKey="2"
            title={
              <span style={flexAndCenter}>
                {getPhaseIcon(2, updatedProjectPhase, 35)}
                Planera
              </span>
            }
          >
            <ModalContentPlan
              title={title}
              phase={updatedProjectPhase}
              tags={tags}
              date_created={date_created}
              place={place}
              centrum={centrum}
              content={content}
              checklist={checklist_plan}
              project_leader={projectLeaderName}
              project_members={project_members}
              ideas={ideas}
              handleIdeaClick={handleIdeaClick}
              id={projectId}
              handlePhaseUpdate={handlePhaseUpdate}
              notes={notes_plan}
            />
          </Tab>

          {/*------ GÖRA ------*/}

          <Tab
            eventKey="3"
            title={
              <span style={flexAndCenter}>
                {getPhaseIcon(3, updatedProjectPhase, 40)}
                Göra
              </span>
            }
          >
            <ModalContentDo
              title={title}
              phase={updatedProjectPhase}
              tags={tags}
              date_created={date_created}
              place={place}
              centrum={centrum}
              content={content}
              project_leader={projectLeaderName}
              project_members={project_members}
              result_measurements={result_measurements}
              ideas={ideas}
              handleIdeaClick={handleIdeaClick}
              id={projectId}
              handlePhaseUpdate={handlePhaseUpdate}
              notes={notes_do}
            />
          </Tab>

          {/*------STUDERA ------*/}

          <Tab
            eventKey="4"
            title={
              <span style={flexAndCenter}>
                {getPhaseIcon(4, updatedProjectPhase, 30)}
                Studera
              </span>
            }
          >
            <ModalContentStudy
              title={title}
              phase={updatedProjectPhase}
              tags={tags}
              date_created={date_created}
              place={place}
              centrum={centrum}
              content={content}
              project_leader={projectLeaderName}
              project_members={project_members}
              ideas={ideas}
              handleIdeaClick={handleIdeaClick}
              id={projectId}
              handlePhaseUpdate={handlePhaseUpdate}
              notes={notes_study}
            />
          </Tab>

          {/*------- AGERA ------*/}

          <Tab
            eventKey="5"
            title={
              <span style={flexAndCenter}>
                {getPhaseIcon(5, updatedProjectPhase, 40)}
                Agera
              </span>
            }
          >
            <ModalContentAct
              title={title}
              phase={updatedProjectPhase}
              tags={tags}
              date_created={date_created}
              place={place}
              centrum={centrum}
              content={content}
              project_leader={projectLeaderName}
              project_members={project_members}
              ideas={ideas}
              handleIdeaClick={handleIdeaClick}
              id={projectId}
              handlePhaseUpdate={handlePhaseUpdate}
              notes={notes_act}
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
