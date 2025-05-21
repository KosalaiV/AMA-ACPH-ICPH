/*
Devices Page TS_13: Device Filters and Sort:-

TC:28: Verify the search functionality shows expected result
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
    it(`Verify the search functionality shows expected result on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      devicePage.verifySearchFunctionality(device);
    });
  });
});
