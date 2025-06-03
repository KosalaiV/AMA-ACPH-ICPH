import homePage from "../../../pageobject/HomePage";

const viewports = [
  { device: "macbook-16", viewport: "macbook-16", expectedCardsPerRow: 4 }, // Desktop
  { device: "samsung-s10", viewport: "samsung-s10", expectedCardsPerRow: 1 }, // Mobile
  { device: "iphone-xr", viewport: "iphone-xr", expectedCardsPerRow: 1 }, // Mobile
  { device: "ipad-mini", viewport: "ipad-mini", expectedCardsPerRow: 2 }, // Tablet
];

describe("Home - Verification of Cards Block Row Count Across Devices", () => {
  viewports.forEach(({ device, viewport, expectedCardsPerRow }) => {
    it(`Should display ${expectedCardsPerRow} card(s) per row on ${device}`, () => {
      cy.viewport(viewport);
      // Visit home page
      homePage.verifyCardsRowCount(device, expectedCardsPerRow);
    });
  });
});
