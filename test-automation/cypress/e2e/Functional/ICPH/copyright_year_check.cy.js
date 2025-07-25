import homePage from "../../../pageobject/HomePage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Home - Copyright Validation", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify the copyright is visible and check the current year on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      cy.wait(9000);
      homePage.validateCopyright();
    });
  });
});
