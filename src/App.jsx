import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SideBar from "./components/SideBar.jsx";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {

  const [ projectState, setProjectState ] = useState({
    selectedProject:undefined,
    projects: []
  });

  function handleSelectProject(id){
    setProjectState(prevState => {
      return{
        ...prevState,

        selectedProjectId: id,
      };
    });
  }


  function handleStartAddProject(){
    
    setProjectState(prevState => {
      return{
        ...prevState,

        selectedProjectId: null,
      };
    });
  }

  function handleCancelAppProject(){
    setProjectState(prevState => {
      return{
        ...prevState,

        selectedProjectId: undefined,
      };
  });
  }

  
  function handleAddProject(projectData){
    setProjectState(prevState => {
    const projectId=Math.random();
      const newProject =  {
        ...projectData,
        id: projectId,
      };
      return{
        ...prevState,
        selectedProjectId:undefined,
        projects:[...prevState.projects,newProject  ]
      }
    })
  }

  function handleDeleteProject(){
    setProjectState(prevState => {
      return{
        ...prevState,

        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project)=> project.id !== prevState.selectedProjectId
        ),
      };
  });
  }

  const selectedProject = projectState.projects.find(project=>project.id === projectState.selectedProjectId);

  let content = <SelectedProject project = {selectedProject} onDelete={handleDeleteProject}/>;

  if(projectState.selectedProjectId === null){
    content=<NewProject onAdd={handleAddProject} onCancel={handleCancelAppProject}/>
  }else if(projectState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>;
  }

  

  return (
    <main className="h-screen my-8 flex gap-8">
    <SideBar onStartAddProject={handleStartAddProject} projects={projectState.projects} onSelectProject={handleSelectProject}/>
    {content}
    </main>

  );
}

export default App;
