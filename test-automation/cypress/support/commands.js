import "cypress-real-events";

const username = Cypress.env("username");
const password = Cypress.env("password");

// Helper to determine if basic auth is needed
const shouldUseAuth = () => Cypress.env("environment");

Cypress.Commands.add("visitWithAuth", (url) => {
  const authOptions = {
    failOnStatusCode: false, // ✅ Always include this
  };

  if (shouldUseAuth()) {
    authOptions.auth = {
      username,
      password,
    };
  }

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
