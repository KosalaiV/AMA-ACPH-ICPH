/*
Home Page TS_1: Home Page:-

TC_4: Check the status codes of all anchor tags (API call)
*/

import homePage from "../../../pageobject/HomePage";

describe("Home - Navigation Hover Styles", () => {
  it("Should apply correct background and text color on hover for each nav item", () => {
    homePage.verifyHoverStyles("rgb(70, 22, 107)", "rgb(255, 255, 255)");
  });
});
