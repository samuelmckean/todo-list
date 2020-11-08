import { Todo } from './todo';
import { Project } from './project';

// app module
const app = (function () {
  // initialize Array of projects with the default project
  const todo1 = Todo();
  const todo2 = Todo('1st Todo', 'Do me', '2020-10-30', '5', "I'm important", ['subtask 1']);
  const test = [todo1, todo2];
  const defaultProject = Project('myProject', test);
  const projects = [defaultProject];

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
  }

  const removeProject = function(project) {
    // deletes the project from the projects list
    projects.forEach((value, index) => {
      if (value === project) {
        projects.splice(index, 1);
      }
    });
  }

  const addTodo = function(todo, project) {
    // adds a new todo to the project
    project.addTodo(todo);
  }

  const removeTodo = function(todo, project) {
    // deletes the todo from that projects
    project.removeTodo(todo);
  }

  return {
    findProject,
    addProject,
    removeProject,
    addTodo,
    removeTodo,
    projects
  }
})();

export { app };