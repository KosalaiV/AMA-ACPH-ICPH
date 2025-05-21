/*
Home Page TS_3: Devices that Deliver Category:-

TC_7: Verify slick navigation arrow functions as expected 
TC_8: Ensure four categories of device should shown upfront (Desktop)
TC_9: Ensure one category of device should shown upfront (Mobile)
TC_10: Ensure two category of device should shown upfront (Ipad)
TC_11: Verify each slider has title, image, field content and CTA linked to it is accessible
*/

import homePage from "../../pageobject/HomePage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16", expectedCategories: 4 }, // Desktop (MacBook 16) - 4 categories
  { device: "samsung-s10", viewport: "samsung-s10", expectedCategories: 1 }, // Mobile (Samsung S10) - 1 category
  { device: "iphone-xr", viewport: "iphone-xr", expectedCategories: 1 }, // Mobile (iPhone XR) - 1 category
  { device: "ipad-mini", viewport: "ipad-mini", expectedCategories: 2 }, // Tablet (iPad Mini) - 2 categories
];

describe("Verification of Home Page TS 3 Devices that Deliver Category", () => {
  viewports.forEach(({ device, viewport, expectedCategories }) => {
    it(`Verify device that deliver container has relevant content and works as expected on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);

      // Visit the home page and validate device deliver content
      homePage.verifyDeviceDeliver();

      // Validate the number of categories shown upfront
      homePage
        .getDeviceDeliverSliderCards()
        .should("have.length", expectedCategories);
    });
  });
});
