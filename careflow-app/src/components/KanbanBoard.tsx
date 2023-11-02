import { useState, useContext } from "react";
import { Column, Id, Project } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import "../styles/Kanban.css";
import { ProjectContext } from "./Projects";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import ShowCard from "./ShowCard";
import { db } from "../firebase";

const columns: Column[] = [
  {
    id: 1,
    title: "Förslag",
    columnDescription:
      "Här ligger de projekt som ännu inte startats. Det kan saknas viss information som behövs innan förbättringsarbetet kan starta.",
  },
  {
    id: 2,
    title: "Planera",
    columnDescription:
      "I planeringsfasen har projektet inletts men inte genomförts. Detaljer kring genomförandet diskuteras fortfarande i denna fas.",
  },
  {
    id: 3,
    title: "Genomföra",
    columnDescription:
      "Projekt som har genomförts eller genomförs just nu ligger här.",
  },
  {
    id: 4,
    title: "Studera",
    columnDescription:
      "Här studeras och utvärderas utfallet av projekten som genomförts, och beslut fattas om det ska bli en permanent förändring eller inte.",
  },
  {
    id: 5,
    title: "Agera",
    columnDescription:
      "Efter lyckat genomförande har det beslutats att förändringen ska implementeras permanent, vilket pågår i denna fasen.",
  },
];

function KanbanBoard() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error(
      "KanbanBoard must be used within a ProjectContext Provider"
    );
  }

  const { projectList, setProjectList } = context;
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <div className="board">
      <img
        className="background-gradient"
        alt=""
        src="./background-gradient.jpeg"
      />
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
                projectList={projectList.filter(
                  (Project) => Project.phase === col.id
                )}
              />
            ))}
          </div>

          {createPortal(
            <DragOverlay>
              {activeProject && <ShowCard project={activeProject} />}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </div>
  );

  // temp newproject function
  function createProject(phase: Id) {
    const newProject: Project = {
      id: generateId(),
      title: `Project ${projectList.length + 1}`,
      description: "", // Replace with a valid description
      phase: phase,
      place: "place",
      centrum: "centrum",
      tags: [], // Initialize as an empty array
      date_created: Timestamp.now(),
    };
    setProjectList([...projectList, newProject]);
  }

  /*
  function deleteProject(id: Id) {
    const newProjects = projectList.filter((project) => project.id !== id);
    setProjectList(newProjects);
  }
*/

  // Update function for dragdrop
  async function updateProject(id: any, newColumn: any) {
    const userDoc = doc(db, "projects", id);
    const newFields = { phase: newColumn };

    console.log("updateProject");
    await updateDoc(userDoc, newFields);
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

    // Dropping a Task over another Task
    if (isActiveAProjet && isOverAProject) {
      setProjectList((projectList) => {
        const activeIndex = projectList.findIndex((t) => t.id === activeId);
        const overIndex = projectList.findIndex((t) => t.id === overId);

        let newProjectList;
        if (projectList[activeIndex].phase !== projectList[overIndex].phase) {
          projectList[activeIndex].phase = projectList[overIndex].phase;
          newProjectList = arrayMove(projectList, activeIndex, overIndex - 1);
        } else {
          newProjectList = arrayMove(projectList, activeIndex, overIndex);
        }

        // Update the project in the database after reassigning to a new phase or position
        updateProject(activeId, projectList[activeIndex].phase).catch(
          (error) => {
            console.error(
              "Kanban - Failed to update project phase in Firestore:",
              error
            );
          }
        );

        return newProjectList;
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

      // `overId` is the new phase for the project
      // uppdate the prodject phase in the database
      updateProject(activeId, overId).catch((error) => {
        console.error(
          "Kanban - Failed to update project phase in Firestore:",
          error
        );
      });
    }
  }
}

function generateId() {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;
