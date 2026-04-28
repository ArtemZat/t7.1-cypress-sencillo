class TodoPage {
  // Selectores
  elements = {
    inputNewTodo: () => cy.get('input.new-todo'),
    todoItemLabel: (itemText) => cy.contains('label', itemText),
    todoItems: () => cy.get('.todo-list li'),
    deleteButton: (itemText) =>
      this.elements.todoItemLabel(itemText).parent().find('button.destroy'),
  };

  // Métodos
  addTodo(taskName) {
    this.elements.inputNewTodo().type(`${taskName}{enter}`);
  }

  deleteTodo(taskName) {
    this.elements.deleteButton(taskName).click({ force: true });
  }

  validateTodoExists(taskName) {
    this.elements.todoItemLabel(taskName).should('be.visible');
  }
}

export default TodoPage;