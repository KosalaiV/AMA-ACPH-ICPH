/*
Terms and Conditions Page TS_26: Terms Title Links:-

TC_58: Verify on clicking privacy policy link the scroll to title works as expected
*/

import termsConditionPage from "../../pageobject/TermsConditionPage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Terms and Conditions Page TS 26 Terms Title Links", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify on clicking privacy policy link the scroll to title works as expected on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      termsConditionPage.verifyTermsBlockTitle(
        termsConditionPage.getPrivacyPolicyLink,
        termsConditionPage.getPrivacyPolicy,
        "#block-vdl-privacypolicy"
      );
    });
  });
});
