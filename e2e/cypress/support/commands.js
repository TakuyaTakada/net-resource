// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add("clickSideMenu", (value) => {
  cy.get('.MuiDrawer-docked')
    .contains(value)
    .click()
});

Cypress.Commands.add("clickAdd", () => {
  cy.get('[aria-label=add]')
    .click();
});

Cypress.Commands.add("clickStatus", () => {
  cy.get('.MuiDialogContent-root').within(() => {
    cy.get("#status-select")
      .click()
  })
});

Cypress.Commands.add("selectItem", (value) => {
  cy.get('.MuiListItem-button')
    .contains(value)
    .click()
});

Cypress.Commands.add("inputTextFields", (params) => {
  cy.get('.MuiTextField-root').within(() => {
    params.map((param) => {
      cy.get(param.id)
        .type(param.value);
    })
  })
});

Cypress.Commands.add("clickSave", () => {
  cy.get('.MuiDialogActions-root')
    .contains('Save')
    .click()
});

Cypress.Commands.add("assertListFirst", (assertList) => {
  cy.get('tbody').first().within(() => {
    assertList.map((value) => {
      cy.contains(value).should("have.text", value)
    })
  })
});
