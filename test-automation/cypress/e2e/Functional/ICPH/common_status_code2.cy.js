import homePage from "../../../pageobject/HomePage";

const pagesToTest = [
  {
    name: "Registration",
    path: "/conference-on-physician-health-information/registration-options-and-inclusions",
  },
  {
    name: "Conference Overview",
    path: "/conference-on-physician-health-information",
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
