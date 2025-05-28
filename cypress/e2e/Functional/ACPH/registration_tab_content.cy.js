import conferencePage from "../../../pageobject/ConferencePage";

describe("Registration - Tabbed Interface and Content Validation", () => {
  it("Should validate active tab background color and relevant content", () => {
    conferencePage.verifyTabsContent("/conference-on-physician-health-information/registration-options-and-inclusions","rgb(193, 216, 47)");
  });
});
