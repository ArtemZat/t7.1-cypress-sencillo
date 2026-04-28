import TodoPage from '../support/pages/TodoPage';

describe('Gestión de tareas con POM', () => {
  const todoPage = new TodoPage();

  beforeEach(() => {
    cy.visit('https://todomvc.com/examples/react/dist/');
  });

  it('Debe permitir crear una tarea', () => {
    const taskName = 'Aprender Cypress';
    todoPage.addTodo(taskName);
    todoPage.validateTodoExists(taskName);
  });

  it('Debe permitir borrar una tarea', () => {
    const taskName = 'Eliminar esta tarea';
    todoPage.addTodo(taskName);
    todoPage.deleteTodo(taskName);
    todoPage.elements.todoItems().should('not.exist');
  });
});