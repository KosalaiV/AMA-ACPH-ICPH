class SubmissionPage {
  // Locators

  //TS_22: Submission Page
  getHeaderShare() {
    return cy.get("header #block-vdl-sharestaticlinkblock");
  }

  getSubmissionSection() {
    return cy.get(".submission-section ");
  }

  getHeaderNavigationLink() {
    return cy.get("header #block-vdl-main-menu a");
  }

  getDownloadLink() {
    return cy.get("a[download]");
  }

  getFooterCopyright() {
    return cy.get("footer #block-vdl-copyrightblock");
  }

  getFooterDisclaimer() {
    return cy.get("footer #block-vdl-disclaimer");
  }

  getContactCTA() {
    return cy.get("a.submission-section__body-submit");
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

  //TS_18: Hero Banner
  getAllowButton() {
    return cy.get(".allowAll");
  }

  getHamburgerIconButton() {
    return cy.get("#block-vdl-headerlogos button#mobile-menu");
  }

  getSubmissionLink() {
    return cy.get("header li>a[href='/submission']");
  }

  //TS_23: Submission Disclaimer
  getSubmissionDisclaimer() {
    return cy.get(".submit-device-disclaimer");
  }

  //TS_24: Hero Banner
  getHeroSection() {
    return cy.get(".hero-section");
  }

  // Actions

  //TS_22: Submission Page
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
    // Click submission link
    this.getSubmissionLink().should("be.visible").click({ force: true });

    // Ensure the hero section is visible
    this.getHeroSection().should("be.visible");

    // Validate the CTA button
    this.getSubmissionSection()
      .find("a")
      .should("be.visible") // Ensure the CTA is visible
      .and("have.attr", "href") // Ensure it has an 'href' attribute (if it's a link)
      .and("not.be.empty"); // Ensure the CTA is not empty (has a valid link or text)

    // Check that the CTA is functional (e.g., clicking it redirects to the correct URL)
    this.getSubmissionSection()
      .find("a")
      .each(($cta) => {
        const ctaUrl = $cta.attr("href");
        cy.requestWithAuth(ctaUrl).its("status").should("eq", 200); // Ensure the URL is accessible
      });

    if (device == "macbook-16") {
      // Validate image is present
      this.getSubmissionSection().find("img").should("exist");
    }

    // Validate email is present
    this.getSubmissionSection()
      .find(".email-copy-btn>button")
      .should("be.visible")
      .should("be.enabled");

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

    // Ensure the disclaimer is visible
    this.getSubmissionDisclaimer().scrollIntoView().should("be.visible");

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

  verifyDownloadVDLCriteria(device) {
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
    // Click submission link
    this.getSubmissionLink().should("exist").click({ force: true });

    this.getDownloadLink().scrollIntoView();
    this.getDownloadLink().then((btn) => {
      cy.wrap(btn).should("exist").click({ force: true });
      cy.verifyDownload(".pdf", { contains: true, timeout: 60000 });
      assert.ok("PDF Downloading successfully!");
    });
  }

  //TS_24: Hero Banner
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

    // Click submission link
    this.getSubmissionLink().should("be.visible").click({ force: true });

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

  //TS_25: Submission Disclaimer
  verifySubmissionDisclaimer(device) {
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

    // Click submission link
    this.getSubmissionLink().should("be.visible").click({ force: true });

    // Ensure the hero section is visible
    this.getSubmissionDisclaimer().scrollIntoView().should("be.visible");

    // Validate the body content
    this.getSubmissionDisclaimer()
      .find("p")
      .should("be.visible")
      .and("not.be.empty");
  }
}

export default new SubmissionPage();
