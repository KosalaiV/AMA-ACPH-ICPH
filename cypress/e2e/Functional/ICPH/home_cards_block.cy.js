/*
About Page TS_30: About Us Page:-

TC_63: Verify the page holds necessary content in it
TC_64: Verify the container has contact CTA linked to it is accessible
*/

import homePage from "../../../pageobject/HomePage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Cards Block About Us Page", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify the page holds necessary content in it on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      homePage.verifyNecessaryContent(device);
    });
  });
});
