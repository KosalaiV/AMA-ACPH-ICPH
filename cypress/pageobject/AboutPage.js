class AboutPage {
  // Locators

  //TS_30: About Us Page
  getHeaderShare() {
    return cy.get("header #block-vdl-sharestaticlinkblock");
  }

  getAboutICPHLink() {
    return cy.get("header li>a[href='/about-icph']");
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

  getCardsHeader() {
    return cy.get(".cards-block-header");
  }

  getCardsBlock() {
    return cy.get(".cards");
  }

  getAllowButton() {
    return cy.get(".allowAll");
  }

  getHamburgerIconButton() {
    return cy.get(".menu-toggle");
  }

  //TS_29: Hero Banner
  getHeroSection() {
    return cy.get(".hero-banner");
  }

  // Actions

  //TS_29: Hero Banner
  verifyHeroBanner(device) {
    // Visit home page
    cy.visitWithAuth("/");

    // Click allow button if visible
    // this.getAllowButton().should("be.visible").click({ force: true });

    // If not on Desktop, open the hamburger menu
    if (device !== "macbook-16") {
      this.getHamburgerIconButton()
        .should("be.enabled")
        .should("be.visible")
        .click({ force: true });
    }

    // Click about link
    this.getAboutLink().should("be.visible").click({ force: true });

    // Ensure the hero section is visible
    this.getHeroSection().should("be.visible");

    // Validate the title
    this.getHeroSection()
      .find(".hero-section__info--title")
      .should("be.visible")
      .and("not.be.empty");

    // Validate the body content
    this.getHeroSection().find("p").should("be.visible").and("not.be.empty");

    // Validate the media
    this.getHeroSection()
      .find(".hero-section__media")
      .should("be.visible")
      .and("not.be.empty");
  }

  //TS_30: About Us Page
  verifyNecessaryContent(device) {
    // Visit home page
    cy.visitWithAuth("/");

    // Click allow button if visible
    // this.getAllowButton().should("be.visible").click({ force: true });

    // If not on Desktop, open the hamburger menu
    if (device !== "macbook-16") {
      this.getHamburgerIconButton()
        .should("be.enabled")
        .should("be.visible")
        .click({ force: true });
    }
    // Click about link
    this.getAboutICPHLink().should("be.visible").click({ force: true });

    this.getCardsBlock().scrollIntoView();

    this.getCardsHeader().should("be.visible");

    // Validate the title
    this.getCardsBlock().find(".cards-title").should("be.visible");

      // Validate the title
    this.getCardsBlock().find("p").should("be.visible");

    // Validate the CTA button
    this.getCardsBlock()
      .find("a")
      .should("be.visible") // Ensure the CTA is visible
      .and("have.attr", "href") // Ensure it has an 'href' attribute (if it's a link)
      .and("not.be.empty"); // Ensure the CTA is not empty (has a valid link or text)

    // Check that the CTA is functional (e.g., clicking it redirects to the correct URL)
    this.getCardsBlock()
      .find("a")
      .each(($cta) => {
        const ctaUrl = $cta.attr("href");
        cy.requestWithAuth(ctaUrl).its("status").should("eq", 200); // Ensure the URL is accessible
      });

    // Validate image is present
    this.getCardsBlock()
      .find("img")
      .each((img) => {
        cy.wrap(img).should("exist");
      });


  }
}

export default new AboutPage();
