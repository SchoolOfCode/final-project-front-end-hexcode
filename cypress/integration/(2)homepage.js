
describe("renders the homepage", () => {
    it("renders correctly", () => {
        // cy.visit("/homepage")
        cy.get(".hamburgerMenu").should("exist")
    })
})

describe("navigates hamburger menu to create an event", () => { 
    it('opens the menu and creates a new event', ()=> {
        cy.get('.hamburgerMenu').click()
        cy.get('.yourEventsTitle').contains('YOUR EVENTS')
        cy.get('.addEventbtn').click()
    })
    // it("redirects to createEventPage", () => {
        
    //     cy.url().should('be.equal', 'http://localhost:3000/createEvent')
    //     })
})