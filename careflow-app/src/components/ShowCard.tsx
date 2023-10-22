import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardButton from "./CardButton";
import CardModal from "./CardModal";
import "./ShowCard.css";
import { Timestamp } from "firebase/firestore";
import { Id, Project } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ShowCardProps {
  project: Project;
  deleteProject: (id: Id) => void;
  updateProject: (updatedProject: Project) => void;
}
function ShowCard({ project, deleteProject, updateProject }: ShowCardProps) {
  // State to track whether the mouse is over the task card
  const [mouseIsOver, setMouseIsOver] = useState(false);

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
    transform: CSS.Transform.toString(transform),
  };

  // problemet är att de tror dem är ISDragging
  if (isDragging) {
    // Styling for when the task is being dragged
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
          opacity-30
          bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500 cursor-grab relative
        "
      />
    );
  }

  const [show, setShow] = useState(false);

  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
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
          onClick={modalShow}
        />
        <CardModal
          show={show}
          onHide={modalClose}
          title={project.title}
          column={project.phase.toString()}
          content={project.description}
          place={project.place}
          centrum={project.centrum}
          tags={project.tags}
          date_created={project.date_created}
        />
      </div>
    </div>
  );
}

export default ShowCard;
