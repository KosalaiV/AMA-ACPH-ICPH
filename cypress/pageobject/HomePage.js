class HomePage {
  // Locators

  getAllowButton() {
    return cy.get(".allowAll");
  }

  getCardsHeader() {
    return cy.get(".cards-block-header");
  }

  getCardsBlock() {
    return cy.get(".cards");
  }

  getCardsList() {
    return cy.get(".cards>li");
  }

  getAnchorLinks() {
    return cy.get("a[href]");
  }

  getHamburgerIconButton() {
    return cy.get("header [role='navigation'] button.menu-toggle");
  }

  getHamburgerIconCrossButton() {
    return cy.get("header [role='navigation'] button.menu-toggle-open");
  }

  getHeaderLinks() {
    return cy.get("header [role='navigation'] button+ul>li>a");
  }

  getHeaderLinksActive() {
    return cy.get("[class*='header'] ul a.active");
  }

  getFooterLinks() {
    return cy.get("[class*='footer'] ul a");
  }

  getHeroSection() {
    return cy.get(".hero-banner");
  }

  getHeroSectionCarousel() {
    return cy.get(".slick__slider .slick-dots>li");
  }

  getHeroSectionCarouselCurrent() {
    return cy.get(".slick-current");
  }

  getHeroSectionSlickDots() {
    return cy.get(".slick-dots .slick-active button");
  }

  getBreadcrumb() {
    return cy.get(".breadcrumbs-wrapper");
  }

  getCopyright() {
    return cy.get(".copyright-block-wrapper p");
  }

  // Actions

  verifyHeaderJumplinkRedirections(device) {
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

    // Ensure the header links are visible and get their count
    this.getHeaderLinks()
      .should("exist")
      .should("be.visible")
      .its("length")
      .then((count) => {
        cy.log(`Count of navigation links: ${count}`);

        // Use a for loop to iterate through all links
        for (let i = 0; i < count; i++) {
          this.getHeaderLinks()
            .eq(i) // Get the link at the current index
            .then(($liElement) => {
              const url = $liElement.attr("href");

              // Check if the href starts with "#"
              if (url.startsWith("#")) {
                assert.ok(
                  "This URL starts with a '#' and doesn't trigger navigation."
                );
              } else {
                // Click the link and verify the URL
                cy.wrap($liElement)
                  .click({ force: true })
                  .then(() => {
                    cy.url().should("include", url);

                    // If not on Desktop, reopen the hamburger menu after navigating back
                    if (device !== "macbook-16") {
                      this.getHamburgerIconButton()
                        .should("be.enabled")
                        .should("be.visible")
                        .click({ force: true });
                    }

                    //Assert bg color for active header tab
                    // this.getHeaderLinksActive().should(
                    //   "have.css",
                    //   "background-color",
                    //   "#fff"
                    // );
                  });
              }
              if (device !== "macbook-16") {
                this.getHamburgerIconCrossButton()
                  .should("be.enabled")
                  .should("be.visible")
                  .click({ force: true });
              }
            });
        }
      });
  }

  verifyHoverStyles(background, color) {
    cy.viewport("macbook-16");
    cy.visitWithAuth("/");

    this.getHeaderLinks().each(($el, index) => {
      cy.wrap($el)
        .realHover()
        .should("have.css", "background-color", background)
        .and("have.css", "color", color);

      cy.log(`Hovered and validated element index: ${index}`);
    });
  }

  verifyFooterJumplinkRedirections() {
    cy.visitWithAuth("/");
    this.getFooterLinks().then(($links) => {
      const hrefs = [];
      $links.each((_, link) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("http")) {
          hrefs.push(href);
        }
      });

      hrefs.forEach((href) => {
        const hrefOrigin = new URL(href).origin;
        const expectedSegment = new URL(href).pathname
          .split("/")
          .filter(Boolean)
          .pop();

        cy.visitWithAuth("/");

        cy.get(`.footer-bottom-wrapper a[href="${href}"]`)
          .invoke("removeAttr", "target")
          .click({ force: true });

        cy.origin(hrefOrigin, { args: expectedSegment }, (segment) => {
          cy.location("pathname", { timeout: 10000 }).should(
            "include",
            segment
          );
        });
      });
    });
  }

  validateResponseCodes() {
    const failedUrls = [];

    // Utility: Check if a URL is external
    const isExternal = (url) => {
      try {
        const base = new URL(Cypress.config().baseUrl);
        const target = new URL(url, base); // Resolves relative URLs
        return base.hostname !== target.hostname;
      } catch (e) {
        return true; // Treat invalid URLs as external
      }
    };

    this.getAnchorLinks()
      .each(($el) => {
        const href = $el.attr("href");

        // Skip empty, mailto, tel, and fragment links
        if (
          !href ||
          href.startsWith("mailto:") ||
          href.startsWith("tel:") ||
          href.startsWith("#")
        ) {
          cy.log(`🔕 Skipping non-testable link: ${href}`);
          return;
        }

        // Handle relative and absolute URLs
        const fullUrl = href.startsWith("http")
          ? href
          : `${Cypress.config().baseUrl}${href}`;

        // Skip external links
        if (isExternal(fullUrl)) {
          cy.log(`🌐 Skipping external link: ${fullUrl}`);
          return;
        }

        // Make request to internal link
        cy.requestWithAuth(fullUrl, { failOnStatusCode: false }).then(
          (response) => {
            if (![200, 301, 302].includes(response.status)) {
              failedUrls.push({ link: fullUrl, status: response.status });
            }
          }
        );
      })
      .then(() => {
        if (failedUrls.length > 0) {
          const error = new Error(
            `❌ Failed URLs:\n${failedUrls
              .map((url) => `🔗 Link: ${url.link}, Status: ${url.status}`)
              .join("\n")}`
          );
          throw error;
        } else {
          cy.log("✅ All internal links returned valid status codes.");
        }
      });
  }

  verifyHeroSectionCarousel() {
    // Visit home page
    cy.visitWithAuth("/");

    cy.window().then((win) => {
      const $ = win.jQuery;

      // Go from slick-track to the closest initialized slider
      cy.get(".slick-track")
        .closest(".slick-slider")
        .then(($slider) => {
          $($slider).slick("slickPause");
        });
    });

    // Click allow button if visible
    // this.getAllowButton().should("be.visible").click({ force: true });

    // Ensure the hero section is visible
    this.getHeroSection().should("exist");

    cy.document().then((doc) => {
      cy.wait(2000);
      const element = doc.querySelectorAll(".slick__slider .slick-dots>li");
      if (element.length > 1) {
        cy.log("Slick dots count: " + element.length);
        assert.ok("Slick slider is found!");
        //Assert color for slider dots heart icon
        this.getHeroSectionSlickDots()
          .should("be.visible")
          .then(($el) => {
            const afterStyle = window.getComputedStyle($el[0], "::after");
            const color = afterStyle.getPropertyValue("color"); // Get the color value for the pseudo-element
            expect(color).to.eq("rgba(0, 0, 0, 0)");
          });

        this.getHeroSectionCarousel().then((dots) => {
          const totalSlides = dots.length;

          // If only one slide is present, validate the single slide
          if (totalSlides === 1) {
            assert.ok("Only one slick slider is found!");
            this.validateCarouselContent(); // Validate the first slide
          } else {
            assert.ok("More than one slick slider found!");
            // If more than one slide, loop through each slide and validate
            for (let i = 0; i < totalSlides; i++) {
              // Click the dot to navigate to the respective slide
              this.getHeroSectionCarousel().eq(i).click({ force: true });

              cy.wait(2000);

              // Validate title, body, and image/video for the current slide
              this.validateCarouselContent();
            }
          }
        });
      } else {
        assert.ok("Slick slider is not found!");

        // Validate the title
        this.getHeroSection()
          .find(".slick-content-title")
          .should("be.visible")
          .and("not.be.empty");

        // Validate the body content
        this.getHeroSection()
          .find("p")
          .should("be.visible")
          .and("not.be.empty");

        // Dynamically validate media (image or YouTube embed video)
        this.getHeroSection().then(($slide) => {
          if ($slide.find(".hero-banner img").length) {
            // Validate image if present
            this.getHeroSection()
              .find(".hero-banner img")
              .should("be.visible")
              .and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0); // Ensure the image is loaded
              });
          } else if ($slide.find(".hero-banner video").length) {
            // Validate YouTube video is present
            this.getHeroSection()
              .find(".hero-banner video")
              .should("be.visible"); // Ensure the YouTube video is visible
          } else {
            assert.ok("Neither image nor YouTube video found in the slide");
          }
        });

        // Validate the CTA button
        cy.get(".slick-current .slick-content-btns>a")

          .should("be.visible") // Ensure the CTA is visible
          .and("have.attr", "href") // Ensure it has an 'href' attribute (if it's a link)
          .and("not.be.empty"); // Ensure the CTA is not empty (has a valid link or text)

        // Check that the CTA is functional (e.g., clicking it redirects to the correct URL)
        cy.get(".slick-current .slick-content-btns>a").then(($cta) => {
          const ctaUrl = $cta.attr("href");
          cy.requestWithAuth(ctaUrl).its("status").should("eq", 200); // Ensure the URL is accessible
        });
      }
    });
  }

  validateCarouselContent() {
    // Validate the title
    // this.getHeroSectionCarouselCurrent()
    //   .find(".slick-content-title")
    //   .should("be.visible")
    //   .and("not.be.empty");

    // // Validate the body content
    // this.getHeroSectionCarouselCurrent()
    //   .find("p")
    //   .should("be.visible")
    //   .and("not.be.empty");

    // Dynamically validate media (image or YouTube embed video)
    this.getHeroSectionCarouselCurrent().then(($slide) => {
      if ($slide.find(".hero-banner img").length) {
        // Validate image if present
        this.getHeroSectionCarouselCurrent()
          .find(".hero-banner img")
          .should("be.visible")
          .and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0); // Ensure the image is loaded
          });
      } else if ($slide.find(".hero-banner video").length) {
        // Validate YouTube video is present
        this.getHeroSectionCarouselCurrent()
          .find(".hero-banner video")
          .should("be.visible"); // Ensure the YouTube video is visible
      } else {
        throw new Error("Neither image nor YouTube video found in the slide");
      }
    });

    // Validate the CTA button
    // cy.get(".slick-current .slick-content-btns>a")
    //   .should("be.visible") // Ensure the CTA is visible
    //   .and("have.attr", "href") // Ensure it has an 'href' attribute (if it's a link)
    //   .and("not.be.empty"); // Ensure the CTA is not empty (has a valid link or text)

    // // Check that the CTA is functional (e.g., clicking it redirects to the correct URL)
    // cy.get(".slick-current .slick-content-btns>a").then(($cta) => {
    //   const ctaUrl = $cta.attr("href");
    //   cy.requestWithAuth(ctaUrl).its("status").should("eq", 200); // Ensure the URL is accessible
    // });
  }

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

  verifyCardsRowCount(device, expectedCardsPerRow) {
    cy.visitWithAuth("/");

    this.getCardsList()
      .should("exist")
      .then(($cards) => {
        const firstRowTop = $cards[0].getBoundingClientRect().top;

        const cardsInRow = [...$cards].filter((card) => {
          return card.getBoundingClientRect().top === firstRowTop;
        });

        cy.log(`Device: ${device} — Cards in first row: ${cardsInRow.length}`);
        expect(cardsInRow.length).to.eq(expectedCardsPerRow);
      });
  }

  //Breadcrumbs
  validateBreadcrumbLinks(device) {
    // Visit home page
    cy.visitWithAuth("/");

    // Click allow button if visible

    // If not on Desktop, open the hamburger menu
    if (device !== "macbook-16") {
      this.getHamburgerIconButton()
        .should("be.enabled")
        .should("be.visible")
        .click({ force: true });
    }

    // Ensure the header links are visible and get their count
    this.getHeaderLinks()
      .should("exist")
      .should("be.visible")
      .its("length")
      .then((count) => {
        cy.log(`Count of navigation links: ${count}`);

        // Use a for loop to iterate through all links
        for (let i = 1; i < count; i++) {
          this.getHeaderLinks()
            .eq(i) // Get the link at the current index
            .then(($liElement) => {
              const url = $liElement.attr("href");

              // Check if the href starts with "#"
              if (url.startsWith("#")) {
                assert.ok(
                  "This URL starts with a '#' and doesn't trigger navigation."
                );
              } else {
                // Click the link and verify the URL
                cy.wrap($liElement)
                  .click({ force: true })
                  .then(() => {
                    cy.url().should("include", url);

                    this.getBreadcrumb().should("be.visible");

                    this.getBreadcrumb()
                      .find("a")
                      .each((link) => {
                        cy.wrap(link)
                          .should("have.attr", "href")
                          .and("not.be.empty")
                          .then((href) => {
                            // Click on the breadcrumb link and verify the URL
                            cy.wrap(link).click({ force: true });

                            // Ensure the URL matches the breadcrumb link's href attribute
                            cy.url().should("include", href);
                          });
                      });

                    // If not on Desktop, reopen the hamburger menu after navigating back
                    if (device !== "macbook-16") {
                      this.getHamburgerIconButton()
                        .should("be.enabled")
                        .should("be.visible")
                        .click({ force: true });

                      this.getHamburgerIconCrossButton()
                        .should("be.enabled")
                        .should("be.visible")
                        .click({ force: true });
                    }
                  });
              }
            });
        }
      });
  }

  //Copyright
  validateCopyright() {
    // Visit home page
    cy.visitWithAuth("/");

    // Click allow button if visible

    // Check copyright
    this.getCopyright().scrollIntoView().should("be.visible");

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Verify it contains the current year
    this.getCopyright().should("contain", currentYear);
  }
}

export default new HomePage();
