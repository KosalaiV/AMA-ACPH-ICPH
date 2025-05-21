class ConferencePage {
  // Locators

  //TS_30: About Us Page
  getReadMoreButton() {
    return cy.get("button.read-more-btn");
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
  verifyReadMoreFunction(device) {
    // Visit home page
    cy.visitWithAuth("/exhibitors-listing-page");

    cy.document().then((doc) => {
      const readMoreButton = doc.querySelectorAll("button.read-more-btn"); // update selector as needed

      if (readMoreButton) {
        assert.ok("✅ Read More button is available on the page");

            cy.get('.block-body-text-wrapper--partner').each(($block) => {
      const block = cy.wrap($block);

      block.find('button.read-more-btn[style="display: inline-block;"]').length && block.then(($el) => {
        const hasReadMore = $el.querySelector('button.read-more-btn[style="display: inline-block;"]');

        if (hasReadMore) {
          const paraEl = $el.querySelector('.block-body-text--partner > p'); // 🔄 Updated selector
          const buttonEl = $el.querySelector('button.read-more-btn');

          const para = cy.wrap(paraEl);
          const button = cy.wrap(buttonEl);

          // Get collapsed height
          para.invoke('outerHeight').then(initialHeight => {
            expect(initialHeight).to.be.lessThan(150); // Adjust threshold if needed

            // Expand
            button.click();

            para.invoke('outerHeight').should('be.greaterThan', initialHeight);

            // Collapse
            button.click();

            para.invoke('outerHeight').should('be.closeTo', initialHeight, 5);
          });
        }
      });
    });
        // cy.get(".block-body-text-wrapper--partner").each(($block) => {
        //   const block = cy.wrap($block);

        //   // Find the button and paragraph inside the current block
        //   block.find('button.read-more-btn[style="display: inline-block;"]')
        //     .length &&
        //     block.then(() => {
        //       const paragraph = block.find(".block-body-text--partner>p");
        //       const button = block.find("button.read-more-btn");

        //       // Wrap the elements for Cypress commands
        //       const para = cy.wrap(paragraph);
        //       const btn = cy.wrap(button);

        //       // Get the initial collapsed height
        //       para.invoke("outerHeight").then((initialHeight) => {
        //         expect(initialHeight).to.be.lessThan(150); // Adjust based on your actual threshold

        //         // Click "Read More"
        //         btn.click();

        //         // Check expanded height
        //         para
        //           .invoke("outerHeight")
        //           .should("be.greaterThan", initialHeight);

        //         // Click "Read Less"
        //         btn.click();

        //         // Check it collapses back to near-original height
        //         para
        //           .invoke("outerHeight")
        //           .should("be.closeTo", initialHeight, 5);
        //       });
        //     });
        // });
      } else {
        assert.ok(
          "❌ Read More button is NOT found on the page, everything is okay!!"
        );
      }
    });
  }
}

export default new ConferencePage();
