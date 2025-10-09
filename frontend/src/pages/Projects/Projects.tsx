import { JSX, useContext, useEffect, useState } from "react";
import "./Projects.css";
import { TopBarContext } from "../../context/TopBarcontext";
import useProjects from "../../hooks/useProjects";
import { ProjectList } from "../../components/ProjectList/ProjectList";
import { MissionList } from "../../components/MissionList/MissionList";
import useMissions from "../../hooks/useMissions";
import { MissionBoard } from "../../components/ScrumBoard/ScrumBoard";
import useMissionTasks from "../../hooks/useMissionTasks";
import NewProjectModal from "../../components/NewProjectModal/NewProjectModal";
import NewMissionModal from "../../components/NewMissionModal/NewMissionModal";

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
  const { projects, addProjects, deleteProject } = useProjects(token);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  const { missions, addMission } = useMissions(token, selectedProjectId);
  const [selectedMissionId, setSelectedMissionId] = useState<number | null>(
    null
  );

  const { tasks, loading: tasksLoading } = useMissionTasks(
    token,
    selectedMissionId
  );

  const handleNewProject = async (title: string) => {
    const newProject = await addProjects(title);
    setSelectedProjectId(newProject.id);
  };

  const handleProjectDeletion = async (id: number) => {
    await deleteProject(id);
    if (id === selectedProjectId) {
      setSelectedProjectId(null);
    }
  };

  const handleNewMission = async (title: string) => {
    const newMission = await addMission(title);
    setSelectedMissionId(newMission.id);
  };
  const [isNewMissionModalOpen, setIsNewMissionModalOpen] = useState(false);
  const [isnewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  return (
    <div className="projects-container">
      <ProjectList
        projects={projects}
        selectedId={selectedProjectId}
        onSelect={setSelectedProjectId}
        onAdd={() => setIsNewProjectModalOpen(true)}
        onDelete={handleProjectDeletion}
      />

      <MissionList
        missions={missions}
        selectedId={selectedMissionId}
        onSelect={setSelectedMissionId}
        onAdd={() => setIsNewMissionModalOpen(true)}
      />

      {selectedMissionId && (
        <MissionBoard tasks={tasks} loading={tasksLoading} />
      )}

      {/* Modals */}
      {isnewProjectModalOpen && (
        <NewProjectModal
          onAdd={handleNewProject}
          onClose={() => setIsNewProjectModalOpen(false)}
        />
      )}

      {isNewMissionModalOpen && (
        <NewMissionModal
          onAdd={handleNewMission}
          onClose={() => setIsNewMissionModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Projects;
