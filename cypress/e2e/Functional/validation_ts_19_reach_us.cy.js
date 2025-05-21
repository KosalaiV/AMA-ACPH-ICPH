/*
Validation Page TS_19: Independent Review Process Reach Us:-

TC_45: Verify the container has title, image, field content and two CTA linked to it is accessible
*/

import validationPage from "../../pageobject/ValidationPage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Validation Page TS 19 Independent Review Process Reach Us", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify reach us block holds necessary content in it on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      validationPage.verifyReachUs(device);
    });
  });
});
