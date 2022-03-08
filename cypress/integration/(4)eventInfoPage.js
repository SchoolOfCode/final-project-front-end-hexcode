describe("renders the Event info page", () => {
    it("renders the event created", () => {
        // cy.visit("/createEvent");
            cy.get('.organiser-container')
            .find('img')
            .should('exist','have.attr', 'src','1')
            cy.get('.organiser-container')
            .should("exist")
            .contains("Belinda Duffy")
            cy.get('.organiser-container')
            .find('.cog-button')

            cy.get('.titleAndConfirm')
            .find('.eventTitle')
            .should('contain', 'Catch up over brunch')

            cy.get('.date')
            .find('.eventDateTime')
            .should('contain', '24-03-2022')

            cy.get('.location')
            .find('.locationPlace')
            .should('contain', 'Cafe Yolk')

            cy.get('.peopleTitle')
            .should('contain', 'Attendees')

            cy.get('.people-container')
            .should('exist')

            cy.get('.eventDescription')
            .should('contain', "Hi everyone, thought we should all catch up for a brunch as it's been a while!")

            cy.get('.collapseSection')
            .find('.arrow-btn').click()

            cy.get('.hide')
            .should('not.be.visible')

            cy.get('.collapseSection')
            .find('.arrow-btn').click()





    })
})