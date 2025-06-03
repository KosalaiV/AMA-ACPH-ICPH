import homePage from "../../../pageobject/HomePage";

const pagesToTest = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-icph" },
  {
    name: "Registration",
    path: "/conference-on-physician-health-information/registration-options-and-inclusions",
  },
  {
    name: "Conference Overview",
    path: "/conference-on-physician-health-information",
  },
  { name: "FAQ", path: "/faq" },
  { name: "Contact Us", path: "/contact-us" },
  { name: "Abstracts", path: "/abstracts" },
  {
    name: "Travel Details",
    path: "/conference-on-physician-health-information/travel-details",
  },
  {
    name: "2025 Conference Info",
    path: "/conference-on-physician-health-information/american-conference-on-physician-health-2025",
  },
  {
    name: "Conference Materials",
    path: "/conference-on-physician-health-information/conference-materials",
  },
  {
    name: "CME Information",
    path: "/conference-on-physician-health-information/cme",
  },
  {
    name: "Speakers",
    path: "/conference-on-physician-health-information/conference-speakers",
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
      homePage.validateResponseCodes();
    });
  });
});
