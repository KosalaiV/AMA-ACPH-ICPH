import conferencePage from "../../../pageobject/ConferencePage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Agenda At A Glance - Tabbed Interface and Accordion Validation", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Should validate tab background color and accordions inside on ${device}`, () => {
      cy.viewport(viewport);
      cy.wait(9000);
      conferencePage.verifyTabbedAccordion(
        "/conference-on-physician-health-information/american-conference-on-physician-health-2025",
        "rgb(193, 216, 47)"
      );
    });
  });
});
