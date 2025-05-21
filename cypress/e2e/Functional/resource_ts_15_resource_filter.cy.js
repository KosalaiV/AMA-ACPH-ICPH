/*
Resources Page TS_15: Resource Filters and Sort:-

TC:37: Verify the filters functionality shows expected result
TC:38: Verify the toggle for filters works as expected
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
    it(`Verify the filters functionality and toggle on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      resourcePage.verifyFilterFunctionality(device);
    });
  });
});
