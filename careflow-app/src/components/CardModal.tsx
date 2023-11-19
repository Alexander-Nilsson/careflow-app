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
  goals: Array<string>;
  ideas_array: Array<string>;
  measure: Array<string>;
  result_measurements: string;
  result_analysis: string;
  notes_plan: string;
  notes_do: string;
  notes_study: string;
  notes_act: string;
  files_plan: {
    file_descriptions: Array<string>;
    file_names: Array<string>;
  };
  files_do: {
    file_descriptions: Array<string>;
    file_names: Array<string>;
  };
  files_study: {
    file_descriptions: Array<string>;
    file_names: Array<string>;
  };
  files_act: {
    file_descriptions: Array<string>;
    file_names: Array<string>;
  };
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
  goals: Array<string>;
  ideas: {
    text: string;
    checked: boolean;
  }[];
  measure: Array<string>;
  place: string;
  centrum: string;
  checklist: {
    checklist_items: Array<string>;
    checklist_done: Array<boolean>;
    checklist_members: Array<string>;
  };
  setChecklistItems: React.Dispatch<React.SetStateAction<string[]>>;
  setChecklistDone: React.Dispatch<React.SetStateAction<boolean[]>>;
  setChecklistMembers: React.Dispatch<React.SetStateAction<string[]>>;
  project_leader: string;
  project_members: Array<string>;
  handleIdeaClick: (index: number) => void;
  id: string;
  handlePhaseUpdate: (phase: number) => void;
  notes: string;
  setUpdatedNotesPlan: React.Dispatch<React.SetStateAction<string>>;
  files: {
    file_descriptions: string[];
    file_names: string[];
  };
  setUpdatedFilesPlan: React.Dispatch<
    React.SetStateAction<{
      file_descriptions: string[];
      file_names: string[];
    }>
  >;
}

interface modalContentDoProps {
  title: string;
  phase: number;
  updatedTags: Array<string>;
  setUpdatedTags: React.Dispatch<React.SetStateAction<string[]>>;
  date_created: Timestamp;
  goals: Array<string>;
  ideas: {
    text: string;
    checked: boolean;
  }[];
  measure: Array<string>;
  place: string;
  centrum: string;
  project_leader: string;
  project_members: Array<string>;
  result_measurements: string;
  setUpdatedResultMeasurements: React.Dispatch<React.SetStateAction<string>>;
  handleIdeaClick: (index: number) => void;
  id: string;
  handlePhaseUpdate: (phase: number) => void;
  notes: string;
  setUpdatedNotesDo: React.Dispatch<React.SetStateAction<string>>;
  files: {
    file_descriptions: string[];
    file_names: string[];
  };
  setUpdatedFilesDo: React.Dispatch<
    React.SetStateAction<{
      file_descriptions: string[];
      file_names: string[];
    }>
  >;
}

interface modalContentStudyProps {
  title: string;
  phase: number;
  updatedTags: Array<string>;
  setUpdatedTags: React.Dispatch<React.SetStateAction<string[]>>;
  date_created: Timestamp;
  goals: Array<string>;
  ideas: {
    text: string;
    checked: boolean;
  }[];
  measure: Array<string>;
  place: string;
  centrum: string;
  project_leader: string;
  project_members: Array<string>;
  result_analysis: string;
  setUpdatedResultAnalysis: React.Dispatch<React.SetStateAction<string>>;
  handleIdeaClick: (index: number) => void;
  id: string;
  handlePhaseUpdate: (phase: number) => void;
  notes: string;
  setUpdatedNotesStudy: React.Dispatch<React.SetStateAction<string>>;
  files: {
    file_descriptions: string[];
    file_names: string[];
  };
  setUpdatedFilesStudy: React.Dispatch<
    React.SetStateAction<{
      file_descriptions: string[];
      file_names: string[];
    }>
  >;
}

