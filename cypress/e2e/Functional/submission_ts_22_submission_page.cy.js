/*
Submission Page TS_22: Submission Page:-

TC_51: Verify the page holds necessary content in it
TC_53: Verify the container has contact CTA linked to it is accessible
*/

import submissionPage from "../../pageobject/SubmissionPage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Submission Page TS 22 Submission Page", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify the page holds necessary content in it on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      submissionPage.verifyNecessaryContent(device);
    });
  });
});
