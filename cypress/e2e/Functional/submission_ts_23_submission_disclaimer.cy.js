/*
Submission Page TS_23: Submission Disclaimer:-

TC_54: Verify disclaimer paragraph is visible 
*/

import submissionPage from "../../pageobject/SubmissionPage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Submission Page TS 23 Submission Disclaimer", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify disclaimer paragraph is visible on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      submissionPage.verifySubmissionDisclaimer(device);
    });
  });
});
