class ExhibitorsSponsorsPage {
  // Locators

  getAllowButton() {
    return cy.get(".allowAll");
  }

  getHamburgerIconButton() {
    return cy.get(".menu-toggle");
  }

  getSponserExhibitorBlocks() {
    return cy.get(".partner-block-wrapper");
  }

  getShowMoreButton() {
    return cy.get(".pager__item>.button");
  }

  getReadMoreButton() {
    return cy.get("button.read-more-btn");
  }
  // Actions

  verifyReadMoreFunction(endpoint, device) {
    const charLimit = device === "macbook-16" ? 400 : 250;

    cy.visitWithAuth(endpoint);

    cy.document().then((doc) => {
      const allBlocks = Array.from(
        doc.querySelectorAll(".block-body-text-wrapper")
      );

      allBlocks.forEach((block, index) => {
        const hasReadMore = block.querySelector(
          'button.read-more-btn[style="display: inline-block;"]'
        );

        cy.wrap(block).within(() => {
          cy.get(".ama-content-wrapper").as("contentWrapper");

          cy.get("@contentWrapper")
            .invoke("text")
            .then((collapsedTextRaw) => {
              const collapsedText = collapsedTextRaw.trim();
              const charCount = collapsedText.length;

              cy.log(
                `📄 Block ${
                  index + 1
                } collapsed content length: ${charCount} chars`
              );

              if (hasReadMore) {
                cy.log(`🔍 Block ${index + 1}: Has Read More button`);

                // Step 1: Verify collapsed text exceeds threshold
                expect(
                  charCount,
                  `Collapsed text should exceed ${charLimit} chars`
                ).to.be.greaterThan(charLimit);

                cy.get("button.read-more-btn").as("readMoreBtn");

                // Step 2: Validate the button text is "Read More" (case-insensitive)
                cy.get("@readMoreBtn")
                  .should("be.visible")
                  .contains("Read More", { matchCase: false });

                // Step 3: Click Read More
                cy.get("@readMoreBtn").scrollIntoView().click({ force: true });
                cy.wait(1000);

                // Step 4: Validate the button text has now changed to "Read Less"
                cy.get("@readMoreBtn")
                  .should("be.visible")
                  .contains("Read Less", { matchCase: false });

                // Step 5: Get expanded text and validate it
                cy.get("@contentWrapper")
                  .invoke("text")
                  .then((expandedTextRaw) => {
                    const expandedText = expandedTextRaw.trim();
                    const expandedCharCount = expandedText.length;

                    cy.log(
                      `📄 Block ${
                        index + 1
                      } expanded content length: ${expandedCharCount} chars`
                    );

                    expect(
                      expandedCharCount,
                      "Expanded text should be longer than collapsed"
                    ).to.be.greaterThan(charCount);

                    expect(
                      expandedText.startsWith(
                        collapsedText.replace(/\.\.\.$/, "")
                      ),
                      "Expanded content should begin with collapsed content"
                    ).to.be.true;

                    cy.log(`🔄 Clicking Read Less to collapse content`);

                    // Step 6: Click Read Less to collapse
                    cy.get("@readMoreBtn")
                      .scrollIntoView()
                      .click({ force: true });
                    cy.wait(1000);

                    // Step 7: Validate button text changed back to "Read More"
                    cy.get("@readMoreBtn")
                      .should("be.visible")
                      .contains("Read More", { matchCase: false });

                    // Step 8: Capture re-collapsed text and compare with original
                    cy.get("@contentWrapper")
                      .invoke("text")
                      .then((reCollapsedTextRaw) => {
                        const reCollapsedText = reCollapsedTextRaw.trim();
                        const reCollapsedCount = reCollapsedText.length;

                        cy.log(
                          `📄 Block ${
                            index + 1
                          } collapsed again to length: ${reCollapsedCount} chars`
                        );

                        expect(
                          reCollapsedCount,
                          "Text length after collapsing should match or be near original"
                        ).to.be.at.most(expandedCharCount);

                        expect(
                          reCollapsedText.startsWith(
                            collapsedText.substring(0, 50)
                          ),
                          "Collapsed content should revert to original start"
                        ).to.be.true;

                        cy.log(
                          `✅ Block ${
                            index + 1
                          } passed full Read More/Read Less validation.`
                        );
                      });
                  });
              } else {
                cy.log(`ℹ️ Block ${index + 1}: No Read More button`);

                expect(
                  charCount,
                  `Content should be strictly less than ${charLimit} chars when no Read More button is present`
                ).to.be.lessThan(charLimit);

                cy.log(
                  `✅ Block ${index + 1} correctly rendered without Read More.`
                );
              }
            });
        });
      });
    });
  }

