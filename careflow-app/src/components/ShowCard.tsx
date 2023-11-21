import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardButton from "./CardButton";
import CardModal from "./CardModal";
import "./ShowCard.css";
// import { Project } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Project, ImprovementWork, getMemberName } from "../ImprovementWorkLib";
import { useAuth0 } from "@auth0/auth0-react";
import TrashIcon from "../icons/Trashicon";

interface ShowCardProps {
  improvementWork: ImprovementWork;
}

function ShowCard({ improvementWork }: ShowCardProps) {
  // State to track whether the mouse is over the task card

  const [show, setShow] = useState(false);
  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);

  const { isLoading } = useAuth0();
  const [leaderName, setLeaderName] = useState<string | null>(null);
  const [memberNames, setMemberNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoading) {
        return;
      }

      try {
        console.log("Hej");
        const leaderName = await getMemberName(improvementWork.project_leader);
        setLeaderName(leaderName);

        const names = await Promise.all(
          improvementWork.project_members.map(
            async (member) => await getMemberName(member)
          )
        );
        const filteredNames = names.filter(
          (name) => name !== null
        ) as Array<string>;
        setMemberNames(filteredNames);
      } catch (error) {
        console.error("Error fetching member names:", error);
      }
    };

    fetchData();
  }, []);

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

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div>
        <CardButton
          title={improvementWork.title}
          tags={improvementWork.tags}
          date_created={improvementWork.date_created}
          onClick={modalShow}
        />

        {
          /*
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
            goals={improvementWork.goals}
            ideas_array={improvementWork.ideas}
            measure={improvementWork.measure}
            purpose={improvementWork.purpose}
            result_measurements={
              improvementWork.all_iterations.iteration1.do.results
            }
            result_analysis={
              improvementWork.all_iterations.iteration1.study.analysis
            }
            notes_plan={improvementWork.all_iterations.iteration1.plan.notes}
            notes_do={improvementWork.all_iterations.iteration1.do.notes}
            notes_study={improvementWork.all_iterations.iteration1.study.notes}
            notes_act={improvementWork.all_iterations.iteration1.act.notes}
            files_plan={improvementWork.all_iterations.iteration1.plan.files}
            files_do={improvementWork.all_iterations.iteration1.do.files}
            files_study={improvementWork.all_iterations.iteration1.study.files}
            files_act={improvementWork.all_iterations.iteration1.act.files}
            project_leader={leaderName?.toString() || ""}
            project_members={memberNames}
            checklist_plan={
              improvementWork.all_iterations.iteration1.plan.checklist
            }
          />
        */
          <CardModal
            show={show}
            onHide={modalClose}
            improvementWork={improvementWork}
            project_leader={leaderName?.toString() || ""}
            project_members={memberNames}
          />
        }
      </div>
    </div>
  );
}

export default ShowCard;
