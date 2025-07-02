import homePage from "../../../pageobject/HomePage";

const pagesToTest = [
  {
    name: "Speakers",
    path: "/conference-speakers",
  },
  {
    name: "Exhibitors & Sponsors",
    path: "/conference-on-physician-health-information/exhibitors-and-sponsors",
  },
  {
    name: "Past Conference Resources",
    path: "/conference-on-physician-health-information/past-conference-resources",
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
