// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import "@percy/cypress";
import "cypress-real-events";
require('cy-verify-downloads').addCustomCommand();

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on("uncaught:exception", (err, runnable) => {
  // Returning false here prevents Cypress from failing the test on uncaught exceptions
  return false;
});

import addContext from "mochawesome/addContext";

Cypress.on('test:before:run', (attributes, test) => {
  const siteName = Cypress.env('site');
  const environment = Cypress.env('env') || 'dev';

  if (siteName && sites[siteName]) {
    const baseUrl = sites[siteName][environment];
    Cypress.config('baseUrl', baseUrl);
  }
});

const titleToFileName = (title) =>
  title.replace(/[:\/]/g, '')

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    let parent = runnable.parent
    let filename = ''
    while (parent && parent.title) {
      filename = `${titleToFileName(
        parent.title,
      )} -- ${filename}`
      parent = parent.parent
    }
    filename += `${titleToFileName(
      test.title,
    )} (failed).png`
    addContext(
      { test },
      `../screenshots/${Cypress.spec.name}/${filename}`,
    )
    //Add video if needed
    addContext({ test }, `../videos/${Cypress.spec.name}.mp4`)
  }
})
