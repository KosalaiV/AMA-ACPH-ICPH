class FAQPage {
  // Locators

  getFAQSection() {
    return cy.get(".layout-content");
  }

  getAllowButton() {
    return cy.get(".allowAll");
  }

  getHamburgerIconButton() {
    return cy.get("header [role='navigation'] button.menu-toggle");
  }

  // Actions

  verifyDefaultAccordionPosition(device) {
    cy.visitWithAuth("/faq");

    // Click allow button if visible
    // this.getAllowButton().should("be.visible").click({ force: true });

    // If not on Desktop, open the hamburger menu
    if (device !== "macbook-16") {
      this.getHamburgerIconButton()
        .should("be.enabled")
        .should("be.visible")
        .click({ force: true });
    }

    cy.document().then((doc) => {
      cy.wait(2000);
      const element = doc.querySelector(
        ".accordion-button[aria-expanded='true']"
      );
      if (element) {
        throw new Error(
          "Accordion default position is active, expected to be collapsed"
        );
      } else {
        assert.ok(
          "Accordions default position is collapsed, everything is okay!!"
        );
      }
    });
  }

  verifyAccordionFunctions(device) {
    // Visit home page
    cy.visitWithAuth("/faq");

    // Click allow button if visible
    // this.getAllowButton().should("be.visible").click({ force: true });

    // If not on Desktop, open the hamburger menu
    if (device !== "macbook-16") {
      this.getHamburgerIconButton()
        .should("be.enabled")
        .should("be.visible")
        .click({ force: true });
    }
    
    this.getFAQSection().find(".faq-group-category-title").should("be.visible");
    //Get the accordions length
    this.getFAQSection()
      .find(".accordion-button")
      .its("length")
      .as("ExpectedLength");

    //Expand the accordions
    this.getFAQSection()
      .find(".accordion-button[aria-expanded='false']")
      .should("be.visible")
      .each((accordion) => {
        cy.wrap(accordion).scrollIntoView().click({ force: true });
        cy.wait(1000);
        this.getFAQSection()
          .find(".accordion-panel:not([hidden]) p")
          .should("not.be.empty")
          .should("be.visible");
        this.getFAQSection()
          .find(".accordion-button[aria-expanded='true']")
          .should("be.visible");
      });

    //Validate the length
    cy.get("@ExpectedLength").then((expectedLength) => {
      cy.get(".accordion-button[aria-expanded='true']")
        .its("length")
        .should("eq", expectedLength);
      cy.get(".accordion-panel:not([hidden])")
        .its("length")
        .should("eq", expectedLength);
    });

    //Collapse the accordions
    this.getFAQSection()
      .find(".accordion-button[aria-expanded='true']")
      .should("be.visible")
      .each((accordion) => {
        cy.wrap(accordion).scrollIntoView().click({ force: true });
        cy.wait(1000);
      });

    cy.document().then((doc) => {
      cy.wait(2000);
      const element = doc.querySelector(
        ".accordion-button[aria-expanded='true']"
      );
      if (element) {
        throw new Error(
          "Accordions are not collapsed on click, expected to be collapsed"
        );
      } else {
        assert.ok("Accordions collapsed as expected, everything is okay!!");
      }
    });
  }
}

export default new FAQPage();
