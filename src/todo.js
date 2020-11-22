// factory function for creating todo objects
const Todo = function(title, description, dueDate, priority, notes, checklist, expanded) {
  title = title || '',
  description = description || '',
  dueDate = new Date(Date.parse(dueDate + 'T00:00:00')) || null,
  priority = priority || '1',
  notes = notes || '',
  checklist = checklist || [],
  expanded = expanded || false;

  const edit = function (newTitle, newDescription, newDueDate, newPriority) {
    // edits the properties of a todo object
    this.title = newTitle,
    this.description = newDescription,
    this.dueDate = new Date(Date.parse(newDueDate + 'T00:00:00')),
    this.priority = newPriority;
    return this;
  };

  return {
    title, 
    description, 
    dueDate, 
    priority, 
    notes, 
    checklist,
    expanded,
    edit
  }
}

export { Todo };