class AboutPage {
  // Locators

  //TS_30: About Us Page
  getHeaderShare() {
    return cy.get("header #block-vdl-sharestaticlinkblock");
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

  //   verifyReadMoreFunction(endpoint,device) {
  //   const charLimit = device === "macbook-16" ? 400 : 250;

  //   cy.visitWithAuth(endpoint);

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

  //             cy.log(
  //               `📄 Block ${
  //                 index + 1
  //               } collapsed content length: ${charCount} chars`
  //             );

  //             if (hasReadMore) {
  //               cy.log(`🔍 Block ${index + 1}: Has Read More button`);

  //               // Step 1: Verify collapsed text exceeds threshold
  //               expect(
  //                 charCount,
  //                 `Collapsed text should exceed ${charLimit} chars`
  //               ).to.be.greaterThan(charLimit);

  //               cy.get("button.read-more-btn").as("readMoreBtn").scrollIntoView().click();

  //               // Step 2: Get expanded text and validate it's longer
  //               cy.get("@contentWrapper")
  //                 .invoke("text")
  //                 .then((expandedTextRaw) => {
  //                   const expandedText = expandedTextRaw.trim();
  //                   const expandedCharCount = expandedText.length;

  //                   cy.log(
  //                     `📄 Block ${
  //                       index + 1
  //                     } expanded content length: ${expandedCharCount} chars`
  //                   );

  //                   expect(
  //                     expandedCharCount,
  //                     "Expanded text should be longer than collapsed"
  //                   ).to.be.greaterThan(charCount);

  //                   expect(
  //                     expandedText.startsWith(
  //                       collapsedText.replace(/\.\.\.$/, "")
  //                     ),
  //                     "Expanded content should begin with collapsed content"
  //                   ).to.be.true;

  //                   cy.log(
  //                     `✅ Block ${
  //                       index + 1
  //                     } passed Read More character validation.`
  //                   );
  //                 });
  //             } else {
  //               cy.log(`ℹ️ Block ${index + 1}: No Read More button`);

  //               // ✅ New strict check: length must be < threshold
  //               expect(
  //                 charCount,
  //                 `Content should be strictly less than ${charLimit} chars when no Read More button is present`
  //               ).to.be.lessThan(charLimit);

  //               cy.log(
  //                 `✅ Block ${index + 1} correctly rendered without Read More.`
  //               );
  //             }
  //           });
  //       });
  //     });
  //   });
  // }

  //TS_30: About Us Page
  verifyNecessaryContent(device) {
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
    this.getAboutICPHLink().should("be.visible").click({ force: true });

    this.getCardsBlock().scrollIntoView();

    this.getCardsHeader().should("be.visible");

    // Validate the title
    this.getCardsBlock().find(".cards-title").should("be.visible");

    // Validate the title
    this.getCardsBlock().find("p").should("be.visible");

    // Validate the CTA button
    this.getCardsBlock()
      .find("a")
      .should("be.visible") // Ensure the CTA is visible
      .and("have.attr", "href") // Ensure it has an 'href' attribute (if it's a link)
      .and("not.be.empty"); // Ensure the CTA is not empty (has a valid link or text)

    // Check that the CTA is functional (e.g., clicking it redirects to the correct URL)
    this.getCardsBlock()
      .find("a")
      .each(($cta) => {
        const ctaUrl = $cta.attr("href");
        cy.requestWithAuth(ctaUrl).its("status").should("eq", 200); // Ensure the URL is accessible
      });

    // Validate image is present
    this.getCardsBlock()
      .find("img")
      .each((img) => {
        cy.wrap(img).should("exist");
      });
  }
}

export default new AboutPage();
