/*
Contact Page TS_31: Contact Us Form:-

TC_66: Verify on empty submission alert is triggered
*/

import contactPage from "../../pageobject/ContactPage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Contact Page TS 31 Contact Us Form", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify on empty submission alert is triggered on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      contactPage.verifyContactFormEmptySubmission(device);
    });
  });
});