interface modalContentActProps {
  title: string;
  phase: number;
  updatedTags: Array<string>;
  setUpdatedTags: React.Dispatch<React.SetStateAction<string[]>>;
  date_created: Timestamp;
  goals: Array<string>;
  ideas: {
    text: string;
    checked: boolean;
  }[];
  measure: Array<string>;
  place: string;
  centrum: string;
  project_leader: string;
  project_members: Array<string>;
  handleIdeaClick: (index: number) => void;
  id: string;
  handlePhaseUpdate: (phase: number) => void;
  notes: string;
  setUpdatedNotesAct: React.Dispatch<React.SetStateAction<string>>;
  files: {
    file_descriptions: string[];
    file_names: string[];
  };
  setUpdatedFilesAct: React.Dispatch<
    React.SetStateAction<{
      file_descriptions: string[];
      file_names: string[];
    }>
  >;
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
  goals,
  ideas,
  measure,
  place,
  centrum,
  checklist,
  setChecklistItems,
  setChecklistDone,
  setChecklistMembers,
  project_leader,
  project_members,
  handleIdeaClick,
  id,
  handlePhaseUpdate,
  notes,
  setUpdatedNotesPlan,
  files,
  setUpdatedFilesPlan,
}: modalContentPlanProps) {
  //Calculates the phase's progress based on the number of checked tasks in the checklist
  function calculatePercentage() {
    const totalItems = checklist.checklist_done.length; //Total number of tasks in the checklist

    if (totalItems === 0) {
      return 0;
    }
    const trueCount = checklist.checklist_done.filter((value) => value).length; //Number of "true" in the the checklist_done array
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
          goals={goals}
          ideas={ideas}
          measure={measure}
          place={place}
          centrum={centrum}
          active_tab={2}
          percentage={calculatePercentage()}
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
              checklist={{
                checklist_items: checklist.checklist_items,
                checklist_done: checklist.checklist_done,
                checklist_members: checklist.checklist_members,
              }}
              setChecklistItems={setChecklistItems}
              setChecklistDone={setChecklistDone}
              setChecklistMembers={setChecklistMembers}
            />

            <Form.Group style={formGroupStyle}>
              <CardModalNotes
                notes={notes}
                setUpdatedNotes={setUpdatedNotesPlan}
              />
            </Form.Group>
            <CardModalFiles
              files={files}
              setUpdatedFiles={setUpdatedFilesPlan}
            />
          </Form>

          {/* --------------------------------------------------- */}

          <CardModalSimilarProjects tags={updatedTags} />
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
  goals,
  ideas,
  measure,
  place,
  centrum,
  project_leader,
  project_members,
  result_measurements,
  setUpdatedResultMeasurements,
  handleIdeaClick,
  id,
  handlePhaseUpdate,
  notes,
  setUpdatedNotesDo,
  files,
  setUpdatedFilesDo,
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
          goals={goals}
          ideas={ideas}
          measure={measure}
          place={place}
          centrum={centrum}
          active_tab={3}
          percentage={0}
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
                updatedResultMeasurements={result_measurements}
                setUpdatedResultMeasurements={setUpdatedResultMeasurements}
                projectId={id}
              />
            </Form.Group>
            <Form.Group style={formGroupStyle}>
              <CardModalNotes
                notes={notes}
                setUpdatedNotes={setUpdatedNotesDo}
              />
            </Form.Group>
            <CardModalFiles files={files} setUpdatedFiles={setUpdatedFilesDo} />
          </Form>

          {/* ---------------------------------------- */}

          <CardModalSimilarProjects tags={updatedTags} />
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
  goals,
  ideas,
  measure,
  place,
  centrum,
  project_leader,
  project_members,
  result_analysis,
  setUpdatedResultAnalysis,
  handleIdeaClick,
  id,
  handlePhaseUpdate,
  notes,
  setUpdatedNotesStudy,
  files,
  setUpdatedFilesStudy,
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
          goals={goals}
          ideas={ideas}
          measure={measure}
          place={place}
          centrum={centrum}
          active_tab={4}
          percentage={0}
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
              updatedResultAnalysis={result_analysis}
              setUpdatedResultAnalysis={setUpdatedResultAnalysis}
              projectId={id}
            />
            <Form.Group style={formGroupStyle}>
              <CardModalNotes
                notes={notes}
                setUpdatedNotes={setUpdatedNotesStudy}
              />
            </Form.Group>
            <CardModalFiles
              files={files}
              setUpdatedFiles={setUpdatedFilesStudy}
            />
          </Form>

          {/* ----------------------------------------- */}

          <CardModalSimilarProjects tags={updatedTags} />
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
  goals,
  ideas,
  measure,
  place,
  centrum,
  project_leader,
  project_members,
  handleIdeaClick,
  id,
  handlePhaseUpdate,
  notes,
  setUpdatedNotesAct,
  files,
  setUpdatedFilesAct,
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
          goals={goals}
          ideas={ideas}
          measure={measure}
          place={place}
          centrum={centrum}
          active_tab={5}
          percentage={0}
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
                setUpdatedNotes={setUpdatedNotesAct}
              />
            </Form.Group>
            <CardModalFiles
              files={files}
              setUpdatedFiles={setUpdatedFilesAct}
            />
          </Form>

          {/* --------------------------------------------*/}

          <CardModalSimilarProjects tags={updatedTags} />
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
  goals,
  ideas_array,
  measure,
  result_measurements,
  result_analysis,
  notes_plan,
  notes_do,
  notes_study,
  notes_act,
  files_plan,
  files_do,
  files_study,
  files_act,
  project_leader,
  project_members,
  checklist_plan,
}: cardModalProps) {
  const currentPhase = typeof phase === "number" ? phase : parseInt(phase, 10);
  const projectId = typeof id === "string" ? id : id.toString();
  const initialIdeasState = ideas_array.map((idea) => ({
    text: idea,
    checked: false,
  }));

  //Keeps track on if an idea has been chosen or not, since the content of the modal will vary depending on this
  const [ideas, setIdeas] = useState(initialIdeasState);

  //Handles what happens when an idea is clicked, if an idea already has been chosen and another one is clicked - the confirmation modal will show
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedIdeaIndex, setSelectedIdeaIndex] = useState<number | null>(
    null
  );

  const handleIdeaClick = (index: number) => {
    // Checks if any other idea is already checked
    const isOtherIdeaChecked = ideas.some(
      (idea, i) => idea.checked && i !== index
    );

    if (isOtherIdeaChecked) {
      setShowConfirmationModal(true);
      setSelectedIdeaIndex(index); // Save the index of the clicked idea
    } else {
      const updatedIdeas = [...ideas];
      updatedIdeas[index].checked = true;
      setIdeas(updatedIdeas);
    }
  };

  const handleConfirmation = (confirmed: boolean) => {
    setShowConfirmationModal(false);
    if (confirmed && selectedIdeaIndex !== null) {
      // Reset all ideas to unchecked
      const updatedIdeas = ideas.map((idea, i) => ({
        ...idea,
        checked: false,
      }));
      // Set the clicked idea to checked
      updatedIdeas[selectedIdeaIndex].checked = true;
      setIdeas(updatedIdeas);

      //Set the active phase back to plan and clear everything
      handlePhaseUpdate(1);
      setChecklistItems([]);
      setChecklistDone([]);
      setChecklistMembers([]);
      setUpdatedNotesPlan("");
      setUpdatedNotesDo("");
      setUpdatedNotesStudy("");
      setUpdatedNotesAct("");
      setUpdatedResultAnalysis("");
      setUpdatedResultMeasurements("");
      setUpdatedFilesPlan({ file_names: [], file_descriptions: [] });
      setUpdatedFilesDo({ file_names: [], file_descriptions: [] });
      setUpdatedFilesStudy({ file_names: [], file_descriptions: [] });
      setUpdatedFilesAct({ file_names: [], file_descriptions: [] });

      //Update the database with the cleared field
      updateDb();

      //Här måste vi också byta vald idé i databasen!
    }
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
  };

  //State array of the tags that makes sure that tags removed/tags added are reflected in all phases
  const [updatedTags, setUpdatedTags] = useState(tags);

  //State variable that contains the updated content of the text field "Analys av resultat"
  const [updatedResultAnalysis, setUpdatedResultAnalysis] =
    useState(result_analysis);

  //State variable that contains the updated content of the text field "Uppmätt resultat"
  const [updatedResultMeasurements, setUpdatedResultMeasurements] =
    useState(result_measurements);

  //State variables that contains the updated content of the text fiels "Övriga anteckningar" of each phase
  const [updatedNotesPlan, setUpdatedNotesPlan] = useState(notes_plan);
  const [updatedNotesDo, setUpdatedNotesDo] = useState(notes_do);
  const [updatedNotesStudy, setUpdatedNotesStudy] = useState(notes_study);
  const [updatedNotesAct, setUpdatedNotesAct] = useState(notes_act);

  //State variables that contains the updated file arrays of each phase
  const [updatedFilesPlan, setUpdatedFilesPlan] = useState(files_plan);
  const [updatedFilesDo, setUpdatedFilesDo] = useState(files_do);
  const [updatedFilesStudy, setUpdatedFilesStudy] = useState(files_study);
  const [updatedFilesAct, setUpdatedFilesAct] = useState(files_act);

  //State variables that contains the updated version of the checklist of the plan phase
  const [checklistItems, setChecklistItems] = useState(
    checklist_plan.checklist_items
  );
  const [checklistDone, setChecklistDone] = useState(
    checklist_plan.checklist_done
  );
  const [checklistMembers, setChecklistMembers] = useState(
    checklist_plan.checklist_members
  );

  //Updates the database with the changes made when the save button is clicked
  async function updateDb() {
    try {
      const projectDocRef = doc(db, "improvementWorks", projectId);
      const projectDoc = await getDoc(projectDocRef);

      if (projectDoc.exists()) {
        const data = projectDoc.data();
        const updatedData = {
          phase: updatedProjectPhase, // Updates the phase
          tags: updatedTags, // Updates the tags
          all_iterations: {
            ...data.all_iterations,
            iteration1: {
              ...data.all_iterations?.iteration1,
              plan: {
                ...data.all_iterations?.iteration1?.plan,
                checklist: {
                  checklist_done: checklistDone,
                  checklist_items: checklistItems,
                  checklist_members: checklistMembers,
                },
                files: {
                  file_names: updatedFilesPlan.file_names,
                  file_descriptions: updatedFilesPlan.file_descriptions,
                },
                notes: updatedNotesPlan, // Updates "Övriga anteckningar" in the plan phase
              },
              do: {
                ...data.all_iterations?.iteration1?.do,
                results: updatedResultMeasurements, // Updates "Uppmätt resultat"
                files: {
                  file_names: updatedFilesDo.file_names,
                  file_descriptions: updatedFilesDo.file_descriptions,
                },
                notes: updatedNotesDo, // Updates "Övriga anteckningar" in the do phase
              },
              study: {
                ...data.all_iterations?.iteration1?.study,
                analysis: updatedResultAnalysis, // Updates "Analys av resultat"
                files: {
                  file_names: updatedFilesStudy.file_names,
                  file_descriptions: updatedFilesStudy.file_descriptions,
                },
                notes: updatedNotesStudy, // Updates "Övriga anteckningar" in the study phase
              },
              act: {
                ...data.all_iterations?.iteration1?.act,
                files: {
                  file_names: updatedFilesAct.file_names,
                  file_descriptions: updatedFilesAct.file_descriptions,
                },
                notes: updatedNotesAct, // Updates "Övriga anteckningar" in the act phase
              },
            },
          },
        };

        await updateDoc(projectDocRef, updatedData);
        console.log("Improvement work updated successfully");
      }
    } catch (e) {
      console.error("Error updating improvement work: ", e);
    }
  }

  return (
    <>
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
                goals={goals}
                ideas={ideas}
                measure={measure}
                place={place}
                centrum={centrum}
                checklist={{
                  checklist_items: checklistItems,
                  checklist_done: checklistDone,
                  checklist_members: checklistMembers,
                }}
                setChecklistItems={setChecklistItems}
                setChecklistDone={setChecklistDone}
                setChecklistMembers={setChecklistMembers}
                project_leader={""}
                project_members={project_members}
                handleIdeaClick={handleIdeaClick}
                id={projectId}
                handlePhaseUpdate={handlePhaseUpdate}
                notes={updatedNotesPlan}
                setUpdatedNotesPlan={setUpdatedNotesPlan}
                files={updatedFilesPlan}
                setUpdatedFilesPlan={setUpdatedFilesPlan}
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
                goals={goals}
                ideas={ideas}
                measure={measure}
                place={place}
                centrum={centrum}
                project_leader={""}
                project_members={project_members}
                result_measurements={updatedResultMeasurements}
                setUpdatedResultMeasurements={setUpdatedResultMeasurements}
                handleIdeaClick={handleIdeaClick}
                id={projectId}
                handlePhaseUpdate={handlePhaseUpdate}
                notes={updatedNotesDo}
                setUpdatedNotesDo={setUpdatedNotesDo}
                files={updatedFilesDo}
                setUpdatedFilesDo={setUpdatedFilesDo}
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
                goals={goals}
                ideas={ideas}
                measure={measure}
                place={place}
                centrum={centrum}
                project_leader={""}
                project_members={project_members}
                result_analysis={updatedResultAnalysis}
                setUpdatedResultAnalysis={setUpdatedResultAnalysis}
                handleIdeaClick={handleIdeaClick}
                id={projectId}
                handlePhaseUpdate={handlePhaseUpdate}
                notes={updatedNotesStudy}
                setUpdatedNotesStudy={setUpdatedNotesStudy}
                files={updatedFilesStudy}
                setUpdatedFilesStudy={setUpdatedFilesStudy}
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
                goals={goals}
                ideas={ideas}
                measure={measure}
                place={place}
                centrum={centrum}
                project_leader={""}
                project_members={project_members}
                handleIdeaClick={handleIdeaClick}
                id={projectId}
                handlePhaseUpdate={handlePhaseUpdate}
                notes={updatedNotesAct}
                setUpdatedNotesAct={setUpdatedNotesAct}
                files={updatedFilesAct}
                setUpdatedFilesAct={setUpdatedFilesAct}
              />
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              onHide();
              updateDb();
            }}
            style={buttonStyle}
          >
            Spara
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showConfirmationModal}
        onHide={() => handleConfirmation(false)}
        style={{ top: "20%", fontFamily: "Avenir" }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center">
          <Form style={{ width: "90%" }}>
            <div className="mb-3 text-center">
              Att byta idé innebär att allt arbete som utförts hittills för den
              nuvarande idén raderas. Om du önskar spara arbetet innan du byter,
              vänligen gå till agera-fasen och välj "Påbörja ny iteration med
              annan idé".
            </div>
            <div className="mb-3 text-center">
              <Button
                onClick={() => handleConfirmation(true)}
                style={buttonStyle}
              >
                Jag vill byta idé utan att spara
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CardModal;
