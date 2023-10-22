import { useState } from "react";
import TrashIcon from "../icons/Trashicon";
import { Id, Project } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  project: Project;
  deleteProject: (id: Id) => void;
  updateProject: (updatedProject: Project) => void;
}

function TaskCard({ project, deleteProject, updateProject }: Props) {
  // State to track whether the mouse is over the task card
  const [mouseIsOver, setMouseIsOver] = useState(false);

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
    id: project.id,
    data: {
      type: "Project",
      project,
    },

    //disabled: editMode,
  });

  // Define the style based on drag-and-drop transition
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  /* //Function to toggle edit mode for task content
  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  */
  // problemet är att de tror dem är ISDragging
  if (isDragging) {
    // Styling for when the task is being dragged
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        opacity-30
        bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500 cursor-grab relative
      "
      />
    );
  }

  /*if (editMode) {
    // Styling for when in edit mode (textarea for task content)
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative"
      >
        <textarea
          className="
          h-[90%]
          w-full resize-none border-none rounded bg-transparent text-black focus:outline-none
        "
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateProject(task.id, e.target.value)}
        />
      </div>
    );
  }*/

  // Styling for the default display mode
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      {" "}
      {project.centrum}
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {project.title}
        {project.centrum}
      </p>
      {mouseIsOver && (
        <button
          onClick={() => {
            deleteProject(project.id);
          }}
          className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
}

export default TaskCard;
