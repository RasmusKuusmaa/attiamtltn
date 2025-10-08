import { JSX, useContext, useEffect, useState } from "react";
import "./Projects.css";
import { TopBarContext } from "../../context/TopBarcontext";
import useProjects from "../../hooks/useProjects";
import { ProjectList } from "../../components/ProjectList/ProjectList";

function Projects(): JSX.Element {
  const { setContent } = useContext(TopBarContext);

  useEffect(() => {
    setContent(
      <div>
        <h1>Projects</h1>
      </div>
    );
  }, [setContent]);

  const token = localStorage.getItem("token") || "";
  const {projects} = useProjects(token);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedProject = projects.find((p) => p.id === selectedId);

  return (
    <div className="projects-container">
      <ProjectList
      projects={projects}
      selectedId={selectedId}
      onSelect={setSelectedId}
      />
      <div>
        
      </div>
    </div>
  );
}

export default Projects;
