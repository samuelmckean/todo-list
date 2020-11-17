/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! namespace exports */
/*! export app [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "app": () => /* binding */ app
/* harmony export */ });
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ "./src/todo.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./localStorage */ "./src/localStorage.js");




// app module
const app = (function () {
  // initialize Array of projects with the default project
  let projects;
  if (_localStorage__WEBPACK_IMPORTED_MODULE_2__.storage === null) {
    // if storage not available, initialize projects with empty array
    const firstProject = (0,_project__WEBPACK_IMPORTED_MODULE_1__.Project)('First Project', []);
    projects = [firstProject];
  } else {
    // if storage available, initialize from storage
    projects = _localStorage__WEBPACK_IMPORTED_MODULE_2__.storage.getStorage();
    if (projects === null) {
      // if there are not projects in storage, create a first project
      const firstProject = (0,_project__WEBPACK_IMPORTED_MODULE_1__.Project)('First Project', []);
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
    _localStorage__WEBPACK_IMPORTED_MODULE_2__.storage.updateStorage(projects);
  }

  const removeProject = function(project) {
    // deletes the project from the projects list
    projects.forEach((value, index) => {
      if (value === project) {
        projects.splice(index, 1);
      }
    });
    _localStorage__WEBPACK_IMPORTED_MODULE_2__.storage.updateStorage(projects);
  }

  const addTodo = function(todo, project) {
    // adds a new todo to the project
    project.addTodo(todo);
    _localStorage__WEBPACK_IMPORTED_MODULE_2__.storage.updateStorage(projects);
  }

  const removeTodo = function(todo, project) {
    // deletes the todo from that projects
    project.removeTodo(todo);
    _localStorage__WEBPACK_IMPORTED_MODULE_2__.storage.updateStorage(projects);
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



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ "./src/todo.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ "./src/app.js");




// DOM module
const domModifier = (function() {
  // module which manipulates all the DOM for the application

  // get major DOM elements and stores as vars
  const projectsContainer = document.getElementById('projects-container');
  const todosContainer = document.getElementById('todos-container');

  // initialize project and todos list from app
  let projectList = _app__WEBPACK_IMPORTED_MODULE_2__.app.projects;
  let currentSelectedProject = projectList[0];  // start with first project as selected
  let todoList = currentSelectedProject.getTodos();

  // get list of all project elements
  const projectElements = projectsContainer.getElementsByClassName('project');

  const projectClicked = function() {
    // update currentSelectedProject with the clicked project
    currentSelectedProject = _app__WEBPACK_IMPORTED_MODULE_2__.app.findProject(this.innerText);
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
    // displays trashcan icon for delete when hovering over a project
    
    // create button
    const deleteButton = document.createElement('button');
    deleteButton.id = 'delete-todo';

    // create img element
    const trashIcon = document.createElement('img');
    trashIcon.src = 'images/trash-icon.png';
    deleteButton.append(trashIcon);
    deleteButton.addEventListener('click', removeTodo);
    this.prepend(deleteButton);
  }

  const todoUnhover = function() {
    // removes delete button
    document.getElementById('delete-todo').remove();
  }

  const todoClicked = function() {
    // expands or collapses todo on click by toggling expanded property and
    // rendering todo DOM again
    const todoTitle = this.querySelector('h2').innerText;
    const todo = currentSelectedProject.findTodo(todoTitle);
    _app__WEBPACK_IMPORTED_MODULE_2__.app.toggleExpanded(todo);
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
    div.append(title);
    
    if (todo.expanded === true) {
      // if todo is expanded create other fields
      const description = document.createElement('p');
      description.innerText = todo.description;
      div.append(description);
  
      const priority = document.createElement('p');
      priority.innerText = 'Priority: ' + todo.priority;
      div.append(priority);
  
      const dueDate = document.createElement('p');
      dueDate.innerText = todo.dueDate.toLocaleDateString();
      div.append(dueDate);  
    }

    return div;
  }

  const newTodoSubmit = function() {
    // make a Todo object from entry fields, append to todos, and call updateTodosDOM
    const title = document.querySelector('#new-title input').value;
    const description = document.querySelector('#new-description input').value;
    const priority = document.querySelector('#new-priority input').value;
    const dueDate = Date(document.querySelector('#new-due-date input').value);
    const todo = (0,_todo__WEBPACK_IMPORTED_MODULE_0__.Todo)(title, description, dueDate, priority);
    if (title === '' ) {
      alert('Todo title is required.');
    } else if (priority < 1 || priority > 5) {
      alert('Priority must be 1-5.')
    } else {
      _app__WEBPACK_IMPORTED_MODULE_2__.app.addTodo(todo, currentSelectedProject);
      updateTodosDOM();  
    }
  }

  const addProject = function() {
    // brings up form for new project, adds it to the list, and updates the DOM
    // FIXME: replace prompt with new project form
    const newProjectName = prompt('Enter new project name');
    const newProject = (0,_project__WEBPACK_IMPORTED_MODULE_1__.Project)(newProjectName, []);
    _app__WEBPACK_IMPORTED_MODULE_2__.app.addProject(newProject);

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
    const project = _app__WEBPACK_IMPORTED_MODULE_2__.app.findProject(deletedProjectElement.innerText);
    _app__WEBPACK_IMPORTED_MODULE_2__.app.removeProject(project);

    // remove project from dom
    deletedProjectElement.remove();

    // if deleted project was selected than update currentSelectedProject
    if (project === currentSelectedProject) {
      currentSelectedProject = _app__WEBPACK_IMPORTED_MODULE_2__.app.projects[0];
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

      div.addEventListener('mouseenter', todoHover);
      div.addEventListener('mouseleave', todoUnhover);
      todosContainer.append(div);
    }
  }

  const removeTodo = function() {
    // deletes the todo from that projects todos list and updates DOM
    const todoTitleElement = this.parentElement.querySelector('h2');
    if (todoTitleElement === null) {
      // only update todos DOM if the div being deleted is the new-todo form
      updateTodosDOM();
    } else {
      const todoTitle = this.parentElement.querySelector('h2').innerText;
      const todo = currentSelectedProject.findTodo(todoTitle);
      _app__WEBPACK_IMPORTED_MODULE_2__.app.removeTodo(todo, currentSelectedProject);
      updateTodosDOM();
    }
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

/***/ }),

/***/ "./src/localStorage.js":
/*!*****************************!*\
  !*** ./src/localStorage.js ***!
  \*****************************/
/*! namespace exports */
/*! export storage [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "storage": () => /* binding */ storage
/* harmony export */ });
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ "./src/todo.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./src/project.js");



const storage = (function() {
  // module with all the localStorage functionality required for the todo-list project
  // which allows the client to store data between sessions using the browsers localStorage
  // API 

  function storageAvailable(type) {
    // checks if local storage is available
    // taken from MDN (https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
  }

  const getStorage = function() {
    // gets all the projects from storage and returns them as an array
    // returns null if no localStorage exists
    if (localStorage.getItem('projects') !== null) {
      const storageData = JSON.parse(localStorage.getItem('projects'));
      const projects = [];
      for (let i = 0; i < storageData.length; i++) {
        const project = (0,_project__WEBPACK_IMPORTED_MODULE_1__.Project)(storageData[i].projectName, []);
        for (let j = 0; j < storageData[i].todos.length; j++) {
          const storageTodo = storageData[i].todos[j];
          const todo = (0,_todo__WEBPACK_IMPORTED_MODULE_0__.Todo)(storageTodo.title, storageTodo.description, storageTodo.dueDate, storageTodo.priority);
          project.addTodo(todo);
        }
        projects.push(project);
      }
      return projects;
    } else {
      return null;
    }
  }

  const updateStorage = function(projects) {
    // converts all projects to JSON and updates localStorage with the data
    const data = [];
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      project.todos = project.getTodos();
      data.push(project);
    }
    localStorage.setItem('projects', JSON.stringify(data));
  }

  if (storageAvailable('localStorage')) {
    return {
      getStorage,
      updateStorage
    };
  } else {
    return null;
  }
})();



/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/*! namespace exports */
/*! export Project [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Project": () => /* binding */ Project
/* harmony export */ });
// factory function for create projects
const Project = function(projectName, todos) {
  projectName = projectName.toString();
  
  let _todos = [];
  // check if todos is an array object, wrap it in an array if not
  if (Array.isArray(todos)) {
    for (let todo of todos) {
      _todos.push(todo);
    }
  } else {
    _todos.push(todos);
  }

  const addTodo = function(todo) {
    _todos.push(todo);
  }

  const removeTodo = function(todo) {
    _todos.forEach((item, index) => {
      if (todo === item) {
        _todos.splice(index, 1);
      }
    });
  }

  const findTodo = function(todoTitle) {
    // returns a Todo object if the project has one with a matching title
    // otherwise returns null
    for (let i = 0; i < _todos.length; i++) {
      if (_todos[i].title === todoTitle) {
        return _todos[i];
      }
    }
    return null;
  }

  const getTodos = function() { return _todos };

  return {
    projectName,
    addTodo,
    removeTodo,
    getTodos,
    findTodo
  }
};



