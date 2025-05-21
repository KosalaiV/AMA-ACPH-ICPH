/*
Terms and Conditions Page TS_27: Hero Banner:-

TC_60: Verify the container has title, image, field content 
*/

import termsConditionPage from "../../pageobject/TermsConditionPage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Terms and Conditions Page TS 27 Hero Banner", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify hero banner holds necessary content in it on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      termsConditionPage.verifyHeroBanner(device);
    });
  });
});
