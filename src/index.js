import { Todo } from "./todo";
import { Project } from "./project";
import { app } from "./app";

// DOM module
const domModifier = (function() {
  // module which manipulates all the DOM for the application

  // get major DOM elements and stores as vars
  const root = document.getElementById('root');
  const projectList = document.getElementById('project-list');
  const todosConatainer = document.getElementById('todos-container');

  const _updateProjectsDOM = function() {
    // refreshes the projects container with all projects in the app
    const elements = [];
    for (let project of app.projects) {
      // create HTML element for each project and push onto array
      const element = document.createElement('div');
      element.innerHTML = project.projectName;
      elements.push(element);
    }
    projectList.replaceChildren(elements);
  }

  const _updateTodosDOM = function() {
    // refreshes the projects container with all the todos for the currently selected project
  }

  const addProject = function() {
    // brings up form for new project, adds it to the list, and updates the DOM
    // FIXME: replace with new project from form
    app.addProject(project);
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

  return {
    addProject,
    removeProject,
    addTodo,
    removeTodo
  }
})();

// all code below this is for testing
const project = Project('hello', {name: 'hello'});
domModifier.addProject();
for (let project of app.projects) {
  console.log(project)
}
