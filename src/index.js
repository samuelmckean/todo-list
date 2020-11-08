import { Todo } from "./todo";
import { Project } from "./project";
import { app } from "./app";

// DOM module
const domModifier = (function() {
  // module which manipulates all the DOM for the application

  // get major DOM elements and stores as vars
  const projectContainer = document.getElementById('projects-container');
  const todosContainer = document.getElementById('todos-container');

  // initialize project and todos list from app
  let projectList = app.projects;
  let currentSelectedProject = projectList[0];  // start with first project as selected
  let todoList = currentSelectedProject.getTodos();

  const _updatedSelectedProject = function() {
    // updates which project is the current selected project in DOM
  }

  const _updateProjectsDOM = function() {
    // refreshes the projects container with all projects in the app
    projectContainer.replaceChildren();
    for (let project of projectList) {
      // create HTML element for each project and push onto array
      const element = document.createElement('div');
      element.innerHTML = project.projectName;
      element.classList.add('project');
      projectContainer.append(element);
    }
  }

  const _updateTodosDOM = function() {
    // refreshes the projects container with all the todos for the currently selected project
  }

  const addProject = function(newProject) {
    // brings up form for new project, adds it to the list, and updates the DOM
    // FIXME: replace with new project from form
    app.addProject(newProject);
    _updateProjectsDOM();
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

  // update project list in DOM to start
  _updateProjectsDOM();

  // update todos for selected project in DOM to start
  _updateTodosDOM();

  return {
    addProject,
    removeProject,
    addTodo,
    removeTodo
  }
})();

// all code below this is for testing
const project = Project('hello', {name: 'hello'});
domModifier.addProject(project);
