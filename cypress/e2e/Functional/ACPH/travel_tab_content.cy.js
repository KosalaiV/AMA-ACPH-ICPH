import conferencePage from "../../../pageobject/ConferencePage";

describe("Travel Details - Tabbed Interface and Content Validation", () => {
  it("Should validate active tab background color and relevant content", () => {
    conferencePage.verifyTabsContent("/conference-on-physician-health-information/travel-details","rgb(193, 216, 47)");
  });
});
