/*
Resources Page TS_16: Resources Page:-

TC_42: Verify the page has necessary content in it
*/

import resourcePage from "../../pageobject/ResourcePage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Resources Page TS 16 Resources Page", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify the page has necessary content in it on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      resourcePage.verifyNecessaryContent(device);
    });
  });
});