  verifyShowMoreFunctionality(endpoint, device) {
    // Visit home page
    cy.visitWithAuth(endpoint);

    // If not on Desktop, open the hamburger menu
    if (device !== "macbook-16") {
      this.getHamburgerIconButton()
        .should("be.enabled")
        .should("be.visible")
        .click({ force: true });
      cy.wait(1000);
    }

    cy.document().then((doc) => {
      cy.wait(1000);
      const element = doc.querySelector(".partner-block-wrapper");
      if (element) {
        this.getSponserExhibitorBlocks().then(($initialNodes) => {
          const initialCount = $initialNodes.length;

          cy.log(`Initial node count: ${initialCount}`);

          // Check if "Show More" button is visible

          cy.document().then((doc) => {
            cy.wait(1000);
            const element = doc.querySelector(".pager__item>.button");
            if (element) {
              this.getShowMoreButton()
                .should("contain.text", "Show More")
                .should("be.visible")
                .click({ force: true });
              cy.wait(1000);

              // Wait for additional content to load (adjust timeout if needed)
              this.getSponserExhibitorBlocks()
                .should("have.length.greaterThan", initialCount)
                .then(($newNodes) => {
                  const newCount = $newNodes.length;
                  cy.log(
                    `New node count after clicking Show More: ${newCount}`
                  );
                });
            } else {
              assert.ok(
                "Show More button is not visible - node count might be 10 or less"
              );
            }
          });

          cy.then(() => {
            cy.document().then((doc) => {
              cy.wait(1000);
              const element = doc.querySelector(".pager__item>.button");
              if (element) {
                throw new Error(
                  "❌Show More button is still visible, expected not to exist after clicking it."
                );
              } else {
                assert.ok(
                  "Everything is okay, show more button is not visible after click!"
                );
              }
            });
          });
        });
      } else {
        assert.ok("No sponsors and exhibitors present, everything is okay!");
      }
    });
  }

