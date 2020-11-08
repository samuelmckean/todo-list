// factory function for create projects
const Project = function(projectName, todos) {
  projectName;
  
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

  const getTodos = function() { return _todos };

  return {
    projectName,
    addTodo,
    removeTodo,
    getTodos
  }
};

export { Project };