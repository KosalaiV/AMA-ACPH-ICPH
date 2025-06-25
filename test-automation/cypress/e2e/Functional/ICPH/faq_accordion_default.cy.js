import faqPage from "../../../pageobject/FAQPage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("FAQ - Accordion Default State", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Ensure the default position of accordions is collapsed on ${device}`, () => {
      // Set the viewport for each test case
      cy.viewport(viewport);
      cy.wait(9000);
      faqPage.verifyDefaultAccordionPosition(device);
    });
  });
});
