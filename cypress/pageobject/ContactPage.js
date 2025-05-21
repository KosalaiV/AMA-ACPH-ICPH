class ContactPage {
  // Locators

  //TS_31: Contact Us Form
  getContactForm() {
    return cy.get(".contact-us-page form");
  }

  //TS_32: FAQ Block
  getFAQSection() {
    return cy.get(".layout-content");
  }

  //TS_33: Contact Us Page
  getHeaderShare() {
    return cy.get("header #block-vdl-sharestaticlinkblock");
  }

  getContactLink() {
    return cy.get("header li>a[href='/contact-us']");
  }

  getHeaderNavigationLink() {
    return cy.get("header #block-vdl-main-menu a");
  }

  getFooterCopyright() {
    return cy.get("footer #block-vdl-copyrightblock");
  }

  getFooterDisclaimer() {
    return cy.get("footer #block-vdl-disclaimer");
  }

  getFooterDevicesLink() {
    return cy.get("#block-vdl-devices a");
  }

  getFooterAboutLink() {
    return cy.get("#block-vdl-footer a");
  }

  getBreadcrumbs() {
    return cy.get("#block-vdl-breadcrumbs");
  }

  getContactBlock() {
    return cy.get(".contact-us-page");
  }

  getAllowButton() {
    return cy.get(".allowAll");
  }

  getHamburgerIconButton() {
    return cy.get("header [role='navigation'] button.menu-toggle");
  }

  //TS_34: Hero Banner
  getHeroSection() {
    return cy.get(".hero-section");
  }

  // Actions

  //TS_31: Contact Us Form
  verifyContactFormFields(device) {
    // Visit home page
    cy.visitWithAuth("/");

    // Click allow button if visible
    this.getAllowButton().should("be.visible").click({ force: true });

    // If not on Desktop, open the hamburger menu
    if (device !== "macbook-16") {
      this.getHamburgerIconButton()
        .should("be.enabled")
        .should("be.visible")
        .click({ force: true });
    }
    // Click contact link
    this.getContactLink().should("be.visible").click({ force: true });

    // Check contact form fields
    this.getContactForm().scrollIntoView().should("be.visible");

    this.getContactForm().find("input#edit-name").should("be.visible");

    this.getContactForm().find("input#edit-email").should("be.visible");

    this.getContactForm().find("select#edit-i-am-a").should("be.visible");

    this.getContactForm().find("select#edit-topic").should("be.visible");

    this.getContactForm()
      .find("textarea#edit-comment-or-message")
      .should("be.visible");

    this.getContactForm().find(".captcha").should("be.visible");

    this.getContactForm().find("#edit-submit").should("be.visible");
  }

  verifyContactFormFields(device) {
    // Visit home page
    cy.visitWithAuth("/");

    // Click allow button if visible
    this.getAllowButton().should("be.visible").click({ force: true });

    // If not on Desktop, open the hamburger menu
    if (device !== "macbook-16") {
      this.getHamburgerIconButton()
        .should("be.enabled")
        .should("be.visible")
        .click({ force: true });
    }
    // Click contact link
    this.getContactLink().should("be.visible").click({ force: true });

    // Check contact form fields
    this.getContactForm().scrollIntoView().should("be.visible");

    this.getContactForm().find("input#edit-name").should("be.visible");

    this.getContactForm().find("input#edit-email").should("be.visible");

    this.getContactForm().find("select#edit-i-am-a").should("be.visible");

    this.getContactForm().find("select#edit-topic").should("be.visible");

    this.getContactForm()
      .find("textarea#edit-comment-or-message")
      .should("be.visible");

    this.getContactForm().find(".captcha").should("be.visible");

    this.getContactForm().find("#edit-submit").should("be.visible");
  }

  verifyContactFormEmptySubmission(device) {
    // Visit home page
    cy.visitWithAuth("/");

    // Click allow button if visible
    this.getAllowButton().should("be.visible").click({ force: true });

    // If not on Desktop, open the hamburger menu
    if (device !== "macbook-16") {
      this.getHamburgerIconButton()
        .should("be.enabled")
        .should("be.visible")
        .click({ force: true });
    }
    // Click contact link
    this.getContactLink().should("be.visible").click({ force: true });

    // Check contact form empty submission
    this.getContactForm().scrollIntoView().should("be.visible");

    this.getContactForm().find("#edit-submit").should("be.visible");

    cy.get("input[id*='edit-name']:invalid")
      .invoke("prop", "validationMessage")
      .should("include", "Please fill");
  }

  //TS_32: FAQ Block
  verifyFAQNecessaryContent(device) {
    // Visit home page
    cy.visitWithAuth("/");

    // Click allow button if visible
    this.getAllowButton().should("be.visible").click({ force: true });

    // If not on Desktop, open the hamburger menu
    if (device !== "macbook-16") {
      this.getHamburgerIconButton()
        .should("be.enabled")
        .should("be.visible")
        .click({ force: true });
    }
    // Click contact link
    this.getContactLink().should("be.visible").click({ force: true });

    // Check FAQ content
    this.getFAQSection().first().scrollIntoView().should("be.visible");

    this.getFAQSection()
      .find(".faq-header>h2")
      .contains("Frequently", { matchCase: false })
      .should("be.visible");

    this.getFAQSection().find("p.faq-subtitle").should("be.visible");

    this.getFAQSection().find(".item-list").should("be.visible");
  }

  verifyDefaultAccordionPosition(device) {
    // Visit home page
    cy.visitWithAuth("/frequently-asked-questions");

    // Click allow button if visible
    // this.getAllowButton().should("be.visible").click({ force: true });

    // If not on Desktop, open the hamburger menu
    if (device !== "macbook-16") {
      this.getHamburgerIconButton()
        .should("be.enabled")
        .should("be.visible")
        .click({ force: true });
    }
    // Click contact link
    // this.getContactLink().should("be.visible").click({ force: true });

    // Check FAQ content
    // this.getFAQSection().first().scrollIntoView().should("be.visible");

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
    // Click contact link
    // this.getContactLink().should("be.visible").click({ force: true });

    // Check FAQ content
    // this.getFAQSection().first().scrollIntoView().should("be.visible");

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
          .find(".accordion-panel:not([hidden])")
          .should("be.visible");
        this.getFAQSection()
          .find(".accordion-button[aria-expanded='true']")
          .should("be.visible");
      });

    //Validate the length
    cy.get("@ExpectedLength").then((expectedLength) => {
      // Replace with your actual logic to get the current length
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
      const element = doc.querySelector(".accordion-button[aria-expanded='true']");
      if (element) {
        throw new Error(
          "Accordions are not collapsed on click, expected to be collapsed"
        );
      } else {
        assert.ok("Accordions collapsed as expected, everything is okay!!");
      }
    });
  }

  //TS_34: Hero Banner
  verifyHeroBanner(device) {
    // Visit home page
    cy.visitWithAuth("/");

    // Click allow button if visible
    this.getAllowButton().should("be.visible").click({ force: true });

    // If not on Desktop, open the hamburger menu
    if (device !== "macbook-16") {
      this.getHamburgerIconButton()
        .should("be.enabled")
        .should("be.visible")
        .click({ force: true });
    }

    // Click contact link
    this.getContactLink().should("be.visible").click({ force: true });

    // Ensure the hero section is visible
    this.getHeroSection().should("be.visible");

    // Validate the title
    this.getHeroSection()
      .find(".hero-section__info--title")
      .should("be.visible")
      .and("not.be.empty");

    // Validate the body content
    this.getHeroSection().find("p").should("be.visible").and("not.be.empty");

    // Validate image is present
    this.getHeroSection().find("img").should("exist");
  }

  //TS_33: Contact Us Page
  verifyNecessaryContent(device) {
    // Visit home page
    cy.visitWithAuth("/");

    // Click allow button if visible
    this.getAllowButton().should("be.visible").click({ force: true });

    // If not on Desktop, open the hamburger menu
    if (device !== "macbook-16") {
      this.getHamburgerIconButton()
        .should("be.enabled")
        .should("be.visible")
        .click({ force: true });
    }
    // Click contact link
    this.getContactLink().should("be.visible").click({ force: true });

    // Ensure the hero section is visible
    this.getHeroSection().should("be.visible");

    this.getContactBlock().scrollIntoView();

    //Ensure footer copyright is visible
    this.getFooterCopyright().should("be.visible");

    //Ensure footer disclaimer is visible
    this.getFooterDisclaimer().should("be.visible");

    //Ensure footer devices link is visible
    this.getFooterDevicesLink().should("be.visible");

    //Ensure footer about link is visible
    this.getFooterAboutLink().should("be.visible");

    //Ensure breadcrumbs is visible
    this.getBreadcrumbs().should("be.visible");

    // If not on Desktop, open the hamburger menu
    if (device !== "macbook-16") {
      this.getHamburgerIconButton()
        .should("be.enabled")
        .should("be.visible")
        .click({ force: true });
    }

    //Ensure header share is visible
    this.getHeaderShare().should("exist");

    //Ensure header nav links is visible
    this.getHeaderNavigationLink().should("be.visible");
  }
}

export default new ContactPage();
