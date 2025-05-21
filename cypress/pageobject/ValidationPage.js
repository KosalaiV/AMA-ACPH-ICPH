class ValidationPage {
  // Locators

  //TS_17: Validation Page
  getHeaderShare() {
    return cy.get("header #block-vdl-sharestaticlinkblock");
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

  getSidebar() {
    return cy.get(".layout-sidebar");
  }

  getLayoutContent() {
    return cy.get(".layout-content");
  }

  //TS_18: Hero Banner
  getAllowButton() {
    return cy.get(".allowAll");
  }

  getHamburgerIconButton() {
    return cy.get("#block-vdl-headerlogos button#mobile-menu");
  }

  getValidationLink() {
    return cy.get("header li>a[href='/manufacturers']");
  }

  getValidationHeroSection() {
    return cy.get(".hero-section");
  }

  //TS_19: Independent Review Process Reach Us
  getIndependentReviewProcess1() {
    return cy.get("#block-vdl-validationreachus");
  }

  //TS_20: Committee Experts Block
  getCommitteeExpertsBlock() {
    return cy.get(".view-committee-experts-block");
  }

  //TS_21: VDL Block Title Links
  getVDLProcessLink() {
    return cy.get("a[href='#block-vdl-vdlprocess']");
  }

  getVDLProcess() {
    return cy.get("div#block-vdl-vdlprocess");
  }

  getVDLCriteriaLink() {
    return cy.get("a[href='#block-vdl-vdlcriteria']");
  }

  getVDLCriteria() {
    return cy.get("div#block-vdl-vdlcriteria");
  }

  getVDLGovernanceLink() {
    return cy.get("a[href='#block-vdl-vdlgovernance']");
  }

  getVDLGovernance() {
    return cy.get("div#block-vdl-vdlgovernance");
  }

  // Actions

  //TS_17: Validation Page
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
    // Click validation link
    this.getValidationLink().should("be.visible").click({ force: true });

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

    // Ensure the validation listing independent review process container is visible
    this.getIndependentReviewProcess1().scrollIntoView().should("be.visible");

    //Ensure sidebar is visible
    this.getSidebar().scrollIntoView().should("be.visible");

    //Ensure layout content is visible
    this.getLayoutContent().scrollIntoView().should("be.visible");

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

  //TS_18: Hero Banner
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

    // Click validation link
    this.getValidationLink().should("be.visible").click({ force: true });

    // Ensure the validation hero section is visible
    this.getValidationHeroSection().should("be.visible");

    // Validate the title
    this.getValidationHeroSection()
      .find(".hero-section__info--title")
      .should("be.visible")
      .and("not.be.empty");

    // Validate the body content
    this.getValidationHeroSection()
      .find("p")
      .should("be.visible")
      .and("not.be.empty");

    // Validate image is present
    this.getValidationHeroSection().find("img").should("exist");
  }

  //TS_19: Independent Review Process Reach Us
  verifyReachUs(device) {
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

    // Click validation link
    this.getValidationLink().should("be.visible").click({ force: true });

    // Ensure the validation listing independent review process container is visible
    this.getIndependentReviewProcess1().scrollIntoView().should("be.visible");

    // Validate the title
    this.getIndependentReviewProcess1()
      .find("h3")
      .should("be.visible")
      .and("not.be.empty");

    // Validate the body content
    this.getIndependentReviewProcess1()
      .find("p")
      .should("be.visible")
      .and("not.be.empty");

    // Validate image is present
    this.getIndependentReviewProcess1().find("img").should("exist");

    // Validate the CTA 1 button
    this.getIndependentReviewProcess1()
      .find("a.independent-review-process__body-submit")
      .should("be.visible") // Ensure the CTA is visible
      .and("have.attr", "href") // Ensure it has an 'href' attribute (if it's a link)
      .and("not.be.empty"); // Ensure the CTA is not empty (has a valid link or text)

    // Check that the CTA 1 is functional (e.g., clicking it redirects to the correct URL)
    this.getIndependentReviewProcess1()
      .find("a.independent-review-process__body-submit")
      .then(($cta) => {
        const ctaUrl = $cta.attr("href");
        cy.requestWithAuth(ctaUrl).its("status").should("eq", 200); // Ensure the URL is accessible
      });

    // Validate the CTA 2 button
    this.getIndependentReviewProcess1()
      .find("a.independent-review-process__body-link")
      .should("be.visible") // Ensure the CTA is visible
      .and("have.attr", "href") // Ensure it has an 'href' attribute (if it's a link)
      .and("not.be.empty"); // Ensure the CTA is not empty (has a valid link or text)

    // Check that the CTA 2 is functional (e.g., clicking it redirects to the correct URL)
    this.getIndependentReviewProcess1()
      .find("a.independent-review-process__body-link")
      .then(($cta) => {
        const ctaUrl = $cta.attr("href");
        cy.requestWithAuth(ctaUrl).its("status").should("eq", 200); // Ensure the URL is accessible
      });
  }

  //TS_20: Committee Experts Block
  verifyCommitteeExpertBlock(device) {
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

    // Click validation link
    this.getValidationLink().should("be.visible").click({ force: true });

    // Ensure the committe experts block is visible
    this.getCommitteeExpertsBlock().scrollIntoView().should("be.visible");

    // Validate the title
    this.getCommitteeExpertsBlock()
      .find(".view-header>h4")
      .should("be.visible")
      .and("not.be.empty");

    // Validate the body content
    this.getCommitteeExpertsBlock()
      .find("p")
      .should("be.visible")
      .and("not.be.empty");

    // Validate the bio content
    this.getCommitteeExpertsBlock()
      .find(".views-field-field-bio>.field-content")
      .should("be.visible")
      .and("not.be.empty");

    // Validate image is present
    this.getCommitteeExpertsBlock().find("img").should("exist");

    // Validate the two button length
    this.getCommitteeExpertsBlock()
      .find("button.tabs__link")
      .should("have.length", 2);

    // Validate the two button is enabled
    this.getCommitteeExpertsBlock()
      .find("button.tabs__link")
      .each((button) => {
        cy.wrap(button).should("be.visible").should("be.enabled");
      });

    //Check the bg color before clicking
    this.getCommitteeExpertsBlock()
      .find("button.tabs__link.is-active")
      .should("have.css", "background-color", "rgb(204, 204, 204)")
      .should("have.length", 1);

    // Validate the two button is enabled and click it
    this.getCommitteeExpertsBlock()
      .find("button.tabs__link:not(.is-active)")
      .should("be.visible")
      .should("be.enabled")
      .should("have.length", 1)
      .click({ force: true });

    //Check the bg color after clicking
    this.getCommitteeExpertsBlock()
      .find("button.tabs__link.is-active")
      .should("have.css", "background-color", "rgb(204, 204, 204)")
      .should("have.length", 1);
  }

  //TS_21: VDL Block Title Links
  verifyVDLBlockTitle(device, linkLocator, blockLocator, link) {
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

    // Click validation link
    this.getValidationLink().should("be.visible").click({ force: true });

    // Click the anchor link
    linkLocator().should("exist").click({ force: true });

    cy.url().should("include", link);

    // Then check for the element at the top of the viewport
    blockLocator()
      .should("be.visible") // Ensure the element is visible
      .then(($el) => {
        const rect = $el[0].getBoundingClientRect();

        // Check that the top of the element is at the top of the viewport
        expect(rect.top).to.be.at.least(
          0,
          "Element is at or near the top of the viewport"
        );
      });
  }
}

export default new ValidationPage();
