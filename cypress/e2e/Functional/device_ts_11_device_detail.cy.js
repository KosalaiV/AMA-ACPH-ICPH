/*
Devices Page TS_11: Device Detail:-

TC_24: Verify if details page holds necessary content in it
TC_25: Verify if details page add to favorites works as expected
*/

import devicePage from "../../pageobject/DevicePage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Verification of Devices Page TS 11 Device Detail", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Verify if details page holds necessary content in it on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      devicePage.verifyDeviceDetail(device);
    });

    it(`Verify if details page add to favorites works as expected on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      devicePage.verifyDeviceDetailAddToFavorite(device);
    });
  });
});
