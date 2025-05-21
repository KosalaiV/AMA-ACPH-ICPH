class HomePage {
  // Locators

  //TS_1: Home Page
  getAllowButton() {
    return cy.get(".allowAll");
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

  //TS_2: Hero Section
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

  //TS_3: Devices that Deliver Category
  getDeviceDeliverContainer() {
    return cy.get(".device-category__section");
  }

  getDeviceDeliverSliderCards() {
    return cy.get(".slick--view--device-type .slick__slider .slick-active");
  }

  getDeviceDeliverSliderPrevButton() {
    return cy.get(".device-category__section button.slick-prev");
  }

  getDeviceDeliverSliderNextButton() {
    return cy.get(".device-category__section button.slick-next");
  }

  //TS_4: Submit a Device
  getSubmitDeviceContainer() {
    return cy.get(".submit-device-container");
  }

  getSubmitDeviceRightImage() {
    return cy.get(".submit-device-section__right-image-wrapper img");
  }

  getSubmitDeviceLeftImage() {
    return cy.get(".submit-device-section__left-image-wrapper img");
  }

  //TS_5: Validation Process
  getValidationProcessContainer() {
    return cy.get(".validation-process");
  }

  //TS_28 Breadcrumbs
  getBreadcrumb() {
    return cy.get(".breadcrumbs");
  }

  //TS_35: Copyright
  getCopyright() {
    return cy.get("#block-vdl-copyrightblock>p");
  }

  // Actions

  //TS_1: Home Page
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
  // verifyFooterJumplinkRedirections() {
  //   // Visit home page
  //   cy.visitWithAuth("/");

  //   // Click allow button if visible
  //   // this.getAllowButton().should("be.visible").click({ force: true });

  //   // Ensure the header links are visible and get their count
  //   this.getFooterLinks()
  //     .should("exist")
  //     .should("be.visible")
  //     .its("length")
  //     .then((count) => {
  //       cy.log(`Count of navigation links: ${count}`);

  //       // Use a for loop to iterate through all links
  //       for (let i = 0; i < count; i++) {
  //         this.getFooterLinks()
  //           .eq(i) // Get the link at the current index
  //           .then(($liElement) => {
  //             const url = $liElement.attr("href");

  //             // Check if the href starts with "#"
  //             if (url.startsWith("#")) {
  //               assert.ok(
  //                 "This URL starts with a '#' and doesn't trigger navigation."
  //               );
  //             } else {
  //               // Click the link and verify the URL
  //               cy.wrap($liElement)
  //                 .click({ force: true })
  //                 .then(() => {
  //                   cy.url().should("include", url);
  //                 });
  //             }
  //           });
  //       }
  //     });
  // }

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
          .click();

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
    // Visit home page
    cy.visitWithAuth("/");

    // Array to store URLs that failed validation
    const failedUrls = [];

    // Collect all links from the specified section and validate each link
    this.getAnchorLinks()
      .each(($el) => {
        const href = $el.attr("href");
        if (href) {
          // Make a request to the URL and validate the response code
          cy.requestWithAuth(href, { failOnStatusCode: false }).then(
            (response) => {
              // If the response status code is not 200, 301, or 302, add it to the failedUrls array
              if (![200, 301, 302].includes(response.status)) {
                failedUrls.push({ link: href, status: response.status });
              }
            }
          );
        }
      })
      .then(() => {
        // After all requests are done, check if there are any failed URLs
        if (failedUrls.length > 0) {
          // Log and fail the test with the details of failed URLs
          const error = new Error(
            `Failed URLs:\n${failedUrls
              .map((url) => `Link: ${url.link}, Status: ${url.status}`)
              .join("\n")}`
          );
          throw error;
        }
      });
  }

  //TS_2: Hero Section
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
    this.getHeroSectionCarouselCurrent()
      .find(".slick-content-title")
      .should("be.visible")
      .and("not.be.empty");

    // Validate the body content
    this.getHeroSectionCarouselCurrent()
      .find("p")
      .should("be.visible")
      .and("not.be.empty");

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

  //TS_3: Devices that Deliver Category
  verifyDeviceDeliver() {
    // Visit home page
    cy.visitWithAuth("/");

    // Click allow button if visible
    this.getAllowButton().should("be.visible").click({ force: true });

    // Ensure the device deliver container  is visible
    this.getDeviceDeliverContainer().should("exist").should("be.visible");
    this.clickNextUntilDisabled();
    this.clickPrevUntilDisabled();
  }

  validateSlideContent() {
    // Validate the title
    this.getDeviceDeliverSliderCards()
      .find(".views-field-name")
      .should("be.visible")
      .and("not.be.empty");

    // Dynamically validate field content for each slider
    this.getDeviceDeliverSliderCards().then(($slide) => {
      if ($slide.find("img").length) {
        // Validate image if present
        this.getDeviceDeliverSliderCards().find("img").should("exist");
      } else {
        throw new Error("Image not found in the slide");
      }
    });

    // Validate the CTA button
    this.getDeviceDeliverSliderCards()
      .find("a")
      .should("be.visible") // Ensure the CTA is visible
      .and("have.attr", "href") // Ensure it has an 'href' attribute (if it's a link)
      .and("not.be.empty"); // Ensure the CTA is not empty (has a valid link or text)

    // Check that the CTA is functional (e.g., clicking it redirects to the correct URL)
    this.getDeviceDeliverSliderCards()
      .find("a")
      .then(($cta) => {
        const ctaUrl = $cta.attr("href");
        cy.requestWithAuth(ctaUrl).its("status").should("eq", 200); // Ensure the URL is accessible
      });
  }

  clickNextUntilDisabled() {
    this.getDeviceDeliverSliderNextButton()
      .should("exist")
      .and("not.be.disabled");
    this.getDeviceDeliverContainer()
      .find("h2")
      .should("be.visible")
      .scrollIntoView();
    this.getDeviceDeliverSliderNextButton().then(($arrow) => {
      // Check if the arrow has the slick-disabled class
      if ($arrow.hasClass("slick-disabled")) {
        cy.log(
          "Next arrow is disabled (slick-disabled class present). Stopping the test."
        );
        this.getDeviceDeliverSliderNextButton().click({ force: true });

        return;
      } else {
        // Ensure the button is clickable by checking it is visible and not disabled
        this.getDeviceDeliverSliderNextButton().should(
          "not.have.class",
          "slick-disabled"
        );

        // Verify cards content
        this.validateSlideContent();

        // Click the next arrow and wait for any transition
        this.getDeviceDeliverSliderNextButton().click({ force: true });
        cy.wait(500);

        // Recursively call the function to continue clicking
        this.clickNextUntilDisabled();
      }
    });
  }

  clickPrevUntilDisabled() {
    this.getDeviceDeliverSliderPrevButton()
      .should("exist")
      .and("not.be.disabled");

    this.getDeviceDeliverSliderPrevButton().then(($arrow) => {
      // Check if the arrow has the slick-disabled class
      if ($arrow.hasClass("slick-disabled")) {
        cy.log(
          "Prev arrow is disabled (slick-disabled class present). Stopping the test."
        );
        return;
      } else {
        // Ensure the button is clickable by checking it is visible and not disabled
        this.getDeviceDeliverSliderPrevButton().should(
          "not.have.class",
          "slick-disabled"
        );

        // Verify cards content
        this.validateSlideContent();

        // Click the prev arrow and wait for any transition
        this.getDeviceDeliverSliderPrevButton().click({ force: true });
        cy.wait(500);

        // Recursively call the function to continue clicking
        this.clickPrevUntilDisabled();
      }
    });
  }

  //TS_4: Submit a Device
  verifySubmitADeviceContainer(device) {
    // Visit home page
    cy.visitWithAuth("/");

    // Click allow button if visible
    this.getAllowButton().should("be.visible").click({ force: true });

    // Ensure the submit a device container is visible
    this.getSubmitDeviceContainer().should("be.visible").scrollIntoView();

    // Ensure the submit a device heading is visible
    this.getSubmitDeviceContainer()
      .find(".submit-device-section__body-title")
      .should("be.visible");

    // Ensure the submit a device paragraph is visible
    this.getSubmitDeviceContainer().find("p").should("be.visible");

    // Validate image is present
    this.getSubmitDeviceLeftImage()
      .should("exist")
      .should("be.visible")
      .and((img) => {
        expect(img[0].naturalWidth).to.be.greaterThan(0); // Ensure the image is loaded
      });

    //Ensure right image is not visible on mobile view and visible on desktop and ipad view
    if (device !== "macbook-16" && device !== "ipad-mini") {
      this.getSubmitDeviceRightImage().should("exist").should("not.be.visible");
    } else {
      this.getSubmitDeviceRightImage()
        .should("exist")
        .should("be.visible")
        .and((img) => {
          expect(img[0].naturalWidth).to.be.greaterThan(0); // Ensure the image is loaded
        });
    }

    // Validate the CTA button
    this.getSubmitDeviceContainer()
      .find("a")
      .should("be.visible") // Ensure the CTA is visible
      .and("have.attr", "href") // Ensure it has an 'href' attribute (if it's a link)
      .and("not.be.empty"); // Ensure the CTA is not empty (has a valid link or text)

    // Check that the CTA is functional (e.g., clicking it redirects to the correct URL)
    this.getSubmitDeviceContainer()
      .find("a")
      .then(($cta) => {
        const ctaUrl = $cta.attr("href");
        cy.requestWithAuth(ctaUrl).its("status").should("eq", 200); // Ensure the URL is accessible
      });
  }

  //TS_5: Validation Process
  verifyValidationProcessContainer() {
    // Visit home page
    cy.visitWithAuth("/");

    // Click allow button if visible
    this.getAllowButton().should("be.visible").click({ force: true });

    // Ensure the validation process container is visible
    this.getValidationProcessContainer().should("be.visible").scrollIntoView();

    // Ensure the validation process heading is visible
    this.getValidationProcessContainer().find("div>h2").should("be.visible");

    // Ensure the validation process paragraph is visible
    this.getValidationProcessContainer().find("header>p").should("be.visible");

    // Check the container has only two cards on any device
    this.getValidationProcessContainer()
      .find(".validation-process__row")
      .should("be.visible")
      .its("length")
      .should("eq", 2);

    // Ensure the validation process cards are visible
    this.getValidationProcessContainer()
      .find(".validation-process__row")
      .should("be.visible");

    // Ensure the validation process cards title is visible
    this.getValidationProcessContainer()
      .find(".validation-process__row .validation-process__info--title")
      .should("be.visible")
      .its("length")
      .should("eq", 2);

    // Ensure the validation process cards paragraph is visible
    this.getValidationProcessContainer()
      .find(".validation-process__row .validation-process__info--highlighted")
      .should("be.visible")
      .its("length")
      .should("eq", 2);

    // Validate the CTA button
    this.getValidationProcessContainer()
      .find("header>a")
      .should("be.visible") // Ensure the CTA is visible
      .and("have.attr", "href") // Ensure it has an 'href' attribute (if it's a link)
      .and("not.be.empty"); // Ensure the CTA is not empty (has a valid link or text)

    // Check that the CTA is functional (e.g., clicking it redirects to the correct URL)
    this.getValidationProcessContainer()
      .find("header>a")
      .then(($cta) => {
        const ctaUrl = $cta.attr("href");
        cy.requestWithAuth(ctaUrl).its("status").should("eq", 200); // Ensure the URL is accessible
      });

    // Validate the CTA button
    this.getValidationProcessContainer()
      .find(".validation-process__row a")
      .should("have.length", 2) // Assert there are 2 elements
      .each(($el) => {
        // Further validation for href or visibility
        cy.wrap($el).should("have.attr", "href").and("not.be.empty");
        cy.wrap($el).should("be.visible");
      });

    // Check that the CTA is functional (e.g., clicking it redirects to the correct URL)
    this.getValidationProcessContainer()
      .find(".validation-process__row a")
      .then(($cta) => {
        const ctaUrl = $cta.attr("href");
        cy.requestWithAuth(ctaUrl).its("status").should("eq", 200); // Ensure the URL is accessible
      });
  }

  //TS_28 Breadcrumbs
  validateBreadcrumbLinks(device) {
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
                    }
                  });
              }
            });
        }
      });
    this.getHamburgerIconCrossButton()
      .should("be.enabled")
      .should("be.visible")
      .click({ force: true });
  }

  //TS_35: Copyright
  validateCopyright() {
    // Visit home page
    cy.visitWithAuth("/");

    // Click allow button if visible
    this.getAllowButton().should("be.visible").click({ force: true });

    // Check copyright
    this.getCopyright().scrollIntoView().should("be.visible");

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Verify it contains the current year
    this.getCopyright().should("contain", currentYear);
  }
}

export default new HomePage();
