describe("renders the homepage", () => {
    it("renders correctly", () => {
        cy.visit("/")
        cy.get("#email-field").should("exist")
        cy.get("#password-field").should("exist")
        cy.get(".loginbutton").should("exist")
        cy.get(".signupbutton").should("exist")
        cy.get(".Title").should("exist").contains("Raduno!")
    })
})

describe ("logs in the app", () => {
    it("logs in with email and password", () => {
    cy.get('#email-field').type('belinda@belinda.com', { delay: 200 }).should('have.value', 'belinda@belinda.com')
    cy.get('#password-field').type('password1', { delay: 200 }).should('have.value', 'password1')
    cy.get('.loginbutton').click()
    // cy.intercept(
    //     {
    //       method: 'GET', // Route all GET requests
    //       url: '`https://hexcode-arrange-group-event.herokuapp.com/events/', // that have a URL that matches '/users/*'
    //     },
    //     [] // and force the response to be: []
    //   ).as('fetch all events') // and assign an alias
    })
})