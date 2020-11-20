// factory function for creating todo objects
const Todo = function(title, description, dueDate, priority, notes, checklist, expanded) {
  title = title || '',
  description = description || '',
  dueDate = dueDate || null,
  priority = priority || '1',
  notes = notes || '',
  checklist = checklist || [],
  expanded = expanded || false;

  const edit = function (newTitle, newDescription, newDueDate, newPriority) {
    // edits the properties of a todo object
    title = newTitle || title,
    description = newDescription || description,
    dueDate = newDueDate || dueDate,
    priority = newPriority || priority
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