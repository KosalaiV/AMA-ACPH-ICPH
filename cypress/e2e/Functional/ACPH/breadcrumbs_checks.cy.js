/*
Breadcrumb Page TS_28: Breadcrumbs:-

TC_61: Verify breadcrumb functions as expected
*/

import homePage from "../../../pageobject/HomePage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Breadcrumb Page TS 28 Breadcrumbs", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`TC_61: Verify breadcrumb functions as expected on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      homePage.validateBreadcrumbLinks(device);
    });
  });
});
