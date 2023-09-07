/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Check hreflangs
     * @example
     * cy.validateHreflang()
     * cy.validateHreflang('http://localhost:3001/valid/en.html')
     */
    validateHreflang(url?: string): Chainable<any>;
  }
}
