/*
Home Page TS_1: Home Page:-

TC_4: Check the status codes of all anchor tags (API call)
*/

import homePage from "../../../pageobject/HomePage";

describe("Verification of Home Page TS 1 Home Page", () => {
  it("Check the status codes of all anchor tags", () => {
    homePage.validateResponseCodes();
  });
});
