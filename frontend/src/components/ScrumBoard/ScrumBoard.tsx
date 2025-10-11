import React, { useState, useEffect } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from "@dnd-kit/core";
import { MissionTask } from "../../types";
import "./ScrumBoard.css";

interface MissionBoardProps {
  tasks: MissionTask[];
  loading?: boolean;
  onStatusChange?: (taskId: string, newStatus: string) => void;
}

const STATUS_COLUMNS = [
  { key: "created", label: "Backlog" },
  { key: "todo", label: "To Do" },
  { key: "in-progress", label: "In Progress" },
  { key: "done", label: "Done" },
];

const VALID_STATUSES = STATUS_COLUMNS.map((col) => col.key);

export const MissionBoard: React.FC<MissionBoardProps> = ({
  tasks,
  loading,
  onStatusChange,
}) => {
  const [currentTasks, setCurrentTasks] = useState<MissionTask[]>([]);

  useEffect(() => {
    const normalized = tasks.map((t) => ({
      ...t,
      status: VALID_STATUSES.includes(t.status) ? t.status : "created",
    }));
    setCurrentTasks(normalized);
  }, [tasks]);

  if (loading) return <div>Loading tasks...</div>;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = Number(active.id);
    const newStatus = over.id.toString();

    setCurrentTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: VALID_STATUSES.includes(newStatus)
                ? newStatus
                : "created",
            }
          : t
      )
    );

    if (onStatusChange) {
      onStatusChange(taskId.toString(), newStatus);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="mission-board">
        {STATUS_COLUMNS.map(({ key, label }) => (
          <Column
            key={key}
            id={key}
            label={label}
            tasks={currentTasks.filter((t) => t.status === key)}
          />
        ))}
      </div>
    </DndContext>
  );
};

interface ColumnProps {
  id: string;
  label: string;
  tasks: MissionTask[];
}

const Column: React.FC<ColumnProps> = ({ id, label, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`mission-column ${isOver ? "dragging-over" : ""}`}
    >
      <h3>{label}</h3>
      {tasks.length === 0 && <p className="empty-column">No tasks</p>}
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

const TaskCard: React.FC<{ task: MissionTask }> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id.toString(),
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`mission-task-card ${isDragging ? "dragging" : ""}`}
    >
      <h4>{task.title}</h4>
      <p>{task.description}</p>
    </div>
  );
};
