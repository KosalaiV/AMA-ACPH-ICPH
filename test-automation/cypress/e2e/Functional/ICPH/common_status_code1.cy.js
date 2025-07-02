import homePage from "../../../pageobject/HomePage";

const pagesToTest = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-icph" },
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
