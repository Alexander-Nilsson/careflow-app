import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Project } from "../types";
import { useMemo } from "react";
import PlusIcon from "../icons/Plusicon";
import "../styles/Kanban.css";
import ShowCard from "./ShowCard";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { QuestionCircleFill } from "react-bootstrap-icons";

const QuestionmarkStyle = {
  marginRight: "0.5vw",
  marginBottom: "3px",
  color: "#051F6F",
  width: "20px",
  height: "20px",
};

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

  // Count the number of tasks in the column
  const taskCount = projectList.length;

  // HelpPopover for displaying column description/help info
  const HelpPopover = (
    <Popover
      id="popover-positioned-right"
      title="Popover right"
      style={{ padding: "10px" }}
    >
      <div>{column.title}</div>
      {column.columnDescription}
    </Popover>
  );

  // Render the column
  return (
    <div ref={setNodeRef} className="kanban-column">
      <div className="kanban-columnTitle">
        <div className="flex gap-2">{column.title}</div>
        <OverlayTrigger
          trigger={["hover", "focus"]}
          placement="top"
          overlay={HelpPopover}
        >
          <QuestionCircleFill style={QuestionmarkStyle}></QuestionCircleFill>
        </OverlayTrigger>
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
