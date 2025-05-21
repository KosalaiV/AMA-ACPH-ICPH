const viewports = [
  { device: "macbook-16", viewport: "macbook-16", expectedCardsPerRow: 4 }, // Desktop
  { device: "samsung-s10", viewport: "samsung-s10", expectedCardsPerRow: 1 }, // Mobile
  { device: "iphone-xr", viewport: "iphone-xr", expectedCardsPerRow: 1 }, // Mobile
  { device: "ipad-mini", viewport: "ipad-mini", expectedCardsPerRow: 2 }, // Tablet
];

describe("Verification of Contact Page TS 32 FAQ Block", () => {
  viewports.forEach(({ device, viewport, expectedCardsPerRow }) => {
    it(`should display ${expectedCardsPerRow} card(s) per row on ${device}`, () => {
      cy.viewport(viewport);
    // Visit home page
    cy.visitWithAuth("/about-icph");


      cy.get('.cards>li').should('exist').then($cards => {
        const firstRowTop = $cards[0].getBoundingClientRect().top;

        const cardsInRow = [...$cards].filter(card => {
          return card.getBoundingClientRect().top === firstRowTop;
        });

        cy.log(`Device: ${device} — Cards in first row: ${cardsInRow.length}`);
        expect(cardsInRow.length).to.eq(expectedCardsPerRow);
      });
    });
  });
});
