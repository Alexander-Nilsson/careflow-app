import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Project } from "../types";
import { useMemo } from "react";
import PlusIcon from "../icons/Plusicon";
import TaskCard from "./TaskCard";
import "../styles/Kanban.css";

interface Props {
  column: Column;
  createProject: (columnId: Id) => void;
  deleteProject: (id: Id) => void;
  updateProject: (updatedProject: Project) => void;
  projectList: Project[];
}

function ColumnContainer({
  column,
  createProject,
  projectList,
  deleteProject,
  updateProject,
}: Props) {
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

  // Count the number of tasks in the column
  const taskCount = projectList.length;

  // Render the column
  return (
    <div ref={setNodeRef} className="kanban-column">
      <div className="kanban-columnTitle">
        <div className="flex gap-2">{column.title}</div>
        <div>{taskCount}</div>
      </div>
      <div className="kanban-tasksContainer">
        <SortableContext items={tasksIds}>
          {projectList.map((project) => (
            <TaskCard
              key={project.id}
              project={project}
              deleteProject={deleteProject}
              updateProject={updateProject}
            />
          ))}
        </SortableContext>
      </div>
      <button
        className="kanban-footerButton"
        onClick={() => createProject(column.id)}
      >
        <PlusIcon />
        Add task
      </button>
    </div>
  );
}

export default ColumnContainer;
