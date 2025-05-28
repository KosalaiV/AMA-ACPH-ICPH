class ConferencePage {
  // Locators

  //TS_30: About Us Page
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
    return cy.get(".active .ama-content-wrapper p");
  }

  getActiveTabContentTable() {
    return cy.get(".active .ama-content-wrapper table");
  }

  getAboutICPHLink() {
    return cy.get("header li>a[href='/about-icph']");
  }

  getHeaderNavigationLink() {
    return cy.get("header #block-vdl-main-menu a");
  }

  getFooterCopyright() {
    return cy.get("footer #block-vdl-copyrightblock");
  }

  getFooterDisclaimer() {
    return cy.get("footer #block-vdl-disclaimer");
  }

  getFooterDevicesLink() {
    return cy.get("#block-vdl-devices a");
  }

  getFooterAboutLink() {
    return cy.get("#block-vdl-footer a");
  }

  getBreadcrumbs() {
    return cy.get("#block-vdl-breadcrumbs");
  }

  getCardsHeader() {
    return cy.get(".cards-block-header");
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

  //TS_29: Hero Banner
  getHeroSection() {
    return cy.get(".hero-banner");
  }

  // Actions

  //TS_29: Hero Banner
  verifyHeroBanner(device) {
    // Visit home page
    cy.visitWithAuth("/");

    // Click allow button if visible
    // this.getAllowButton().should("be.visible").click({ force: true });

    // If not on Desktop, open the hamburger menu
    if (device !== "macbook-16") {
      this.getHamburgerIconButton()
        .should("be.enabled")
        .should("be.visible")
        .click({ force: true });
    }

    // Click about link
    this.getAboutLink().should("be.visible").click({ force: true });

    // Ensure the hero section is visible
    this.getHeroSection().should("be.visible");

    // Validate the title
    this.getHeroSection()
      .find(".hero-section__info--title")
      .should("be.visible")
      .and("not.be.empty");

    // Validate the body content
    this.getHeroSection().find("p").should("be.visible").and("not.be.empty");

    // Validate the media
    this.getHeroSection()
      .find(".hero-section__media")
      .should("be.visible")
      .and("not.be.empty");
  }

  //TS_30: About Us Page
  // verifyReadMoreFunction(device) {
  //   // Visit home page
  //   cy.visitWithAuth("/exhibitors-listing-page");

  //   cy.document().then((doc) => {
  //     const readMoreButton = doc.querySelectorAll("button.read-more-btn"); // update selector as needed

  //     if (readMoreButton) {
  //       assert.ok("✅ Read More button is available on the page");

  //           cy.get('.block-body-text-wrapper').each(($block) => {
  //     const block = cy.wrap($block);

  //     block.find('button.read-more-btn[style="display: inline-block;"]').length && block.then(($el) => {
  //       const hasReadMore = $el.querySelector('button.read-more-btn[style="display: inline-block;"]');

  //       if (hasReadMore) {
  //         const paraEl = $el.querySelector('.block-body-text--partner > p'); // 🔄 Updated selector
  //         const buttonEl = $el.querySelector('button.read-more-btn');

  //         const para = cy.wrap(paraEl);
  //         const button = cy.wrap(buttonEl);

  //         // Get collapsed height
  //         para.invoke('outerHeight').then(initialHeight => {
  //           expect(initialHeight).to.be.lessThan(150); // Adjust threshold if needed

  //           // Expand
  //           button.click();

  //           para.invoke('outerHeight').should('be.greaterThan', initialHeight);

  //           // Collapse
  //           button.click();

  //           para.invoke('outerHeight').should('be.closeTo', initialHeight, 5);
  //         });
  //       }
  //     });
  //   });
  //       // cy.get(".block-body-text-wrapper").each(($block) => {
  //       //   const block = cy.wrap($block);

  //       //   // Find the button and paragraph inside the current block
  //       //   block.find('button.read-more-btn[style="display: inline-block;"]')
  //       //     .length &&
  //       //     block.then(() => {
  //       //       const paragraph = block.find(".block-body-text--partner>p");
  //       //       const button = block.find("button.read-more-btn");

  //       //       // Wrap the elements for Cypress commands
  //       //       const para = cy.wrap(paragraph);
  //       //       const btn = cy.wrap(button);

  //       //       // Get the initial collapsed height
  //       //       para.invoke("outerHeight").then((initialHeight) => {
  //       //         expect(initialHeight).to.be.lessThan(150); // Adjust based on your actual threshold

  //       //         // Click "Read More"
  //       //         btn.click();

  //       //         // Check expanded height
  //       //         para
  //       //           .invoke("outerHeight")
  //       //           .should("be.greaterThan", initialHeight);

  //       //         // Click "Read Less"
  //       //         btn.click();

  //       //         // Check it collapses back to near-original height
  //       //         para
  //       //           .invoke("outerHeight")
  //       //           .should("be.closeTo", initialHeight, 5);
  //       //       });
  //       //     });
  //       // });
  //     } else {
  //       assert.ok(
  //         "❌ Read More button is NOT found on the page, everything is okay!!"
  //       );
  //     }
  //   });
  // }

  //   verifyReadMoreFunction(device) {
  //   // Visit the page
  //   cy.visitWithAuth("/exhibitors-listing-page");

  //   cy.get(".block-body-text-wrapper").each(($block) => {
  //     const $readMoreBtn = $block.querySelector('button.read-more-btn[style="display: inline-block;"]');

  //     if ($readMoreBtn) {
  //       // ✅ Button is present, proceed with test
  //       cy.wrap($block).within(() => {
  //         cy.get("button.read-more-btn").as("readMoreBtn");
  //         cy.get(".block-body-text--partner > p").as("paragraph");

  //         // Get collapsed height
  //         cy.get("@paragraph").invoke("outerHeight").then((initialHeight) => {
  //           expect(initialHeight).to.be.lessThan(150); // Adjust threshold as needed

  //           // Expand content
  //           cy.get("@readMoreBtn").click();

  //           // Validate height increases
  //           cy.get("@paragraph")
  //             .invoke("outerHeight")
  //             .should("be.greaterThan", initialHeight);

  //           // Collapse content
  //           cy.get("@readMoreBtn").click();

  //           // Validate height returns to near-original
  //           cy.get("@paragraph")
  //             .invoke("outerHeight")
  //             .should("be.closeTo", initialHeight, 5);
  //         });
  //       });
  //     } else {
  //       // ℹ️ No Read More button in this block — skip it
  //       cy.log("ℹ️ Skipping block — no 'Read More' button present.");
  //     }
  //   });
  // }

  // verifyReadMoreFunction(device) {
  //   cy.visitWithAuth("/exhibitors-listing-page");

  //   cy.document().then((doc) => {
  //     const allBlocks = Array.from(
  //       doc.querySelectorAll(".block-body-text-wrapper")
  //     );

  //     allBlocks.forEach((block, index) => {
  //       const hasReadMore = block.querySelector(
  //         'button.read-more-btn[style="display: inline-block;"]'
  //       );

  //       cy.wrap(block).within(() => {
  //         cy.get(".block-body-text--partner p").as("paragraph");

  //         if (hasReadMore) {
  //           cy.log(`🔍 Block ${index + 1}: Has Read More button`);
  //           cy.get("button.read-more-btn").as("readMoreBtn");

  //           cy.get("@paragraph").invoke("outerHeight").then((initialHeight) => {
  //             expect(initialHeight).to.be.lessThan(150);

  //             cy.get("@readMoreBtn").click();

  //             cy.get("@paragraph")
  //               .invoke("outerHeight")
  //               .should("be.greaterThan", initialHeight);

  //             cy.get("@readMoreBtn").click();

  //             cy.get("@paragraph")
  //               .invoke("outerHeight")
  //               .should("be.closeTo", initialHeight, 5);

  //             cy.log(`✅ Block ${index + 1} passed Read More/Read Less validation.`);
  //           });
  //         } else {
  //           cy.log(`ℹ️ Block ${index + 1}: No Read More button — validating compact content`);

  //           cy.get("@paragraph").invoke("outerHeight").then((height) => {
  //             expect(height).to.be.lessThan(100);
  //             cy.log(`✅ Block ${index + 1} height is compact as expected (${height}px)`);
  //           });
  //         }
  //       });
  //     });
  //   });
  // }

  // verifyReadMoreFunction(device) {
  //   cy.visitWithAuth("/exhibitors-listing-page");

  //   cy.document().then((doc) => {
  //     const blocksWithReadMore = Array.from(
  //       doc.querySelectorAll(".block-body-text-wrapper")
  //     ).filter((block) =>
  //       block.querySelector('button.read-more-btn[style="display: inline-block;"]')
  //     );

  //     // Iterate only through blocks that have a visible Read More button
  //     blocksWithReadMore.forEach((block, index) => {
  //       cy.wrap(block).within(() => {
  //         cy.get("button.read-more-btn").as("readMoreBtn");
  //         cy.get(".block-body-text--partner p").as("paragraph");

  //         cy.get("@paragraph").invoke("outerHeight").then((initialHeight) => {
  //           expect(initialHeight).to.be.lessThan(150);

  //           cy.get("@readMoreBtn").click();

  //           cy.get("@paragraph")
  //             .invoke("outerHeight")
  //             .should("be.greaterThan", initialHeight);

  //           cy.get("@readMoreBtn").click();

  //           cy.get("@paragraph")
  //             .invoke("outerHeight")
  //             .should("be.closeTo", initialHeight, 5);

  //           cy.log(`✅ Block ${index + 1} passed Read More/Read Less validation.`);
  //         });
  //       });
  //     });

  //     if (blocksWithReadMore.length === 0) {
  //       cy.log("ℹ️ No blocks with a visible Read More button found.");
  //     }
  //   });
  // }
  // verifyReadMoreFunction(device) {
  //   cy.visitWithAuth("/exhibitors-listing-page");

  //   cy.document().then((doc) => {
  //     const allBlocks = Array.from(
  //       doc.querySelectorAll(".block-body-text-wrapper")
  //     );

  //     allBlocks.forEach((block, index) => {
  //       const hasReadMore = block.querySelector(
  //         'button.read-more-btn[style="display: inline-block;"]'
  //       );

  //       cy.wrap(block).within(() => {
  //         cy.get(".block-body-text--partner p").as("paragraph");

  //         if (hasReadMore) {
  //           cy.log(`🔍 Block ${index + 1}: Has Read More button`);
  //           cy.get("button.read-more-btn").as("readMoreBtn");

  //           // Step 1: Click to expand
  //           cy.get("@readMoreBtn").click();

  //           // Step 2: Capture expanded height
  //           cy.get("@paragraph").invoke("outerHeight").then((expandedHeight) => {
  //             cy.log(`📏 Expanded height: ${expandedHeight}px`);

  //             // Step 3: Click to collapse
  //             cy.get("@readMoreBtn").click();

  //             // Step 4: Validate collapsed height is less
  //             cy.get("@paragraph")
  //               .invoke("outerHeight")
  //               // .should("be.lessThan", expandedHeight)
  //               .then((collapsedHeight) => {
  //                 cy.log(`📏 Collapsed height: ${collapsedHeight}px`);
  //                 cy.log(`✅ Block ${index + 1} passed Read More/Read Less validation.`);
  //               });
  //           });
  //         } else {
  //           cy.log(`ℹ️ Block ${index + 1}: No Read More button — validating compact paragraph height`);

  //           cy.get("@paragraph").invoke("outerHeight").then((height) => {
  //             cy.log(`📏 Paragraph height: ${height}px`);
  //             expect(height).to.be.lessThan(100);
  //             cy.log(`✅ Block ${index + 1} correctly compact without Read More`);
  //           });
  //         }
  //       });
  //     });
  //   });
  // }
  // verifyReadMoreFunction(device) {
  //   cy.visitWithAuth("/exhibitors-listing-page");

  //   cy.document().then((doc) => {
  //     const allBlocks = Array.from(
  //       doc.querySelectorAll(".block-body-text-wrapper")
  //     );

  //     allBlocks.forEach((block, index) => {
  //       const hasReadMore = block.querySelector(
  //         'button.read-more-btn[style="display: inline-block;"]'
  //       );

  //       cy.wrap(block).within(() => {
  //         cy.get(".ama-content-wrapper").as("contentWrapper"); // ✅ use unified container

  //         if (hasReadMore) {
  //           cy.log(`🔍 Block ${index + 1}: Has Read More button`);
  //           cy.get("button.read-more-btn").as("readMoreBtn");

  //           // Step 1: Expand
  //           cy.get("@readMoreBtn").click();

  //           // Step 2: Measure expanded height
  //           cy.get("@contentWrapper").invoke("outerHeight").then((expandedHeight) => {
  //             cy.log(`📏 Expanded height: ${expandedHeight}px`);

  //             // Step 3: Collapse
  //             cy.get("@readMoreBtn").click();

  //             // Step 4: Validate collapsed height is less
  //             cy.get("@contentWrapper")
  //               .invoke("outerHeight")
  //               .should("be.lessThan", expandedHeight)
  //               .then((collapsedHeight) => {
  //                 cy.log(`📏 Collapsed height: ${collapsedHeight}px`);
  //                 cy.log(`✅ Block ${index + 1} passed Read More/Read Less validation.`);
  //               });
  //           });
  //         } else {
  //           cy.log(`ℹ️ Block ${index + 1}: No Read More button — validating compact height`);

  //           cy.get("@contentWrapper").invoke("outerHeight").then((height) => {
  //             cy.log(`📏 Height without Read More: ${height}px`);
  //             expect(height).to.be.lessThan(100);
  //             cy.log(`✅ Block ${index + 1} is correctly compact without Read More`);
  //           });
  //         }
  //       });
  //     });
  //   });
  // }

  //   verifyReadMoreFunction(device) {
  //   const charLimit = device === "macbook-16" ? 400 : 250;

  //   cy.visitWithAuth("/exhibitors-listing-page");

  //   cy.document().then((doc) => {
  //     const allBlocks = Array.from(
  //       doc.querySelectorAll(".block-body-text-wrapper")
  //     );

  //     allBlocks.forEach((block, index) => {
  //       const hasReadMore = block.querySelector(
  //         'button.read-more-btn[style="display: inline-block;"]'
  //       );

  //       cy.wrap(block).within(() => {
  //         cy.get(".ama-content-wrapper").as("contentWrapper");

  //         cy.get("@contentWrapper")
  //           .invoke("text")
  //           .then((collapsedTextRaw) => {
  //             const collapsedText = collapsedTextRaw.trim();
  //             const charCount = collapsedText.length;

  //             cy.log(`📄 Block ${index + 1} collapsed content length: ${charCount} chars`);

  //             if (hasReadMore) {
  //               cy.log(`🔍 Block ${index + 1}: Has Read More button`);

  //               // Step 1: Verify collapsed text exceeds threshold
  //               expect(charCount, `Collapsed text should exceed ${charLimit} chars`).to.be.greaterThan(charLimit);

  //               cy.get("button.read-more-btn").as("readMoreBtn").click();

  //               // Step 2: Get expanded text and validate it's longer
  //               cy.get("@contentWrapper")
  //                 .invoke("text")
  //                 .then((expandedTextRaw) => {
  //                   const expandedText = expandedTextRaw.trim();
  //                   const expandedCharCount = expandedText.length;

  //                   cy.log(`📄 Block ${index + 1} expanded content length: ${expandedCharCount} chars`);

  //                   expect(expandedCharCount, "Expanded text should be longer than collapsed").to.be.greaterThan(charCount);

  //                   expect(
  //                     expandedText.startsWith(collapsedText.replace(/\.\.\.$/, "")),
  //                     "Expanded content should begin with collapsed content"
  //                   ).to.be.true;

  //                   cy.log(`✅ Block ${index + 1} passed Read More character validation.`);
  //                 });
  //             } else {
  //               cy.log(`ℹ️ Block ${index + 1}: No Read More button`);

  //               // ✅ New strict check: length must be < threshold
  //               expect(
  //                 charCount,
  //                 `Content should be strictly less than ${charLimit} chars when no Read More button is present`
  //               ).to.be.lessThan(charLimit);

  //               cy.log(`✅ Block ${index + 1} correctly rendered without Read More.`);
  //             }
  //           });
  //       });
  //     });
  //   });
  // }

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
                cy.get("@readMoreBtn").scrollIntoView().click();

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
                    cy.get("@readMoreBtn").scrollIntoView().click();

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

    this.getTabs().each(($tab, index) => {
      cy.wrap($tab).click({ force: true });

      // Validate active tab and its background color
      cy.wrap($tab)
        .should("have.class", "is-active")
        .then(($activeTab) => {
          expect($activeTab).to.have.css("background-color", color);
        });

      if (index === 1) {
        this.getActiveTabContentTable().should("be.visible");
      } else {
        this.getActiveTabContent().should("be.visible");
      }
    });
  }

  verifyTabbedAccordion(color) {
    cy.visitWithAuth(
      "/conference-on-physician-health-information/american-conference-on-physician-health-2025"
    );

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
  }

  // verifyTabbedAccordion(color, device) {
  //   cy.visitWithAuth(
  //     "/conference-on-physician-health-information/american-conference-on-physician-health-2025"
  //   );

  //   this.getTabs().each(($tab, index) => {
  //     cy.wrap($tab).click({ force: true });

  //     // Confirm it has become active
  //     cy.wrap($tab)
  //       .should("have.class", "is-active")
  //       .then(($activeTab) => {
  //         // ✅ Validate background color of active tab
  //         const expectedColor = "rgb(193, 216, 47)"; // Replace with your actual color
  //         expect($activeTab).to.have.css("background-color", color);
  //       });

  //     // ✅ Accordion validation inside the tab content area
  //     // Adjust this if accordions are in a specific container
  //     this.getActiveAccordionIcon().each(($icon) => {
  //       cy.wrap($icon).click({ force: true }); // Expand the accordion
  //       cy.wrap($icon)
  //         .next(".accordion__body") // Or appropriate selector for accordion content
  //         .should("be.visible")
  //         .and("not.be.empty");
  //     });
  //   });
  // }

  // verifyReadMoreFunction(device) {
  //   const charLimit = device === "mobile" ? 250 : 400;

  //   cy.visitWithAuth("/exhibitors-listing-page");

  //   cy.document().then((doc) => {
  //     const allBlocks = Array.from(
  //       doc.querySelectorAll(".block-body-text-wrapper")
  //     );

  //     allBlocks.forEach((block, index) => {
  //       const hasReadMore = block.querySelector(
  //         'button.read-more-btn[style="display: inline-block;"]'
  //       );

  //       cy.wrap(block).within(() => {
  //         cy.get(".ama-content-wrapper").as("contentWrapper");

  //         cy.get("@contentWrapper")
  //           .invoke("text")
  //           .then((collapsedTextRaw) => {
  //             const collapsedText = collapsedTextRaw.trim();
  //             const charCount = collapsedText.length;

  //             cy.log(`📄 Block ${index + 1} collapsed content length: ${charCount} chars`);

  //             if (hasReadMore) {
  //               cy.log(`🔍 Block ${index + 1}: Has Read More button`);

  //               // Step 1: Verify collapsed text exceeds threshold
  //               expect(charCount, `Collapsed text should exceed ${charLimit} chars`).to.be.greaterThan(charLimit);

  //               cy.get("button.read-more-btn").as("readMoreBtn").click();

  //               // Step 2: Get expanded text and validate it's longer
  //               cy.get("@contentWrapper")
  //                 .invoke("text")
  //                 .then((expandedTextRaw) => {
  //                   const expandedText = expandedTextRaw.trim();
  //                   const expandedCharCount = expandedText.length;

  //                   cy.log(`📄 Block ${index + 1} expanded content length: ${expandedCharCount} chars`);

  //                   expect(expandedCharCount, "Expanded text should be longer than collapsed").to.be.greaterThan(charCount);

  //                   // Step 3: Ensure collapsed text is a prefix of expanded text
  //                   expect(
  //                     expandedText.startsWith(collapsedText.replace(/\.\.\.$/, "")),
  //                     "Expanded content should begin with collapsed content"
  //                   ).to.be.true;

  //                   cy.log(`✅ Block ${index + 1} passed character-based Read More validation.`);
  //                 });
  //             } else {
  //               cy.log(`ℹ️ Block ${index + 1}: No Read More button`);

  //               // Verify content is within allowed character limit
  //               expect(charCount, `Content should be <= ${charLimit} chars when no Read More button`).to.be.at.most(charLimit);

  //               cy.log(`✅ Block ${index + 1} correctly rendered without Read More.`);
  //             }
  //           });
  //       });
  //     });
  //   });
  // }

  //working
  // verifyReadMoreFunction(device) {
  //   cy.visitWithAuth("/exhibitors-listing-page");

  //   cy.document().then((doc) => {
  //     const allBlocks = Array.from(
  //       doc.querySelectorAll(".block-body-text-wrapper")
  //     );

  //     allBlocks.forEach((block, index) => {
  //       const hasReadMore = block.querySelector(
  //         'button.read-more-btn[style="display: inline-block;"]'
  //       );

  //       cy.wrap(block).within(() => {
  //         cy.get(".ama-content-wrapper").as("contentWrapper");

  //         if (hasReadMore) {
  //           cy.log(`🔍 Block ${index + 1}: Has Read More button`);
  //           cy.get("button.read-more-btn").as("readMoreBtn");

  //           // Step 1: Capture collapsed text
  //           cy.get("@contentWrapper")
  //             .invoke("text")
  //             .then((collapsedText) => {
  //               cy.log(
  //                 `📄 Collapsed text (first 100 chars): ${collapsedText
  //                   .trim()
  //                   .substring(0, 100)}...`
  //               );

  //               // Step 2: Capture collapsed height
  //               cy.get("@contentWrapper")
  //                 .invoke("outerHeight")
  //                 .then((collapsedHeight) => {
  //                   cy.log(`📏 Collapsed height: ${collapsedHeight}px`);

  //                   // Step 3: Expand content
  //                   cy.get("@readMoreBtn").scrollIntoView().click();

  //                   // Step 4: Capture expanded height
  //                   cy.get("@contentWrapper")
  //                     .invoke("outerHeight")
  //                     .then((expandedHeight) => {
  //                       cy.log(`📏 Expanded height: ${expandedHeight}px`);
  //                       expect(expandedHeight).to.be.at.least(collapsedHeight);

  //                       // Step 5: Capture expanded text
  //                       cy.get("@contentWrapper")
  //                         .invoke("text")
  //                         .then((expandedText) => {
  //                           cy.log(
  //                             `📄 Expanded text (first 100 chars): ${expandedText
  //                               .trim()
  //                               .substring(0, 100)}...`
  //                           );

  //                           // ✅ Validate text is longer
  //                           expect(expandedText.length).to.be.greaterThan(
  //                             collapsedText.length
  //                           );
  //                           expect(
  //                             expandedText.startsWith(
  //                               collapsedText.trim().replace(/\.\.\.$/, "")
  //                             )
  //                           ).to.be.true;

  //                           // Step 6: Collapse again
  //                           cy.get("@readMoreBtn").scrollIntoView().click();

  //                           cy.get("@contentWrapper")
  //                             .invoke("outerHeight")
  //                             .then((finalCollapsedHeight) => {
  //                               cy.log(
  //                                 `📏 Collapsed height after toggle: ${finalCollapsedHeight}px`
  //                               );
  //                               expect(finalCollapsedHeight).to.be.at.most(
  //                                 expandedHeight
  //                               );

  //                               cy.log(
  //                                 `✅ Block ${
  //                                   index + 1
  //                                 } passed Read More/Read Less validation.`
  //                               );
  //                             });
  //                         });
  //                     });
  //                 });
  //             });
  //         } else {
  //           cy.log(
  //             `ℹ️ Block ${
  //               index + 1
  //             }: No Read More button — validating compact content`
  //           );

  //           cy.get("@contentWrapper")
  //             .invoke("outerHeight")
  //             .then((height) => {
  //               cy.log(`📏 Height: ${height}px`);
  //               cy.log(
  //                 `✅ Block ${index + 1} is compact and correctly rendered.`
  //               );
  //             });
  //         }
  //       });
  //     });
  //   });
  // }

  // verifyReadMoreFunction(device) {
  //   cy.visitWithAuth("/exhibitors-listing-page");

  //   cy.document().then((doc) => {
  //     const allBlocks = Array.from(
  //       doc.querySelectorAll(".block-body-text-wrapper")
  //     );

  //     allBlocks.forEach((block, index) => {
  //       const hasReadMore = block.querySelector(
  //         'button.read-more-btn[style="display: inline-block;"]'
  //       );

  //       cy.wrap(block).within(() => {
  //         cy.get(".ama-content-wrapper").as("contentWrapper");

  //         if (hasReadMore) {
  //           cy.log(`🔍 Block ${index + 1}: Has Read More button`);
  //           cy.get("button.read-more-btn").as("readMoreBtn");

  //           // Step 1: Expand the content
  //           cy.get("@readMoreBtn").click();

  //           // Step 2: Measure expanded height
  //           cy.get("@contentWrapper").invoke("outerHeight").then((expandedHeight) => {
  //             cy.log(`📏 Expanded height: ${expandedHeight}px`);

  //             // Step 3: Collapse the content
  //             cy.get("@readMoreBtn").click();

  //             // Step 4: Validate collapsed height is ≤ expanded height
  //             cy.get("@contentWrapper")
  //               .invoke("outerHeight")
  //               .then((collapsedHeight) => {
  //                 cy.log(`📏 Collapsed height: ${collapsedHeight}px`);
  //                 expect(collapsedHeight).to.be.at.most(expandedHeight);
  //                 cy.log(`✅ Block ${index + 1} passed Read More/Read Less validation.`);
  //               });
  //           });
  //         } else {
  //           cy.log(`ℹ️ Block ${index + 1}: No Read More button — validating compact content`);

  //           cy.get("@contentWrapper").invoke("outerHeight").then((height) => {
  //             cy.log(`📏 Content-only height: ${height}px`);
  //             expect(height).to.be.at.most(100);
  //             cy.log(`✅ Block ${index + 1} is compact as expected.`);
  //           });
  //         }
  //       });
  //     });
  //   });
  // }
}

export default new ConferencePage();
