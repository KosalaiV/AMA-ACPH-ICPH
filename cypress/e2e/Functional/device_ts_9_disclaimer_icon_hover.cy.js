/*
Devices Page TS_9: Disclaimer Icon and Hover:-

TC_20: Verify if disclaimer icon present on device hover action should show disclaimer text
*/

import devicePage from "../../pageobject/DevicePage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Devices Page TS 9 Disclaimer Icon and Hover", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify if disclaimer icon present on device hover action should show disclaimer text on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      devicePage.verifyDisclaimerIcon(device);
    });
  });
});
