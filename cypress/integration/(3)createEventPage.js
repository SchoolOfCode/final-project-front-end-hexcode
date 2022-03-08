describe("renders the Create Event page", () => {
    it("renders the form", () => {
        cy.visit("/createEvent");

        cy.get(".inputTitle").should("exist").contains("Title");
        cy.get("#title").should("exist");

        cy.get(".inputTitle").contains("Location");
        cy.get("#location").should("exist");

        cy.get(".inputTitle").contains("People");
        cy.get(".inputedpeople").should("exist");
        cy.get(".addingpeople").should("exist");
        cy.get("#dropdown").should("exist");

        cy.get(".inputTitle").contains("Date");
        cy.get("#date").should("exist");

        cy.get(".inputTitle").contains("Time");
        cy.get("#time").should("exist");

        cy.get(".inputTitle").contains("Description");
        cy.get("#description").should("exist");

        cy.get(".createEventButton").should("exist").contains("Create Event");
    });

    it("Populates the form and creates an event", () => {
        // Input a title
        cy.get("#title")
            .type("Catch up over brunch", { delay: 200 })
            .should("have.value", "Catch up over brunch");

        // Add a location
        cy.get("#location")
            .type("Cafe Yolk", { delay: 200 })
            .should("have.value", "Cafe Yolk");

        // Select users to add
        cy.get("#dropdown").click();
        cy.get("#James").click();
        cy.get("#dropdown").click();
        cy.get("#Luke").click();

        // Select a date
        cy.get("#date").click();
        cy.contains(25).click();

        //Select a time
        // cy.get("#time").click();
        // cy.contains(11, { force: true }).click();
        // cy.contains("Ok").click();

        cy.get("#description")
            .type(
                "Hi everyone, thought we should all catch up for a brunch as it's been a while!"
            )
            .should(
                "have.value",
                "Hi everyone, thought we should all catch up for a brunch as it's been a while!"
            );
        cy.get(".createEventButton").contains("Create Event").click();
    });
    it("redirects to Homepage", () => {
        cy.url().should("be.equal", "http://localhost:3000/homepage");
    });
});

describe("Navigate to the newly created event", () => {
    it("clicks on the newly created ecent", () => {
        cy.get(".hamburgerMenu").click();
        cy.get(".userEvents")
            .eq(0)
            .should("contain.text", "Catch up over brunch")
            .click();

        cy.url().should("be.equal", "http://localhost:3000/Event/:id");
    });
});
