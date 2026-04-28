describe('TodoMVC', () => {
  // ejecuta antes de cada prueba
  beforeEach(() => {
     cy.visit('https://todomvc-app-for-testing.surge.sh/')
  })
  
  it('Crear tarea', () => {
    cy.get('input.new-todo').type(`Hola{enter}`);
    cy.contains('label', "Hola").should('be.visible')
  })

  it('Marcar tarea como completada', () => {
    cy.get('input.new-todo').type(`Hola{enter}`);
    cy.get(".todo-list").contains("Hola").parents("li").find('input[type="checkbox"]').check({ force: true }); 
    cy.get(".todo-list").contains("Hola").parents("li").should("have.class", "completed");
  })

  it('Desmarcar tarea completada', () => {
    cy.get('input.new-todo').type(`Hola{enter}`);
    cy.get(".todo-list").contains("Hola").parents("li").find('input[type="checkbox"]').check({ force: true }); 
    cy.get(".todo-list").contains("Hola").parents("li").find('input[type="checkbox"]').uncheck({ force: true });
    cy.get(".todo-list").contains("Hola").parents("li").should("not.have.class", "completed");
  })

  it('editar tarea', () => {
    cy.get('input.new-todo').type(`Hola{enter}`);
    cy.get(".todo-list").contains("Hola").dblclick();
    cy.get(".edit").clear().type(`Hola hola{enter}`);
    cy.contains('label', "Hola hola").should('be.visible')
    
  })

  it('Eliminar tarea', () => {
    cy.get('input.new-todo').type(`Hola{enter}`);
    cy.get(".todo-list").contains("Hola").parents("li").find('.destroy').dblclick({ force: true });
    cy.get(".todo-list").should('not.be.visible')
  })

  it('Filtrar tarea', () => {
    cy.get('input.new-todo').type(`Hola1{enter}`);
    cy.get(".todo-list").contains("Hola1").parents("li").find('input[type="checkbox"]').check({ force: true }); 
    cy.get('input.new-todo').type(`Hola2{enter}`);
    cy.get('input.new-todo').type(`Hola3{enter}`);
    cy.get('input.new-todo').type(`Hola4{enter}`);
    cy.get(".todo-list").contains("Hola4").parents("li").find('input[type="checkbox"]').check({ force: true }); 

    cy.get(".footer").contains("Completed").parents("li").click();

    cy.get(".todo-list").contains("Hola1").should("be.visible");
    cy.get(".todo-list").contains("Hola4").should("be.visible");
    cy.contains('.todo-list li', 'Hola2').should('not.exist');
    cy.contains('.todo-list li', 'Hola3').should('not.exist');

    cy.get(".footer").contains("Active").parents("li").click();

    cy.get(".todo-list").contains("Hola2").should("be.visible");
    cy.get(".todo-list").contains("Hola3").should("be.visible");
    cy.contains(".todo-list", "Hola1").should("not.exist");
    cy.contains(".todo-list", "Hola4").should("not.exist");
    
    cy.get(".footer").contains("All").click();

  })

})