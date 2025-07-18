import conferencePage from "../../../pageobject/ConferencePage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Travel Details - Tabbed Interface and Content Validation", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Should validate active tab background color and relevant content on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      cy.wait(9000);
      conferencePage.verifyTabsContent(
        "/conference-on-physician-health-information/travel-details",
        "rgb(193, 216, 47)"
      );
    });
  });
});
