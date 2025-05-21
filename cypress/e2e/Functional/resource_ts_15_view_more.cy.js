/*
Resources Page TS_15: Resource Filters and Sort:-

TC:36: Verify load more option and ensure to shows 24 resources by default
*/

import resourcePage from "../../pageobject/ResourcePage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Resources Page TS 15 Resource Filters and Sort", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify load more option and ensure to shows 24 resources by default on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      resourcePage.verifyLoadMoreFunctionality(device);
    });
  });
});
