import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Project } from "../types";
import { useMemo } from "react";
import PlusIcon from "../icons/Plusicon";
import "../styles/Kanban.css";
import ShowCard from "./ShowCard";
import {OverlayTrigger, Popover} from "react-bootstrap";
import { QuestionCircleFill } from "react-bootstrap-icons";


const IconCircleStyle = {
  borderRadius: "50%",
  width: "25px",
  height: "25px",
  border: "0.5px solid #AEAEAE",
  marginRight: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const QuestionmarkStyle = {
  marginRight: "10px",
  marginBottom: "3px",
  color: "#051F6F",
  width: "20px",
  height: "20px",
};

const FlexAndCenter = {
  display: "flex",
  alignItems: "center",
};

const HelpPopover = (
  <Popover
    id="popover-positioned-right"
    title="Popover right"
    style={{ padding: "10px" }}
  >
    Här kommer det att finnas en beskrivande text sen
  </Popover>
);

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
        <OverlayTrigger trigger="hover" placement="right" overlay={HelpPopover}>
          <QuestionCircleFill style={QuestionmarkStyle}></QuestionCircleFill>
        </OverlayTrigger>
        {/* <div>{taskCount}</div> */}
      </div>
      <div className="kanban-tasksContainer">
        <SortableContext items={tasksIds}>
          {projectList.map((project) => (
            <ShowCard
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
        Antal:  {taskCount}
      </button>
    </div>
  );
}

export default ColumnContainer;