  verifyShowMoreReadMoreCombinedFunctionality(endpoint, device) {
    // Visit home page
    cy.visitWithAuth(endpoint);

    // // Click allow button if visible
    // this.getAllowButton().should("be.visible").click({ force: true });
    cy.wait(1000);

    // If not on Desktop, open the hamburger menu
    if (device !== "macbook-16") {
      this.getHamburgerIconButton()
        .should("be.enabled")
        .should("be.visible")
        .click({ force: true });
      cy.wait(1000);
    }

    cy.document().then((doc) => {
      cy.wait(1000);
      const element = doc.querySelector(".partner-block-wrapper");
      if (element) {
        this.getSponserExhibitorBlocks().then(($initialNodes) => {
          const initialCount = $initialNodes.length;

          cy.log(`Initial node count: ${initialCount}`);

          // Check if "Show More" button is visible

          cy.document().then((doc) => {
            cy.wait(1000);
            const element = doc.querySelector(".pager__item>.button");
            if (element) {
              this.getShowMoreButton().scrollIntoView();
              this.getShowMoreButton()
                .should("contain.text", "Show More")
                .should("be.visible")
                .click({ force: true });
              cy.wait(1000);

              // Wait for additional content to load (adjust timeout if needed)
              cy.then(() => {
                cy.wait(2000);
                this.getSponserExhibitorBlocks()
                  .should("have.length.greaterThan", initialCount)
                  .then(($newNodes) => {
                    const newCount = $newNodes.length;
                    cy.log(
                      `New node count after clicking Show More: ${newCount}`
                    );
                  });
              });
            } else {
              assert.ok(
                "Show More button is not visible - node count might be 10 or less"
              );
            }
          });

          cy.then(() => {
            cy.document().then((doc) => {
              cy.wait(1000);
              const element = doc.querySelector(".pager__item>.button");
              if (element) {
                throw new Error(
                  "❌Show More button is still visible, expected not to exist after clicking it."
                );
              } else {
                assert.ok(
                  "Everything is okay, show more button is not visible after click!"
                );
              }
            });
          });

          const charLimit = device === "macbook-16" ? 400 : 250;

          cy.then(() => {
            cy.document().then((doc) => {
              const allBlocks = Array.from(
                doc.querySelectorAll(".block-body-text-wrapper")
              );

              allBlocks.forEach((block, index) => {
                const hasReadMore = block.querySelector(
                  'button.read-more-btn[style="display: inline-block;"]'
                );

                cy.wrap(block).within(() => {
                  cy.get(".ama-content-wrapper").as("contentWrapper");

                  cy.get("@contentWrapper")
                    .invoke("text")
                    .then((collapsedTextRaw) => {
                      const collapsedText = collapsedTextRaw.trim();
                      const charCount = collapsedText.length;

                      cy.log(
                        `📄 Block ${
                          index + 1
                        } collapsed content length: ${charCount} chars`
                      );

                      if (hasReadMore) {
                        cy.log(`🔍 Block ${index + 1}: Has Read More button`);

                        // Step 1: Verify collapsed text exceeds threshold
                        expect(
                          charCount,
                          `Collapsed text should exceed ${charLimit} chars`
                        ).to.be.greaterThan(charLimit);

                        cy.get("button.read-more-btn").as("readMoreBtn");

                        // Step 2: Validate the button text is "Read More" (case-insensitive)
                        cy.get("@readMoreBtn")
                          .should("be.visible")
                          .contains("Read More", { matchCase: false });

                        // Step 3: Click Read More
                        cy.get("@readMoreBtn")
                          .scrollIntoView()
                          .click({ force: true });
                        cy.wait(1000);

                        // Step 4: Validate the button text has now changed to "Read Less"
                        cy.get("@readMoreBtn")
                          .should("be.visible")
                          .contains("Read Less", { matchCase: false });

                        // Step 5: Get expanded text and validate it
                        cy.get("@contentWrapper")
                          .invoke("text")
                          .then((expandedTextRaw) => {
                            const expandedText = expandedTextRaw.trim();
                            const expandedCharCount = expandedText.length;

                            cy.log(
                              `📄 Block ${
                                index + 1
                              } expanded content length: ${expandedCharCount} chars`
                            );

                            expect(
                              expandedCharCount,
                              "Expanded text should be longer than collapsed"
                            ).to.be.greaterThan(charCount);

                            expect(
                              expandedText.startsWith(
                                collapsedText.replace(/\.\.\.$/, "")
                              ),
                              "Expanded content should begin with collapsed content"
                            ).to.be.true;

                            cy.log(`🔄 Clicking Read Less to collapse content`);

                            // Step 6: Click Read Less to collapse
                            cy.get("@readMoreBtn")
                              .scrollIntoView()
                              .click({ force: true });
                            cy.wait(1000);

                            // Step 7: Validate button text changed back to "Read More"
                            cy.get("@readMoreBtn")
                              .should("be.visible")
                              .contains("Read More", { matchCase: false });

                            // Step 8: Capture re-collapsed text and compare with original
                            cy.get("@contentWrapper")
                              .invoke("text")
                              .then((reCollapsedTextRaw) => {
                                const reCollapsedText =
                                  reCollapsedTextRaw.trim();
                                const reCollapsedCount = reCollapsedText.length;

                                cy.log(
                                  `📄 Block ${
                                    index + 1
                                  } collapsed again to length: ${reCollapsedCount} chars`
                                );

                                expect(
                                  reCollapsedCount,
                                  "Text length after collapsing should match or be near original"
                                ).to.be.at.most(expandedCharCount);

                                expect(
                                  reCollapsedText.startsWith(
                                    collapsedText.substring(0, 50)
                                  ),
                                  "Collapsed content should revert to original start"
                                ).to.be.true;

                                cy.log(
                                  `✅ Block ${
                                    index + 1
                                  } passed full Read More/Read Less validation.`
                                );
                              });
                          });
                      } else {
                        cy.log(`ℹ️ Block ${index + 1}: No Read More button`);

                        expect(
                          charCount,
                          `Content should be strictly less than ${charLimit} chars when no Read More button is present`
                        ).to.be.lessThan(charLimit);

                        cy.log(
                          `✅ Block ${
                            index + 1
                          } correctly rendered without Read More.`
                        );
                      }
                    });
                });
              });
            });
          });

          cy.then(() => {
            cy.document().then((doc) => {
              cy.wait(1000);
              const element = doc.querySelector(".pager__item>.button");
              if (element) {
                throw new Error(
                  "❌Show More button is still visible, expected not to exist after clicking it."
                );
              } else {
                assert.ok(
                  "Everything is okay, show more button is not visible after click!"
                );
              }
            });
          });
        });
      } else {
        assert.ok(
          "No sponsors and exhibitors present on page, everything is okay!"
        );
      }
    });
  }
}

export default new ExhibitorsSponsorsPage();
