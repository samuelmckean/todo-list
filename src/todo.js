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

export { Todo };