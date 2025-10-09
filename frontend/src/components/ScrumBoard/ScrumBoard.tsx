import { MissionTask } from "../../types";
import "./ScrumBoard.css";

interface MissionBoardProps {
  tasks: MissionTask[];
  loading?: boolean;
}

const STATUS_COLUMNS = [
    {key: "created", label: "backlog"},
  { key: "todo", label: "To Do" },
  { key: "in-progress", label: "In Progress" },
  { key: "done", label: "Done" },
];

export const MissionBoard: React.FC<MissionBoardProps> = ({ tasks, loading }) => {
  if (loading) return <div>Loading tasks...</div>;

  return (
    <div className="mission-board">
      {STATUS_COLUMNS.map(({ key, label }) => {
        const columnTasks = tasks.filter((t) => t.status === key);

        return (
          <div key={key} className="mission-column">
            <h3>{label}</h3>
            {columnTasks.length === 0 && (
              <p className="empty-column">No tasks</p>
            )}
            {columnTasks.map((task) => (
              <div key={task.id} className="mission-task-card">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};