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

    cy.get('#email-field').type('belinda@belinda.com').should('have.value', 'belinda@belinda.com')
    cy.get('#password-field').type('password1').should('have.value', 'password1')
    cy.get('.loginbutton').click()
    })

    // it("redirects to homepage", () => {
        
    // cy.url().should('be.equal', 'http://localhost:3000/homepage')
    // })
})

