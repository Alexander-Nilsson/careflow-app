import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Task } from "../types";
import { useMemo } from "react";
import PlusIcon from "../icons/Plusicon";
import TaskCard from "./TaskCard";
import "../styles/Kanban.css";

interface Props {
  column: Column;
  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
  tasks: Task[];
}

function ColumnContainer({
  column,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}: Props) {
  // Memoize task IDs for use in SortableContext
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  // UseSortable hook for drag-and-drop functionality
  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  // Count the number of tasks in the column
  const taskCount = tasks.length;

  // Render the column
  return (
    <div ref={setNodeRef} className="kanban-column">
      <div className="kanban-columnTitle">
        <div className="flex gap-2">{column.title}</div>
        <div>{taskCount}</div>
      </div>
      <div className="kanban-tasksContainer">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      <button
        className="kanban-footerButton"
        onClick={() => createTask(column.id)}
      >
        <PlusIcon />
        Add task
      </button>
    </div>
  );
}

export default ColumnContainer;
