/*
Validation TS_21: VDL Block Title Links:-

TC_48: Verify on clicking vdl process link the scroll to title works as expected
*/

import validationPage from "../../pageobject/ValidationPage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Validation Page TS 21 VDL Block Title Links", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify on clicking vdl process link the scroll to title works as expected on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      validationPage.verifyVDLBlockTitle(
        device,
        validationPage.getVDLProcessLink,
        validationPage.getVDLProcess,"#block-vdl-vdlprocess"
      );
    });
  });
});
