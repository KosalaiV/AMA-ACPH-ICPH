/*
Home Page TS_4: Submit a Device:-

TC_12: Verify the container has title, image, field content and CTA linked to it is accessible
TC_13: Ensure only one image is visible for mobile view
*/

import homePage from "../../pageobject/HomePage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Home Page TS 4 Submit a Device", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify submit a device container has relevant content in it on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      homePage.verifySubmitADeviceContainer(device);
    });
  });
});
