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
import { useState, useEffect, ChangeEvent } from "react";
import { Modal, Button, Form, Tabs, Tab } from "react-bootstrap";
import CardModalNotes from "./CardModalNotes";
import CardModalChecklist from "./CardModalChecklist";
import CardModalSimilarProjects from "./CardModalSimilarProjects";
import CardModalResultMeasurements from "./CardModalResultMeasurements";
import CardModalResultAnalysis from "./CardModalResultAnalysis";
import CardModalFiles from "./CardModalFiles";
import CardModalTopLeft from "./CardModalTopLeft";
import CardModalTopRight from "./CardModalTopRight";
import "react-circular-progressbar/dist/styles.css";
// Måste köra detta kommando i terminalen för att CircularProgressBar ska fungera: npm install --save react-circular-progressbar

import { Circle, CheckCircle } from "react-bootstrap-icons";

const buttonStyle = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "14px",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
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

interface cardModalProps {
  show: boolean;
  onHide: () => void;
  id: Id;
  title: string;
  phase: Id;
  place: string;
  centrum: string;
  tags: Array<string>;
  date_created: Timestamp;
  result_measurements: string;
  result_analysis: string;
  notes_plan: string;
  notes_do: string;
  notes_study: string;
  notes_act: string;
  project_leader: string;
  project_members: Array<string>;
  checklist_plan: {
    checklist_done: Array<boolean>;
    checklist_items: Array<string>;
    checklist_members: Array<string>;
  };
}

