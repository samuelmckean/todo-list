import { Todo } from './todo';
import { Project } from "./project";

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
        const project = Project(project.projectName, []);
        for (let j = 0; j < storageData[i].todos.length; j++) {
          const storageTodo = storageData[i].todos[j];
          const todo = Todo(storageTodo.title, storageTodo.description, storageTodo.dueDate, storageTodo.priority);
          project.addTodo(todo);
        }
        projects.push(project);
      }
      return projects;
    } else {
      return null;
    }
  }

  const updateStorage = function() {
    
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

export { storage };