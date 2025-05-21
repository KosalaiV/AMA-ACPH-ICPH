/*
Devices Page TS_12: You Might Also Like:-

TC_26: Verify if details page you might also like section holds necessary content in it
TC_27: Validate the section shows related devices with same or different category with relevant brand
*/

import devicePage from "../../pageobject/DevicePage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Devices Page TS 12 You Might Also Like", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify if details page you might also like section holds necessary content in it on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      devicePage.verifyDeviceYouMightAlsoLike(device);
    });

    it(`Validate the section shows related devices with same or different category with relevant brand on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      devicePage.verifyDeviceYouMightAlsoLikeDeviceCategory(device);
    });
  });
});
