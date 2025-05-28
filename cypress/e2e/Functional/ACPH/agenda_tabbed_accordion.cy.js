import conferencePage from "../../../pageobject/ConferencePage";

describe("Agenda At A Glance - Tabbed Interface and Accordion Validation", () => {
  it("Should validate active tab background color and accordions inside", () => {
    conferencePage.verifyTabbedAccordion("rgb(193, 216, 47)");
  });
});
