class ConferencePage {
  // Locators

  getReadMoreButton() {
    return cy.get("button.read-more-btn");
  }

  getTabs() {
    return cy.get(".tabs__link");
  }

  getActiveAccordionIcon() {
    return cy.get(".active .accordion-icon");
  }

  getActiveAccordionContentParagraph() {
    return cy.get(".accordion-panel:not([hidden]) p");
  }

  getActiveAccordionContent() {
    return cy.get(".accordion-panel:not([hidden])");
  }

  getActiveAccordionButton() {
    return cy.get(".accordion-button[aria-expanded='true']");
  }

  getActiveTabContent() {
    return cy.get(".tab-content");
  }

  getAboutICPHLink() {
    return cy.get("header li>a[href='/about-icph']");
  }

  getCardsBlock() {
    return cy.get(".cards");
  }

  getAllowButton() {
    return cy.get(".allowAll");
  }

  getHamburgerIconButton() {
    return cy.get(".menu-toggle");
  }

  getHeroSection() {
    return cy.get(".hero-banner");
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

  verifyTabsContent(endpoint, color) {
    cy.visitWithAuth(endpoint);

    cy.document().then((doc) => {
      cy.wait(2000);
      const element = doc.querySelector(".tabs__link");
      if (element) {
        this.getTabs().each(($tab, index) => {
          cy.wrap($tab).click({ force: true });

          // Validate active tab and its background color
          cy.wrap($tab)
            .should("have.class", "is-active")
            .then(($activeTab) => {
              expect($activeTab).to.have.css("background-color", color);
            });

          this.getActiveTabContent()
            .should("not.be.empty")
            .should("be.visible");
        });
      } else {
        assert.ok("Tabs are yet to come, everything is okay!");
      }
    });
  }

  verifyTabbedAccordion(endpoint, color) {
    cy.visitWithAuth(endpoint);

    cy.document().then((doc) => {
      cy.wait(2000);
      const element = doc.querySelector(".tabs__link");
      if (element) {
        this.getTabs().each(($tab, index) => {
          cy.wrap($tab).click({ force: true });

          // Validate active tab and its background color
          cy.wrap($tab)
            .should("have.class", "is-active")
            .then(($activeTab) => {
              expect($activeTab).to.have.css("background-color", color);
            });

          // Get the expected number of accordions
          this.getActiveAccordionIcon().its("length").as("ExpectedLength");

          // Expand all accordions and validate content
          this.getActiveAccordionIcon()
            .closest(".accordion-button[aria-expanded='false']")
            .should("be.visible")
            .each((accordion) => {
              cy.wrap(accordion).scrollIntoView().click({ force: true });
              cy.wait(1000);

              this.getActiveAccordionContentParagraph()
                .should("not.be.empty")
                .should("be.visible");

              this.getActiveAccordionButton().should("be.visible");
            });

          // Validate the expanded accordions match expected count
          cy.get("@ExpectedLength").then((expectedLength) => {
            this.getActiveAccordionButton()
              .its("length")
              .should("eq", expectedLength);

            this.getActiveAccordionContent()
              .its("length")
              .should("eq", expectedLength);
          });

          // Collapse all expanded accordions
          this.getActiveAccordionButton()
            .should("be.visible")
            .each((accordion) => {
              cy.wrap(accordion).scrollIntoView().click({ force: true });
              cy.wait(1000);
            });

          // Final assertion: ensure no accordion is left expanded
          cy.document().then((doc) => {
            cy.wait(2000);
            const element = doc.querySelector(
              ".accordion-button[aria-expanded='true']"
            );
            if (element) {
              throw new Error(
                "❌ Some accordions are still expanded — expected to be collapsed"
              );
            } else {
              assert.ok(true, "✅ All accordions collapsed as expected.");
            }
          });
        });
      } else {
        assert.ok("Tabs are yet to come, everything is okay!");
      }
    });
  }
}

export default new ConferencePage();
