// factory function for creating todo objects
const Todo = function(title, description, dueDate, priority, notes, checklist, expanded) {
  title = title || '',
  description = description || '',
  dueDate = dueDate || null,
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

export { Todo };