import homePage from "../../../pageobject/HomePage";

const pagesToTest = [
  {
    name: "Conference Materials",
    path: "/conference-on-physician-health-information/conference-materials",
  },
  {
    name: "CME Information",
    path: "/conference-on-physician-health-information/cme",
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
