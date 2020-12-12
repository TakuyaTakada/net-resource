/// <reference types="../support" />

describe('Site', () => {
  beforeEach(() => {
    cy.visit('/')
      .clickSideMenu("Site")
  });

  const status = "Active";
  const params = [
    { id: "#name", value: "test site"},
    { id: "#postalCode", value: "111-1111"},
    { id: "#phoneNumber", value: "111-1111-1111"},
    { id: "#address", value: "test address"},
    { id: "#note", value: "test note"},
  ];
  const assertList = [
    params[0].value,
    status
  ];

  it('Create', () => {
    cy.clickAdd();
    cy.clickStatus();
    cy.selectItem(status);
    cy.inputTextFields(params);
    cy.clickSave();
    cy.assertListFirst(assertList)
  })
});
