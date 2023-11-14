import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Project } from "../types";
import { useMemo } from "react";
import PlusIcon from "../icons/Plusicon";
import "../styles/Kanban.css";
import ShowCard from "./ShowCard";
import HelpPopover from "./HelpPopover";

interface Props {
  column: Column;
  createProject: (columnId: Id) => void;
  projectList: Project[];
}

function ColumnContainer({ column, createProject, projectList }: Props) {
  // Memoize task IDs for use in SortableContext
  const tasksIds = useMemo(() => {
    return projectList.map((project) => project.id);
  }, [projectList]);

  // UseSortable hook for drag-and-drop functionality
  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  // Count the number of tasks in the  column
  const taskCount = projectList.length;

  // Render the column
  return (
    <div ref={setNodeRef} className="kanban-column">
      <div className="kanban-columnTitle">
        <div className="flex gap-2">{column.title}</div>

        <HelpPopover content={column.columnDescription} position="top" />
      </div>
      <div className="kanban-tasksContainer">
        <SortableContext items={tasksIds}>
          {projectList.map((project) => (
            <ShowCard key={project.id} project={project} />
          ))}
        </SortableContext>
      </div>
      <div className="kanban-footerButton">
        Antal: {taskCount}
        <div
          onClick={() => createProject(column.id)}
          className="clickable-icon"
        >
          <PlusIcon />
        </div>
      </div>
    </div>
  );
}

export default ColumnContainer;