/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/*! namespace exports */
/*! export Todo [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Todo": () => /* binding */ Todo
/* harmony export */ });
// factory function for creating todo objects
const Todo = function(title, description, dueDate, priority, notes, checklist, expanded) {
  title = title || '',
  description = description || '',
  dueDate = new Date(dueDate) || null,
  priority = priority || '1',
  notes = notes || '',
  checklist = checklist || [],
  expanded = expanded || false;

  return {
    title, 
    description, 
    dueDate, 
    priority, 
    notes, 
    checklist,
    expanded
  }
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXBwLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbG9jYWxTdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90b2RvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQThCO0FBQ007QUFDSzs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLGtEQUFPO0FBQ2I7QUFDQSx5QkFBeUIsaURBQU87QUFDaEM7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLDZEQUFrQjtBQUNqQztBQUNBO0FBQ0EsMkJBQTJCLGlEQUFPO0FBQ2xDLGdDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGdFQUFxQjtBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSSxnRUFBcUI7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnRUFBcUI7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0Es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V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb2RvIH0gZnJvbSAnLi90b2RvJztcclxuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vcHJvamVjdCc7XHJcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tICcuL2xvY2FsU3RvcmFnZSc7XHJcblxyXG4vLyBhcHAgbW9kdWxlXHJcbmNvbnN0IGFwcCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgLy8gaW5pdGlhbGl6ZSBBcnJheSBvZiBwcm9qZWN0cyB3aXRoIHRoZSBkZWZhdWx0IHByb2plY3RcclxuICBsZXQgcHJvamVjdHM7XHJcbiAgaWYgKHN0b3JhZ2UgPT09IG51bGwpIHtcclxuICAgIC8vIGlmIHN0b3JhZ2Ugbm90IGF2YWlsYWJsZSwgaW5pdGlhbGl6ZSBwcm9qZWN0cyB3aXRoIGVtcHR5IGFycmF5XHJcbiAgICBjb25zdCBmaXJzdFByb2plY3QgPSBQcm9qZWN0KCdGaXJzdCBQcm9qZWN0JywgW10pO1xyXG4gICAgcHJvamVjdHMgPSBbZmlyc3RQcm9qZWN0XTtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gaWYgc3RvcmFnZSBhdmFpbGFibGUsIGluaXRpYWxpemUgZnJvbSBzdG9yYWdlXHJcbiAgICBwcm9qZWN0cyA9IHN0b3JhZ2UuZ2V0U3RvcmFnZSgpO1xyXG4gICAgaWYgKHByb2plY3RzID09PSBudWxsKSB7XHJcbiAgICAgIC8vIGlmIHRoZXJlIGFyZSBub3QgcHJvamVjdHMgaW4gc3RvcmFnZSwgY3JlYXRlIGEgZmlyc3QgcHJvamVjdFxyXG4gICAgICBjb25zdCBmaXJzdFByb2plY3QgPSBQcm9qZWN0KCdGaXJzdCBQcm9qZWN0JywgW10pO1xyXG4gICAgICBwcm9qZWN0cyA9IFtmaXJzdFByb2plY3RdOyBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGZpbmRQcm9qZWN0ID0gZnVuY3Rpb24ocHJvamVjdE5hbWUpIHtcclxuICAgIC8vIGZpbmRzIGFuZCByZXR1cm5zIHRoZSBmaXJzdCBwcm9qZWN0IG9iamVjdCBtYXRjaGluZyB0aGUgcHJvamVjdE5hbWVcclxuICAgIC8vIHJldHVybnMgbnVsbCBpZiBub3QgZm91bmRcclxuICAgIGZvciAobGV0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcclxuICAgICAgaWYgKHByb2plY3QucHJvamVjdE5hbWUgPT09IHByb2plY3ROYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb2plY3RcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhZGRQcm9qZWN0ID0gZnVuY3Rpb24obmV3UHJvamVjdCkge1xyXG4gICAgLy8gYWRkcyBhIHByb2plY3QgaXQgdG8gdGhlIGxpc3Qgb2YgcHJvamVjdHNcclxuICAgIHByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XHJcbiAgICBzdG9yYWdlLnVwZGF0ZVN0b3JhZ2UocHJvamVjdHMpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVtb3ZlUHJvamVjdCA9IGZ1bmN0aW9uKHByb2plY3QpIHtcclxuICAgIC8vIGRlbGV0ZXMgdGhlIHByb2plY3QgZnJvbSB0aGUgcHJvamVjdHMgbGlzdFxyXG4gICAgcHJvamVjdHMuZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB7XHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gcHJvamVjdCkge1xyXG4gICAgICAgIHByb2plY3RzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgc3RvcmFnZS51cGRhdGVTdG9yYWdlKHByb2plY3RzKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGFkZFRvZG8gPSBmdW5jdGlvbih0b2RvLCBwcm9qZWN0KSB7XHJcbiAgICAvLyBhZGRzIGEgbmV3IHRvZG8gdG8gdGhlIHByb2plY3RcclxuICAgIHByb2plY3QuYWRkVG9kbyh0b2RvKTtcclxuICAgIHN0b3JhZ2UudXBkYXRlU3RvcmFnZShwcm9qZWN0cyk7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZW1vdmVUb2RvID0gZnVuY3Rpb24odG9kbywgcHJvamVjdCkge1xyXG4gICAgLy8gZGVsZXRlcyB0aGUgdG9kbyBmcm9tIHRoYXQgcHJvamVjdHNcclxuICAgIHByb2plY3QucmVtb3ZlVG9kbyh0b2RvKTtcclxuICAgIHN0b3JhZ2UudXBkYXRlU3RvcmFnZShwcm9qZWN0cyk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB0b2dnbGVFeHBhbmRlZCA9IGZ1bmN0aW9uKHRvZG8pIHtcclxuICAgIC8vIHRvZ2dsZXMgdGhlIHRvZG8gYmV0d2VlbiBleHBhbmRlZCBhbmQgY29sbGFwc2VkXHJcbiAgICBpZiAodG9kby5leHBhbmRlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgdG9kby5leHBhbmRlZCA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b2RvLmV4cGFuZGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZmluZFByb2plY3QsXHJcbiAgICBhZGRQcm9qZWN0LFxyXG4gICAgcmVtb3ZlUHJvamVjdCxcclxuICAgIGFkZFRvZG8sXHJcbiAgICByZW1vdmVUb2RvLFxyXG4gICAgdG9nZ2xlRXhwYW5kZWQsXHJcbiAgICBwcm9qZWN0c1xyXG4gIH1cclxufSkoKTtcclxuXHJcbmV4cG9ydCB7IGFwcCB9OyIsImltcG9ydCB7IFRvZG8gfSBmcm9tIFwiLi90b2RvXCI7XHJcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tIFwiLi9wcm9qZWN0XCI7XHJcbmltcG9ydCB7IGFwcCB9IGZyb20gXCIuL2FwcFwiO1xyXG5cclxuLy8gRE9NIG1vZHVsZVxyXG5jb25zdCBkb21Nb2RpZmllciA9IChmdW5jdGlvbigpIHtcclxuICAvLyBtb2R1bGUgd2hpY2ggbWFuaXB1bGF0ZXMgYWxsIHRoZSBET00gZm9yIHRoZSBhcHBsaWNhdGlvblxyXG5cclxuICAvLyBnZXQgbWFqb3IgRE9NIGVsZW1lbnRzIGFuZCBzdG9yZXMgYXMgdmFyc1xyXG4gIGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzLWNvbnRhaW5lcicpO1xyXG4gIGNvbnN0IHRvZG9zQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG9zLWNvbnRhaW5lcicpO1xyXG5cclxuICAvLyBpbml0aWFsaXplIHByb2plY3QgYW5kIHRvZG9zIGxpc3QgZnJvbSBhcHBcclxuICBsZXQgcHJvamVjdExpc3QgPSBhcHAucHJvamVjdHM7XHJcbiAgbGV0IGN1cnJlbnRTZWxlY3RlZFByb2plY3QgPSBwcm9qZWN0TGlzdFswXTsgIC8vIHN0YXJ0IHdpdGggZmlyc3QgcHJvamVjdCBhcyBzZWxlY3RlZFxyXG4gIGxldCB0b2RvTGlzdCA9IGN1cnJlbnRTZWxlY3RlZFByb2plY3QuZ2V0VG9kb3MoKTtcclxuXHJcbiAgLy8gZ2V0IGxpc3Qgb2YgYWxsIHByb2plY3QgZWxlbWVudHNcclxuICBjb25zdCBwcm9qZWN0RWxlbWVudHMgPSBwcm9qZWN0c0NvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwcm9qZWN0Jyk7XHJcblxyXG4gIGNvbnN0IHByb2plY3RDbGlja2VkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAvLyB1cGRhdGUgY3VycmVudFNlbGVjdGVkUHJvamVjdCB3aXRoIHRoZSBjbGlja2VkIHByb2plY3RcclxuICAgIGN1cnJlbnRTZWxlY3RlZFByb2plY3QgPSBhcHAuZmluZFByb2plY3QodGhpcy5pbm5lclRleHQpO1xyXG4gICAgdXBkYXRlU2VsZWN0ZWRQcm9qZWN0KCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB1cGRhdGVTZWxlY3RlZFByb2plY3QgPSBmdW5jdGlvbigpIHtcclxuICAgIC8vIHVwZGF0ZXMgd2hpY2ggcHJvamVjdCBpcyB0aGUgY3VycmVudCBzZWxlY3RlZCBwcm9qZWN0IGluIERPTVxyXG4gICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgcHJvamVjdEVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChwcm9qZWN0RWxlbWVudHNbaV0uaW5uZXJUZXh0ID09PSBjdXJyZW50U2VsZWN0ZWRQcm9qZWN0LnByb2plY3ROYW1lKSB7XHJcbiAgICAgICAgcHJvamVjdEVsZW1lbnRzW2ldLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLXByb2plY3QnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwcm9qZWN0RWxlbWVudHNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQtcHJvamVjdCcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB1cGRhdGVUb2Rvc0RPTSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcHJvamVjdEhvdmVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBkaXNwbGF5cyB0cmFzaGNhbiBpY29uIGZvciBkZWxldGUgd2hlbiBob3ZlcmluZyBvdmVyIGEgcHJvamVjdFxyXG4gICAgXHJcbiAgICAvLyBjcmVhdGUgYnV0dG9uXHJcbiAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGRlbGV0ZUJ1dHRvbi5pZCA9ICdkZWxldGUtcHJvamVjdCc7XHJcblxyXG4gICAgLy8gY3JlYXRlIGltZyBlbGVtZW50XHJcbiAgICBjb25zdCB0cmFzaEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIHRyYXNoSWNvbi5zcmMgPSAnaW1hZ2VzL3RyYXNoLWljb24ucG5nJztcclxuICAgIGRlbGV0ZUJ1dHRvbi5hcHBlbmQodHJhc2hJY29uKTtcclxuICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbW92ZVByb2plY3QpO1xyXG4gICAgdGhpcy5wcmVwZW5kKGRlbGV0ZUJ1dHRvbik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwcm9qZWN0VW5ob3ZlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gcmVtb3ZlcyBkZWxldGUgYnV0dG9uXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVsZXRlLXByb2plY3QnKS5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHRvZG9Ib3ZlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gZGlzcGxheXMgdHJhc2hjYW4gaWNvbiBmb3IgZGVsZXRlIHdoZW4gaG92ZXJpbmcgb3ZlciBhIHByb2plY3RcclxuICAgIFxyXG4gICAgLy8gY3JlYXRlIGJ1dHRvblxyXG4gICAgY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBkZWxldGVCdXR0b24uaWQgPSAnZGVsZXRlLXRvZG8nO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBpbWcgZWxlbWVudFxyXG4gICAgY29uc3QgdHJhc2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICB0cmFzaEljb24uc3JjID0gJ2ltYWdlcy90cmFzaC1pY29uLnBuZyc7XHJcbiAgICBkZWxldGVCdXR0b24uYXBwZW5kKHRyYXNoSWNvbik7XHJcbiAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVUb2RvKTtcclxuICAgIHRoaXMucHJlcGVuZChkZWxldGVCdXR0b24pO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdG9kb1VuaG92ZXIgPSBmdW5jdGlvbigpIHtcclxuICAgIC8vIHJlbW92ZXMgZGVsZXRlIGJ1dHRvblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbGV0ZS10b2RvJykucmVtb3ZlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB0b2RvQ2xpY2tlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gZXhwYW5kcyBvciBjb2xsYXBzZXMgdG9kbyBvbiBjbGljayBieSB0b2dnbGluZyBleHBhbmRlZCBwcm9wZXJ0eSBhbmRcclxuICAgIC8vIHJlbmRlcmluZyB0b2RvIERPTSBhZ2FpblxyXG4gICAgY29uc3QgdG9kb1RpdGxlID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdoMicpLmlubmVyVGV4dDtcclxuICAgIGNvbnN0IHRvZG8gPSBjdXJyZW50U2VsZWN0ZWRQcm9qZWN0LmZpbmRUb2RvKHRvZG9UaXRsZSk7XHJcbiAgICBhcHAudG9nZ2xlRXhwYW5kZWQodG9kbyk7XHJcbiAgICB1cGRhdGVUb2Rvc0RPTSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaW5pdGlhbGl6ZVByb2plY3RzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBpbml0aWFsaXplcyB0aGUgcHJvamVjdHMgY29udGFpbmVyIHdpdGggYWxsIHByb2plY3RzIGluIHRoZSBhcHBcclxuICAgIHByb2plY3RzQ29udGFpbmVyLnJlcGxhY2VDaGlsZHJlbigpO1xyXG4gICAgZm9yIChsZXQgcHJvamVjdCBvZiBwcm9qZWN0TGlzdCkge1xyXG4gICAgICAvLyBjcmVhdGUgSFRNTCBlbGVtZW50IGZvciBlYWNoIHByb2plY3QgYW5kIHB1c2ggb250byBhcnJheVxyXG4gICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gcHJvamVjdC5wcm9qZWN0TmFtZTtcclxuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0Jyk7XHJcbiAgICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZChlbGVtZW50KTtcclxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2plY3RDbGlja2VkKTtcclxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgcHJvamVjdEhvdmVyKTtcclxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgcHJvamVjdFVuaG92ZXIpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlU2VsZWN0ZWRQcm9qZWN0KCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB1cGRhdGVUb2Rvc0RPTSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gcmVmcmVzaGVzIHRoZSBwcm9qZWN0cyBjb250YWluZXIgd2l0aCBhbGwgdGhlIHRvZG9zIGZvciB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHByb2plY3RcclxuICAgIHRvZG9zQ29udGFpbmVyLnJlcGxhY2VDaGlsZHJlbigpO1xyXG4gICAgY29uc3QgdG9kb3MgPSBjdXJyZW50U2VsZWN0ZWRQcm9qZWN0LmdldFRvZG9zKCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvZG9zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHRvZG8gPSB0b2Rvc1tpXTtcclxuICAgICAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZVRvZG9FbGVtZW50KHRvZG8pO1xyXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0b2RvSG92ZXIpO1xyXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0b2RvVW5ob3Zlcik7XHJcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2RvQ2xpY2tlZCk7XHJcbiAgICAgIHRvZG9zQ29udGFpbmVyLmFwcGVuZChlbGVtZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGNyZWF0ZVRvZG9FbGVtZW50ID0gZnVuY3Rpb24odG9kbykge1xyXG4gICAgLy8gY3JlYXRlIGRpdiBjb250YWluZXIgZm9yIGVhY2ggdG9kb1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYuY2xhc3NMaXN0LmFkZCgndG9kbycpO1xyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xyXG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gdG9kby50aXRsZTtcclxuICAgIGRpdi5hcHBlbmQodGl0bGUpO1xyXG4gICAgXHJcbiAgICBpZiAodG9kby5leHBhbmRlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAvLyBpZiB0b2RvIGlzIGV4cGFuZGVkIGNyZWF0ZSBvdGhlciBmaWVsZHNcclxuICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgIGRlc2NyaXB0aW9uLmlubmVyVGV4dCA9IHRvZG8uZGVzY3JpcHRpb247XHJcbiAgICAgIGRpdi5hcHBlbmQoZGVzY3JpcHRpb24pO1xyXG4gIFxyXG4gICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgcHJpb3JpdHkuaW5uZXJUZXh0ID0gJ1ByaW9yaXR5OiAnICsgdG9kby5wcmlvcml0eTtcclxuICAgICAgZGl2LmFwcGVuZChwcmlvcml0eSk7XHJcbiAgXHJcbiAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgIGR1ZURhdGUuaW5uZXJUZXh0ID0gdG9kby5kdWVEYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xyXG4gICAgICBkaXYuYXBwZW5kKGR1ZURhdGUpOyAgXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRpdjtcclxuICB9XHJcblxyXG4gIGNvbnN0IG5ld1RvZG9TdWJtaXQgPSBmdW5jdGlvbigpIHtcclxuICAgIC8vIG1ha2UgYSBUb2RvIG9iamVjdCBmcm9tIGVudHJ5IGZpZWxkcywgYXBwZW5kIHRvIHRvZG9zLCBhbmQgY2FsbCB1cGRhdGVUb2Rvc0RPTVxyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LXRpdGxlIGlucHV0JykudmFsdWU7XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctZGVzY3JpcHRpb24gaW5wdXQnKS52YWx1ZTtcclxuICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy1wcmlvcml0eSBpbnB1dCcpLnZhbHVlO1xyXG4gICAgY29uc3QgZHVlRGF0ZSA9IERhdGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy1kdWUtZGF0ZSBpbnB1dCcpLnZhbHVlKTtcclxuICAgIGNvbnN0IHRvZG8gPSBUb2RvKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpO1xyXG4gICAgaWYgKHRpdGxlID09PSAnJyApIHtcclxuICAgICAgYWxlcnQoJ1RvZG8gdGl0bGUgaXMgcmVxdWlyZWQuJyk7XHJcbiAgICB9IGVsc2UgaWYgKHByaW9yaXR5IDwgMSB8fCBwcmlvcml0eSA+IDUpIHtcclxuICAgICAgYWxlcnQoJ1ByaW9yaXR5IG11c3QgYmUgMS01LicpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhcHAuYWRkVG9kbyh0b2RvLCBjdXJyZW50U2VsZWN0ZWRQcm9qZWN0KTtcclxuICAgICAgdXBkYXRlVG9kb3NET00oKTsgIFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgYWRkUHJvamVjdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gYnJpbmdzIHVwIGZvcm0gZm9yIG5ldyBwcm9qZWN0LCBhZGRzIGl0IHRvIHRoZSBsaXN0LCBhbmQgdXBkYXRlcyB0aGUgRE9NXHJcbiAgICAvLyBGSVhNRTogcmVwbGFjZSBwcm9tcHQgd2l0aCBuZXcgcHJvamVjdCBmb3JtXHJcbiAgICBjb25zdCBuZXdQcm9qZWN0TmFtZSA9IHByb21wdCgnRW50ZXIgbmV3IHByb2plY3QgbmFtZScpO1xyXG4gICAgY29uc3QgbmV3UHJvamVjdCA9IFByb2plY3QobmV3UHJvamVjdE5hbWUsIFtdKTtcclxuICAgIGFwcC5hZGRQcm9qZWN0KG5ld1Byb2plY3QpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBIVE1MIGVsZW1lbnQgZm9yIG5ldyBwcm9qZWN0IGFuZCBhcHBlbmQgaXQgdG8gcHJvamVjdHNDb250YWluZXJcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gbmV3UHJvamVjdC5wcm9qZWN0TmFtZTtcclxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpO1xyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2plY3RDbGlja2VkKTtcclxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHByb2plY3RIb3Zlcik7XHJcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBwcm9qZWN0VW5ob3Zlcik7XHJcbiAgICBwcm9qZWN0c0NvbnRhaW5lci5hcHBlbmQoZWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZW1vdmVQcm9qZWN0ID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIC8vIGRlbGV0ZXMgdGhlIHByb2plY3QgZnJvbSB0aGUgcHJvamVjdHMgbGlzdCBhbmQgdXBkYXRlcyBET01cclxuXHJcbiAgICAvLyBnZXQgcHJvamVjdCBmb3IgY2xpY2tlZCBkZWxldGUgYnV0dG9uIGFuZCByZW1vdmUgZnJvbSBhcHBcclxuICAgIGNvbnN0IGRlbGV0ZWRQcm9qZWN0RWxlbWVudCA9IHRoaXMucGFyZW50RWxlbWVudDtcclxuICAgIGNvbnN0IHByb2plY3QgPSBhcHAuZmluZFByb2plY3QoZGVsZXRlZFByb2plY3RFbGVtZW50LmlubmVyVGV4dCk7XHJcbiAgICBhcHAucmVtb3ZlUHJvamVjdChwcm9qZWN0KTtcclxuXHJcbiAgICAvLyByZW1vdmUgcHJvamVjdCBmcm9tIGRvbVxyXG4gICAgZGVsZXRlZFByb2plY3RFbGVtZW50LnJlbW92ZSgpO1xyXG5cclxuICAgIC8vIGlmIGRlbGV0ZWQgcHJvamVjdCB3YXMgc2VsZWN0ZWQgdGhhbiB1cGRhdGUgY3VycmVudFNlbGVjdGVkUHJvamVjdFxyXG4gICAgaWYgKHByb2plY3QgPT09IGN1cnJlbnRTZWxlY3RlZFByb2plY3QpIHtcclxuICAgICAgY3VycmVudFNlbGVjdGVkUHJvamVjdCA9IGFwcC5wcm9qZWN0c1swXTtcclxuICAgICAgdXBkYXRlU2VsZWN0ZWRQcm9qZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3RvcCBwcm9wYWdhdGlvbiBvZiBldmVudCB0byBvdXRlciBkaXYgZWxlbWVudFxyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhZGRUb2RvID0gZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBicmluZ3MgdXAgZm9ybSBmb3IgbmV3IHRvZG8sIGFkZHMgaXQgdG8gdGhlIGxpc3QsIGFuZCB1cGRhdGVzIHRoZSBET01cclxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXRvZG8tZm9ybScpID09PSBudWxsKSB7XHJcbiAgICBcclxuICAgICAgLy8gY3JlYXRlIG5ldyB0b2RvIGVsZW1lbnQgd2l0aCB0ZXh0IGZpZWxkcyBmb3IgYWxsIHRoZSB2YWx1ZXNcclxuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIGRpdi5pZCA9ICduZXctdG9kby1mb3JtJztcclxuICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ3RvZG8nKTtcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IHRpdGxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHRpdGxlRGl2LmlkID0gJ25ldy10aXRsZSc7XHJcbiAgICAgIGNvbnN0IHRpdGxlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgICB0aXRsZUxhYmVsLmlubmVyVGV4dCA9ICdUb2RvIFRpdGxlOic7XHJcbiAgICAgIHRpdGxlTGFiZWwuZm9yID0gJ3RpdGxlJztcclxuICAgICAgY29uc3QgdGl0bGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIHRpdGxlSW5wdXQubmFtZSA9ICd0aXRsZSc7XHJcbiAgICAgIHRpdGxlRGl2LmFwcGVuZCh0aXRsZUxhYmVsLCB0aXRsZUlucHV0KTtcclxuICAgICAgZGl2LmFwcGVuZCh0aXRsZURpdik7XHJcblxyXG4gICAgICBjb25zdCBkZXNjcmlwdGlvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBkZXNjcmlwdGlvbkRpdi5pZCA9ICduZXctZGVzY3JpcHRpb24nO1xyXG4gICAgICBjb25zdCBkZXNjcmlwdGlvbkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgICAgZGVzY3JpcHRpb25MYWJlbC5pbm5lclRleHQgPSAnVG9kbyBEZXNjcmlwdGlvbjonO1xyXG4gICAgICBkZXNjcmlwdGlvbkxhYmVsLmZvciA9ICdkZXNjcmlwdGlvbic7XHJcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICBkZXNjcmlwdGlvbklucHV0Lm5hbWUgPSAnZGVzY3JpcHRpb24nO1xyXG4gICAgICBkZXNjcmlwdGlvbkRpdi5hcHBlbmQoZGVzY3JpcHRpb25MYWJlbCwgZGVzY3JpcHRpb25JbnB1dCk7XHJcbiAgICAgIGRpdi5hcHBlbmQoZGVzY3JpcHRpb25EaXYpO1xyXG5cclxuICAgICAgY29uc3QgZHVlRGF0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBkdWVEYXRlRGl2LmlkID0gJ25ldy1kdWUtZGF0ZSc7XHJcbiAgICAgIGNvbnN0IGR1ZURhdGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICAgIGR1ZURhdGVMYWJlbC5pbm5lclRleHQgPSAnRHVlIERhdGU6JztcclxuICAgICAgZHVlRGF0ZUxhYmVsLmZvciA9ICdkdWUtZGF0ZSc7XHJcbiAgICAgIGNvbnN0IGR1ZURhdGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIGR1ZURhdGVJbnB1dC5uYW1lID0gJ2R1ZS1kYXRlJztcclxuICAgICAgZHVlRGF0ZUlucHV0LnR5cGUgPSAnZGF0ZSc7XHJcbiAgICAgIGR1ZURhdGVEaXYuYXBwZW5kKGR1ZURhdGVMYWJlbCwgZHVlRGF0ZUlucHV0KTtcclxuICAgICAgZGl2LmFwcGVuZChkdWVEYXRlRGl2KTtcclxuXHJcbiAgICAgIGNvbnN0IHByaW9yaXR5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHByaW9yaXR5RGl2LmlkID0gJ25ldy1wcmlvcml0eSc7XHJcbiAgICAgIGNvbnN0IHByaW9yaXR5TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgICBwcmlvcml0eUxhYmVsLmlubmVyVGV4dCA9ICdQcmlvcml0eTonO1xyXG4gICAgICBwcmlvcml0eUxhYmVsLmZvciA9ICdwcmlvcml0eSc7XHJcbiAgICAgIGNvbnN0IHByaW9yaXR5SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICBwcmlvcml0eUlucHV0Lm5hbWUgPSAncHJpb3JpdHknO1xyXG4gICAgICBwcmlvcml0eUlucHV0LnR5cGUgPSAnbnVtYmVyJztcclxuICAgICAgcHJpb3JpdHlJbnB1dC5taW4gPSAnMSc7XHJcbiAgICAgIHByaW9yaXR5SW5wdXQubWF4ID0gJzUnO1xyXG4gICAgICBwcmlvcml0eURpdi5hcHBlbmQocHJpb3JpdHlMYWJlbCwgcHJpb3JpdHlJbnB1dCk7XHJcbiAgICAgIGRpdi5hcHBlbmQocHJpb3JpdHlEaXYpO1xyXG5cclxuICAgICAgY29uc3Qgc3VibWl0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIGNvbnN0IHN1Ym1pdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgc3VibWl0SW5wdXQudHlwZSA9ICdzdWJtaXQnO1xyXG4gICAgICBzdWJtaXRJbnB1dC52YWx1ZSA9ICdEb25lJztcclxuICAgICAgc3VibWl0SW5wdXQuY2xhc3NMaXN0LmFkZCgnYWRkLWJ1dHRvbicpO1xyXG4gICAgICBzdWJtaXRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG5ld1RvZG9TdWJtaXQpO1xyXG4gICAgICBzdWJtaXREaXYuYXBwZW5kKHN1Ym1pdElucHV0KTtcclxuICAgICAgZGl2LmFwcGVuZChzdWJtaXREaXYpO1xyXG5cclxuICAgICAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0b2RvSG92ZXIpO1xyXG4gICAgICBkaXYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRvZG9VbmhvdmVyKTtcclxuICAgICAgdG9kb3NDb250YWluZXIuYXBwZW5kKGRpdik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCByZW1vdmVUb2RvID0gZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBkZWxldGVzIHRoZSB0b2RvIGZyb20gdGhhdCBwcm9qZWN0cyB0b2RvcyBsaXN0IGFuZCB1cGRhdGVzIERPTVxyXG4gICAgY29uc3QgdG9kb1RpdGxlRWxlbWVudCA9IHRoaXMucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdoMicpO1xyXG4gICAgaWYgKHRvZG9UaXRsZUVsZW1lbnQgPT09IG51bGwpIHtcclxuICAgICAgLy8gb25seSB1cGRhdGUgdG9kb3MgRE9NIGlmIHRoZSBkaXYgYmVpbmcgZGVsZXRlZCBpcyB0aGUgbmV3LXRvZG8gZm9ybVxyXG4gICAgICB1cGRhdGVUb2Rvc0RPTSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgdG9kb1RpdGxlID0gdGhpcy5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJykuaW5uZXJUZXh0O1xyXG4gICAgICBjb25zdCB0b2RvID0gY3VycmVudFNlbGVjdGVkUHJvamVjdC5maW5kVG9kbyh0b2RvVGl0bGUpO1xyXG4gICAgICBhcHAucmVtb3ZlVG9kbyh0b2RvLCBjdXJyZW50U2VsZWN0ZWRQcm9qZWN0KTtcclxuICAgICAgdXBkYXRlVG9kb3NET00oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIHdpcmUgdXAgZXZlbnQgbGlzdGVuZXIgZm9yIEFkZCBQcm9qZWN0IGFuZCBBZGQgVG9kbyBidXR0b25zXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1wcm9qZWN0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRQcm9qZWN0KTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRvZG8nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZFRvZG8pO1xyXG5cclxuICAvLyB1cGRhdGUgcHJvamVjdCBsaXN0IGluIERPTSB0byBzdGFydFxyXG4gIGluaXRpYWxpemVQcm9qZWN0cygpO1xyXG5cclxuICAvLyB1cGRhdGUgdG9kb3MgZm9yIHNlbGVjdGVkIHByb2plY3QgaW4gRE9NIHRvIHN0YXJ0XHJcbiAgdXBkYXRlVG9kb3NET00oKTtcclxuXHJcbiAgLy8gdXBkYXRlIHNlbGVjdGVkIHByb2plY3QgaW4gRE9NIHRvIHN0YXJ0XHJcbiAgdXBkYXRlU2VsZWN0ZWRQcm9qZWN0KCk7XHJcbn0pKCk7IiwiaW1wb3J0IHsgVG9kbyB9IGZyb20gJy4vdG9kbyc7XHJcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tIFwiLi9wcm9qZWN0XCI7XHJcblxyXG5jb25zdCBzdG9yYWdlID0gKGZ1bmN0aW9uKCkge1xyXG4gIC8vIG1vZHVsZSB3aXRoIGFsbCB0aGUgbG9jYWxTdG9yYWdlIGZ1bmN0aW9uYWxpdHkgcmVxdWlyZWQgZm9yIHRoZSB0b2RvLWxpc3QgcHJvamVjdFxyXG4gIC8vIHdoaWNoIGFsbG93cyB0aGUgY2xpZW50IHRvIHN0b3JlIGRhdGEgYmV0d2VlbiBzZXNzaW9ucyB1c2luZyB0aGUgYnJvd3NlcnMgbG9jYWxTdG9yYWdlXHJcbiAgLy8gQVBJIFxyXG5cclxuICBmdW5jdGlvbiBzdG9yYWdlQXZhaWxhYmxlKHR5cGUpIHtcclxuICAgIC8vIGNoZWNrcyBpZiBsb2NhbCBzdG9yYWdlIGlzIGF2YWlsYWJsZVxyXG4gICAgLy8gdGFrZW4gZnJvbSBNRE4gKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJfU3RvcmFnZV9BUEkvVXNpbmdfdGhlX1dlYl9TdG9yYWdlX0FQSSlcclxuICAgIHZhciBzdG9yYWdlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBzdG9yYWdlID0gd2luZG93W3R5cGVdO1xyXG4gICAgICAgIHZhciB4ID0gJ19fc3RvcmFnZV90ZXN0X18nO1xyXG4gICAgICAgIHN0b3JhZ2Uuc2V0SXRlbSh4LCB4KTtcclxuICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oeCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBjYXRjaChlKSB7XHJcbiAgICAgICAgcmV0dXJuIGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgKFxyXG4gICAgICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XHJcbiAgICAgICAgICAgIGUuY29kZSA9PT0gMjIgfHxcclxuICAgICAgICAgICAgLy8gRmlyZWZveFxyXG4gICAgICAgICAgICBlLmNvZGUgPT09IDEwMTQgfHxcclxuICAgICAgICAgICAgLy8gdGVzdCBuYW1lIGZpZWxkIHRvbywgYmVjYXVzZSBjb2RlIG1pZ2h0IG5vdCBiZSBwcmVzZW50XHJcbiAgICAgICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcclxuICAgICAgICAgICAgZS5uYW1lID09PSAnUXVvdGFFeGNlZWRlZEVycm9yJyB8fFxyXG4gICAgICAgICAgICAvLyBGaXJlZm94XHJcbiAgICAgICAgICAgIGUubmFtZSA9PT0gJ05TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEJykgJiZcclxuICAgICAgICAgICAgLy8gYWNrbm93bGVkZ2UgUXVvdGFFeGNlZWRlZEVycm9yIG9ubHkgaWYgdGhlcmUncyBzb21ldGhpbmcgYWxyZWFkeSBzdG9yZWRcclxuICAgICAgICAgICAgKHN0b3JhZ2UgJiYgc3RvcmFnZS5sZW5ndGggIT09IDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgZ2V0U3RvcmFnZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gZ2V0cyBhbGwgdGhlIHByb2plY3RzIGZyb20gc3RvcmFnZSBhbmQgcmV0dXJucyB0aGVtIGFzIGFuIGFycmF5XHJcbiAgICAvLyByZXR1cm5zIG51bGwgaWYgbm8gbG9jYWxTdG9yYWdlIGV4aXN0c1xyXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpICE9PSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IHN0b3JhZ2VEYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSk7XHJcbiAgICAgIGNvbnN0IHByb2plY3RzID0gW107XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcmFnZURhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0ID0gUHJvamVjdChzdG9yYWdlRGF0YVtpXS5wcm9qZWN0TmFtZSwgW10pO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc3RvcmFnZURhdGFbaV0udG9kb3MubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgIGNvbnN0IHN0b3JhZ2VUb2RvID0gc3RvcmFnZURhdGFbaV0udG9kb3Nbal07XHJcbiAgICAgICAgICBjb25zdCB0b2RvID0gVG9kbyhzdG9yYWdlVG9kby50aXRsZSwgc3RvcmFnZVRvZG8uZGVzY3JpcHRpb24sIHN0b3JhZ2VUb2RvLmR1ZURhdGUsIHN0b3JhZ2VUb2RvLnByaW9yaXR5KTtcclxuICAgICAgICAgIHByb2plY3QuYWRkVG9kbyh0b2RvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcHJvamVjdHM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IHVwZGF0ZVN0b3JhZ2UgPSBmdW5jdGlvbihwcm9qZWN0cykge1xyXG4gICAgLy8gY29udmVydHMgYWxsIHByb2plY3RzIHRvIEpTT04gYW5kIHVwZGF0ZXMgbG9jYWxTdG9yYWdlIHdpdGggdGhlIGRhdGFcclxuICAgIGNvbnN0IGRhdGEgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RzW2ldO1xyXG4gICAgICBwcm9qZWN0LnRvZG9zID0gcHJvamVjdC5nZXRUb2RvcygpO1xyXG4gICAgICBkYXRhLnB1c2gocHJvamVjdCk7XHJcbiAgICB9XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgfVxyXG5cclxuICBpZiAoc3RvcmFnZUF2YWlsYWJsZSgnbG9jYWxTdG9yYWdlJykpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGdldFN0b3JhZ2UsXHJcbiAgICAgIHVwZGF0ZVN0b3JhZ2VcclxuICAgIH07XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufSkoKTtcclxuXHJcbmV4cG9ydCB7IHN0b3JhZ2UgfTsiLCIvLyBmYWN0b3J5IGZ1bmN0aW9uIGZvciBjcmVhdGUgcHJvamVjdHNcclxuY29uc3QgUHJvamVjdCA9IGZ1bmN0aW9uKHByb2plY3ROYW1lLCB0b2Rvcykge1xyXG4gIHByb2plY3ROYW1lID0gcHJvamVjdE5hbWUudG9TdHJpbmcoKTtcclxuICBcclxuICBsZXQgX3RvZG9zID0gW107XHJcbiAgLy8gY2hlY2sgaWYgdG9kb3MgaXMgYW4gYXJyYXkgb2JqZWN0LCB3cmFwIGl0IGluIGFuIGFycmF5IGlmIG5vdFxyXG4gIGlmIChBcnJheS5pc0FycmF5KHRvZG9zKSkge1xyXG4gICAgZm9yIChsZXQgdG9kbyBvZiB0b2Rvcykge1xyXG4gICAgICBfdG9kb3MucHVzaCh0b2RvKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgX3RvZG9zLnB1c2godG9kb3MpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYWRkVG9kbyA9IGZ1bmN0aW9uKHRvZG8pIHtcclxuICAgIF90b2Rvcy5wdXNoKHRvZG8pO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVtb3ZlVG9kbyA9IGZ1bmN0aW9uKHRvZG8pIHtcclxuICAgIF90b2Rvcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICBpZiAodG9kbyA9PT0gaXRlbSkge1xyXG4gICAgICAgIF90b2Rvcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGZpbmRUb2RvID0gZnVuY3Rpb24odG9kb1RpdGxlKSB7XHJcbiAgICAvLyByZXR1cm5zIGEgVG9kbyBvYmplY3QgaWYgdGhlIHByb2plY3QgaGFzIG9uZSB3aXRoIGEgbWF0Y2hpbmcgdGl0bGVcclxuICAgIC8vIG90aGVyd2lzZSByZXR1cm5zIG51bGxcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX3RvZG9zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChfdG9kb3NbaV0udGl0bGUgPT09IHRvZG9UaXRsZSkge1xyXG4gICAgICAgIHJldHVybiBfdG9kb3NbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZ2V0VG9kb3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIF90b2RvcyB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcHJvamVjdE5hbWUsXHJcbiAgICBhZGRUb2RvLFxyXG4gICAgcmVtb3ZlVG9kbyxcclxuICAgIGdldFRvZG9zLFxyXG4gICAgZmluZFRvZG9cclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgeyBQcm9qZWN0IH07IiwiLy8gZmFjdG9yeSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgdG9kbyBvYmplY3RzXHJcbmNvbnN0IFRvZG8gPSBmdW5jdGlvbih0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBub3RlcywgY2hlY2tsaXN0LCBleHBhbmRlZCkge1xyXG4gIHRpdGxlID0gdGl0bGUgfHwgJycsXHJcbiAgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbiB8fCAnJyxcclxuICBkdWVEYXRlID0gbmV3IERhdGUoZHVlRGF0ZSkgfHwgbnVsbCxcclxuICBwcmlvcml0eSA9IHByaW9yaXR5IHx8ICcxJyxcclxuICBub3RlcyA9IG5vdGVzIHx8ICcnLFxyXG4gIGNoZWNrbGlzdCA9IGNoZWNrbGlzdCB8fCBbXSxcclxuICBleHBhbmRlZCA9IGV4cGFuZGVkIHx8IGZhbHNlO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdGl0bGUsIFxyXG4gICAgZGVzY3JpcHRpb24sIFxyXG4gICAgZHVlRGF0ZSwgXHJcbiAgICBwcmlvcml0eSwgXHJcbiAgICBub3RlcywgXHJcbiAgICBjaGVja2xpc3QsXHJcbiAgICBleHBhbmRlZFxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgVG9kbyB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==