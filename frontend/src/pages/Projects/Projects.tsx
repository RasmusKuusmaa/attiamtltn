import { JSX, useContext, useEffect, useState } from "react";
import "./Projects.css";
import { TopBarContext } from "../../context/TopBarcontext";
import useProjects from "../../hooks/useProjects";
import { ProjectList } from "../../components/ProjectList/ProjectList";
import { MissionList } from "../../components/MissionList/MissionList";
import useMissions from "../../hooks/useMissions";

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
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  const {missions} = useMissions(token, selectedProjectId);
  const [selectedMissionsId, setSelectedMissionId] = useState<number | null>(null);
  
  return (
    <div className="projects-container">
      <ProjectList
      projects={projects}
      selectedId={selectedProjectId}
      onSelect={setSelectedProjectId}
      />
      
      <MissionList
      missions={missions}
      selectedId={selectedMissionsId}
      onSelect={setSelectedMissionId}
      />
    </div>
  );
}

export default Projects;
