/*
Terms and Conditions Page TS_25: Terms and Conditions Page:-

TC_56: Verify the page holds necessary content in it
*/

import termsConditionPage from "../../pageobject/TermsConditionPage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Terms and Conditions Page TS 27 Terms and Conditions Page", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify the page holds necessary content in it on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      termsConditionPage.verifyNecessaryContent(device);
    });
  });
});
