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

export { Project };