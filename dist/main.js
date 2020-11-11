/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"app\": () => /* binding */ app\n/* harmony export */ });\n/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ \"./src/todo.js\");\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n\r\n\r\n\r\n// app module\r\nconst app = (function () {\r\n  // initialize Array of projects with the default project\r\n  const todo1 = (0,_todo__WEBPACK_IMPORTED_MODULE_0__.Todo)();\r\n  const todo2 = (0,_todo__WEBPACK_IMPORTED_MODULE_0__.Todo)('1st Todo', 'Do me', '2020-10-30', '5', \"I'm important\", ['subtask 1']);\r\n  const test = [todo1, todo2];\r\n  const defaultProject = (0,_project__WEBPACK_IMPORTED_MODULE_1__.Project)('myProject', test);\r\n  const projects = [defaultProject];\r\n\r\n  const findProject = function(projectName) {\r\n    // finds and returns the first project object matching the projectName\r\n    // returns null if not found\r\n    for (let project of projects) {\r\n      if (project.projectName === projectName) {\r\n        return project\r\n      }\r\n    }\r\n    return null;\r\n  }\r\n\r\n  const addProject = function(newProject) {\r\n    // adds a project it to the list of projects\r\n    projects.push(newProject);\r\n  }\r\n\r\n  const removeProject = function(project) {\r\n    // deletes the project from the projects list\r\n    projects.forEach((value, index) => {\r\n      if (value === project) {\r\n        projects.splice(index, 1);\r\n      }\r\n    });\r\n  }\r\n\r\n  const addTodo = function(todo, project) {\r\n    // adds a new todo to the project\r\n    project.addTodo(todo);\r\n  }\r\n\r\n  const removeTodo = function(todo, project) {\r\n    // deletes the todo from that projects\r\n    project.removeTodo(todo);\r\n  }\r\n\r\n  return {\r\n    findProject,\r\n    addProject,\r\n    removeProject,\r\n    addTodo,\r\n    removeTodo,\r\n    projects\r\n  }\r\n})();\r\n\r\n\n\n//# sourceURL=webpack://todo-list/./src/app.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ \"./src/todo.js\");\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ \"./src/app.js\");\n\r\n\r\n\r\n\r\n// DOM module\r\nconst domModifier = (function() {\r\n  // module which manipulates all the DOM for the application\r\n\r\n  // get major DOM elements and stores as vars\r\n  const projectsContainer = document.getElementById('projects-container');\r\n  const todosContainer = document.getElementById('todos-container');\r\n\r\n  // initialize project and todos list from app\r\n  let projectList = _app__WEBPACK_IMPORTED_MODULE_2__.app.projects;\r\n  let currentSelectedProject = projectList[0];  // start with first project as selected\r\n  let todoList = currentSelectedProject.getTodos();\r\n\r\n  // get list of all project elements\r\n  const projectElements = projectsContainer.getElementsByClassName('project');\r\n\r\n  const projectClicked = function() {\r\n    // update currentSelectedProject with the clicked project\r\n    currentSelectedProject = _app__WEBPACK_IMPORTED_MODULE_2__.app.findProject(this.innerText);\r\n    updateSelectedProject();\r\n  }\r\n\r\n  const updateSelectedProject = function() {\r\n    // updates which project is the current selected project in DOM\r\n    for (let i = 0 ; i < projectElements.length; i++) {\r\n      if (projectElements[i].innerText === currentSelectedProject.projectName) {\r\n        projectElements[i].classList.add('selected-project');\r\n      } else {\r\n        projectElements[i].classList.remove('selected-project');\r\n      }\r\n    }\r\n    updateTodosDOM();\r\n  }\r\n\r\n  const projectHover = function() {\r\n    // displays trashcan icon for delete when hovering over a project\r\n    \r\n    // create button\r\n    const deleteButton = document.createElement('button');\r\n    deleteButton.id = 'delete-project';\r\n\r\n    // create img element\r\n    const trashIcon = document.createElement('img');\r\n    trashIcon.src = 'images/trash-icon.png';\r\n    deleteButton.append(trashIcon);\r\n    deleteButton.addEventListener('click', removeProject);\r\n    this.append(deleteButton);\r\n  }\r\n\r\n  const projectUnhover = function() {\r\n    // removes delete button\r\n    document.getElementById('delete-project').remove();\r\n  }\r\n\r\n  const initializeProjects = function() {\r\n    // initializes the projects container with all projects in the app\r\n    projectsContainer.replaceChildren();\r\n    for (let project of projectList) {\r\n      // create HTML element for each project and push onto array\r\n      const element = document.createElement('div');\r\n      element.innerText = project.projectName;\r\n      element.classList.add('project');\r\n      projectsContainer.append(element);\r\n      element.addEventListener('click', projectClicked);\r\n      element.addEventListener('mouseenter', projectHover);\r\n      element.addEventListener('mouseleave', projectUnhover);\r\n    }\r\n    updateSelectedProject();\r\n  }\r\n\r\n  const updateTodosDOM = function() {\r\n    // refreshes the projects container with all the todos for the currently selected project\r\n    todosContainer.replaceChildren();\r\n    const todos = currentSelectedProject.getTodos();\r\n    for (let i = 0; i < todos.length; i++) {\r\n      const todo = todos[i];\r\n      todosContainer.append(createTodoElement(todo));\r\n    }\r\n  }\r\n\r\n  const createTodoElement = function(todo) {\r\n    // create div container for each todo\r\n    const div = document.createElement('div');\r\n    div.classList.add('todo');\r\n    const title = document.createElement('h2');\r\n    title.innerText = todo.title;\r\n    div.append(title);\r\n    \r\n    const description = document.createElement('p');\r\n    description.innerText = todo.description;\r\n    div.append(description);\r\n\r\n    const priority = document.createElement('p');\r\n    priority.innerText = 'Priority: ' + todo.priority;\r\n    div.append(priority);\r\n\r\n    const dueDate = document.createElement('p');\r\n    dueDate.innerText = todo.dueDate.getDate();\r\n    div.append(dueDate);\r\n\r\n    return div;\r\n  }\r\n\r\n  const addProject = function() {\r\n    // brings up form for new project, adds it to the list, and updates the DOM\r\n    // FIXME: replace prompt with new project form\r\n    const newProjectName = prompt('Enter new project name');\r\n    const newProject = (0,_project__WEBPACK_IMPORTED_MODULE_1__.Project)(newProjectName, []);\r\n    _app__WEBPACK_IMPORTED_MODULE_2__.app.addProject(newProject);\r\n\r\n    // create HTML element for new project and append it to projectsContainer\r\n    const element = document.createElement('div');\r\n    element.innerText = newProject.projectName;\r\n    element.classList.add('project');\r\n    element.addEventListener('click', projectClicked);\r\n    element.addEventListener('mouseenter', projectHover);\r\n    element.addEventListener('mouseleave', projectUnhover);\r\n    projectsContainer.append(element);\r\n  }\r\n\r\n  const removeProject = function(event) {\r\n    // deletes the project from the projects list and updates DOM\r\n\r\n    // get project for clicked delete button and remove from app\r\n    const deletedProjectElement = this.parentElement;\r\n    const project = _app__WEBPACK_IMPORTED_MODULE_2__.app.findProject(deletedProjectElement.innerText);\r\n    _app__WEBPACK_IMPORTED_MODULE_2__.app.removeProject(project);\r\n\r\n    // remove project from dom\r\n    deletedProjectElement.remove();\r\n\r\n    // if deleted project was selected than update currentSelectedProject\r\n    if (project === currentSelectedProject) {\r\n      currentSelectedProject = _app__WEBPACK_IMPORTED_MODULE_2__.app.projects[0];\r\n      updateSelectedProject();\r\n    }\r\n\r\n    // stop propagation of event to outer div element\r\n    event.stopPropagation();\r\n  }\r\n\r\n  const addTodo = function() {\r\n    // brings up form for new todo, adds it to the list, and updates the DOM\r\n  }\r\n\r\n  const removeTodo = function() {\r\n    // deletes the todo from that projects todos list and updates DOM\r\n  }\r\n\r\n  // wire up event listener for Add Project button\r\n  document.getElementById('add-project').addEventListener('click', addProject);\r\n\r\n  // update project list in DOM to start\r\n  initializeProjects();\r\n\r\n  // update todos for selected project in DOM to start\r\n  updateTodosDOM();\r\n\r\n  // update selected project in DOM to start\r\n  updateSelectedProject();\r\n})();\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Project\": () => /* binding */ Project\n/* harmony export */ });\n// factory function for create projects\r\nconst Project = function(projectName, todos) {\r\n  projectName = projectName.toString();\r\n  \r\n  let _todos = [];\r\n  // check if todos is an array object, wrap it in an array if not\r\n  if (Array.isArray(todos)) {\r\n    for (let todo of todos) {\r\n      _todos.push(todo);\r\n    }\r\n  } else {\r\n    _todos.push(todos);\r\n  }\r\n\r\n  const addTodo = function(todo) {\r\n    _todos.push(todo);\r\n  }\r\n\r\n  const removeTodo = function(todo) {\r\n    _todos.forEach((item, index) => {\r\n      if (todo === item) {\r\n        _todos.splice(index, 1);\r\n      }\r\n    });\r\n  }\r\n\r\n  const getTodos = function() { return _todos };\r\n\r\n  return {\r\n    projectName,\r\n    addTodo,\r\n    removeTodo,\r\n    getTodos\r\n  }\r\n};\r\n\r\n\n\n//# sourceURL=webpack://todo-list/./src/project.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Todo\": () => /* binding */ Todo\n/* harmony export */ });\n// factory function for creating todo objects\r\nconst Todo = function(title, description, dueDate, priority, notes, checklist) {\r\n  title = title || '',\r\n  description = description || '',\r\n  dueDate = new Date(dueDate) || null,\r\n  priority = priority || '1',\r\n  notes = notes || '',\r\n  checklist = checklist || [];\r\n\r\n  return {\r\n    title, \r\n    description, \r\n    dueDate, \r\n    priority, \r\n    notes, \r\n    checklist\r\n  }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://todo-list/./src/todo.js?");

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