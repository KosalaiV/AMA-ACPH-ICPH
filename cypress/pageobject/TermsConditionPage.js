class TermsConditionPage {
  // Locators

  //TS_25: Terms and Conditions Page
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

  getAllowButton() {
    return cy.get(".allowAll");
  }

  getHamburgerIconButton() {
    return cy.get("#block-vdl-headerlogos button#mobile-menu");
  }

  //TS_27: Hero Banner
  getHeroSection() {
    return cy.get(".hero-section");
  }

  //TS_26: Terms Title Links
  getTermsUseLink() {
    return cy.get("a[href='#block-vdl-termsofuse']");
  }

  getTermsUse() {
    return cy.get("div#block-vdl-termsofuse");
  }

  getPrivacyPolicyLink() {
    return cy.get("a[href='#block-vdl-privacypolicy']");
  }

  getPrivacyPolicy() {
    return cy.get("div#block-vdl-privacypolicy");
  }

  getCodeConductLink() {
    return cy.get("a[href='#block-vdl-codeofconduct']");
  }

  getCodeConduct() {
    return cy.get("div#block-vdl-codeofconduct");
  }

  // Actions

  //TS_25: Terms and Conditions Page
  verifyNecessaryContent(device) {
    // Visit terms and conditions page
    cy.visitWithAuth("/terms-of-service");

    // Click allow button if visible
    this.getAllowButton().should("be.visible").click({ force: true });

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

  //TS_26: Terms Title Links
  verifyTermsBlockTitle(linkLocator, blockLocator, link) {
    // Visit terms and conditions page
    cy.visitWithAuth("/terms-of-service");

    // Click allow button if visible
    this.getAllowButton().should("be.visible").click({ force: true });

    cy.url().should("include", "/terms-of-service");

    this.getHeroSection().should("be.visible");

    cy.wait(2000);

    // Click the anchor link
    linkLocator().should("exist").click({ force: true });

    cy.url().should("include", link);

    // Then check for the element at the top of the viewport
    blockLocator()
      .should("be.visible") 
      .then(($el) => {
        const rect = $el[0].getBoundingClientRect();

        // Check that the top of the element is at the top of the viewport
        expect(rect.top).to.be.at.least(
          0,
          "Element is at or near the top of the viewport"
        );
      });
  }

  //TS_27: Hero Banner
  verifyHeroBanner(device) {
    // Visit terms and conditions page
    cy.visitWithAuth("/terms-of-service");

    // Click allow button if visible
    this.getAllowButton().should("be.visible").click({ force: true });

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
}

export default new TermsConditionPage();
