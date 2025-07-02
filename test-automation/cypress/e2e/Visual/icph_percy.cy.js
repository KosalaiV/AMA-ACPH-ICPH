// Importing the fixture containing URLs
import pageUrls from "../../fixtures/icph_pages.json";

describe("Visual Testing with Percy", () => {
  // Loop through the JSON object, creating a test for each page
  Object.keys(pageUrls).forEach((key) => {
    const url = pageUrls[key].url;

    it(`Visits ${key} page and takes Percy snapshot`, () => {
      // Sending a request to ensure the URL is reachable
      cy.requestWithAuth(url).then(() => {
        // Assert that the document is visible
        cy.document().should("have.property", "visibilityState", "visible");
      });

      // Set a custom window property before visiting
      cy.window().then((win) => (win.beforeReload = true));

      // Ensure the custom property exists before the page is visited
      cy.window().should("have.prop", "beforeReload", true);

      // Visit the page URL
      cy.visitWithAuth(url);

      cy.wait(2000);

      // Click close button if cookie is visible
      cy.document().then((doc) => {
        cy.wait(3000);
        const element = doc.querySelector(
          "#onetrust-close-btn-container>button"
        );
        if (element) {
          assert.ok("Cookie visible and clicked");
          cy.get("#onetrust-close-btn-container>button")
            .should("be.visible")
            .click({ force: true });
        } else {
          assert.ok("Cookie is not visible and already clicked");
        }
      });
      
      cy.wait(2000);

      // After page load, ensure the custom property has been removed
      cy.window().should("not.have.prop", "beforeReload");

      // Scroll to the bottom and back to the top to trigger lazy loading
      cy.scrollTo("bottom", { ensureScrollable: false }).wait(2000);
      cy.scrollTo("top", { ensureScrollable: false }).wait(2000);

      // Take Percy snapshot with a descriptive name
      cy.percySnapshot(`${key} page`);
    });
  });
});
