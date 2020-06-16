import * as ace from 'brace';

const baseUri = 'http://localhost:3001';

function getAceEditorValue(elm) {
  return new Promise((resolve) => {
    // need to wait a few seconds.
    setTimeout(() => {
      resolve(ace.edit(elm[0]).getValue());
    }, 3000);
  });
}

describe('Basic Test', () => {
  describe('Make sure web worker is working', () => {
    it('loads the main page', () => {
      cy.visit(baseUri)
        .get('[cy-data="nav-home"]')
        .url()
        .should('include', '/');
    });
    it('contains an expected value in the editor', () => {
      cy.visit(`${baseUri}/playground`)
        .get('.editor')
        .then(getAceEditorValue)
        .should((value) => {
          expect(value).to.contain('export function greeter');
        });
    });
    it('contains an expected value in the viewer', () => {
      cy.visit(`${baseUri}/playground`)
        .get('.viewer')
        .then(getAceEditorValue)
        .should((value) => {
          expect(value).to.contain('import');
        });
    });
    it('shows playground page via nav', () => {
      // Do this after '/playground' page tests. So the playground.js is cached.
      cy.visit(baseUri)
        .get('[cy-data="nav-playground"]')
        .click()
        .url()
        .should('include', '/playground');
    });
  });
});
