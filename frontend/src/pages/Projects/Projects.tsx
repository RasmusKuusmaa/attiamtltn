import { JSX, useContext, useEffect, useState } from "react";
import "./Projects.css";
import { TopBarContext } from "../../context/TopBarcontext";
import useProjects from "../../hooks/useProjects";
import { ProjectList } from "../../components/ProjectList/ProjectList";
import { MissionList } from "../../components/MissionList/MissionList";
import useMissions from "../../hooks/useMissions";
import { MissionBoard } from "../../components/ScrumBoard/ScrumBoard";
import useMissionTasks from "../../hooks/useMissionTasks";

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
  const { projects } = useProjects(token);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  const { missions } = useMissions(token, selectedProjectId);
  const [selectedMissionId, setSelectedMissionId] = useState<number | null>(
    null
  );

  const { tasks, loading: tasksLoading } = useMissionTasks(
    token,
    selectedMissionId
  );
  return (
    <div className="projects-container">
      <ProjectList
        projects={projects}
        selectedId={selectedProjectId}
        onSelect={setSelectedProjectId}
      />

      <MissionList
        missions={missions}
        selectedId={selectedMissionId}
        onSelect={setSelectedMissionId}
      />

      {selectedMissionId && (
        <MissionBoard tasks={tasks} loading={tasksLoading} />
      )}
    </div>
  );
}

export default Projects;
