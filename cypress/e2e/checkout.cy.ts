/// <reference types="cypress" />

const BASE_URL = 'http://127.0.0.1:3000'

describe('Checkout', () => {
  it('fills checkout form', () => {
    cy.visit(`${BASE_URL}/checkout/1`)
    expect(cy.get('div').contains('Resumo do Pedido', { timeout: 18000 }))
    cy.get('.v-stepper').within(() => {
      cy.get('input[id="input-6"]').type('John Doe')
      cy.get('input[id="input-10"]').type('6199999999')

      cy.get('button').contains('Próximo').click()

      cy.get('input[id="input-21"]').type('71741-508').blur()
      expect(cy.get('input[id="input-27"]').should('have.value', 'Brasília'))
      expect(cy.get('input[id="input-25"]').should('have.value', 'DF'))

      cy.get('button').contains('Próximo').click()

      cy.get('input[id="input-31"]').type('999.888.777-66')
      cy.get('input[id="input-33"]').type('1999-12-31')
      cy.get('input[type="radio"]').check('pix')

      expect(cy.get('.v-input--error').should('not.exist'))
    })
    // throws type error due to missing name prop in OrderFinishedSuccess.vue
    expect(cy.get('button').contains('Finalizar Pedido').click())
  })
})
