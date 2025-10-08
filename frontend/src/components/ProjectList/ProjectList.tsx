import { Project } from "../../types/Project";
import "./ProjectList.css";

interface ProjectListProps {
  projects: Project[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  selectedId,
  onSelect,
}) => {
  return (
    <aside className="project-sidebar">
      <h2>Projects</h2>
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
          </li>
        ))}
      </ul>
    </aside>
  );
};
