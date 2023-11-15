import { useState, useContext } from "react";
import { Column, Id } from "../types";
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
import {
  Timestamp,
  doc,
  updateDoc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import ShowCard from "./ShowCard";
import { db } from "../firebase";
import { Project, ImprovementWork } from "../ImprovementWorkLib";

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
    title: "Göra",
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

  const userReference = doc(db, "users", "random_user_id");
  //const { projectList, setProjectList } = context;
  //const [activeProject, setActiveProject] = useState<Project | null>(null);
  const { improvementWorkList, setImprovementWorkList } = context;
  const [activeImprovementWork, setActiveImprovementWork] =
    useState<ImprovementWork | null>(null);

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
                //createProject={createProject}
                improvementWorkList={improvementWorkList.filter(
                  (ImprovementWork) => ImprovementWork.phase === col.id
                )}
              />
            ))}
          </div>

          {createPortal(
            <DragOverlay>
              {activeImprovementWork && (
                <ShowCard improvementWork={activeImprovementWork} />
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </div>
  );

  // temp newproject function
  /*function createProject(phase: Id) {
    const newProject: Project = {
      id: generateId(),
      title: `Project ${projectList.length + 1}`,
      description: "", // Replace with a valid description
      phase: phase,
      place: "place",
      centrum: "centrum",
      tags: [], // Initialize as an empty array
      date_created: Timestamp.now(),
      result_measurements: "results",
      result_analysis: "results",
      notes_plan: "some notes",
      notes_do: "other notes",
      notes_study: "notes",
      notes_act: "even more notes",
      project_leader: userReference,
      project_members: [],
      checklist_plan: {
        checklist_item: [],
        checklist_done: [],
        checklist_members: [],
      },
      checklist_do: {
        checklist_item: [],
        checklist_done: [],
        checklist_members: [],
      },
      checklist_study: {
        checklist_item: [],
        checklist_done: [],
        checklist_members: [],
      },
      checklist_act: {
        checklist_item: [],
        checklist_done: [],
        checklist_members: [],
      },
    };
    setProjectList([...projectList, newProject]);
  }*/

  /*
  function deleteProject(id: Id) {
    const newProjects = projectList.filter((project) => project.id !== id);
    setProjectList(newProjects);
  }
*/

  // Update function for dragdrop
  async function updateImprovementWork(id: any, newColumn: any) {
    const userDoc = doc(db, "improvementWork", id);
    const newFields = { phase: newColumn };

    console.log("updateImprovementWork");
    await updateDoc(userDoc, newFields);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "ImprovementWork") {
      setActiveImprovementWork(event.active.data.current.improvementWork);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveImprovementWork(null);

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

    const isActiveAImprovementWork =
      active.data.current?.type === "ImprovementWork";
    const isOverAImprovementWork =
      over.data.current?.type === "ImprovementWork";

    if (!isActiveAImprovementWork) return;

    // Dropping a Task over another Task
    if (isActiveAImprovementWork && isOverAImprovementWork) {
      setImprovementWorkList((improvementWorkList) => {
        const activeIndex = improvementWorkList.findIndex(
          (t) => t.id === activeId
        );
        const overIndex = improvementWorkList.findIndex((t) => t.id === overId);

        let newImprovementWorkList;
        if (
          improvementWorkList[activeIndex].phase !==
          improvementWorkList[overIndex].phase
        ) {
          improvementWorkList[activeIndex].phase =
            improvementWorkList[overIndex].phase;
          newImprovementWorkList = arrayMove(
            improvementWorkList,
            activeIndex,
            overIndex - 1
          );
        } else {
          newImprovementWorkList = arrayMove(
            improvementWorkList,
            activeIndex,
            overIndex
          );
        }

        console.log("DROPPING PROJECT OVER another task", { activeIndex });

        // Update the project in the database after reassigning to a new phase or position
        updateImprovementWork(
          activeId,
          improvementWorkList[activeIndex].phase
        ).catch((error) => {
          console.error(
            "Kanban - Failed to update project phase in Firestore:",
            error
          );
        });

        return newImprovementWorkList;
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // dropping a Task over a column
    if (isActiveAImprovementWork && isOverAColumn) {
      setImprovementWorkList((improvementWorkList) => {
        const activeIndex = improvementWorkList.findIndex(
          (t) => t.id === activeId
        );

        improvementWorkList[activeIndex].phase = overId;
        console.log("DROPPING PROJECT OVER COLUMN", { activeIndex });
        return arrayMove(improvementWorkList, activeIndex, activeIndex);
      });

      // `overId` is the new phase for the project
      // uppdate the prodject phase in the database
      updateImprovementWork(activeId, overId).catch((error) => {
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
