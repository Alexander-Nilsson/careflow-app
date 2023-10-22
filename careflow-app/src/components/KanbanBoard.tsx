import { useMemo, useState, useContext, useEffect } from "react";
import { Column, Id, Project } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import "../styles/Kanban.css";
import { ProjectContext, ProjectContextType } from "./Projects";
import { Timestamp } from "firebase/firestore";

//Column titles
const columns: Column[] = [
  { id: 1, title: "Förslag" },
  { id: 2, title: "Planera" },
  { id: 3, title: "Genomföra" },
  { id: 4, title: "Studera" },
  { id: 5, title: "Agera" },
];

function KanbanBoard() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error(
      "KanbanBoard must be used within a ProjectContext Provider"
    );
  }

  const { projectList, setProjectList, updateProject } = context;
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <div className="board-container">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="column-group">
          {columns.map((col) => (
            <ColumnContainer
              key={col.id}
              column={col}
              createProject={createProject}
              deleteProject={deleteProject}
              updateProject={updateProject}
              projectList={projectList.filter(
                (Project) => Project.phase === col.id
              )}
            />
          ))}
        </div>

        {createPortal(
          <DragOverlay>
            {activeProject && (
              <TaskCard
                project={activeProject}
                deleteProject={deleteProject}
                updateProject={updateProject}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  // temp newproject function
  function createProject(phase: Id) {
    const newProject: Project = {
      id: generateId(),
      title: `Task ${projectList.length + 1}`,
      description: "", // Replace with a valid description
      phase: phase,
      place: "place",
      centrum: "centrum",
      tags: [], // Initialize as an empty array or provide initial values
      date_created: Timestamp.now(),
    };
    setProjectList([...projectList, newProject]);
  }

  function deleteProject(id: Id) {
    const newProjects = projectList.filter((project) => project.id !== id);
    setProjectList(newProjects);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Project") {
      setActiveProject(event.active.data.current.project);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveProject(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    console.log("DRAG END");
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAProjet = active.data.current?.type === "Project";
    const isOverAProject = over.data.current?.type === "Project";

    if (!isActiveAProjet) return;

    // dropping a Task over another Task
    if (isActiveAProjet && isOverAProject) {
      setProjectList((projectList) => {
        const activeIndex = projectList.findIndex((t) => t.id === activeId);
        const overIndex = projectList.findIndex((t) => t.id === overId);

        if (projectList[activeIndex].phase !== projectList[overIndex].phase) {
          projectList[activeIndex].phase = projectList[overIndex].phase;
          return arrayMove(projectList, activeIndex, overIndex - 1);
        }

        return arrayMove(projectList, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // dropping a Task over a column
    if (isActiveAProjet && isOverAColumn) {
      setProjectList((projectList) => {
        const activeIndex = projectList.findIndex((t) => t.id === activeId);

        projectList[activeIndex].phase = overId;
        console.log("DROPPING PROJECT OVER COLUMN", { activeIndex });
        return arrayMove(projectList, activeIndex, activeIndex);
      });
    }
  }
}

function generateId() {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;
