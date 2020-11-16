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

  return {
    findProject,
    addProject,
    removeProject,
    addTodo,
    removeTodo,
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
    this.append(deleteButton);
  }

  const projectUnhover = function() {
    // removes delete button
    document.getElementById('delete-project').remove();
  }

  // FIXME: edit to hover/unhover for todos
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
    const todo = (0,_todo__WEBPACK_IMPORTED_MODULE_0__.Todo)(title, description, dueDate, priority);
    _app__WEBPACK_IMPORTED_MODULE_2__.app.addTodo(todo, currentSelectedProject);
    updateTodosDOM();
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

      todosContainer.append(div);
    }
  }

  const removeTodo = function() {
    // deletes the todo from that projects todos list and updates DOM
    const todoTitle = this.parentElement.querySelector('h2').innerText;
    const todo = currentSelectedProject.findTodo(todoTitle);
    _app__WEBPACK_IMPORTED_MODULE_2__.app.removeTodo(todo, currentSelectedProject);
    updateTodosDOM();
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
const Todo = function(title, description, dueDate, priority, notes, checklist) {
  title = title || '',
  description = description || '',
  dueDate = new Date(dueDate) || null,
  priority = priority || '1',
  notes = notes || '',
  checklist = checklist || [];

  return {
    title, 
    description, 
    dueDate, 
    priority, 
    notes, 
    checklist
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXBwLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbG9jYWxTdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90b2RvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQThCO0FBQ007QUFDSzs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLGtEQUFPO0FBQ2I7QUFDQSx5QkFBeUIsaURBQU87QUFDaEM7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLDZEQUFrQjtBQUNqQztBQUNBO0FBQ0EsMkJBQTJCLGlEQUFPO0FBQ2xDLGdDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGdFQUFxQjtBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSSxnRUFBcUI7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnRUFBcUI7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0Es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Q0E7QUFDQSxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7VUNqQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb2RvIH0gZnJvbSAnLi90b2RvJztcclxuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vcHJvamVjdCc7XHJcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tICcuL2xvY2FsU3RvcmFnZSc7XHJcblxyXG4vLyBhcHAgbW9kdWxlXHJcbmNvbnN0IGFwcCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgLy8gaW5pdGlhbGl6ZSBBcnJheSBvZiBwcm9qZWN0cyB3aXRoIHRoZSBkZWZhdWx0IHByb2plY3RcclxuICBsZXQgcHJvamVjdHM7XHJcbiAgaWYgKHN0b3JhZ2UgPT09IG51bGwpIHtcclxuICAgIC8vIGlmIHN0b3JhZ2Ugbm90IGF2YWlsYWJsZSwgaW5pdGlhbGl6ZSBwcm9qZWN0cyB3aXRoIGVtcHR5IGFycmF5XHJcbiAgICBjb25zdCBmaXJzdFByb2plY3QgPSBQcm9qZWN0KCdGaXJzdCBQcm9qZWN0JywgW10pO1xyXG4gICAgcHJvamVjdHMgPSBbZmlyc3RQcm9qZWN0XTtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gaWYgc3RvcmFnZSBhdmFpbGFibGUsIGluaXRpYWxpemUgZnJvbSBzdG9yYWdlXHJcbiAgICBwcm9qZWN0cyA9IHN0b3JhZ2UuZ2V0U3RvcmFnZSgpO1xyXG4gICAgaWYgKHByb2plY3RzID09PSBudWxsKSB7XHJcbiAgICAgIC8vIGlmIHRoZXJlIGFyZSBub3QgcHJvamVjdHMgaW4gc3RvcmFnZSwgY3JlYXRlIGEgZmlyc3QgcHJvamVjdFxyXG4gICAgICBjb25zdCBmaXJzdFByb2plY3QgPSBQcm9qZWN0KCdGaXJzdCBQcm9qZWN0JywgW10pO1xyXG4gICAgICBwcm9qZWN0cyA9IFtmaXJzdFByb2plY3RdOyBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGZpbmRQcm9qZWN0ID0gZnVuY3Rpb24ocHJvamVjdE5hbWUpIHtcclxuICAgIC8vIGZpbmRzIGFuZCByZXR1cm5zIHRoZSBmaXJzdCBwcm9qZWN0IG9iamVjdCBtYXRjaGluZyB0aGUgcHJvamVjdE5hbWVcclxuICAgIC8vIHJldHVybnMgbnVsbCBpZiBub3QgZm91bmRcclxuICAgIGZvciAobGV0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcclxuICAgICAgaWYgKHByb2plY3QucHJvamVjdE5hbWUgPT09IHByb2plY3ROYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb2plY3RcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhZGRQcm9qZWN0ID0gZnVuY3Rpb24obmV3UHJvamVjdCkge1xyXG4gICAgLy8gYWRkcyBhIHByb2plY3QgaXQgdG8gdGhlIGxpc3Qgb2YgcHJvamVjdHNcclxuICAgIHByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XHJcbiAgICBzdG9yYWdlLnVwZGF0ZVN0b3JhZ2UocHJvamVjdHMpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVtb3ZlUHJvamVjdCA9IGZ1bmN0aW9uKHByb2plY3QpIHtcclxuICAgIC8vIGRlbGV0ZXMgdGhlIHByb2plY3QgZnJvbSB0aGUgcHJvamVjdHMgbGlzdFxyXG4gICAgcHJvamVjdHMuZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB7XHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gcHJvamVjdCkge1xyXG4gICAgICAgIHByb2plY3RzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgc3RvcmFnZS51cGRhdGVTdG9yYWdlKHByb2plY3RzKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGFkZFRvZG8gPSBmdW5jdGlvbih0b2RvLCBwcm9qZWN0KSB7XHJcbiAgICAvLyBhZGRzIGEgbmV3IHRvZG8gdG8gdGhlIHByb2plY3RcclxuICAgIHByb2plY3QuYWRkVG9kbyh0b2RvKTtcclxuICAgIHN0b3JhZ2UudXBkYXRlU3RvcmFnZShwcm9qZWN0cyk7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZW1vdmVUb2RvID0gZnVuY3Rpb24odG9kbywgcHJvamVjdCkge1xyXG4gICAgLy8gZGVsZXRlcyB0aGUgdG9kbyBmcm9tIHRoYXQgcHJvamVjdHNcclxuICAgIHByb2plY3QucmVtb3ZlVG9kbyh0b2RvKTtcclxuICAgIHN0b3JhZ2UudXBkYXRlU3RvcmFnZShwcm9qZWN0cyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZmluZFByb2plY3QsXHJcbiAgICBhZGRQcm9qZWN0LFxyXG4gICAgcmVtb3ZlUHJvamVjdCxcclxuICAgIGFkZFRvZG8sXHJcbiAgICByZW1vdmVUb2RvLFxyXG4gICAgcHJvamVjdHNcclxuICB9XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgeyBhcHAgfTsiLCJpbXBvcnQgeyBUb2RvIH0gZnJvbSBcIi4vdG9kb1wiO1xyXG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSBcIi4vcHJvamVjdFwiO1xyXG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi9hcHBcIjtcclxuXHJcbi8vIERPTSBtb2R1bGVcclxuY29uc3QgZG9tTW9kaWZpZXIgPSAoZnVuY3Rpb24oKSB7XHJcbiAgLy8gbW9kdWxlIHdoaWNoIG1hbmlwdWxhdGVzIGFsbCB0aGUgRE9NIGZvciB0aGUgYXBwbGljYXRpb25cclxuXHJcbiAgLy8gZ2V0IG1ham9yIERPTSBlbGVtZW50cyBhbmQgc3RvcmVzIGFzIHZhcnNcclxuICBjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cy1jb250YWluZXInKTtcclxuICBjb25zdCB0b2Rvc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2Rvcy1jb250YWluZXInKTtcclxuXHJcbiAgLy8gaW5pdGlhbGl6ZSBwcm9qZWN0IGFuZCB0b2RvcyBsaXN0IGZyb20gYXBwXHJcbiAgbGV0IHByb2plY3RMaXN0ID0gYXBwLnByb2plY3RzO1xyXG4gIGxldCBjdXJyZW50U2VsZWN0ZWRQcm9qZWN0ID0gcHJvamVjdExpc3RbMF07ICAvLyBzdGFydCB3aXRoIGZpcnN0IHByb2plY3QgYXMgc2VsZWN0ZWRcclxuICBsZXQgdG9kb0xpc3QgPSBjdXJyZW50U2VsZWN0ZWRQcm9qZWN0LmdldFRvZG9zKCk7XHJcblxyXG4gIC8vIGdldCBsaXN0IG9mIGFsbCBwcm9qZWN0IGVsZW1lbnRzXHJcbiAgY29uc3QgcHJvamVjdEVsZW1lbnRzID0gcHJvamVjdHNDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHJvamVjdCcpO1xyXG5cclxuICBjb25zdCBwcm9qZWN0Q2xpY2tlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gdXBkYXRlIGN1cnJlbnRTZWxlY3RlZFByb2plY3Qgd2l0aCB0aGUgY2xpY2tlZCBwcm9qZWN0XHJcbiAgICBjdXJyZW50U2VsZWN0ZWRQcm9qZWN0ID0gYXBwLmZpbmRQcm9qZWN0KHRoaXMuaW5uZXJUZXh0KTtcclxuICAgIHVwZGF0ZVNlbGVjdGVkUHJvamVjdCgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdXBkYXRlU2VsZWN0ZWRQcm9qZWN0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAvLyB1cGRhdGVzIHdoaWNoIHByb2plY3QgaXMgdGhlIGN1cnJlbnQgc2VsZWN0ZWQgcHJvamVjdCBpbiBET01cclxuICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IHByb2plY3RFbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAocHJvamVjdEVsZW1lbnRzW2ldLmlubmVyVGV4dCA9PT0gY3VycmVudFNlbGVjdGVkUHJvamVjdC5wcm9qZWN0TmFtZSkge1xyXG4gICAgICAgIHByb2plY3RFbGVtZW50c1tpXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1wcm9qZWN0Jyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcHJvamVjdEVsZW1lbnRzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkLXByb2plY3QnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdXBkYXRlVG9kb3NET00oKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHByb2plY3RIb3ZlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gZGlzcGxheXMgdHJhc2hjYW4gaWNvbiBmb3IgZGVsZXRlIHdoZW4gaG92ZXJpbmcgb3ZlciBhIHByb2plY3RcclxuICAgIFxyXG4gICAgLy8gY3JlYXRlIGJ1dHRvblxyXG4gICAgY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBkZWxldGVCdXR0b24uaWQgPSAnZGVsZXRlLXByb2plY3QnO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBpbWcgZWxlbWVudFxyXG4gICAgY29uc3QgdHJhc2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICB0cmFzaEljb24uc3JjID0gJ2ltYWdlcy90cmFzaC1pY29uLnBuZyc7XHJcbiAgICBkZWxldGVCdXR0b24uYXBwZW5kKHRyYXNoSWNvbik7XHJcbiAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVQcm9qZWN0KTtcclxuICAgIHRoaXMuYXBwZW5kKGRlbGV0ZUJ1dHRvbik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwcm9qZWN0VW5ob3ZlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gcmVtb3ZlcyBkZWxldGUgYnV0dG9uXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVsZXRlLXByb2plY3QnKS5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIC8vIEZJWE1FOiBlZGl0IHRvIGhvdmVyL3VuaG92ZXIgZm9yIHRvZG9zXHJcbiAgY29uc3QgdG9kb0hvdmVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBkaXNwbGF5cyB0cmFzaGNhbiBpY29uIGZvciBkZWxldGUgd2hlbiBob3ZlcmluZyBvdmVyIGEgcHJvamVjdFxyXG4gICAgXHJcbiAgICAvLyBjcmVhdGUgYnV0dG9uXHJcbiAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGRlbGV0ZUJ1dHRvbi5pZCA9ICdkZWxldGUtdG9kbyc7XHJcblxyXG4gICAgLy8gY3JlYXRlIGltZyBlbGVtZW50XHJcbiAgICBjb25zdCB0cmFzaEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIHRyYXNoSWNvbi5zcmMgPSAnaW1hZ2VzL3RyYXNoLWljb24ucG5nJztcclxuICAgIGRlbGV0ZUJ1dHRvbi5hcHBlbmQodHJhc2hJY29uKTtcclxuICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbW92ZVRvZG8pO1xyXG4gICAgdGhpcy5wcmVwZW5kKGRlbGV0ZUJ1dHRvbik7XHJcbiAgfVxyXG5cclxuICBjb25zdCB0b2RvVW5ob3ZlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gcmVtb3ZlcyBkZWxldGUgYnV0dG9uXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVsZXRlLXRvZG8nKS5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGluaXRpYWxpemVQcm9qZWN0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gaW5pdGlhbGl6ZXMgdGhlIHByb2plY3RzIGNvbnRhaW5lciB3aXRoIGFsbCBwcm9qZWN0cyBpbiB0aGUgYXBwXHJcbiAgICBwcm9qZWN0c0NvbnRhaW5lci5yZXBsYWNlQ2hpbGRyZW4oKTtcclxuICAgIGZvciAobGV0IHByb2plY3Qgb2YgcHJvamVjdExpc3QpIHtcclxuICAgICAgLy8gY3JlYXRlIEhUTUwgZWxlbWVudCBmb3IgZWFjaCBwcm9qZWN0IGFuZCBwdXNoIG9udG8gYXJyYXlcclxuICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBlbGVtZW50LmlubmVyVGV4dCA9IHByb2plY3QucHJvamVjdE5hbWU7XHJcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpO1xyXG4gICAgICBwcm9qZWN0c0NvbnRhaW5lci5hcHBlbmQoZWxlbWVudCk7XHJcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9qZWN0Q2xpY2tlZCk7XHJcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHByb2plY3RIb3Zlcik7XHJcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHByb2plY3RVbmhvdmVyKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVNlbGVjdGVkUHJvamVjdCgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdXBkYXRlVG9kb3NET00gPSBmdW5jdGlvbigpIHtcclxuICAgIC8vIHJlZnJlc2hlcyB0aGUgcHJvamVjdHMgY29udGFpbmVyIHdpdGggYWxsIHRoZSB0b2RvcyBmb3IgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBwcm9qZWN0XHJcbiAgICB0b2Rvc0NvbnRhaW5lci5yZXBsYWNlQ2hpbGRyZW4oKTtcclxuICAgIGNvbnN0IHRvZG9zID0gY3VycmVudFNlbGVjdGVkUHJvamVjdC5nZXRUb2RvcygpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2Rvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCB0b2RvID0gdG9kb3NbaV07XHJcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBjcmVhdGVUb2RvRWxlbWVudCh0b2RvKTtcclxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdG9kb0hvdmVyKTtcclxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdG9kb1VuaG92ZXIpO1xyXG4gICAgICB0b2Rvc0NvbnRhaW5lci5hcHBlbmQoZWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBjcmVhdGVUb2RvRWxlbWVudCA9IGZ1bmN0aW9uKHRvZG8pIHtcclxuICAgIC8vIGNyZWF0ZSBkaXYgY29udGFpbmVyIGZvciBlYWNoIHRvZG9cclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoJ3RvZG8nKTtcclxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcclxuICAgIHRpdGxlLmlubmVyVGV4dCA9IHRvZG8udGl0bGU7XHJcbiAgICBkaXYuYXBwZW5kKHRpdGxlKTtcclxuICAgIFxyXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBkZXNjcmlwdGlvbi5pbm5lclRleHQgPSB0b2RvLmRlc2NyaXB0aW9uO1xyXG4gICAgZGl2LmFwcGVuZChkZXNjcmlwdGlvbik7XHJcblxyXG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBwcmlvcml0eS5pbm5lclRleHQgPSAnUHJpb3JpdHk6ICcgKyB0b2RvLnByaW9yaXR5O1xyXG4gICAgZGl2LmFwcGVuZChwcmlvcml0eSk7XHJcblxyXG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIGR1ZURhdGUuaW5uZXJUZXh0ID0gdG9kby5kdWVEYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xyXG4gICAgZGl2LmFwcGVuZChkdWVEYXRlKTtcclxuXHJcbiAgICByZXR1cm4gZGl2O1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbmV3VG9kb1N1Ym1pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gbWFrZSBhIFRvZG8gb2JqZWN0IGZyb20gZW50cnkgZmllbGRzLCBhcHBlbmQgdG8gdG9kb3MsIGFuZCBjYWxsIHVwZGF0ZVRvZG9zRE9NXHJcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctdGl0bGUgaW5wdXQnKS52YWx1ZTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy1kZXNjcmlwdGlvbiBpbnB1dCcpLnZhbHVlO1xyXG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LXByaW9yaXR5IGlucHV0JykudmFsdWU7XHJcbiAgICBjb25zdCBkdWVEYXRlID0gRGF0ZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LWR1ZS1kYXRlIGlucHV0JykudmFsdWUpO1xyXG4gICAgY29uc3QgdG9kbyA9IFRvZG8odGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSk7XHJcbiAgICBhcHAuYWRkVG9kbyh0b2RvLCBjdXJyZW50U2VsZWN0ZWRQcm9qZWN0KTtcclxuICAgIHVwZGF0ZVRvZG9zRE9NKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhZGRQcm9qZWN0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBicmluZ3MgdXAgZm9ybSBmb3IgbmV3IHByb2plY3QsIGFkZHMgaXQgdG8gdGhlIGxpc3QsIGFuZCB1cGRhdGVzIHRoZSBET01cclxuICAgIC8vIEZJWE1FOiByZXBsYWNlIHByb21wdCB3aXRoIG5ldyBwcm9qZWN0IGZvcm1cclxuICAgIGNvbnN0IG5ld1Byb2plY3ROYW1lID0gcHJvbXB0KCdFbnRlciBuZXcgcHJvamVjdCBuYW1lJyk7XHJcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gUHJvamVjdChuZXdQcm9qZWN0TmFtZSwgW10pO1xyXG4gICAgYXBwLmFkZFByb2plY3QobmV3UHJvamVjdCk7XHJcblxyXG4gICAgLy8gY3JlYXRlIEhUTUwgZWxlbWVudCBmb3IgbmV3IHByb2plY3QgYW5kIGFwcGVuZCBpdCB0byBwcm9qZWN0c0NvbnRhaW5lclxyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZWxlbWVudC5pbm5lclRleHQgPSBuZXdQcm9qZWN0LnByb2plY3ROYW1lO1xyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0Jyk7XHJcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvamVjdENsaWNrZWQpO1xyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgcHJvamVjdEhvdmVyKTtcclxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHByb2plY3RVbmhvdmVyKTtcclxuICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZChlbGVtZW50KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlbW92ZVByb2plY3QgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgLy8gZGVsZXRlcyB0aGUgcHJvamVjdCBmcm9tIHRoZSBwcm9qZWN0cyBsaXN0IGFuZCB1cGRhdGVzIERPTVxyXG5cclxuICAgIC8vIGdldCBwcm9qZWN0IGZvciBjbGlja2VkIGRlbGV0ZSBidXR0b24gYW5kIHJlbW92ZSBmcm9tIGFwcFxyXG4gICAgY29uc3QgZGVsZXRlZFByb2plY3RFbGVtZW50ID0gdGhpcy5wYXJlbnRFbGVtZW50O1xyXG4gICAgY29uc3QgcHJvamVjdCA9IGFwcC5maW5kUHJvamVjdChkZWxldGVkUHJvamVjdEVsZW1lbnQuaW5uZXJUZXh0KTtcclxuICAgIGFwcC5yZW1vdmVQcm9qZWN0KHByb2plY3QpO1xyXG5cclxuICAgIC8vIHJlbW92ZSBwcm9qZWN0IGZyb20gZG9tXHJcbiAgICBkZWxldGVkUHJvamVjdEVsZW1lbnQucmVtb3ZlKCk7XHJcblxyXG4gICAgLy8gaWYgZGVsZXRlZCBwcm9qZWN0IHdhcyBzZWxlY3RlZCB0aGFuIHVwZGF0ZSBjdXJyZW50U2VsZWN0ZWRQcm9qZWN0XHJcbiAgICBpZiAocHJvamVjdCA9PT0gY3VycmVudFNlbGVjdGVkUHJvamVjdCkge1xyXG4gICAgICBjdXJyZW50U2VsZWN0ZWRQcm9qZWN0ID0gYXBwLnByb2plY3RzWzBdO1xyXG4gICAgICB1cGRhdGVTZWxlY3RlZFByb2plY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzdG9wIHByb3BhZ2F0aW9uIG9mIGV2ZW50IHRvIG91dGVyIGRpdiBlbGVtZW50XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGFkZFRvZG8gPSBmdW5jdGlvbigpIHtcclxuICAgIC8vIGJyaW5ncyB1cCBmb3JtIGZvciBuZXcgdG9kbywgYWRkcyBpdCB0byB0aGUgbGlzdCwgYW5kIHVwZGF0ZXMgdGhlIERPTVxyXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctdG9kby1mb3JtJykgPT09IG51bGwpIHtcclxuICAgIFxyXG4gICAgICAvLyBjcmVhdGUgbmV3IHRvZG8gZWxlbWVudCB3aXRoIHRleHQgZmllbGRzIGZvciBhbGwgdGhlIHZhbHVlc1xyXG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgZGl2LmlkID0gJ25ldy10b2RvLWZvcm0nO1xyXG4gICAgICBkaXYuY2xhc3NMaXN0LmFkZCgndG9kbycpO1xyXG4gICAgICBcclxuICAgICAgY29uc3QgdGl0bGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgdGl0bGVEaXYuaWQgPSAnbmV3LXRpdGxlJztcclxuICAgICAgY29uc3QgdGl0bGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICAgIHRpdGxlTGFiZWwuaW5uZXJUZXh0ID0gJ1RvZG8gVGl0bGU6JztcclxuICAgICAgdGl0bGVMYWJlbC5mb3IgPSAndGl0bGUnO1xyXG4gICAgICBjb25zdCB0aXRsZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgdGl0bGVJbnB1dC5uYW1lID0gJ3RpdGxlJztcclxuICAgICAgdGl0bGVEaXYuYXBwZW5kKHRpdGxlTGFiZWwsIHRpdGxlSW5wdXQpO1xyXG4gICAgICBkaXYuYXBwZW5kKHRpdGxlRGl2KTtcclxuXHJcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIGRlc2NyaXB0aW9uRGl2LmlkID0gJ25ldy1kZXNjcmlwdGlvbic7XHJcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgICBkZXNjcmlwdGlvbkxhYmVsLmlubmVyVGV4dCA9ICdUb2RvIERlc2NyaXB0aW9uOic7XHJcbiAgICAgIGRlc2NyaXB0aW9uTGFiZWwuZm9yID0gJ2Rlc2NyaXB0aW9uJztcclxuICAgICAgY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIGRlc2NyaXB0aW9uSW5wdXQubmFtZSA9ICdkZXNjcmlwdGlvbic7XHJcbiAgICAgIGRlc2NyaXB0aW9uRGl2LmFwcGVuZChkZXNjcmlwdGlvbkxhYmVsLCBkZXNjcmlwdGlvbklucHV0KTtcclxuICAgICAgZGl2LmFwcGVuZChkZXNjcmlwdGlvbkRpdik7XHJcblxyXG4gICAgICBjb25zdCBkdWVEYXRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIGR1ZURhdGVEaXYuaWQgPSAnbmV3LWR1ZS1kYXRlJztcclxuICAgICAgY29uc3QgZHVlRGF0ZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgICAgZHVlRGF0ZUxhYmVsLmlubmVyVGV4dCA9ICdEdWUgRGF0ZTonO1xyXG4gICAgICBkdWVEYXRlTGFiZWwuZm9yID0gJ2R1ZS1kYXRlJztcclxuICAgICAgY29uc3QgZHVlRGF0ZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgZHVlRGF0ZUlucHV0Lm5hbWUgPSAnZHVlLWRhdGUnO1xyXG4gICAgICBkdWVEYXRlSW5wdXQudHlwZSA9ICdkYXRlJztcclxuICAgICAgZHVlRGF0ZURpdi5hcHBlbmQoZHVlRGF0ZUxhYmVsLCBkdWVEYXRlSW5wdXQpO1xyXG4gICAgICBkaXYuYXBwZW5kKGR1ZURhdGVEaXYpO1xyXG5cclxuICAgICAgY29uc3QgcHJpb3JpdHlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgcHJpb3JpdHlEaXYuaWQgPSAnbmV3LXByaW9yaXR5JztcclxuICAgICAgY29uc3QgcHJpb3JpdHlMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICAgIHByaW9yaXR5TGFiZWwuaW5uZXJUZXh0ID0gJ1ByaW9yaXR5Oic7XHJcbiAgICAgIHByaW9yaXR5TGFiZWwuZm9yID0gJ3ByaW9yaXR5JztcclxuICAgICAgY29uc3QgcHJpb3JpdHlJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIHByaW9yaXR5SW5wdXQubmFtZSA9ICdwcmlvcml0eSc7XHJcbiAgICAgIHByaW9yaXR5SW5wdXQudHlwZSA9ICdudW1iZXInO1xyXG4gICAgICBwcmlvcml0eUlucHV0Lm1pbiA9ICcxJztcclxuICAgICAgcHJpb3JpdHlJbnB1dC5tYXggPSAnNSc7XHJcbiAgICAgIHByaW9yaXR5RGl2LmFwcGVuZChwcmlvcml0eUxhYmVsLCBwcmlvcml0eUlucHV0KTtcclxuICAgICAgZGl2LmFwcGVuZChwcmlvcml0eURpdik7XHJcblxyXG4gICAgICBjb25zdCBzdWJtaXREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgY29uc3Qgc3VibWl0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICBzdWJtaXRJbnB1dC50eXBlID0gJ3N1Ym1pdCc7XHJcbiAgICAgIHN1Ym1pdElucHV0LnZhbHVlID0gJ0RvbmUnO1xyXG4gICAgICBzdWJtaXRJbnB1dC5jbGFzc0xpc3QuYWRkKCdhZGQtYnV0dG9uJyk7XHJcbiAgICAgIHN1Ym1pdElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbmV3VG9kb1N1Ym1pdCk7XHJcbiAgICAgIHN1Ym1pdERpdi5hcHBlbmQoc3VibWl0SW5wdXQpO1xyXG4gICAgICBkaXYuYXBwZW5kKHN1Ym1pdERpdik7XHJcblxyXG4gICAgICB0b2Rvc0NvbnRhaW5lci5hcHBlbmQoZGl2KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IHJlbW92ZVRvZG8gPSBmdW5jdGlvbigpIHtcclxuICAgIC8vIGRlbGV0ZXMgdGhlIHRvZG8gZnJvbSB0aGF0IHByb2plY3RzIHRvZG9zIGxpc3QgYW5kIHVwZGF0ZXMgRE9NXHJcbiAgICBjb25zdCB0b2RvVGl0bGUgPSB0aGlzLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignaDInKS5pbm5lclRleHQ7XHJcbiAgICBjb25zdCB0b2RvID0gY3VycmVudFNlbGVjdGVkUHJvamVjdC5maW5kVG9kbyh0b2RvVGl0bGUpO1xyXG4gICAgYXBwLnJlbW92ZVRvZG8odG9kbywgY3VycmVudFNlbGVjdGVkUHJvamVjdCk7XHJcbiAgICB1cGRhdGVUb2Rvc0RPTSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gd2lyZSB1cCBldmVudCBsaXN0ZW5lciBmb3IgQWRkIFByb2plY3QgYW5kIEFkZCBUb2RvIGJ1dHRvbnNcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXByb2plY3QnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZFByb2plY3QpO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdG9kbycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkVG9kbyk7XHJcblxyXG4gIC8vIHVwZGF0ZSBwcm9qZWN0IGxpc3QgaW4gRE9NIHRvIHN0YXJ0XHJcbiAgaW5pdGlhbGl6ZVByb2plY3RzKCk7XHJcblxyXG4gIC8vIHVwZGF0ZSB0b2RvcyBmb3Igc2VsZWN0ZWQgcHJvamVjdCBpbiBET00gdG8gc3RhcnRcclxuICB1cGRhdGVUb2Rvc0RPTSgpO1xyXG5cclxuICAvLyB1cGRhdGUgc2VsZWN0ZWQgcHJvamVjdCBpbiBET00gdG8gc3RhcnRcclxuICB1cGRhdGVTZWxlY3RlZFByb2plY3QoKTtcclxufSkoKTsiLCJpbXBvcnQgeyBUb2RvIH0gZnJvbSAnLi90b2RvJztcclxuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gXCIuL3Byb2plY3RcIjtcclxuXHJcbmNvbnN0IHN0b3JhZ2UgPSAoZnVuY3Rpb24oKSB7XHJcbiAgLy8gbW9kdWxlIHdpdGggYWxsIHRoZSBsb2NhbFN0b3JhZ2UgZnVuY3Rpb25hbGl0eSByZXF1aXJlZCBmb3IgdGhlIHRvZG8tbGlzdCBwcm9qZWN0XHJcbiAgLy8gd2hpY2ggYWxsb3dzIHRoZSBjbGllbnQgdG8gc3RvcmUgZGF0YSBiZXR3ZWVuIHNlc3Npb25zIHVzaW5nIHRoZSBicm93c2VycyBsb2NhbFN0b3JhZ2VcclxuICAvLyBBUEkgXHJcblxyXG4gIGZ1bmN0aW9uIHN0b3JhZ2VBdmFpbGFibGUodHlwZSkge1xyXG4gICAgLy8gY2hlY2tzIGlmIGxvY2FsIHN0b3JhZ2UgaXMgYXZhaWxhYmxlXHJcbiAgICAvLyB0YWtlbiBmcm9tIE1ETiAoaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dlYl9TdG9yYWdlX0FQSS9Vc2luZ190aGVfV2ViX1N0b3JhZ2VfQVBJKVxyXG4gICAgdmFyIHN0b3JhZ2U7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHN0b3JhZ2UgPSB3aW5kb3dbdHlwZV07XHJcbiAgICAgICAgdmFyIHggPSAnX19zdG9yYWdlX3Rlc3RfXyc7XHJcbiAgICAgICAgc3RvcmFnZS5zZXRJdGVtKHgsIHgpO1xyXG4gICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSh4KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGNhdGNoKGUpIHtcclxuICAgICAgICByZXR1cm4gZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiAoXHJcbiAgICAgICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcclxuICAgICAgICAgICAgZS5jb2RlID09PSAyMiB8fFxyXG4gICAgICAgICAgICAvLyBGaXJlZm94XHJcbiAgICAgICAgICAgIGUuY29kZSA9PT0gMTAxNCB8fFxyXG4gICAgICAgICAgICAvLyB0ZXN0IG5hbWUgZmllbGQgdG9vLCBiZWNhdXNlIGNvZGUgbWlnaHQgbm90IGJlIHByZXNlbnRcclxuICAgICAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxyXG4gICAgICAgICAgICBlLm5hbWUgPT09ICdRdW90YUV4Y2VlZGVkRXJyb3InIHx8XHJcbiAgICAgICAgICAgIC8vIEZpcmVmb3hcclxuICAgICAgICAgICAgZS5uYW1lID09PSAnTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRUQnKSAmJlxyXG4gICAgICAgICAgICAvLyBhY2tub3dsZWRnZSBRdW90YUV4Y2VlZGVkRXJyb3Igb25seSBpZiB0aGVyZSdzIHNvbWV0aGluZyBhbHJlYWR5IHN0b3JlZFxyXG4gICAgICAgICAgICAoc3RvcmFnZSAmJiBzdG9yYWdlLmxlbmd0aCAhPT0gMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBnZXRTdG9yYWdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBnZXRzIGFsbCB0aGUgcHJvamVjdHMgZnJvbSBzdG9yYWdlIGFuZCByZXR1cm5zIHRoZW0gYXMgYW4gYXJyYXlcclxuICAgIC8vIHJldHVybnMgbnVsbCBpZiBubyBsb2NhbFN0b3JhZ2UgZXhpc3RzXHJcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykgIT09IG51bGwpIHtcclxuICAgICAgY29uc3Qgc3RvcmFnZURhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKTtcclxuICAgICAgY29uc3QgcHJvamVjdHMgPSBbXTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdG9yYWdlRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBQcm9qZWN0KHN0b3JhZ2VEYXRhW2ldLnByb2plY3ROYW1lLCBbXSk7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzdG9yYWdlRGF0YVtpXS50b2Rvcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgY29uc3Qgc3RvcmFnZVRvZG8gPSBzdG9yYWdlRGF0YVtpXS50b2Rvc1tqXTtcclxuICAgICAgICAgIGNvbnN0IHRvZG8gPSBUb2RvKHN0b3JhZ2VUb2RvLnRpdGxlLCBzdG9yYWdlVG9kby5kZXNjcmlwdGlvbiwgc3RvcmFnZVRvZG8uZHVlRGF0ZSwgc3RvcmFnZVRvZG8ucHJpb3JpdHkpO1xyXG4gICAgICAgICAgcHJvamVjdC5hZGRUb2RvKHRvZG8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBwcm9qZWN0cztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgdXBkYXRlU3RvcmFnZSA9IGZ1bmN0aW9uKHByb2plY3RzKSB7XHJcbiAgICAvLyBjb252ZXJ0cyBhbGwgcHJvamVjdHMgdG8gSlNPTiBhbmQgdXBkYXRlcyBsb2NhbFN0b3JhZ2Ugd2l0aCB0aGUgZGF0YVxyXG4gICAgY29uc3QgZGF0YSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdHNbaV07XHJcbiAgICAgIHByb2plY3QudG9kb3MgPSBwcm9qZWN0LmdldFRvZG9zKCk7XHJcbiAgICAgIGRhdGEucHVzaChwcm9qZWN0KTtcclxuICAgIH1cclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICB9XHJcblxyXG4gIGlmIChzdG9yYWdlQXZhaWxhYmxlKCdsb2NhbFN0b3JhZ2UnKSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZ2V0U3RvcmFnZSxcclxuICAgICAgdXBkYXRlU3RvcmFnZVxyXG4gICAgfTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59KSgpO1xyXG5cclxuZXhwb3J0IHsgc3RvcmFnZSB9OyIsIi8vIGZhY3RvcnkgZnVuY3Rpb24gZm9yIGNyZWF0ZSBwcm9qZWN0c1xyXG5jb25zdCBQcm9qZWN0ID0gZnVuY3Rpb24ocHJvamVjdE5hbWUsIHRvZG9zKSB7XHJcbiAgcHJvamVjdE5hbWUgPSBwcm9qZWN0TmFtZS50b1N0cmluZygpO1xyXG4gIFxyXG4gIGxldCBfdG9kb3MgPSBbXTtcclxuICAvLyBjaGVjayBpZiB0b2RvcyBpcyBhbiBhcnJheSBvYmplY3QsIHdyYXAgaXQgaW4gYW4gYXJyYXkgaWYgbm90XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkodG9kb3MpKSB7XHJcbiAgICBmb3IgKGxldCB0b2RvIG9mIHRvZG9zKSB7XHJcbiAgICAgIF90b2Rvcy5wdXNoKHRvZG8pO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBfdG9kb3MucHVzaCh0b2Rvcyk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhZGRUb2RvID0gZnVuY3Rpb24odG9kbykge1xyXG4gICAgX3RvZG9zLnB1c2godG9kbyk7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZW1vdmVUb2RvID0gZnVuY3Rpb24odG9kbykge1xyXG4gICAgX3RvZG9zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgIGlmICh0b2RvID09PSBpdGVtKSB7XHJcbiAgICAgICAgX3RvZG9zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZmluZFRvZG8gPSBmdW5jdGlvbih0b2RvVGl0bGUpIHtcclxuICAgIC8vIHJldHVybnMgYSBUb2RvIG9iamVjdCBpZiB0aGUgcHJvamVjdCBoYXMgb25lIHdpdGggYSBtYXRjaGluZyB0aXRsZVxyXG4gICAgLy8gb3RoZXJ3aXNlIHJldHVybnMgbnVsbFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfdG9kb3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKF90b2Rvc1tpXS50aXRsZSA9PT0gdG9kb1RpdGxlKSB7XHJcbiAgICAgICAgcmV0dXJuIF90b2Rvc1tpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBnZXRUb2RvcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gX3RvZG9zIH07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwcm9qZWN0TmFtZSxcclxuICAgIGFkZFRvZG8sXHJcbiAgICByZW1vdmVUb2RvLFxyXG4gICAgZ2V0VG9kb3MsXHJcbiAgICBmaW5kVG9kb1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCB7IFByb2plY3QgfTsiLCIvLyBmYWN0b3J5IGZ1bmN0aW9uIGZvciBjcmVhdGluZyB0b2RvIG9iamVjdHNcclxuY29uc3QgVG9kbyA9IGZ1bmN0aW9uKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIG5vdGVzLCBjaGVja2xpc3QpIHtcclxuICB0aXRsZSA9IHRpdGxlIHx8ICcnLFxyXG4gIGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24gfHwgJycsXHJcbiAgZHVlRGF0ZSA9IG5ldyBEYXRlKGR1ZURhdGUpIHx8IG51bGwsXHJcbiAgcHJpb3JpdHkgPSBwcmlvcml0eSB8fCAnMScsXHJcbiAgbm90ZXMgPSBub3RlcyB8fCAnJyxcclxuICBjaGVja2xpc3QgPSBjaGVja2xpc3QgfHwgW107XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0aXRsZSwgXHJcbiAgICBkZXNjcmlwdGlvbiwgXHJcbiAgICBkdWVEYXRlLCBcclxuICAgIHByaW9yaXR5LCBcclxuICAgIG5vdGVzLCBcclxuICAgIGNoZWNrbGlzdFxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgVG9kbyB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==