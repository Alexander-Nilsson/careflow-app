import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Project } from "../types";
import { useMemo } from "react";
import PlusIcon from "../icons/Plusicon";
import "../styles/Kanban.css";
import ShowCard from "./ShowCard";
import HelpPopover from "./HelpPopover";
import { ImprovementWork } from "../ImprovementWorkLib";

interface Props {
  column: Column;
  //createProject: (columnId: Id) => void;
  //projectList: Project[];
  improvementWorkList: ImprovementWork[];
  isAdmin: boolean;
}

function ColumnContainer({ column, improvementWorkList, isAdmin }: Props) {
  // Memoize task IDs for use in SortableContext
  const tasksIds = useMemo(() => {
    return improvementWorkList.map((improvementWork) => improvementWork.id);
  }, [improvementWorkList]);

  // UseSortable hook for drag-and-drop functionality
  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  // Count the number of tasks in the  column
  const taskCount = improvementWorkList.length;

  // Render the column
  return (
    <>
      {" "}
      {column.title === "Förslag" ? ( // Render something specific for the title "Förslag"
        <div className="kanban-column">
          <div
            className="kanban-columnTitle"
            onClick={() => console.log("förslag pressed")}
            style={{ cursor: "pointer" }}
          >
            <div className="flex gap-2">{"Lägg till förslag"}</div>
            <HelpPopover content={column.columnDescription} position="top" />
          </div>
          <div className="kanban-tasksContainer">
            <SortableContext items={tasksIds}>
              {improvementWorkList.map((improvementWork) => (
                <ShowCard
                  key={improvementWork.id}
                  improvementWork={improvementWork}
                  isAdmin={isAdmin}
                />
              ))}
            </SortableContext>
          </div>
          <div className="kanban-footerButton">
            Antal: {taskCount}
            {/*} <div
        onClick={() => createProject(column.id)}
        className="clickable-icon"
      >
        <PlusIcon />
        </div>*/}
          </div>
        </div>
      ) : (
        <div ref={setNodeRef} className="kanban-column">
          <div className="kanban-columnTitle">
            <div className="flex gap-2">{column.title}</div>
            <HelpPopover content={column.columnDescription} position="top" />
          </div>
          <div className="kanban-tasksContainer">
            <SortableContext items={tasksIds}>
              {improvementWorkList.map((improvementWork) => (
                <ShowCard
                  key={improvementWork.id}
                  improvementWork={improvementWork}
                  isAdmin={isAdmin}
                />
              ))}
            </SortableContext>
          </div>
          <div className="kanban-footerButton">
            Antal: {taskCount}
            {/*} <div
          onClick={() => createProject(column.id)}
          className="clickable-icon"
        >
          <PlusIcon />
          </div>*/}
          </div>
        </div>
      )}
    </>
  );
}

export default ColumnContainer;
