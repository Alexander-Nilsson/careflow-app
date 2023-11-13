import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardButton from "./CardButton";
import CardModal from "./CardModal";
import "./ShowCard.css";
// import { Project } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Project } from "../ProjectLib";

interface ShowCardProps {
  project: Project;
}
function ShowCard({ project }: ShowCardProps) {
  // State to track whether the mouse is over the task card
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [show, setShow] = useState(false);
  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);

  // State to toggle edit mode for the task content
  //const [editMode, setEditMode] = useState(true);

  // UseSortable hook for drag-and-drop functionality
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: project.id,
    data: {
      type: "Project",
      project,
    },

    //disabled: editMode,
  });

  // Define the style based on drag-and-drop transition
  const style = {
    transition,
  };

  if (isDragging) {
    // Styling for when the task is being dragged
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
          opacity-30
          bg-mainBackgroundColor p-2.5 h-[10vh] min-h-[10vh] w-[15vw] items-center flex text-left rounded-xl border-2 border-blue-500 cursor-grab relative
        "
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <div>
        <CardButton
          title={project.title}
          tags={project.tags}
          date_created={project.date_created}
          onClick={modalShow}
        />
        <CardModal
          show={show}
          onHide={modalClose}
          id={project.id}
          title={project.title}
          phase={project.phase}
          content={project.description}
          place={project.place}
          centrum={project.centrum}
          tags={project.tags}
          date_created={project.date_created}
          result_measurements={project.result_measurements}
          notes_plan={project.notes_plan}
          notes_do={project.notes_do}
          notes_study={project.notes_study}
          notes_act={project.notes_act}
          project_leader={project.project_leader}
          project_members={project.project_members}
          checklist_plan={project.checklist_plan}
          checklist_do={project.checklist_do}
          checklist_study={project.checklist_study}
          checklist_act={project.checklist_act}
        />
      </div>
    </div>
  );
}

export default ShowCard;
