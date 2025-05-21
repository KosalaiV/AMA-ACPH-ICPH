/*
Devices Page TS_6: No Result Page for Device Listing:-

TC_17: Verify no results page holds necessary content in it
*/

import devicePage from "../../pageobject/DevicePage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Devices Page TS 6 No Result Page", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify no results page holds necessary content in it on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      devicePage.verifyNoResultsPage(device);
    });
  });
});
