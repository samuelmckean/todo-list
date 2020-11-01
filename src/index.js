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

// factory function for create projects
const Project = function(projectName, todos) {
  const _projectName = projectName;
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
    addTodo,
    removeTodo,
    getTodos
  }
};

// DOM module

// app module
const app = (function () {
  // initialize Array of projects with the default project
  const todo1 = Todo();
  const todo2 = Todo('1st Todo', 'Do me', '2020-10-30', '5', "I'm important", ['subtask 1']);
  const test = [todo1, todo2];
  const defaultProject = Project('myProject', test);
  const projects = [defaultProject];

  defaultProject.getTodos();
  defaultProject.removeTodo(todo2);
  console.log(defaultProject.getTodos());

})();