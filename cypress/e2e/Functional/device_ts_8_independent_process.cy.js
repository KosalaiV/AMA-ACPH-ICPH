/*
Devices Page TS_8: Independent Review Process:-

TC_19: Verify the container has title, image, field content and two CTA linked to it is accessible
*/

import devicePage from "../../pageobject/DevicePage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Devices Page TS 8 Independent Review Process", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify independent review process block holds necessary content in it on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      devicePage.verifyIndependentReviewProcess(device);
    });
  });
});
