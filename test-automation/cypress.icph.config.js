const { defineConfig } = require("cypress");
const { verifyDownloadTasks } = require("cy-verify-downloads");

//comment out this line when running in local
const cypressSplit = require("cypress-split");

const environments = {
  prod: "https://icph-prod-cf.test-ama-assn.org",
  stage: "https://icph-test-cf.test-ama-assn.org",
  dev: "https://icph-dev-cf.test-ama-assn.org",
};

module.exports = defineConfig({
  pageLoadTimeout: 500000,
  video: true,
  retries: {
    experimentalStrategy: "detect-flake-and-pass-on-threshold",
    experimentalOptions: {
      maxRetries: 1,
      passesRequired: 1,
    },
    openMode: true,
    runMode: true,
  },
  reporter: "mochawesome",
  reporterOptions: {
    useInlineDiffs: true,
    embeddedScreenshots: true,
    reportDir: "cypress/results",
    reportFilename: "[name].html",
    overwrite: true,
    html: true,
    json: true,
    charts: true,
  },
  env: {
    username: "ps2sites",
    password: "ps2sites$321",
  },
  e2e: {
    experimentalSessionAndOrigin: true,

    setupNodeEvents(on, config) {
      on("task", verifyDownloadTasks);

      //comment out this line when running in local
      cypressSplit(on, config);

      const env = config.env.environment || "stage"; // Default to 'stage' if no environment is provided
      config.baseUrl = environments[env]; // Dynamically set the base URL based on the environment

      console.log("Baseurl: " + config.baseUrl);
      return config;
    },
  },
});
