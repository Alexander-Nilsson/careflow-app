import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardButton from "./CardButton";
import CardModal from "./CardModal";
import "./ShowCard.css";
// import { Project } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Project, ImprovementWork } from "../ImprovementWorkLib";

interface ShowCardProps {
  improvementWork: ImprovementWork;
}

function ShowCard({ improvementWork }: ShowCardProps) {
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
    id: improvementWork.id,
    data: {
      type: "ImprovementWork",
      improvementWork,
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

  console.log(
    "resultat",
    improvementWork.all_iterations[improvementWork.total_iterations - 1]
  );

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
          title={improvementWork.title}
          tags={improvementWork.tags}
          date_created={improvementWork.date_created}
          onClick={modalShow}
        />
        {
          <CardModal
            show={show}
            onHide={modalClose}
            id={improvementWork.id}
            title={improvementWork.title}
            phase={improvementWork.phase}
            place={improvementWork.place}
            centrum={improvementWork.centrum}
            tags={improvementWork.tags}
            date_created={improvementWork.date_created}
            result_measurements={
              improvementWork.all_iterations[
                improvementWork.total_iterations - 1
              ].do.results
            }
            result_analysis={
              improvementWork.all_iterations[
                improvementWork.total_iterations - 1
              ].study.analysis
            }
            notes_plan={
              improvementWork.all_iterations[
                improvementWork.total_iterations - 1
              ].plan.notes
            }
            notes_do={
              improvementWork.all_iterations[
                improvementWork.total_iterations - 1
              ].do.notes
            }
            notes_study={
              improvementWork.all_iterations[
                improvementWork.total_iterations - 1
              ].study.notes
            }
            notes_act={
              improvementWork.all_iterations[
                improvementWork.total_iterations - 1
              ].act.notes
            }
            project_leader={improvementWork.project_leader}
            project_members={improvementWork.project_members}
            checklist_plan={
              improvementWork.all_iterations[
                improvementWork.total_iterations - 1
              ].plan.checklist
            }
          />
        }
      </div>
    </div>
  );
}

export default ShowCard;
