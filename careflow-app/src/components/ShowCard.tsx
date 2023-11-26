import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardButton from "./CardButton";
import CardModal from "./CardModal";
import "./ShowCard.css";
import { useSortable } from "@dnd-kit/sortable";
import { ImprovementWork, getMemberName } from "../ImprovementWorkLib";
import { useAuth0 } from "@auth0/auth0-react";

interface ShowCardProps {
  improvementWork: ImprovementWork;
  isAdmin: boolean;
  updateImprovementWorkPhase: (
    improvementWork: ImprovementWork,
    newPhase: number
  ) => void;
}

function ShowCard({
  improvementWork,
  isAdmin,
  updateImprovementWorkPhase,
}: ShowCardProps) {
  // State to track whether the mouse is over the task card

  const [show, setShow] = useState(false);
  const modalClose = () => {
    setShow(false);
    console.log("modalClosed in showcard", show);
  };
  const modalShow = () => {
    setShow(true);
    console.log("setShow in showcard", show);
  };

  const { isLoading } = useAuth0();
  const [leaderName, setLeaderName] = useState<string | null>(null);
  const [memberNames, setMemberNames] = useState<string[]>([]);

  const modalToggle = () => {
    setShow((prevShow) => !prevShow); // Toggle the modal state
    console.log("setShow in showcard", show);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isLoading) {
        return;
      }

      try {
        //console.log("Hej");
        const leaderName = await getMemberName(improvementWork.project_leader);
        setLeaderName(leaderName);
        console.log("hämtar från showCard: ");
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

    // fetchData();
  }, []);

  // UseSortable hook for drag-and-drop functionality
  const { setNodeRef, attributes, listeners, transition, isDragging } =
    useSortable({
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
          improvementWork={improvementWork}
          isAdmin={isAdmin}
          modalToggle={modalToggle} // send toggle function to cardButton
        />

        {
          <CardModal
            show={show}
            onHide={modalClose}
            improvementWork={improvementWork}
            updateImprovementWorkPhase={updateImprovementWorkPhase}
          />
        }
      </div>
    </div>
  );
}

export default ShowCard;
