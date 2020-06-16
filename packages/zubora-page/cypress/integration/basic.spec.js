import * as ace from 'brace';
describe('Basic Test', () => {
  describe('Make sure web worker is working', () => {
    function getAceEditorValue(elm) {
      return new Promise((resolve) => {
        // need to wait a few seconds.
        setTimeout(() => {
          resolve(ace.edit(elm[0]).getValue());
        }, 2000);
      });
    }
    it('shows playground page via nav', () => {
      cy.visit('http://localhost:3000')
        .get('[cy-data="nav-playground"]')
        .click()
        .get('#ace-editor')
        .url()
        .should('include', 'playground');
    });
    it('contains an expected value in the editor', () => {
      cy.visit('http://localhost:3000/playground')
        .get('.editor')
        .then(getAceEditorValue)
        .should((value) => {
          expect(value).to.contain('export function greeter');
        });
    });
    it('contains an expected value in the viewer', () => {
      cy.visit('http://localhost:3000/playground')
        .get('.viewer')
        .then(getAceEditorValue)
        .should((value) => {
          expect(value).to.contain('import');
        });
    });
  });
});
