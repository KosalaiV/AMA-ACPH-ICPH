import homePage from "../../../pageobject/HomePage";

const pagesToTest = [
  {
    name: "Travel Details",
    path: "/conference-on-physician-health-information/travel-details",
  },
  {
    name: "Agenda at a Glance",
    path: "/conference-on-physician-health-information/american-conference-on-physician-health-2025",
  },
];

describe("All Page - Anchor Tag Response Validation", () => {
  pagesToTest.forEach(({ name, path }) => {
    it(`Should verify all anchor tags on "${name}" 
      page return successful status codes`, () => {
      cy.visitWithAuth(path);
      cy.wait(5000);
      homePage.validateResponseCodes();
    });
  });
});
