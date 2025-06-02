import exhibitorsSponsorsPage from "../../../pageobject/ExhibitorsSponsorsPage";

// Viewports to test with
const viewports = [
  { device: "macbook-16", viewport: "macbook-16" }, // Desktop (MacBook 16)
  { device: "samsung-s10", viewport: "samsung-s10" }, // Mobile (Samsung S10)
  { device: "iphone-xr", viewport: "iphone-xr" }, // Mobile (iPhone XR)
  { device: "ipad-mini", viewport: "ipad-mini" }, // Tablet (iPad Mini)
];

describe("Exhibitors & Sponsors - Read More and Read Less Functionality", () => {
  viewports.forEach(({ device, viewport }) => {
    it(`Ensure the read more and read less works as expected in ${device}`, () => {
        // Set the viewport for each test case
      cy.viewport(viewport);
      exhibitorsSponsorsPage.verifyReadMoreFunction("/exhibitors-listing-page", device);
  });
});
});