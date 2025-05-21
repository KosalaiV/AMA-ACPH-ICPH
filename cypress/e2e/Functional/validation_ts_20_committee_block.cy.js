/*
Validation Page TS_20: Committee Experts Block:-

TC_46: Verify the each experts block has title, image, field content 
TC_47: Ensure the current and former members button is enabled and check the highlighted background color
*/

import validationPage from "../../pageobject/ValidationPage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Validation Page TS 20 Committee Experts Block", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify committee experts block holds necessary content in it and check buttons on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      validationPage.verifyCommitteeExpertBlock(device);
    });
  });
});
