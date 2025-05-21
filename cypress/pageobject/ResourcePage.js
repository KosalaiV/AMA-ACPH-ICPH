class ResourcePage {
  // Locators

  //TS_14: Hero Banner
  getAllowButton() {
    return cy.get(".allowAll");
  }

  getHamburgerIconButton() {
    return cy.get("#block-vdl-headerlogos button#mobile-menu");
  }

  //TS_16: Resources Page
  getResourcesLink() {
    return cy.get("header li>a[href='/resources']");
  }

  getResourcesHeroSection() {
    return cy.get(".hero-section");
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

  getBreadcrumbs() {
    return cy.get("#block-vdl-breadcrumbs");
  }

  //TS_15: Resource Filters and Sort
  getResourcesFound() {
    return cy.get(".resources-listing__header--result");
  }

  getResourcesCount() {
    return cy.get(".resources-listing .views-field-title");
  }

  getResourcesCountTypes() {
    return cy.get(".resources-listing .views-field-field-resource-topics");
  }

  getResourcesListingContainer() {
    return cy.get(".resources-listing .views-view-responsive-grid__item");
  }

  getViewMore() {
    return cy.get(".pager__item>a");
  }

  getSearchInput() {
    return cy.get("input[id*='edit-search']");
  }

  getResourceListingSidebar() {
    return cy.get(".resources-listing--sidebar");
  }

  getResourceListingHeader() {
    return cy.get(".resources-listing header");
  }

  getNoResultsDetails() {
    return cy.get(".no-results--details");
  }

  getSidebarToggle() {
    return cy.get("#sidebar-toggle");
  }

  getSidebarToggleClose() {
    return cy.get("#sidebar-close");
  }

  getFilterResourceNotCheckedCheckbox() {
    return cy.get(
      "[data-drupal-facet-id='resource_topics_grid'] > li.facets-reset + .facet-item input[type='checkbox']:not(:checked)"
    );
  }

  getFilterResourceCheckedCheckbox() {
    return cy.get(
      "[data-drupal-facet-id='resource_topics_grid'] > li.facets-reset + .facet-item input[type='checkbox']:checked"
    );
  }

  getFilterResourceCheckedCheckboxLabel() {
    return cy.get(
      "[data-drupal-facet-id='resource_topics_grid'] > li.facets-reset + .facet-item input[type='checkbox']:checked +label>.facet-item__value"
    );
  }

  getFilterSummaryItem() {
    return cy.get(".facet-summary-item--facet>a>span.facet-item__value");
  }

  getSortDropdown() {
    return cy.get("select[id*='edit-sort-bef-combine']");
  }

  // Actions

  //TS_14: Hero Banner
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

    // Click resources link
    this.getResourcesLink().should("be.visible").click({ force: true });

    // Ensure the resources hero section is visible
    this.getResourcesHeroSection().should("be.visible");

    // Validate the title
    this.getResourcesHeroSection()
      .find(".hero-section__info--title")
      .should("be.visible")
      .and("not.be.empty");

    // Validate the body content
    this.getResourcesHeroSection()
      .find("p")
      .should("be.visible")
      .and("not.be.empty");

    // Validate image is present
    this.getResourcesHeroSection().find("img").should("exist");
  }

  //TS_15: Resource Filters and Sort
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
    // Click resources link
    this.getResourcesLink().should("be.visible").click({ force: true });

    this.getResourcesFound()
      .invoke("text")
      .then((text) => {
        // Use regex to extract the number from the text
        const totalResources = text.match(/\d+/)[0];
        cy.log("Number of resources found: " + totalResources);
        // You can now use the number for further assertions or logic

        const resourcesPerLoad = 24; // Resources loaded per click of the Load More button
        let loadedResources = 0; // Counter for loaded resources

        // Calculate how many times "Load More" needs to be clicked
        const remainderReseouces = totalResources % resourcesPerLoad;

        if (totalResources > 24) {
          assert.ok("More than 24 resources found, view more is applicable");

          const loadMoreUntilAllLoaded = () => {
            // Check how many resources are loaded and compare with the expected total
            this.getResourcesCount().then((resources) => {
              loadedResources = resources.length;

              cy.log(`Loaded Resources: ${loadedResources}`);

              // If there are more resources to load
              if (loadedResources < totalResources) {
                // If not the last load, assert that 24 resources are loaded after each click
                if (totalResources - loadedResources > resourcesPerLoad) {
                  // Wait for the "Load More" button to appear and click it
                  this.getViewMore()
                    .should("be.visible")
                    .click({ force: true });

                  // Wait for resources to load (adjust wait time as per actual load speed)
                  cy.wait(1000);

                  // Assert that resources have increased by 24
                  this.getResourcesCount().should(
                    "have.length",
                    loadedResources + resourcesPerLoad
                  );
                } else {
                  // If it's the last load, assert the remaining number of resources is loaded
                  this.getViewMore()
                    .should("be.visible")
                    .click({ force: true });

                  cy.wait(1000); 

                  // Assert that the total number of resources matches the expected total
                  this.getResourcesCount().should(
                    "have.length",
                    totalResources
                  );
                }

                // Recursively call the function to load more resources
                loadMoreUntilAllLoaded();
              }
            });
          };

          // Start loading resources until all resources are loaded
          loadMoreUntilAllLoaded();

          cy.log("Remaining Resources: " + remainderReseouces);

          // Final assertion: Check if the correct total number of resources is loaded
          this.getResourcesCount().should("have.length", totalResources);
        } else {
          assert.ok(
            "Only 24 or less than 24 resources found, view more is not applicable"
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
    // Click resources link
    this.getResourcesLink().should("be.visible").click({ force: true });

    this.getResourcesCount()
      .first()
      .should("be.visible")
      .invoke("text")
      .then((resource) => {
        // Trim spaces around the extracted resource name
        const extractedResource = resource.trim();

        cy.log("Extracted and trimmed resource: " + extractedResource);

        cy.wait(1000);

        // Use the trimmed text to input in a search field
        this.getSearchInput()
          .should("be.visible")
          .type(extractedResource + "{enter}");

        cy.wait(5000);

        this.getResourcesCount()
          .should("be.visible")
          .each((resources) => {
            cy.wrap(resources).should("have.text", extractedResource);
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
    // Click resources link
    this.getResourcesLink().should("be.visible").click({ force: true });

    if (device !== "macbook-16") {
      this.getSidebarToggle().should("be.visible").click({ force: true });
      this.getFilterResourceNotCheckedCheckbox()
        .should("exist")
        .check({ force: true });
      cy.wait(1000);
      this.getFilterResourceCheckedCheckbox().should("exist");
    } else {
      // Ensure the resource listing sidebar is visible
      this.getResourceListingSidebar().should("be.visible");

      this.getFilterResourceNotCheckedCheckbox()
        .should("exist")
        .check({ force: true });
      cy.wait(1000);
      this.getFilterResourceCheckedCheckbox().should("exist");
    }

    this.getFilterResourceCheckedCheckboxLabel()
      .should("be.visible")
      .invoke("text")
      .then((resources) => {
        // Trim spaces around the extracted resource name
        const extractedResource = resources.trim();

        cy.log("Extracted filtered resource: " + extractedResource);

        if (device !== "macbook-16") {
          this.getSidebarToggleClose()
            .should("be.visible")
            .click({ force: true });
        } else {
          cy.log("It is a desktop view");
        }

        this.getFilterSummaryItem()
          .should("be.visible")
          .should("have.text", extractedResource);

        this.getResourcesCountTypes()
          .should("be.visible")
          .each((resources) => {
            cy.wrap(resources)
              .contains(extractedResource, { matchCase: false })
              .should("be.visible");
          });
      });

    this.getFilterSummaryItem().should("be.visible").click({ force: true });
    cy.wait(1000);

    if (device !== "macbook-16") {
      this.getSidebarToggle().should("be.visible").click({ force: true });
      this.getFilterResourceNotCheckedCheckbox().should("exist");
      this.getSidebarToggleClose().should("be.visible").click({ force: true });
    } else {
      // Ensure the resource listing sidebar is visible
      this.getResourceListingSidebar().should("be.visible");
      this.getFilterResourceNotCheckedCheckbox().should("exist");
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

  // Function to capture and return all visible resources names
  captureResourcesNames() {
    return this.getResourcesCount().then(($resourceNames) => {
      // Convert jQuery elements to an array of trimmed text
      return [...$resourceNames].map((el) => el.innerText.trim());
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

    // Click resources link
    this.getResourcesLink().should("be.visible").click({ force: true });

    // Select sort by title ASC
    this.getSortDropdown().should("be.visible").select("title_ASC");

    cy.wait(3000);

    // Capture all the resource names after sorting
    this.captureResourcesNames().then((resourcesNames) => {
      // Log the captured resource names (as they appear after sorting by the website)
      cy.log("Captured resource names: " + resourcesNames);

      // Manually sort the resource names
      const sortedResourcesNames = [...resourcesNames].sort((a, b) => {
        // Normalize the strings: remove unnecessary punctuation
        const cleanA = a.replace(/:/g, "").trim();
        const cleanB = b.replace(/:/g, "").trim();

        // Split by spaces and hyphens and handle numeric sorting
        const aParts = cleanA.split(/[\s-]+/);
        const bParts = cleanB.split(/[\s-]+/);

        // Function to compare parts numerically or as strings
        const compareParts = (partA, partB) => {
          const isNumA = !isNaN(partA);
          const isNumB = !isNaN(partB);

          if (isNumA && isNumB) {
            return Number(partA) - Number(partB); // Compare as numbers
          }
          return partA.localeCompare(partB, undefined, { sensitivity: "base" }); // Compare as strings
        };

        // Compare each part sequentially
        for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
          const partA = aParts[i] || "";
          const partB = bParts[i] || "";
          const result = compareParts(partA, partB);

          if (result !== 0) {
            return result;
          }
        }
        return 0; // They are equal
      });

      // Log the sorted resources names (manually sorted by Cypress)
      cy.log("Manually sorted resources (A-Z) : " + sortedResourcesNames);

      // Assert that the resources are sorted as expected (A-Z)
      expect(resourcesNames).to.deep.equal(sortedResourcesNames);
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
    // Click resources link
    this.getResourcesLink().should("be.visible").click({ force: true });

    this.getSortDropdown().should("be.visible").select("title_DESC");

    cy.wait(3000);

    this.captureResourcesNames().then((resourcesNames) => {
      // Log the captured resource names (as they appear after sorting by the website)
      cy.log("Captured resource names: " + resourcesNames);

      // Manually sort the resource names in Z-A order
      const sortedResourcesNames = [...resourcesNames].sort((a, b) => {
        // Normalize the strings: remove unnecessary punctuation
        const cleanA = a.replace(/:/g, "").trim();
        const cleanB = b.replace(/:/g, "").trim();

        // Split by spaces and hyphens
        const aParts = cleanA.split(/[\s-]+/);
        const bParts = cleanB.split(/[\s-]+/);

        // Function to compare parts numerically or as strings in reverse order
        const compareParts = (partA, partB) => {
          const isNumA = !isNaN(partA);
          const isNumB = !isNaN(partB);

          if (isNumA && isNumB) {
            return Number(partB) - Number(partA); // Compare as numbers in reverse
          }
          return partB.localeCompare(partA, undefined, { sensitivity: "base" }); // Compare as strings in reverse
        };

        // Compare each part sequentially
        for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
          const partA = aParts[i] || "";
          const partB = bParts[i] || "";
          const result = compareParts(partA, partB);

          if (result !== 0) {
            return result;
          }
        }
        return 0; // They are equal
      });

      // Log the manually sorted resources names
      cy.log("Manually sorted resources (Z-A): " + sortedResourcesNames);

      // Assert that the captured names match the manually sorted names
      expect(resourcesNames).to.deep.equal(sortedResourcesNames);
    });
  }

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

    // Click resources link
    this.getResourcesLink().should("be.visible").click({ force: true });

    // Ensure the resources listing container is visible
    this.getResourcesListingContainer().should("be.visible");

    // Ensure the resources listing header is visible
    this.getResourceListingHeader().should("be.visible");

    // Ensure the resources listing hero section is visible
    this.getResourcesHeroSection().should("be.visible");

    if (device !== "macbook-16") {
      this.getSidebarToggle().should("be.visible").click({ force: true });
      this.getResourceListingSidebar().should("be.visible");
      this.getSidebarToggleClose().should("be.visible").click({ force: true });
    } else {
      // Ensure the resources listing sidebar is visible
      this.getResourceListingSidebar().should("be.visible");
    }

    // Ensure the search box is visible and type invalid input
    this.getSearchInput().should("be.visible").type("@#$#${enter}");

    // Ensure the resources listing hero section is visible
    this.getResourcesHeroSection().should("be.visible");

    // Ensure the resources listing details is visible
    this.getNoResultsDetails().should("be.visible");

    // Ensure the resources listing resources found is visible and shows 0 results
    this.getResourcesFound().should("be.visible").should("contain.text", "0");

    // Ensure the device listing heading is visible with relevant content
    this.getNoResultsDetails()
      .find(".no-results__title")
      .contains("No resources found", { matchCase: false })
      .should("be.visible");

    // Ensure the device listing paragraph is visible
    this.getNoResultsDetails().find("p").should("be.visible");

    // Validate image is present
    this.getNoResultsDetails().find("img").should("exist");

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

  //TS_16: Resources Page
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
    // Click resources link
    this.getResourcesLink().should("be.visible").click({ force: true });

    //Ensure footer copyright is visible
    this.getFooterCopyright().scrollIntoView().should("be.visible");

    //Ensure footer disclaimer is visible
    this.getFooterDisclaimer().should("be.visible");

    //Ensure footer devices link is visible
    this.getFooterDevicesLink().should("be.visible");

    //Ensure footer about link is visible
    this.getFooterAboutLink().should("be.visible");

    //Ensure breadcrumbs is visible
    this.getBreadcrumbs().scrollIntoView().should("be.visible");

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

export default new ResourcePage();
