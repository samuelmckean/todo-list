import { Todo } from "./todo";
import { Project } from "./project";
import { app } from "./app";
import { format } from "date-fns";

// DOM module
const domModifier = (function() {
  // module which manipulates all the DOM for the application

  // get major DOM elements and stores as vars
  const projectsContainer = document.getElementById('projects-container');
  const todosContainer = document.getElementById('todos-container');

  // initialize project and todos list from app
  let projectList = app.projects;
  let currentSelectedProject = projectList[0];  // start with first project as selected

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
    this.prepend(deleteButton);
  }

  const projectUnhover = function() {
    // removes delete button
    document.getElementById('delete-project').remove();
  }

  const todoHover = function() {
    // create edit button
    const editButton = document.createElement('button');
    editButton.id = 'edit-todo';
    const pencilIcon = document.createElement('img');
    pencilIcon.src = 'images/pencil-icon.png';
    editButton.append(pencilIcon);
    editButton.addEventListener('click', editTodo);
    this.prepend(editButton);
  }

  const todoUnhover = function() {
    // removes edit button
    document.getElementById('edit-todo').remove();
  }

  const todoClicked = function() {
    // expands or collapses todo on click by toggling expanded property and
    // rendering todo DOM again
    const todoTitle = this.querySelector('h2').innerText;
    const todo = currentSelectedProject.findTodo(todoTitle);
    app.toggleExpanded(todo);
    updateTodosDOM();
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
      const element = createTodoElement(todo);
      element.addEventListener('mouseenter', todoHover);
      element.addEventListener('mouseleave', todoUnhover);
      element.addEventListener('click', todoClicked);
      todosContainer.append(element);
    }
  }

  const createTodoElement = function(todo) {
    // create div container for each todo
    const div = document.createElement('div');
    div.classList.add('todo');
    const title = document.createElement('h2');
    title.innerText = todo.title;
    title.classList.add('title');
    div.append(title);
    
    if (todo.expanded === true) {
      // if todo is expanded create other fields
      const description = document.createElement('p');
      description.innerText = todo.description;
      description.classList.add('description');
      div.append(description);
  
      const priority = document.createElement('p');
      priority.innerText = 'Priority: ' + todo.priority;
      priority.classList.add('priority');
      div.append(priority);
  
      try {
        // only create due date element if not null
        const dueDate = document.createElement('p');
        // format the date using local time
        dueDate.innerText = 'Due Date: ' + format(new Date(todo.dueDate + 'T00:00:00'), 'MM/dd/yyyy');
        dueDate.classList.add('due-date');
        div.append(dueDate);
      } catch (RangeError) {
        // if RangeError then do not create element for due date
      }
    }

    return div;
  }

  const newTodoSubmit = function() {
    // make a Todo object from entry fields, append to todos, and call updateTodosDOM
    const title = document.querySelector('#new-title input').value;
    const description = document.querySelector('#new-description input').value;
    const priority = document.querySelector('#new-priority input').value;
    const dueDate = document.querySelector('#new-due-date input').value;
    const todo = Todo(title, description, dueDate, priority);
    if (title === '' ) {
      alert('Todo title is required.');
    } else if (priority < 1 || priority > 5) {
      alert('Priority must be 1-5.')
    } else {
      app.addTodo(todo, currentSelectedProject);
      updateTodosDOM();  
    }
  }

  const editTodoSubmit = function(todo) {
    // make a Todo object from entry fields, append to todos, and call updateTodosDOM
    const title = document.querySelector('#edit-title input').value;
    const description = document.querySelector('#edit-description input').value;
    const priority = document.querySelector('#edit-priority input').value;
    const dueDate = document.querySelector('#edit-due-date input').value;

    if (title === '' ) {
      alert('Todo title is required.');
    } else if (priority < 1 || priority > 5) {
      alert('Priority must be 1-5.')
    } else {  
      // update todo properties with new values and refresh todos DOM
      app.editTodo(todo, title, description, dueDate, priority);
      updateTodosDOM();  
    }
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

  const createTodoForm = function() {
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

    div.addEventListener('mouseenter', todoHover);
    div.addEventListener('mouseleave', todoUnhover);

    return div;
  }

  const createEditTodoForm = function(div, todo) {
    // creates a form for a new todo prefilled with the existing todos values
    div.replaceChildren();

    const clone = div.cloneNode(true);

    // displays trashcan icon for delete when in editing mode for todo
    // create button
    const deleteButton = document.createElement('button');
    deleteButton.id = 'delete-todo';

    // create img element
    const trashIcon = document.createElement('img');
    trashIcon.src = 'images/trash-icon.png';
    deleteButton.append(trashIcon);
    deleteButton.addEventListener('click', removeTodo);
    clone.prepend(deleteButton);

    const titleDiv = document.createElement('div');
    titleDiv.id = 'edit-title';
    const titleLabel = document.createElement('label');
    titleLabel.innerText = 'Todo Title:';
    titleLabel.for = 'title';
    const titleInput = document.createElement('input');
    titleInput.name = 'title';
    titleInput.value = todo.title;
    titleDiv.append(titleLabel, titleInput);
    clone.append(titleDiv);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.id = 'edit-description';
    const descriptionLabel = document.createElement('label');
    descriptionLabel.innerText = 'Todo Description:';
    descriptionLabel.for = 'description';
    const descriptionInput = document.createElement('input');
    descriptionInput.name = 'description';
    descriptionInput.value = todo.description;
    descriptionDiv.append(descriptionLabel, descriptionInput);
    clone.append(descriptionDiv);

    const dueDateDiv = document.createElement('div');
    dueDateDiv.id = 'edit-due-date';
    const dueDateLabel = document.createElement('label');
    dueDateLabel.innerText = 'Due Date:';
    dueDateLabel.for = 'due-date';
    const dueDateInput = document.createElement('input');
    dueDateInput.name = 'due-date';
    dueDateInput.type = 'date';
    dueDateInput.value = todo.dueDate;
    dueDateDiv.append(dueDateLabel, dueDateInput);
    clone.append(dueDateDiv);

    const priorityDiv = document.createElement('div');
    priorityDiv.id = 'edit-priority';
    const priorityLabel = document.createElement('label');
    priorityLabel.innerText = 'Priority:';
    priorityLabel.for = 'priority';
    const priorityInput = document.createElement('input');
    priorityInput.name = 'priority';
    priorityInput.type = 'number';
    priorityInput.min = '1';
    priorityInput.max = '5';
    priorityInput.value = todo.priority;
    priorityDiv.append(priorityLabel, priorityInput);
    clone.append(priorityDiv);

    const submitDiv = document.createElement('div');
    const submitInput = document.createElement('input');
    submitInput.type = 'submit';
    submitInput.value = 'Done';
    submitInput.classList.add('add-button');
    submitInput.addEventListener('click', () => {
      editTodoSubmit(todo);
    });
    submitDiv.append(submitInput);
    clone.append(submitDiv);

    div.parentElement.replaceChild(clone, div);
  }

  const addTodo = function() {
    // brings up form for new todo, adds it to the list, and updates the DOM
    if (document.getElementById('new-todo-form') === null) {
      todosContainer.append(createTodoForm());
    }
  }

  const removeTodo = function() {
    // deletes the todo from that projects todos list and updates DOM
    const todoTitle = document.querySelector('#edit-title input').value;
    const todo = currentSelectedProject.findTodo(todoTitle);
    app.removeTodo(todo, currentSelectedProject);
    updateTodosDOM();
  }

  const editTodo = function(event) {
    // allows the user to edit the details of a todo

    const todoElement = this.parentElement;
    const todoTitle = todoElement.querySelector('h2').innerText;
    const todo = currentSelectedProject.findTodo(todoTitle);
    createEditTodoForm(todoElement, todo);

    // stop propagation of event to outer div element
    event.stopPropagation();
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