interface modalContentPlanProps {
  title: string;
  phase: number;
  updatedTags: Array<string>;
  setUpdatedTags: React.Dispatch<React.SetStateAction<string[]>>;
  date_created: Timestamp;
  place: string;
  centrum: string;
  checklist: {
    checklist_items: Array<string>;
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
  updatedTags: Array<string>;
  setUpdatedTags: React.Dispatch<React.SetStateAction<string[]>>;
  date_created: Timestamp;
  place: string;
  centrum: string;
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

interface modalContentStudyProps {
  title: string;
  phase: number;
  updatedTags: Array<string>;
  setUpdatedTags: React.Dispatch<React.SetStateAction<string[]>>;
  date_created: Timestamp;
  place: string;
  centrum: string;
  project_leader: string;
  project_members: Array<string>;
  result_analysis: string;
  ideas: {
    text: string;
    checked: boolean;
  }[];
  handleIdeaClick: (index: number) => void;
  id: string;
  handlePhaseUpdate: (phase: number) => void;
  notes: string;
}

interface modalContentActProps {
  title: string;
  phase: number;
  updatedTags: Array<string>;
  setUpdatedTags: React.Dispatch<React.SetStateAction<string[]>>;
  date_created: Timestamp;
  place: string;
  centrum: string;
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

//Function that checks if the icon next to the phase (in the tabs at the top) should be checked or not
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

// Asynchronous function that fetches the project leader's name from the database
/*async function getProjectLeader(
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
}*/

//Asynchronous function that fetches the names of the project members
/*async function getProjectMembers(project_members: Array<string>) {
  interface User {
    first_name: string;
    sur_name: string;
  }

  const names: string[] = [];

  for (const memberId of project_members) {
    if (memberId) {
      const userReference = doc(db, "users", memberId);

      try {
        const userDoc = await getDoc(userReference);
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          names.push(userData.first_name + " " + userData.sur_name);
        } else {
          console.error("User document not found.");
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
      }
    }
  }

  return names;
}*/

function ModalContentPlan({
  title,
  phase,
  updatedTags,
  setUpdatedTags,
  date_created,
  place,
  centrum,
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
        <CardModalTopLeft
          title={title}
          phase={phase}
          updatedTags={updatedTags}
          setUpdatedTags={setUpdatedTags}
          date_created={date_created}
          place={place}
          centrum={centrum}
          active_tab={2}
          percentage={calculatePercentage()}
          ideas={ideas}
          handleIdeaClick={handleIdeaClick}
          id={id}
          handlePhaseUpdate={handlePhaseUpdate}
        />
        <CardModalTopRight
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
            <CardModalFiles />
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
  updatedTags,
  setUpdatedTags,
  date_created,
  place,
  centrum,
  project_leader,
  project_members,
  result_measurements,
  ideas,
  handleIdeaClick,
  id,
  handlePhaseUpdate,
  notes,
}: modalContentDoProps) {
  return (
    <>
      <div style={{ display: "flex" }}>
        <CardModalTopLeft
          title={title}
          phase={phase}
          updatedTags={updatedTags}
          setUpdatedTags={setUpdatedTags}
          date_created={date_created}
          place={place}
          centrum={centrum}
          active_tab={3}
          percentage={0}
          ideas={ideas}
          handleIdeaClick={handleIdeaClick}
          id={id}
          handlePhaseUpdate={handlePhaseUpdate}
        />
        <CardModalTopRight
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
              <CardModalResultMeasurements
                result_measurements={result_measurements}
                projectId={id}
              />
            </Form.Group>
            <Form.Group style={formGroupStyle}>
              <CardModalNotes
                notes={notes}
                projectId={id}
                notesAttributeInDb={"notes_do"}
              />
            </Form.Group>
            <CardModalFiles />
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
  updatedTags,
  setUpdatedTags,
  date_created,
  place,
  centrum,
  project_leader,
  project_members,
  result_analysis,
  ideas,
  handleIdeaClick,
  id,
  handlePhaseUpdate,
  notes,
}: modalContentStudyProps) {
  return (
    <>
      <div style={{ display: "flex" }}>
        <CardModalTopLeft
          title={title}
          phase={phase}
          updatedTags={updatedTags}
          setUpdatedTags={setUpdatedTags}
          date_created={date_created}
          place={place}
          centrum={centrum}
          active_tab={4}
          percentage={0}
          ideas={ideas}
          handleIdeaClick={handleIdeaClick}
          id={id}
          handlePhaseUpdate={handlePhaseUpdate}
        />
        <CardModalTopRight
          project_leader={project_leader}
          project_members={project_members}
        />
      </div>

      {/* The content specific for the Study phase */}

      {/*Checks if any idea has been chosen, and only shows the content below if that is true */}
      {ideas.some((idea) => idea.checked) ? (
        <div>
          <Form>
            <CardModalResultAnalysis
              result_analysis={result_analysis}
              projectId={id}
            />
            <Form.Group style={formGroupStyle}>
              <CardModalNotes
                notes={notes}
                projectId={id}
                notesAttributeInDb={"notes_study"}
              />
            </Form.Group>
            <CardModalFiles />
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
  updatedTags,
  setUpdatedTags,
  date_created,
  place,
  centrum,
  project_leader,
  project_members,
  ideas,
  handleIdeaClick,
  id,
  handlePhaseUpdate,
  notes,
}: modalContentActProps) {
  return (
    <>
      <div style={{ display: "flex" }}>
        <CardModalTopLeft
          title={title}
          phase={phase}
          updatedTags={updatedTags}
          setUpdatedTags={setUpdatedTags}
          date_created={date_created}
          place={place}
          centrum={centrum}
          active_tab={5}
          percentage={0}
          ideas={ideas}
          handleIdeaClick={handleIdeaClick}
          id={id}
          handlePhaseUpdate={handlePhaseUpdate}
        />
        <CardModalTopRight
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
            <CardModalFiles />
          </Form>

          {/* --------------------------------------------*/}

          <CardModalSimilarProjects />
        </div>
      ) : null}
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
  place,
  centrum,
  tags,
  date_created,
  result_measurements,
  result_analysis,
  notes_plan,
  notes_do,
  notes_study,
  notes_act,
  project_leader,
  project_members,
  checklist_plan,
}: cardModalProps) {
  const currentPhase = typeof phase === "number" ? phase : parseInt(phase, 10);
  const projectId = typeof id === "string" ? id : id.toString();

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

  //State array of the tags that makes sure that tags removed/tags added are reflected in all phases
  const [updatedTags, setUpdatedTags] = useState(tags);

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
              updatedTags={updatedTags}
              setUpdatedTags={setUpdatedTags}
              date_created={date_created}
              place={place}
              centrum={centrum}
              checklist={checklist_plan}
              project_leader={""}
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
              updatedTags={updatedTags}
              setUpdatedTags={setUpdatedTags}
              date_created={date_created}
              place={place}
              centrum={centrum}
              project_leader={""}
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
              updatedTags={updatedTags}
              setUpdatedTags={setUpdatedTags}
              date_created={date_created}
              place={place}
              centrum={centrum}
              project_leader={""}
              project_members={project_members}
              result_analysis={result_analysis}
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
              updatedTags={updatedTags}
              setUpdatedTags={setUpdatedTags}
              date_created={date_created}
              place={place}
              centrum={centrum}
              project_leader={""}
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
