/*
Home Page TS_1: Home Page:-

TC_1: Verify header navigation links redirects to the right page and check the background for active tab
TC_3: Verify hamburger icon functions as expected and check for navigation links redirections
*/

import homePage from "../../../pageobject/HomePage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Home Page TS 1 Home Page", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify header navigation links redirect to the right page and check the background for active tab on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      homePage.verifyHeaderJumplinkRedirections(device);
    });
  });
});
