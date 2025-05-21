class DevicePage {
  // Locators

  //TS_6: No Result Page for Device Listing
  getAllowButton() {
    return cy.get(".allowAll");
  }

  getDevicesLink() {
    return cy.get("header li>a[href='/devices']");
  }

  getHamburgerIconButton() {
    return cy.get("#block-vdl-headerlogos button#mobile-menu");
  }

  getDevicesActiveTab() {
    return cy.get("a.is-active.active");
  }

  getDeviceListingContainer() {
    return cy.get(".device-listing");
  }

  getDeviceListingGridItem() {
    return cy.get(".views-view-responsive-grid__item");
  }

  getDeviceListingHeader() {
    return cy.get(".device-listing--header__search-sort");
  }

  getDeviceListingSidebar() {
    return cy.get(".device-listing--sidebar");
  }

  getDeviceListingSidebarToggle() {
    return cy.get("#sidebar-toggle");
  }

  getDeviceListingSidebarToggleClose() {
    return cy.get("#sidebar-close");
  }

  getSearchInput() {
    return cy.get("input[id*='edit-search']");
  }

  getDeviceListingDevicesFound() {
    return cy.get(".devices-found");
  }

  getDeviceListingNoResultsDetails() {
    return cy.get(".no-results--details");
  }

  //TS_7: Hero Banner
  getDeviceListingHeroSection() {
    return cy.get(".hero-section");
  }

  //TS_8: Independent Review Process
  getIndependentReviewProcess() {
    return cy.get("#block-vdl-independentreviewprocess");
  }

  //TS_9: Disclaimer Icon and Hover
  getDeviceListingDisclaimerIcon() {
    return cy.get(".device__details .disclaimer-icon");
  }

  getDeviceListingDisclaimerText() {
    return cy.get(".device__details .disclaimer-text");
  }

  //TS_10: Add to Favorites
  getFilterByFavorites() {
    return cy.get("#block-vdl-filterbyfavorites>a");
  }

  getAddToFavoritesWrapper() {
    return cy.get(".add-favourites--wrapper.show>a");
  }

  getRemoveFavouritesWrapper() {
    return cy.get(".remove-favourites--wrapper.show");
  }

  getFilterByFavoritesApplied() {
    return cy.get("#block-vdl-filterbyfavorites>a.filter--applied");
  }

  getDeviceDetailsAnchor() {
    return cy.get(".device__details>a");
  }

  getHeartFilled() {
    return cy.get(".remove-favourites--wrapper span");
  }

  //TS_11: Device Detail
  getDevices() {
    return cy.get(".views-field-field-device-image a");
  }

  getBreadcrumbs() {
    return cy.get("#block-vdl-breadcrumbs");
  }

  getDeviceDetailsContainer() {
    return cy.get(".device-details");
  }

  getDeviceDetailsLeftSection() {
    return cy.get(".device-details .device-details__left-section");
  }

  getDeviceDetailsRightSection() {
    return cy.get(".device-details .device-details__right-section");
  }

  getDeviceDetailDisclaimer() {
    return cy.get(".device-details__disclaimer");
  }

  getLogo1() {
    return cy.get(".logo-1");
  }

  getLogo2() {
    return cy.get(".logo-2");
  }

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

  //TS_12: You Might Also Like
  getYouMightAlsoLikeSection() {
    return cy.get(".related-devices-section");
  }

  getYouMightAlsoLikeSectionSlick() {
    return cy.get(".related-devices-section .slick__slide");
  }

  getYouMightAlsoLikeSectionSlickBrand() {
    return cy.get(
      ".related-devices-section .views-field-field-manufacturer-name"
    );
  }

  getYouMightAlsoLikeSectionSlickLinks() {
    return cy.get(
      ".related-devices-section .views-field-nothing>.field-content>a"
    );
  }

  //TS_13: Device Filters and Sort
  getDevicesFound() {
    return cy.get(".devices-found");
  }

  getDevicesCount() {
    return cy.get(".device__details .device__details--manufacturer");
  }

  getViewMore() {
    return cy.get(".pager__item>a");
  }

  getFilterBrandNotCheckedCheckbox() {
    return cy.get(
      "[data-drupal-facet-id='brands_grid'] > li.facets-reset + .facet-item input[type='checkbox']:not(:checked)"
    );
  }

  getFilterBrandCheckedCheckbox() {
    return cy.get(
      "[data-drupal-facet-id='brands_grid'] > li.facets-reset + .facet-item input[type='checkbox']:checked"
    );
  }

  getFilterBrandCheckedCheckboxLabel() {
    return cy.get(
      "[data-drupal-facet-id='brands_grid'] > li.facets-reset + .facet-item input[type='checkbox']:checked +label>.facet-item__value"
    );
  }

  getFilterSummaryItem() {
    return cy.get(".facet-summary-item--facet>a>span.facet-item__value");
  }

  getSortDropdown() {
    return cy.get("select[id*='edit-sort-bef-combine']");
  }

  // Actions

  //TS_6: No Result Page for Device Listing
  verifyNoResultsPage(device) {
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

    // Click devices link
    this.getDevicesLink().should("be.visible").click({ force: true });

    // Ensure the devices tab is active and visible on desktop
    if (device == "macbook-16") {
      this.getDevicesActiveTab()
        .contains("Devices", { matchCase: false })
        .should("be.visible");
    }

    // Ensure the device listing container is visible
    this.getDeviceListingContainer().should("be.visible");

    // Ensure the device listing grid items is visible
    this.getDeviceListingGridItem().should("be.visible");

    // Ensure the device listing header is visible
    this.getDeviceListingHeader().should("be.visible");

    // Ensure the device listing hero section is visible
    this.getDeviceListingHeroSection().should("be.visible");

    if (device !== "macbook-16") {
      this.getDeviceListingSidebarToggle()
        .should("be.visible")
        .click({ force: true });
      this.getDeviceListingSidebar().should("be.visible");
      this.getDeviceListingSidebarToggleClose()
        .should("be.visible")
        .click({ force: true });
    } else {
      // Ensure the device listing sidebar is visible
      this.getDeviceListingSidebar().should("be.visible");
    }

    // Ensure the device listing independent review process is visible
    this.getIndependentReviewProcess().should("be.visible");

    // Ensure the search box is visible and type invalid input
    this.getSearchInput().should("be.visible").type("@#$#${enter}");

    // Ensure the device listing hero section is visible
    this.getDeviceListingHeroSection().should("be.visible");

    // Ensure the device listing details is visible
    this.getDeviceListingNoResultsDetails().should("be.visible");

    // Ensure the device listing independent review process is visible
    this.getIndependentReviewProcess().should("be.visible");

    // Ensure the device listing devices found is visible and shows 0 results
    this.getDeviceListingDevicesFound()
      .should("be.visible")
      .should("contain.text", "0");

    // Ensure the device listing heading is visible with relevant content
    this.getDeviceListingNoResultsDetails()
      .find(".no-results__title")
      .contains("No matching devices", { matchCase: false })
      .should("be.visible");

    // Ensure the device listing paragraph is visible
    this.getDeviceListingNoResultsDetails().find("p").should("be.visible");

    // Validate image is present
    this.getDeviceListingNoResultsDetails().find("img").should("exist");

    //Ensure footer copyright is visible
    this.getFooterCopyright().scrollIntoView().should("be.visible");

    //Ensure footer disclaimer is visible
    this.getFooterDisclaimer().should("be.visible");

    //Ensure footer devices link is visible
    this.getFooterDevicesLink().should("be.visible");

    //Ensure footer about link is visible
    this.getFooterAboutLink().should("be.visible");

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

  //TS_7: Hero Banner
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

    // Click devices link
    this.getDevicesLink().should("be.visible").click({ force: true });

    // Ensure the device listing hero section is visible
    this.getDeviceListingHeroSection().should("be.visible");

    // Validate the title
    this.getDeviceListingHeroSection()
      .find(".hero-section__info--title")
      .should("be.visible")
      .and("not.be.empty");

    // Validate the body content
    this.getDeviceListingHeroSection()
      .find("p")
      .should("be.visible")
      .and("not.be.empty");

    // Validate image is present
    this.getDeviceListingHeroSection().find("img").should("exist");
  }

  //TS_8: Independent Review Process
  verifyIndependentReviewProcess(device) {
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

    // Click devices link
    this.getDevicesLink().should("be.visible").click({ force: true });

    // Ensure the device listing independent review process container is visible
    this.getIndependentReviewProcess().should("be.visible");

    // Validate the title
    this.getIndependentReviewProcess()
      .find("h3")
      .should("be.visible")
      .and("not.be.empty");

    // Validate the body content
    this.getIndependentReviewProcess()
      .find("p")
      .should("be.visible")
      .and("not.be.empty");

    this.getIndependentReviewProcess().scrollIntoView();

    // Validate image is present
    this.getIndependentReviewProcess().find("img").should("exist");

    // Validate the CTA 1 button
    this.getIndependentReviewProcess()
      .find("a.independent-review-process__body-submit")
      .should("be.visible") // Ensure the CTA is visible
      .and("have.attr", "href") // Ensure it has an 'href' attribute (if it's a link)
      .and("not.be.empty"); // Ensure the CTA is not empty (has a valid link or text)

    // Check that the CTA 1 is functional (e.g., clicking it redirects to the correct URL)
    this.getIndependentReviewProcess()
      .find("a.independent-review-process__body-submit")
      .then(($cta) => {
        const ctaUrl = $cta.attr("href");
        cy.requestWithAuth(ctaUrl).its("status").should("eq", 200); // Ensure the URL is accessible
      });

    // Validate the CTA 2 button
    this.getIndependentReviewProcess()
      .find("a.independent-review-process__body-link")
      .should("be.visible") // Ensure the CTA is visible
      .and("have.attr", "href") // Ensure it has an 'href' attribute (if it's a link)
      .and("not.be.empty"); // Ensure the CTA is not empty (has a valid link or text)

    // Check that the CTA 2 is functional (e.g., clicking it redirects to the correct URL)
    this.getIndependentReviewProcess()
      .find("a.independent-review-process__body-link")
      .then(($cta) => {
        const ctaUrl = $cta.attr("href");
        cy.requestWithAuth(ctaUrl).its("status").should("eq", 200); // Ensure the URL is accessible
      });
  }

  //TS_9: Disclaimer Icon and Hover
  verifyDisclaimerIcon(device) {
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

    // Click devices link
    this.getDevicesLink().should("be.visible").click({ force: true });

    cy.document().then((doc) => {
      cy.wait(2000);
      const element = doc.querySelector(".device__details .disclaimer-icon");
      if (element) {
        cy.wrap(element).scrollIntoView().should("be.visible");
        cy.wait(2000);
        this.getDeviceListingDisclaimerIcon()
          .prevUntil(".views-field-favorites-field")
          .first()
          .scrollIntoView();
        if (Cypress.browser.name !== "firefox") {
          assert.ok("It is running in chromium browser!");
          cy.wrap(element).first().realHover(); // Simulate mouse hover
          // Assert that the element has 'visibility: visible' after hover
          this.getDeviceListingDisclaimerText()
            .first()
            .should("have.css", "visibility", "visible")
            .its("length")
            .should("eq", 1);
        } else {
          assert.ok("It is running in firefox browser!");
        }
        assert.ok("Disclaimer found");
      } else {
        assert.ok("Disclaimer not found");
      }
    });
  }

  //TS_10: Add to Favorites
  verifyAddToFavorites(device) {
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

    // Click devices link
    this.getDevicesLink().should("be.visible").click({ force: true });

    let favCount = 0;
    let newFavCount = 0;
    let favoriteHrefs = [];

    cy.document().then((doc) => {
      cy.wait(2000);
      const elements = doc.querySelectorAll(".remove-favourites--wrapper.show");
      if (elements.length > 0) {
        // Store the length of existing favorites
        favCount = elements.length;
        cy.log(`Number of favorites already added: ${favCount}`);
      } else {
        cy.log("No favorites found, adding to favorites...");
      }

      // No favorites, so click the 'Add to Favorites' icon

      this.getDeviceListingGridItem().then((items) => {
        if (items.length > 3) {
          assert.ok("More than 3 devices found");

          // Click the 1st 'Add to Favorites' icon
          this.getAddToFavoritesWrapper()
            .eq(0) // First element
            .scrollIntoView()
            .should("be.visible")
            .click({ force: true });

          cy.wait(1000);

          // Click the 2nd 'Add to Favorites' icon
          this.getAddToFavoritesWrapper()
            .eq(1) // Second element
            .scrollIntoView()
            .should("be.visible")
            .click({ force: true });

          cy.wait(1000);

          // Click the 3rd 'Add to Favorites' icon
          this.getAddToFavoritesWrapper()
            .eq(2) // Third element
            .scrollIntoView()
            .should("be.visible")
            .click({ force: true });

          cy.wait(2000);
          // After adding, calculate the new count
          this.getRemoveFavouritesWrapper()
            .should("have.length", favCount + 3)
            .then(($newFavorites) => {
              newFavCount = $newFavorites.length;
              cy.log(`New total number of favorites: ${newFavCount}`);

              // Extract the href attribute for each existing favorite
              this.getRemoveFavouritesWrapper()
                .closest(".views-view-responsive-grid__item-inner")
                .find(".device__details>a")
                .each(($fav) => {
                  cy.wrap($fav)

                    .invoke("attr", "href") // Extract the href attribute
                    .then((href) => {
                      favoriteHrefs.push(href); // Store the href in the array
                      cy.log(href); // Log the href value
                    });
                });

              //Assert color for add favorites heart icon
              this.getHeartFilled()
                .should("be.visible")
                .then(($el) => {
                  const afterStyle = window.getComputedStyle($el[0], "::after");
                  const color = afterStyle.getPropertyValue("color"); // Get the color value for the pseudo-element
                  expect(color).to.eq("rgb(53, 92, 164)");
                });

              if (device !== "macbook-16") {
                this.getDeviceListingSidebarToggle()
                  .should("be.visible")
                  .click({ force: true });
              }
              //Click Favorites filter
              this.getFilterByFavorites()
                .should("be.visible")
                .click({ force: true });

              //Assert bg color for favorites
              this.getFilterByFavoritesApplied().should(
                "have.css",
                "background-color",
                "rgb(53, 92, 164)"
              );

              //Assert the count
              this.getDeviceListingGridItem()
                .its("length")
                .should("eq", newFavCount);
            });
        } else {
          assert.ok("Less than 3 devices found");
          // Click the 1st 'Add to Favorites' icon
          this.getAddToFavoritesWrapper()
            .first() // First element
            .scrollIntoView()
            .should("be.visible")
            .click({ force: true });

          cy.wait(2000);
          // After adding, calculate the new count
          this.getRemoveFavouritesWrapper()
            .should("have.length", favCount + 1)
            .then(($newFavorites) => {
              newFavCount = $newFavorites.length;
              cy.log(`New total number of favorites: ${newFavCount}`);

              // Extract the href attribute for each existing favorite
              this.getRemoveFavouritesWrapper()
                .closest(".views-view-responsive-grid__item-inner")
                .find(".device__details>a")
                .each(($fav) => {
                  cy.wrap($fav)

                    .invoke("attr", "href") // Extract the href attribute
                    .then((href) => {
                      favoriteHrefs.push(href); // Store the href in the array
                      cy.log(href); // Log the href value
                    });
                });

              //Assert color for add favorites heart icon
              this.getHeartFilled()
                .should("be.visible")
                .then(($el) => {
                  const afterStyle = window.getComputedStyle($el[0], "::after");
                  const color = afterStyle.getPropertyValue("color"); // Get the color value for the pseudo-element
                  expect(color).to.eq("rgb(53, 92, 164)");
                });

              if (device !== "macbook-16") {
                this.getDeviceListingSidebarToggle()
                  .should("be.visible")
                  .click({ force: true });
              }
              //Click Favorites filter
              this.getFilterByFavorites()
                .should("be.visible")
                .click({ force: true });

              //Assert bg color for favorites
              this.getFilterByFavoritesApplied().should(
                "have.css",
                "background-color",
                "rgb(53, 92, 164)"
              );

              //Assert the count
              this.getDeviceListingGridItem()
                .its("length")
                .should("eq", newFavCount);
            });
        }
      });

      // Validate all hrefs in the Favorites box
      cy.wrap(favoriteHrefs).each((href) => {
        cy.get(`.device__details>a[href="${href}"]`).should("exist"); // Ensure each href exists in the favorites box
      });
    });
  }

  //TS_11: Device Detail
  verifyDeviceDetail(device) {
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
    // Click devices link
    this.getDevicesLink().should("be.visible").click({ force: true });

    cy.document().then((doc) => {
      cy.wait(2000);
      const elements = doc.querySelectorAll(
        ".device__details .disclaimer-icon"
      );
      if (elements) {
        this.getDeviceListingDisclaimerIcon()
          .parents(".device__details")
          .find("a")
          .first()
          .should("be.visible")
          .click({ force: true });

        cy.wait(2000);

        //Ensure disclaimer container is visible
        this.getDeviceDetailDisclaimer().should("be.visible");

        //Ensure disclaimer title is visible
        this.getDeviceDetailDisclaimer()
          .find(".device-details__disclaimer-title")
          .should("be.visible");

        //Ensure disclaimer description is visible
        this.getDeviceDetailDisclaimer()
          .find(".device-details__disclaimer-body")
          .should("be.visible");
      } else {
        //Click the first device
        this.getDevices().first().should("be.visible").click({ force: true });

        cy.document().then((doc) => {
          cy.wait(2000);
          const elements = doc.querySelectorAll(".device-details__disclaimer");
          if (elements) {
            throw new Error("Disclaimer is displayed, expected to not display");
          }
        });
      }
    });

    // Validate logo 1 is present
    this.getLogo1()
      .find("img")
      .each((img) => {
        cy.wrap(img).should("exist");
      });

    // Validate logo 2 is present
    this.getLogo2()
      .find("img")
      .each((img) => {
        cy.wrap(img).should("exist");
      });

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

    //Ensure device details is visible
    this.getDeviceDetailsContainer().should("be.visible");

    // Validate image is present
    this.getDeviceDetailsLeftSection().find("img").should("exist");

    //Ensure title is visible
    this.getDeviceDetailsRightSection()
      .find(".device-details__right-section-header-title")
      .should("be.visible");

    //Ensure description is visible
    this.getDeviceDetailsRightSection()
      .find(".device-details__right-section-description")
      .should("be.visible");

    //Ensure protocols is visible
    this.getDeviceDetailsRightSection()
      .find(".device-details__right-section-protocols")
      .should("be.visible");

    //Ensure prices is visible
    this.getDeviceDetailsRightSection()
      .find(".device-details__right-section-header-prices")
      .should("be.visible");

    //Ensure details table is visible
    this.getDeviceDetailsRightSection()
      .find(".device-details__table")
      .should("be.visible");

    //Ensure favorites wrapper is visible
    this.getDeviceDetailsRightSection()
      .find(".favorites--wrapper")
      .should("be.visible");

    //Ensure print button is visible
    this.getDeviceDetailsRightSection()
      .find(".device-details__buttons-print")
      .should("be.visible");

    //Ensure share button is visible
    this.getDeviceDetailsRightSection()
      .find(".share-buttons")
      .should("be.visible");

    //Ensure you might also like section is visible
    this.getYouMightAlsoLikeSection().should("be.visible");
  }

  verifyDeviceDetailAddToFavorite(device) {
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
    // Click devices link
    this.getDevicesLink().should("be.visible").click({ force: true });

    // Click the 'Add to Favorites' icon visible device link
    this.getAddToFavoritesWrapper()
      .parents(".views-field-favorites-field")
      .next()
      .find("a")
      .first()
      .should("be.visible")
      .click({ force: true });

    cy.wait(2000);

    // Click device detials add to favorites
    this.getDeviceDetailsRightSection()
      .find(".add-favourites--wrapper.show>a")
      .should("be.visible")
      .click({ force: true });

    // After adding, calculate the new count
    this.getDeviceDetailsRightSection()
      .find(".remove-favourites--wrapper.show")
      .should("have.length", 1);

    //Assert color for add favorites heart icon
    this.getDeviceDetailsRightSection()
      .find(".remove-favourites--wrapper span")
      .should("be.visible")
      .then(($el) => {
        const afterStyle = window.getComputedStyle($el[0], "::after");
        const color = afterStyle.getPropertyValue("color"); // Get the color value for the pseudo-element
        expect(color).to.eq("rgb(53, 92, 164)");
      });

    cy.url().then((currentUrl) => {
      cy.log(currentUrl); // Log the href value

      // If not on Desktop, open the hamburger menu
      if (device !== "macbook-16") {
        this.getHamburgerIconButton()
          .should("be.enabled")
          .should("be.visible")
          .click({ force: true });
      }
      // Click devices link
      this.getDevicesLink().should("be.visible").click({ force: true });

      if (device !== "macbook-16") {
        this.getDeviceListingSidebarToggle()
          .should("be.visible")
          .click({ force: true });
      }
      //Click Favorites filter
      this.getFilterByFavorites().should("be.visible").click({ force: true });

      //Assert bg color for favorites
      this.getFilterByFavoritesApplied().should(
        "have.css",
        "background-color",
        "rgb(53, 92, 164)"
      );

      // Validate the href in the Favorites box
      this.getDeviceDetailsAnchor().each(($a) => {
        const href = $a.attr("href");
        expect(currentUrl).to.include(href);
      });
    });
  }

  //TS_12: You Might Also Like
  verifyDeviceYouMightAlsoLike(device) {
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
    // Click devices link
    this.getDevicesLink().should("be.visible").click({ force: true });

    //Click the first device
    this.getDeviceDetailsAnchor()
      .first()
      .should("be.visible")
      .click({ force: true });

    //Ensure you might also like section is visible
    this.getYouMightAlsoLikeSection().scrollIntoView().should("be.visible");

    //Ensure you might also like section heading is visible
    this.getYouMightAlsoLikeSection()
      .find("h2")
      .contains("You might also like", { matchCase: false })
      .should("be.visible");

    cy.document().then((doc) => {
      cy.wait(2000);
      const element = doc.querySelector(
        ".related-devices-section .slick__slide"
      );
      if (element) {
        //Ensure you might also like section slick slider is visible
        this.getYouMightAlsoLikeSectionSlick().should("be.visible");

        this.getYouMightAlsoLikeSection().scrollIntoView();

        // Validate image is present
        this.getYouMightAlsoLikeSectionSlick()
          .find(".views-field-field-device-image img")
          .each((img) => {
            cy.wrap(img).should("exist");
          });

        //Ensure you might also like slick favorites icon is visible
        this.getYouMightAlsoLikeSectionSlick()
          .find(".heart-outline")
          .each((fav) => {
            cy.wrap(fav).should("exist");
          });

        //Ensure you might also like slick name is visible
        this.getYouMightAlsoLikeSectionSlick()
          .find(".views-field-field-manufacturer-name")
          .each((fav) => {
            cy.wrap(fav).should("exist");
          });

        //Ensure you might also like slick number is visible
        this.getYouMightAlsoLikeSectionSlick()
          .find(".views-field-field-title-model-number")
          .each((fav) => {
            cy.wrap(fav).should("exist");
          });

        //Ensure you might also like slick price is visible
        this.getYouMightAlsoLikeSectionSlick()
          .find(".device__details--price")
          .each((fav) => {
            cy.wrap(fav).should("exist");
          });
      } else {
        assert.ok("No related devices found, everything os okay!!");
      }
    });
  }

  verifyDeviceYouMightAlsoLikeDeviceCategory(device) {
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
    // Click devices link
    this.getDevicesLink().should("be.visible").click({ force: true });

    //Click the first device
    this.getDeviceDetailsAnchor()
      .first()
      .should("be.visible")
      .click({ force: true });

    //Ensure you might also like section is visible
    this.getYouMightAlsoLikeSection().scrollIntoView().should("be.visible");

    cy.document().then((doc) => {
      cy.wait(2000);
      const element = doc.querySelector(
        ".related-devices-section .slick__slide"
      );
      if (element) {
        let extractedBrand,
          extractedDeviceType,
          extractedCuffTypes = [];

        cy.get("td:has(p.device-details__table-label)")
          .contains("Brand", { matchCase: false })
          .parent()
          .next("td.device-details__table-value")
          .invoke("text")
          .then((text) => {
            extractedBrand = text.trim(); // Store the extracted brand
            cy.log("Extracted brand:" + extractedBrand);

            cy.document().then((doc) => {
              cy.wait(2000);
              const elements = doc.querySelectorAll(
                ".related-devices-section .views-field-field-manufacturer-name"
              );

              // Filter elements based on the inner text matching `extracted brand`
              const matchingElement = Array.from(elements).find(
                (el) => el.innerText.trim() === extractedBrand
              );

              if (matchingElement) {
                // Do something with the matched element
                assert.ok(
                  "Matching element found:" + matchingElement.innerText
                );
                // Now validate that the extracted brand is present in each slick element
                this.getYouMightAlsoLikeSectionSlickBrand().each(($name) => {
                  cy.wrap($name)
                    .invoke("text")
                    .then((brand) => {
                      // Check if the extracted brand is present in the slick text
                      expect(brand).to.contain(extractedBrand);
                    });
                });
              } else {
                assert.ok("No matching element found for:" + extractedBrand);
                // Now validate that the extracted brand is present in each slick element
                this.getYouMightAlsoLikeSectionSlickBrand().each(($name) => {
                  cy.wrap($name)
                    .invoke("text")
                    .then((brand) => {
                      // Check if the extracted brand is present in the slick text
                      expect(brand).to.not.contain(extractedBrand);
                    });
                });

                cy.get("td:has(p.device-details__table-label)")
                  .contains("Device Type", { matchCase: false })
                  .parent()
                  .next("td.device-details__table-value")
                  .invoke("text")
                  .then((text) => {
                    extractedDeviceType = text.trim(); // Store the extracted device type
                    cy.log("Extracted Device Type:" + extractedDeviceType);
                  });

                cy.get("td:has(p.device-details__table-label)")
                  .contains("Cuff Type", { matchCase: false })
                  .parent()
                  .next("td.device-details__table-value")
                  .find("ul>li>p")
                  .each(($el) => {
                    const cuffType = $el.text().split(",")[0].trim(); // Extract text for each <p> element
                    extractedCuffTypes.push(cuffType); // Add the extracted cuff type to the array
                  })
                  .then(() => {
                    // Log all extracted cuff types after the loop
                    extractedCuffTypes.forEach((type) => {
                      cy.log("Extracted Cuff Type: " + type);
                    });
                  });

                // Loop through each URL
                this.getYouMightAlsoLikeSectionSlickLinks().then(($links) => {
                  // Extract hrefs from the selected links
                  const urls = $links
                    .map((index, el) => Cypress.$(el).attr("href"))
                    .get();

                  // Log each url
                  urls.forEach((url) => {
                    cy.log(url);
                    cy.requestWithAuth(url).then((response) => {
                      // Parse the response body as an HTML document
                      const parser = new DOMParser();
                      const doc = parser.parseFromString(
                        response.body,
                        "text/html"
                      );

                      const sizeElements = doc
                        .querySelectorAll(".device-details__table-list")[0] // Get the first .device-details__table-list
                        .querySelectorAll(
                          ".device-details__table-list-item > p"
                        ); // Find all <p> elements under it

                      const extractedSizes = Array.from(sizeElements).map(
                        (el) => el.innerText.trim()
                      );

                      const actualCuffTypes = [];

                      // Push actual cuff type in an array
                      extractedSizes.forEach((el) => {
                        const actualCuffType = el.split(",")[0].trim(); // Extract and clean the size
                        actualCuffTypes.push(actualCuffType);
                      });

                      cy.log(extractedCuffTypes + " :Extacted Content");
                      cy.log(actualCuffTypes + " :Actual Content");

                      // Assert the cuff types to partially match the device
                      // Check for non-matching items
                      const nonMatchingItems = actualCuffTypes.filter(
                        (actual) => !extractedCuffTypes.includes(actual)
                      );

                      // If there are non-matching items, throw an error
                      if (nonMatchingItems.length > 0) {
                        const names = nonMatchingItems.join(", ");
                        throw new Error(
                          `The following items from actualCuffTypes are not found in extractedCuffTypes: ${names}`
                        );
                      } else {
                        // Assert that actualCuffTypes is a subset of extractedCuffTypes
                        expect(extractedCuffTypes).to.include.members(
                          actualCuffTypes,
                          `The following items are matching: ${actualCuffTypes.join(
                            ", "
                          )}`
                        );
                      }

                      const deviceType = doc
                        .querySelectorAll(".device-details__table-list")[2] // Get the first .device-details__table-list
                        .querySelector(".device-details__table-list-item > p")
                        .innerText.trim();

                      // Assert that the extractedDeviceType is present on page
                      expect(deviceType).to.equal(extractedDeviceType);

                      // Assert brand name is not same
                      const extractedBrandName = doc
                        .querySelector(".device-details__table-value")
                        .innerText.trim();
                      expect(extractedBrandName).to.not.equal(extractedBrand);
                    });
                  });
                });
              }
            });
          });
      } else {
        assert.ok("No related devices found, everything os okay!!");
      }
    });
  }

  //TS_13: Device Filters and Sort
  verifyLoadMoreFunctionality(device) {
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
    // Click devices link
    this.getDevicesLink().should("be.visible").click({ force: true });

    this.getDevicesFound()
      .invoke("text")
      .then((text) => {
        // Use regex to extract the number from the text
        const totalDevices = text.match(/\d+/)[0];
        cy.log("Number of devices found: " + totalDevices);
        // You can now use the number for further assertions or logic

        const devicesPerLoad = 24; // Devices loaded per click of the Load More button
        let loadedDevices = 0; // Counter for loaded devices

        // Calculate how many times "Load More" needs to be clicked
        const remainderDevices = totalDevices % devicesPerLoad;
        if (totalDevices > 24) {
          assert.ok("More than 24 devices found, view more is applicable");
          const loadMoreUntilAllLoaded = () => {
            // Check how many devices are loaded and compare with the expected total
            this.getDevicesCount().then((devices) => {
              loadedDevices = devices.length;

              cy.log(`Loaded Devices: ${loadedDevices}`);

              // If there are more devices to load
              if (loadedDevices < totalDevices) {
                // If not the last load, assert that 24 devices are loaded after each click
                if (totalDevices - loadedDevices > devicesPerLoad) {
                  // Wait for the "Load More" button to appear and click it
                  this.getViewMore()
                    .should("be.visible")
                    .click({ force: true });

                  // Wait for devices to load (adjust wait time as per actual load speed)
                  cy.wait(1000);

                  // Assert that devices have increased by 24
                  this.getDevicesCount().should(
                    "have.length",
                    loadedDevices + devicesPerLoad
                  );
                } else {
                  // If it's the last load, assert the remaining number of devices is loaded
                  this.getViewMore()
                    .should("be.visible")
                    .click({ force: true });

                  cy.wait(1000); // Wait for the last batch of devices to load

                  // Assert that the total number of devices matches the expected total
                  this.getDevicesCount().should("have.length", totalDevices);
                }

                // Recursively call the function to load more devices
                loadMoreUntilAllLoaded();
              }
            });
          };

          // Start loading devices until all devices are loaded
          loadMoreUntilAllLoaded();

          cy.log("Remaining Devices: " + remainderDevices);

          // Final assertion: Check if the correct total number of devices is loaded
          this.getDevicesCount().should("have.length", totalDevices);
        } else {
          assert.ok(
            "Only 24 or less than 24 devices found, view more is not applicable"
          );
        }

        cy.document().then((doc) => {
          cy.wait(1000);
          const element = doc.querySelector(".pager__item>a");
          if (element) {
            throw new Error(
              "View more still exist, expected to not exist when it reach its length"
            );
          } else {
            assert.ok("View more is not visible, everything is okay!!");
          }
        });
      });
  }

  verifySearchFunctionality(device) {
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
    // Click devices link
    this.getDevicesLink().should("be.visible").click({ force: true });

    this.getDevicesCount()
      .first()
      .should("be.visible")
      .invoke("text")
      .then((device) => {
        // Trim spaces around the extracted device name
        const extractedDevice = device.trim();

        cy.log("Extracted and trimmed device: " + extractedDevice);

        cy.wait(1000);

        // Use the trimmed text to input in a search field
        this.getSearchInput()
          .should("be.visible")
          .type(extractedDevice + "{enter}");

        cy.wait(5000);

        this.getDevicesCount()
          .should("be.visible")
          .each((devices) => {
            cy.wrap(devices).should("have.text", extractedDevice);
          });
      });
  }

  verifyFilterFunctionality(device) {
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
    // Click devices link
    this.getDevicesLink().should("be.visible").click({ force: true });

    if (device !== "macbook-16") {
      this.getDeviceListingSidebarToggle()
        .should("be.visible")
        .click({ force: true });
      this.getFilterBrandNotCheckedCheckbox()
        .should("exist")
        .check({ force: true });
      cy.wait(1000);
      this.getFilterBrandCheckedCheckbox().should("exist");
    } else {
      // Ensure the device listing sidebar is visible
      this.getDeviceListingSidebar().should("be.visible");

      this.getFilterBrandNotCheckedCheckbox()
        .should("exist")
        .check({ force: true });
      cy.wait(1000);
      this.getFilterBrandCheckedCheckbox().should("exist");
    }

    this.getFilterBrandCheckedCheckboxLabel()
      .should("be.visible")
      .invoke("text")
      .then((devices) => {
        // Trim spaces around the extracted device name
        const extractedDevice = devices.trim();

        cy.log("Extracted filtered device: " + extractedDevice);

        if (device !== "macbook-16") {
          this.getDeviceListingSidebarToggleClose()
            .should("be.visible")
            .click({ force: true });
        } else {
          cy.log("It is a desktop view");
        }

        this.getFilterSummaryItem()
          .should("be.visible")
          .should("have.text", extractedDevice);

        this.getDevicesCount().should("be.visible");

        cy.wait(3000);
        this.getDevicesCount().each((devices) => {
          cy.wrap(devices).should("have.text", extractedDevice);
        });
      });

    this.getFilterSummaryItem().should("be.visible").click({ force: true });
    cy.wait(1000);

    if (device !== "macbook-16") {
      this.getDeviceListingSidebarToggle()
        .should("be.visible")
        .click({ force: true });
      this.getFilterBrandNotCheckedCheckbox().should("exist");
      this.getDeviceListingSidebarToggleClose()
        .should("be.visible")
        .click({ force: true });
    } else {
      // Ensure the device listing sidebar is visible
      this.getDeviceListingSidebar().should("be.visible");

      this.getFilterBrandNotCheckedCheckbox().should("exist");
    }

    cy.document().then((doc) => {
      const element = doc.querySelector(
        ".facet-summary-item--facet>a>span.facet-item__value"
      );
      if (element) {
        throw new Error(
          "Filter summary still exist, expected to not be visible"
        );
      } else {
        assert.ok("Filter summary is not visible, everything is okay!!");
      }
    });
  }

  // Function to capture and return all visible brand names
  captureBrandNames() {
    return this.getDevicesCount().then(($brandNames) => {
      // Convert jQuery elements to an array of trimmed text
      return [...$brandNames].map((el) => el.innerText.trim());
    });
  }

  verifySortAscFunctionality(device) {
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
    // Click devices link
    this.getDevicesLink().should("be.visible").click({ force: true });

    this.getSortDropdown()
      .should("be.visible")
      .select("brands_ASC", { force: true });

    cy.wait(3000);

    // Capture all the brand names after sorting
    this.captureBrandNames().then((brandNames) => {
      // Manually sort the brand names A-Z
      const sortedBrandNames = [...brandNames].sort((a, b) =>
        a.localeCompare(b)
      );

      // Assert the captured names are sorted correctly (A-Z)
      expect(brandNames).to.deep.equal(sortedBrandNames);

      cy.log("Original sorted brands: " + sortedBrandNames);
      cy.log("Expected sorted brands: " + brandNames);
    });
  }

  verifySortDscFunctionality(device) {
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
    // Click devices link
    this.getDevicesLink().should("be.visible").click({ force: true });

    this.getSortDropdown()
      .should("be.visible")
      .select("brands_DESC", { force: true });

    cy.wait(3000);

    // Capture all the brand names after sorting
    this.captureBrandNames().then((brandNames) => {
      // Manually sort the brand names Z-A
      const sortedBrandNames = [...brandNames].sort((a, b) =>
        b.localeCompare(a)
      );
      // Assert the captured names are sorted correctly (Z-A)
      expect(brandNames).to.deep.equal(sortedBrandNames);

      cy.log("Original sorted brands: " + sortedBrandNames);
      cy.log("Expected sorted brands: " + brandNames);
    });
  }
}

export default new DevicePage();
