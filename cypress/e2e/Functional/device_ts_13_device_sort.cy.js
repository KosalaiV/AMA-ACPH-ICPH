/*
Devices Page TS_13: Device Filters and Sort:-

TC:32: Verify the sort by ascending dropdown functionality works as expected
TC:33: Verify the sort by descending dropdown functionality works as expected
*/

import devicePage from "../../pageobject/DevicePage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Devices Page TS 13 Device Filters and Sort", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify the sort by ascending dropdown functionality works as expected on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      devicePage.verifySortAscFunctionality(device);
    });

    it(`Verify the sort by descending dropdown functionality works as expected on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      devicePage.verifySortDscFunctionality(device);
    });
  });
});
