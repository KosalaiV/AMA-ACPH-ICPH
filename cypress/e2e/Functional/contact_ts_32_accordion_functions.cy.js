/*
Contact Page TS_32: FAQ Block:-

TC_69: Verify accordions expand and collapse as expected and validate the inner content on expand
*/

import contactPage from "../../pageobject/ContactPage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Contact Page TS 32 FAQ Block", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify accordions expand and collapse as expected on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      contactPage.verifyAccordionFunctions(device);
    });
  });
});
