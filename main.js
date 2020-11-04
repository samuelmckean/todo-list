/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
eval("// factory function for creating todo objects\r\nconst Todo = function(title, description, dueDate, priority, notes, checklist) {\r\n  title = title || '',\r\n  description = description || '',\r\n  dueDate = new Date(dueDate) || null,\r\n  priority = priority || '1',\r\n  notes = notes || '',\r\n  checklist = checklist || [];\r\n\r\n  return {\r\n    title, \r\n    description, \r\n    dueDate, \r\n    priority, \r\n    notes, \r\n    checklist\r\n  }\r\n}\r\n\r\n// factory function for create projects\r\nconst Project = function(projectName, todos) {\r\n  const _projectName = projectName;\r\n  let _todos = [];\r\n  // check if todos is an array object, wrap it in an array if not\r\n  if (Array.isArray(todos)) {\r\n    for (let todo of todos) {\r\n      _todos.push(todo);\r\n    }\r\n  } else {\r\n    _todos.push(todos);\r\n  }\r\n\r\n  const addTodo = function(todo) {\r\n    _todos.push(todo);\r\n  }\r\n\r\n  const removeTodo = function(todo) {\r\n    _todos.forEach((item, index) => {\r\n      if (todo === item) {\r\n        _todos.splice(index, 1);\r\n      }\r\n    });\r\n  }\r\n\r\n  const getTodos = function() { return _todos };\r\n\r\n  return {\r\n    addTodo,\r\n    removeTodo,\r\n    getTodos\r\n  }\r\n};\r\n\r\n// DOM module\r\n\r\n// app module\r\nconst app = (function () {\r\n  // initialize Array of projects with the default project\r\n  const todo1 = Todo();\r\n  const todo2 = Todo('1st Todo', 'Do me', '2020-10-30', '5', \"I'm important\", ['subtask 1']);\r\n  const test = [todo1, todo2];\r\n  const defaultProject = Project('myProject', test);\r\n  const projects = [defaultProject];\r\n\r\n  defaultProject.getTodos();\r\n  defaultProject.removeTodo(todo2);\r\n  console.log(defaultProject.getTodos());\r\n\r\n})();\n\n//# sourceURL=webpack://todo-list/./src/index.js?");
/******/ })()
;