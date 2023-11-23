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
import { ImprovementWork, Iteration } from "../ImprovementWorkLib";

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

const saveButtonStyle = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "14px",
  padding: "10px 50px",
  border: "none",
  cursor: "pointer",
  marginTop: "10px",
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
  improvementWork: ImprovementWork; // passing the improvementWork with all its variables
  project_leader: string;
  project_members: Array<string>;
  /*
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
  purpose: string;
  result_measurements: string;
  result_analysis: string;
  notes_plan: string;
  notes_do: string;
  notes_study: string;
  notes_act: string;
  total_iterations: number;
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
  */
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
  purpose: string;
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
  purpose: string;
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
  purpose: string;
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
  purpose: string;
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

function ModalContentPlan({
  title,
  phase,
  updatedTags,
  setUpdatedTags,
  date_created,
  goals,
  ideas,
  measure,
  purpose,
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
          purpose={purpose}
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
  purpose,
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
          purpose={purpose}
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
  purpose,
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
          purpose={purpose}
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
  purpose,
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
          purpose={purpose}
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
  improvementWork,
  project_leader,
  project_members,
}: cardModalProps) {
  // Now, you can directly use the destructured values
  const {
    id,
    title,
    phase,
    place,
    centrum,
    tags,
    date_created,
    goals,
    ideas: ideas_array, // Renamed from ideas
    ideas_done,
    measure,
    purpose,
    closed,
    all_iterations,
    total_iterations,
  } = improvementWork;

  // Accessing properties from the all_iterations object
  const result_measurements =
    all_iterations[total_iterations - 1].do?.results || "";
  const result_analysis =
    all_iterations[total_iterations - 1].study?.analysis || "";
  const notes_plan = all_iterations[total_iterations - 1].plan?.notes || "";
  const notes_do = all_iterations[total_iterations - 1].do?.notes || "";
  const notes_study = all_iterations[total_iterations - 1].study?.notes || "";
  const notes_act = all_iterations[total_iterations - 1].act?.notes || "";
  const files_plan = all_iterations[total_iterations - 1].plan?.files || {};
  const files_do = all_iterations[total_iterations - 1].do?.files || {};
  const files_study = all_iterations[total_iterations - 1].study?.files || {};
  const files_act = all_iterations[total_iterations - 1].act?.files || {};
  const checklist_plan =
    all_iterations[total_iterations - 1].plan?.checklist || {};

  const currentPhase = typeof phase === "number" ? phase : parseInt(phase, 10);
  const projectId = typeof id === "string" ? id : id.toString();
  const initialIdeasState = ideas_array.map((idea, index) => ({
    text: idea,
    checked: ideas_done[index],
  }));

  //State variable that is updated when the number of iterations is updated, which makes sure that the right Iteration's info is displayed
  const [updatedTotalIterations, setUpdatedTotalIterations] =
    useState(total_iterations);

  //State variable that is updated when the improvement work is marked as finished
  const [isClosed, setIsClosed] = useState(closed);

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

  //Keeps track on if an idea has been chosen or not, since the content of the modal will vary depending on this
  const [ideas, setIdeas] = useState(initialIdeasState);

  //Handles what happens when an idea is clicked, if an idea already has been chosen and another one is clicked - the confirmation modal will show
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedIdeaIndex, setSelectedIdeaIndex] = useState<number | null>(
    null
  );

  //State variable that handles if the "Sparat!" text will show or not
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  const showSaveMessage = () => {
    setShowSavedMessage(true);

    //Hide the "Saved" message after 3 seconds
    setTimeout(() => {
      setShowSavedMessage(false);
    }, 2000);
  };

  const handleIdeaClick = (index: number) => {
    const isOtherIdeaChecked = ideas.some(
      (idea, i) => idea.checked && i !== index
    );
    // Checks if any other idea is already checked
    if (isOtherIdeaChecked) {
      setShowConfirmationModal(true);
      setSelectedIdeaIndex(index); // Save the index of the clicked idea
    } else {
      const updatedIdeas = [...ideas];
      updatedIdeas[index].checked = true;
      setIdeas(updatedIdeas);
      updateDb(updatedProjectPhase, false);
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

      //Set the active phase and tab back to plan and clear all iteration-related fields
      setUpdatedProjectPhase(2);
      setSelectedTab("2");
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

      //Update the database with the cleared fields
      clearDb(updatedIdeas.map((idea) => idea.checked));
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

  //Called whenever mark phase as done is called
  const handlePhaseUpdate = (phase: number) => {
    if (phase === 5) {
      //If "Avsluta arbete" is clicked in the act phase
      onHide();
      setIsClosed(true);
      updateDb(phase, true);
    } else if (phase === 6) {
      //If "Påbörja ny iteration med samma idé" (phase === 6) or "Påbörja ny iteration med annan idé" (phase === 7) is clicked in the act phase
      //Sets the phase to plan and clear all state-variables related to the iteration
      setUpdatedProjectPhase(2);
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
      addNewIterationInDb(ideas.map((idea) => idea.checked)); //Creates an new iteration in the db, where chosen idea stays the same
      setUpdatedTotalIterations(updatedTotalIterations + 1); //Update the state variable totalIterations
    } else if (phase === 7) {
      console.log("Fortsätt med ny ide");
      setUpdatedProjectPhase(2);
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
      addNewIterationInDb(); //Creates an new iteration in the db, where chosen idea will be set to none
      setUpdatedTotalIterations(updatedTotalIterations + 1); //Update the state variable totalIterations

      //Also updated the state variable ideas so that all ideas will be set to false
      const uncheckedIdeas = ideas.map((idea) => ({
        ...idea,
        checked: false,
      }));

      setIdeas(uncheckedIdeas);
    } else {
      //If "Markera fas som klar" is clicked in the plan, do or study phase
      setUpdatedProjectPhase(phase + 1);
      updateDb(phase + 1, false);
    }
  };

  //Updates the database with the changes made when the save button, "Markera fas som klar" or "Avsluta förbättringsarbete" is clicked, or if an idea has been chosen
  async function updateDb(newPhase: number, isClosed: boolean) {
    try {
      const projectDocRef = doc(db, "improvementWorks", projectId);
      const projectDoc = await getDoc(projectDocRef);

      if (projectDoc.exists()) {
        const data = projectDoc.data();
        const updatedData = {
          closed: isClosed,
          phase: newPhase,
          tags: updatedTags,
          ideas_done: ideas.map((idea) => idea.checked),
          all_iterations: data.all_iterations?.map(
            (iteration: Iteration, index: number) => {
              if (index === updatedTotalIterations - 1) {
                // Update the last iteration
                return {
                  ...iteration,
                  plan: {
                    ...iteration.plan,
                    checklist: {
                      checklist_done: checklistDone,
                      checklist_items: checklistItems,
                      checklist_members: checklistMembers,
                    },
                    files: {
                      file_names: updatedFilesPlan.file_names,
                      file_descriptions: updatedFilesPlan.file_descriptions,
                    },
                    notes: updatedNotesPlan,
                  },
                  do: {
                    ...iteration.do,
                    results: updatedResultMeasurements,
                    files: {
                      file_names: updatedFilesDo.file_names,
                      file_descriptions: updatedFilesDo.file_descriptions,
                    },
                    notes: updatedNotesDo,
                  },
                  study: {
                    ...iteration.study,
                    analysis: updatedResultAnalysis,
                    files: {
                      file_names: updatedFilesStudy.file_names,
                      file_descriptions: updatedFilesStudy.file_descriptions,
                    },
                    notes: updatedNotesStudy,
                  },
                  act: {
                    ...iteration.act,
                    files: {
                      file_names: updatedFilesAct.file_names,
                      file_descriptions: updatedFilesAct.file_descriptions,
                    },
                    notes: updatedNotesAct,
                  },
                };
              }
              // Keep other iterations unchanged
              return iteration; //Behövs denna???
            }
          ),
        };

        await updateDoc(projectDocRef, updatedData);
        console.log(
          "Improvement work " +
            improvementWork.title +
            " updated successfully! Phase updated to: " +
            newPhase +
            " , closed set to: " +
            isClosed +
            " and the ideas array have the following idea checked: " +
            ideas.map((idea) => idea.checked)
        );
      }
    } catch (e) {
      console.error("Error updating improvement work: ", e);
    }
  }

  //This function is called when a new idea is chosen, and what it does is that it updates the database
  //with the new idea, clears all Iteration-related fields and sets the phase of the improvement work to "plan"
  async function clearDb(updatedIdeasChecked: Array<boolean>) {
    try {
      const projectDocRef = doc(db, "improvementWorks", projectId);
      const projectDoc = await getDoc(projectDocRef);
      if (projectDoc.exists()) {
        const data = projectDoc.data();
        const updatedData = {
          phase: 2, // Updates the phase to plan
          ideas_done: updatedIdeasChecked, //Updates the chosen idea
          all_iterations: [
            //Clear all fields of the current iteration
            {
              ...data.all_iterations?.[updatedTotalIterations - 1],
              plan: {
                ...data.all_iterations?.[updatedTotalIterations - 1]?.plan,
                checklist: {
                  checklist_done: [],
                  checklist_items: [],
                  checklist_members: [],
                },
                files: {
                  file_names: [],
                  file_descriptions: [],
                },
                notes: [],
              },
              do: {
                ...data.all_iterations?.[updatedTotalIterations - 1]?.do,
                results: [],
                files: {
                  file_names: [],
                  file_descriptions: [],
                },
                notes: [],
              },
              study: {
                ...data.all_iterations?.[updatedTotalIterations - 1]?.study,
                analysis: [],
                files: {
                  file_names: [],
                  file_descriptions: [],
                },
                notes: [],
              },
              act: {
                ...data.all_iterations?.[updatedTotalIterations - 1]?.act,
                files: {
                  file_names: [],
                  file_descriptions: [],
                },
                notes: [],
              },
            },
          ],
        };

        await updateDoc(projectDocRef, updatedData);
        console.log(
          "Iteration fields cleared, phase set to plan and the new idea successfully updated in db"
        );
      }
    } catch (e) {
      console.error("Error updating improvement work: ", e);
    }
  }

  async function addNewIterationInDb(ideasDone?: Array<boolean>) {
    try {
      const projectDocRef = doc(db, "improvementWorks", projectId);
      const projectDoc = await getDoc(projectDocRef);

      if (projectDoc.exists()) {
        const data = projectDoc.data();
        const allIterations = data.all_iterations || [];

        //Add a new iteration to the array
        const newIteration = {
          plan: {
            checklist: {
              checklist_done: [],
              checklist_items: [],
              checklist_members: [],
            },
            files: {
              file_names: [],
              file_descriptions: [],
            },
            notes: [],
          },
          do: {
            results: [],
            files: {
              file_names: [],
              file_descriptions: [],
            },
            notes: [],
          },
          study: {
            analysis: [],
            files: {
              file_names: [],
              file_descriptions: [],
            },
            notes: [],
          },
          act: {
            files: {
              file_names: [],
              file_descriptions: [],
            },
            notes: [],
          },
        };

        const updatedIdeasDone =
          ideasDone || Array(data.ideas.length).fill(false);

        const updatedData = {
          phase: 2, // Updates the phase to plan
          total_iterations: updatedTotalIterations + 1, //Increases the total_iterations field with 1
          ideas_done: updatedIdeasDone,
          all_iterations: [...allIterations, newIteration], //Adds the new iteration to all_iterations
        };

        await updateDoc(projectDocRef, updatedData);
        console.log(
          "New iteration added successfully! Ideas set to: " + updatedIdeasDone
        );
      }
    } catch (e) {
      console.error("Error updating improvement work: ", e);
    }
  }

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header
          style={{
            borderColor: "#FFFFFF",
            height: "0px",
            paddingTop: "20px",
          }}
          closeButton
        ></Modal.Header>
        <div style={{ position: "relative" }}>
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
                  purpose={purpose}
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
                  project_leader={project_leader}
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
                  purpose={purpose}
                  place={place}
                  centrum={centrum}
                  project_leader={project_leader}
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
                  purpose={purpose}
                  goals={goals}
                  ideas={ideas}
                  measure={measure}
                  place={place}
                  centrum={centrum}
                  project_leader={project_leader}
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
                  purpose={purpose}
                  place={place}
                  centrum={centrum}
                  project_leader={project_leader}
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

          {/* The white div sticking out on the right displaying the current iteration */}
          <div
            style={{
              position: "absolute",
              top: "90px",
              right: "-60px",
              height: "180px",
              display: "flex",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            <div
              style={{
                writingMode: "vertical-lr",
                transform: "rotate(360deg)",
                backgroundColor: "#FFFFFF",
                width: "60px",
                textAlign: "center",
                padding: "15px",
                borderRadius: "0 10px 10px 0",
              }}
            >
              {"Iteration "}
              {updatedTotalIterations}
            </div>
          </div>

          <Modal.Footer>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {showSavedMessage ? (
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    fontStyle: "Avenir",
                    marginBottom: "0px",
                    color: "#008000",
                  }}
                >
                  Arbete sparat!
                </div>
              ) : (
                <div style={{ height: "21px" }}></div>
              )}
              <div>
                <Button
                  onClick={() => {
                    showSaveMessage();
                    updateDb(updatedProjectPhase, false);
                  }}
                  style={saveButtonStyle}
                >
                  Spara
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </div>
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
