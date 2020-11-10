import { Todo } from "./todo";
import { Project } from "./project";
import { app } from "./app";

// DOM module
const domModifier = (function() {
  // module which manipulates all the DOM for the application

  // get major DOM elements and stores as vars
  const projectsContainer = document.getElementById('projects-container');
  const todosContainer = document.getElementById('todos-container');

  // initialize project and todos list from app
  let projectList = app.projects;
  let currentSelectedProject = projectList[0];  // start with first project as selected
  let todoList = currentSelectedProject.getTodos();

  // get list of all project elements
  const projectElements = projectsContainer.getElementsByClassName('project');

  const _projectClicked = function() {
    // update currentSelectedProject with the clicked project
    const clickedProjectName = this.innerHTML;
    for (let i = 0; i < projectList.length; i++) {
      if (clickedProjectName === projectList[i].projectName) {
        currentSelectedProject = projectList[i];
      }
    }
    _updateSelectedProject();
  }

  const _updateSelectedProject = function() {
    // updates which project is the current selected project in DOM
    for (let i = 0 ; i < projectElements.length; i++) {
      if (projectElements[i].innerHTML === currentSelectedProject.projectName) {
        projectElements[i].classList.add('selected-project');
      } else {
        projectElements[i].classList.remove('selected-project');
      }
    }
  }

  const _initializeProjects = function() {
    // initializes the projects container with all projects in the app
    projectsContainer.replaceChildren();
    for (let project of projectList) {
      // create HTML element for each project and push onto array
      const element = document.createElement('div');
      element.innerHTML = project.projectName;
      element.classList.add('project');
      projectsContainer.append(element);
      element.addEventListener('click', _projectClicked);
    }
    _updateSelectedProject();
  }

  const _updateTodosDOM = function() {
    // refreshes the projects container with all the todos for the currently selected project
  }

  const addProject = function() {
    // brings up form for new project, adds it to the list, and updates the DOM
    // FIXME: replace prompt with new project form
    const newProject = Project(prompt('Enter new project name'))
    app.addProject(newProject);

    // create HTML element for new project and append it to projectsContainer
    const element = document.createElement('div');
    element.innerHTML = newProject.projectName;
    element.classList.add('project');
    element.addEventListener('click', _projectClicked);
    projectsContainer.append(element);
  }

  const removeProject = function(projectName) {
    // deletes the project from the projects list and updates DOM
    app.removeProject(project);
    _updateProjectsDOM();
  }

  const addTodo = function() {
    // brings up form for new todo, adds it to the list, and updates the DOM
  }

  const removeTodo = function() {
    // deletes the todo from that projects todos list and updates DOM
  }

  // wire up event listener for Add Project button
  document.getElementById('add-project').addEventListener('click', addProject);

  // update project list in DOM to start
  _initializeProjects();

  // update todos for selected project in DOM to start
  _updateTodosDOM();

  // update selected project in DOM to start
  _updateSelectedProject();

  return {
    addProject,
    removeProject,
    addTodo,
    removeTodo
  }
})();