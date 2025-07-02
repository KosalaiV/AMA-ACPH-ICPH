import "cypress-real-events";

const username = Cypress.env("username");
const password = Cypress.env("password");

// Helper to determine if basic auth is needed
const shouldUseAuth = () => Cypress.env("environment");

Cypress.Commands.add("visitWithAuth", (url) => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  function shouldUseAuth() {
    return !!username && !!password;
  }

  const authOptions = {};

  if (shouldUseAuth()) {
    authOptions.auth = {
      username,
      password,
    };
  }

  cy.visit(url, authOptions);
});

Cypress.Commands.add("requestWithAuth", (url) => {
  const requestOptions = {
    method: "GET",
    url,
    ...(shouldUseAuth() && {
      auth: {
        username,
        password,
      },
    }),
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/119.0.0.0 Safari/537.36',
    },
    failOnStatusCode: false, 
  };

  return cy.request(requestOptions);
});
Cypress.Commands.add('resetBrowser', () => {
  cy.wrap(
    Cypress.automation('remote:debugger:protocol', {
      command: 'Network.clearBrowserCache',
    })
  );
  cy.clearCookies();
});
