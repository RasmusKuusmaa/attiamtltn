import { Project } from "../../types/Project";
import "./ProjectList.css";

interface ProjectListProps {
  projects: Project[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onAdd: () => void;
  onDelete: (id: number) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  selectedId,
  onSelect,
  onAdd,
  onDelete,
}) => {
  return (
    <aside className="project-sidebar">
      <h2>Projects</h2>
      <button onClick={onAdd} className="project-new-button">
        +
      </button>
      <ul className="project-sidebar-list">
        {projects.length === 0 && (
          <li className="projects-empty">No projects yes</li>
        )}
        {projects.map((project) => (
          <li
            key={project.id}
            className={`project-item ${
              project.id === selectedId ? "selected" : ""
            }`}
            onClick={() => onSelect(project.id)}
          >
            {project.title || "Untitled"}
            <button className="project-delete-button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project.id);
            }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
