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

  const projectClicked = function() {
    // update currentSelectedProject with the clicked project
    currentSelectedProject = app.findProject(this.innerText);
    updateSelectedProject();
  }

  const updateSelectedProject = function() {
    // updates which project is the current selected project in DOM
    for (let i = 0 ; i < projectElements.length; i++) {
      if (projectElements[i].innerText === currentSelectedProject.projectName) {
        projectElements[i].classList.add('selected-project');
      } else {
        projectElements[i].classList.remove('selected-project');
      }
    }
    updateTodosDOM();
  }

  const projectHover = function() {
    // displays trashcan icon for delete when hovering over a project
    
    // create button
    const deleteButton = document.createElement('button');
    deleteButton.id = 'delete-project';

    // create img element
    const trashIcon = document.createElement('img');
    trashIcon.src = 'images/trash-icon.png';
    deleteButton.append(trashIcon);
    deleteButton.addEventListener('click', removeProject);
    this.append(deleteButton);
  }

  const projectUnhover = function() {
    // removes delete button
    document.getElementById('delete-project').remove();
  }

  const initializeProjects = function() {
    // initializes the projects container with all projects in the app
    projectsContainer.replaceChildren();
    for (let project of projectList) {
      // create HTML element for each project and push onto array
      const element = document.createElement('div');
      element.innerText = project.projectName;
      element.classList.add('project');
      projectsContainer.append(element);
      element.addEventListener('click', projectClicked);
      element.addEventListener('mouseenter', projectHover);
      element.addEventListener('mouseleave', projectUnhover);
    }
    updateSelectedProject();
  }

  const updateTodosDOM = function() {
    // refreshes the projects container with all the todos for the currently selected project
    todosContainer.replaceChildren();
    const todos = currentSelectedProject.getTodos();
    for (let i = 0; i < todos.length; i++) {
      const todo = todos[i];
      todosContainer.append(createTodoElement(todo));
    }
  }

  const createTodoElement = function(todo) {
    // create div container for each todo
    const div = document.createElement('div');
    div.classList.add('todo');
    const title = document.createElement('h2');
    title.innerText = todo.title;
    div.append(title);
    
    const description = document.createElement('p');
    description.innerText = todo.description;
    div.append(description);

    const priority = document.createElement('p');
    priority.innerText = 'Priority: ' + todo.priority;
    div.append(priority);

    const dueDate = document.createElement('p');
    dueDate.innerText = todo.dueDate.toLocaleDateString();
    div.append(dueDate);

    return div;
  }

  const newTodoSubmit = function() {
    // make a Todo object from entry fields, append to todos, and call updateTodosDOM
    const title = document.querySelector('#new-title input').value;
    const description = document.querySelector('#new-description input').value;
    const priority = document.querySelector('#new-priority input').value;
    const dueDate = Date(document.querySelector('#new-due-date input').value);
    const todo = Todo(title, description, dueDate, priority);
    app.addTodo(todo, currentSelectedProject);
    updateTodosDOM();
  }

  const addProject = function() {
    // brings up form for new project, adds it to the list, and updates the DOM
    // FIXME: replace prompt with new project form
    const newProjectName = prompt('Enter new project name');
    const newProject = Project(newProjectName, []);
    app.addProject(newProject);

    // create HTML element for new project and append it to projectsContainer
    const element = document.createElement('div');
    element.innerText = newProject.projectName;
    element.classList.add('project');
    element.addEventListener('click', projectClicked);
    element.addEventListener('mouseenter', projectHover);
    element.addEventListener('mouseleave', projectUnhover);
    projectsContainer.append(element);
  }

  const removeProject = function(event) {
    // deletes the project from the projects list and updates DOM

    // get project for clicked delete button and remove from app
    const deletedProjectElement = this.parentElement;
    const project = app.findProject(deletedProjectElement.innerText);
    app.removeProject(project);

    // remove project from dom
    deletedProjectElement.remove();

    // if deleted project was selected than update currentSelectedProject
    if (project === currentSelectedProject) {
      currentSelectedProject = app.projects[0];
      updateSelectedProject();
    }

    // stop propagation of event to outer div element
    event.stopPropagation();
  }

  const addTodo = function() {
    // brings up form for new todo, adds it to the list, and updates the DOM
    if (document.getElementById('new-todo-form') === null) {
    
      // create new todo element with text fields for all the values
      const div = document.createElement('div');
      div.id = 'new-todo-form';
      div.classList.add('todo');
      
      const titleDiv = document.createElement('div');
      titleDiv.id = 'new-title';
      const titleLabel = document.createElement('label');
      titleLabel.innerText = 'Todo Title:';
      titleLabel.for = 'title';
      const titleInput = document.createElement('input');
      titleInput.name = 'title';
      titleDiv.append(titleLabel, titleInput);
      div.append(titleDiv);

      const descriptionDiv = document.createElement('div');
      descriptionDiv.id = 'new-description';
      const descriptionLabel = document.createElement('label');
      descriptionLabel.innerText = 'Todo Description:';
      descriptionLabel.for = 'description';
      const descriptionInput = document.createElement('input');
      descriptionInput.name = 'description';
      descriptionDiv.append(descriptionLabel, descriptionInput);
      div.append(descriptionDiv);

      const dueDateDiv = document.createElement('div');
      dueDateDiv.id = 'new-due-date';
      const dueDateLabel = document.createElement('label');
      dueDateLabel.innerText = 'Due Date:';
      dueDateLabel.for = 'due-date';
      const dueDateInput = document.createElement('input');
      dueDateInput.name = 'due-date';
      dueDateInput.type = 'date';
      dueDateDiv.append(dueDateLabel, dueDateInput);
      div.append(dueDateDiv);

      const priorityDiv = document.createElement('div');
      priorityDiv.id = 'new-priority';
      const priorityLabel = document.createElement('label');
      priorityLabel.innerText = 'Priority:';
      priorityLabel.for = 'priority';
      const priorityInput = document.createElement('input');
      priorityInput.name = 'priority';
      priorityInput.type = 'number';
      priorityInput.min = '1';
      priorityInput.max = '5';
      priorityDiv.append(priorityLabel, priorityInput);
      div.append(priorityDiv);

      const submitDiv = document.createElement('div');
      const submitInput = document.createElement('input');
      submitInput.type = 'submit';
      submitInput.value = 'Done';
      submitInput.classList.add('add-button');
      submitInput.addEventListener('click', newTodoSubmit);
      submitDiv.append(submitInput);
      div.append(submitDiv);

      todosContainer.append(div);
    }
  }

  const removeTodo = function() {
    // deletes the todo from that projects todos list and updates DOM
  }

  // wire up event listener for Add Project and Add Todo buttons
  document.getElementById('add-project').addEventListener('click', addProject);
  document.getElementById('add-todo').addEventListener('click', addTodo);

  // update project list in DOM to start
  initializeProjects();

  // update todos for selected project in DOM to start
  updateTodosDOM();

  // update selected project in DOM to start
  updateSelectedProject();
})();