/*
Home Page TS_5: Validation Process:-

TC_14: Verify the container CTA redirects to the right page
TC_15: Ensure two cards should shown upfront on any devices
TC_16: Verify each cards has title, image, field content and CTA linked to it is accessible
*/

import homePage from "../../pageobject/HomePage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Home Page TS 5 Validation Process", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify validation process container has relevant content in it on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      homePage.verifyValidationProcessContainer();
    });
  });
});
