import { useState } from 'react';

import ProjectsSidebar from './components/ProjectsSidebar.jsx';
import NewPoject from './components/NewProject.jsx';
import NoProjectSelected from './components/NoProjectSelected.jsx';
import SelectedProject from './components/SelectedProject.jsx';

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleAddTask = (text) => {
    setProjectsState((prev) => {
      const taskId = Math.random();
      const newTask = {
        id: taskId,
        projectId: prev.selectedProjectId,
        text,
      };

      return { ...prev, tasks: [...prev.tasks, newTask] };
    });
  };

  const handleDeleteTask = (id) => {
    setProjectsState((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== id),
    }));
  };

  const handleSelectProject = (id) => {
    setProjectsState((prev) => ({ ...prev, selectedProjectId: id }));
  };

  const handleDeleteProject = () => {
    setProjectsState((prev) => ({
      ...prev,
      selectedProjectId: undefined,
      projects: prev.projects.filter(({ id }) => id !== prev.selectedProjectId),
    }));
  };

  const handleStartAddProject = () => {
    setProjectsState((prev) => ({ ...prev, selectedProjectId: null }));
  };

  const handleCancelAddProject = () => {
    setProjectsState((prev) => ({ ...prev, selectedProjectId: undefined }));
  };

  const handleAddProject = (projectData) => {
    setProjectsState((prev) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prev,
        selectedProjectId: projectId,
        projects: [...prev.projects, newProject],
      };
    });
  };

  const selectedProject = projectsState.projects.find(
    ({ id }) => id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      tasks={projectsState.tasks.filter(
        ({ projectId }) => projectId === projectsState.selectedProjectId
      )}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
    />
  );

  if (projectsState.selectedProjectId === undefined)
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  else if (projectsState.selectedProjectId === null)
    content = (
      <NewPoject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        projects={projectsState.projects}
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
