import "cypress-real-events";

const username = Cypress.env("username");
const password = Cypress.env("password");

// Helper function to check if the environment requires authentication
const shouldUseAuth = () => Cypress.env("environment") !== "prod";

// Custom command for visit with conditional authentication
Cypress.Commands.add("visitWithAuth", (url) => {
  const authOptions = shouldUseAuth()
    ? { auth: { username, password }, failOnStatusCode: false }
    : { failOnStatusCode: false };

  cy.visit(url, authOptions);
});


// Custom command for request with conditional authentication
Cypress.Commands.add("requestWithAuth", (url) => {
  const requestOptions = shouldUseAuth()
    ? {
        method: "GET",
        url: url,
        auth: {
          username,
          password,
        },
      }
    : {
        method: "GET",
        url: url,
      };

  cy.request(requestOptions);
});
