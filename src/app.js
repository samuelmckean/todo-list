import { Todo } from './todo';
import { Project } from './project';
import { storage } from './localStorage';

// app module
const app = (function () {
  // initialize Array of projects with the default project
  let projects;
  if (storage === null) {
    // if storage not available, initialize projects with empty array
    const firstProject = Project('First Project', []);
    projects = [firstProject];
  } else {
    // if storage available, initialize from storage
    projects = storage.getStorage();
    if (projects === null) {
      // if there are not projects in storage, create a first project
      const firstProject = Project('First Project', []);
      projects = [firstProject]; 
    }
  }

  const findProject = function(projectName) {
    // finds and returns the first project object matching the projectName
    // returns null if not found
    for (let project of projects) {
      if (project.projectName === projectName) {
        return project
      }
    }
    return null;
  }

  const addProject = function(newProject) {
    // adds a project it to the list of projects
    projects.push(newProject);
    storage.updateStorage(projects);
  }

  const removeProject = function(project) {
    // deletes the project from the projects list
    projects.forEach((value, index) => {
      if (value === project) {
        projects.splice(index, 1);
      }
    });
    storage.updateStorage(projects);
  }

  const addTodo = function(todo, project) {
    // adds a new todo to the project
    project.addTodo(todo);
    storage.updateStorage(projects);
  }

  const removeTodo = function(todo, project) {
    // deletes the todo from that projects
    project.removeTodo(todo);
    storage.updateStorage(projects);
  }

  const toggleExpanded = function(todo) {
    // toggles the todo between expanded and collapsed
    if (todo.expanded === false) {
      todo.expanded = true;
    } else {
      todo.expanded = false;
    }
  }

  return {
    findProject,
    addProject,
    removeProject,
    addTodo,
    removeTodo,
    toggleExpanded,
    projects
  }
})();

export { app };