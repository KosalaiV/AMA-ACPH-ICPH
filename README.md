# AMA Multisites ACPH ICPH Automated Testing 🚀

This project aims to facilitate automated functional and visual checklists in the CI pipeline, reducing testing time and preventing production deployment issues.

## File Structure 📂

- **Config file**: `cypress.config.js`
- **Dependency file**: `package.json`
- **Test files**: `(.cypress/e2e/)`
- **Page object files**: `(.cypress/pageobject)`
- **Support files**: `(.cypress/support)`
- **Test data files**: `(.cypress/fixtures)`

## CI Pipeline Trigger ⏳

We've set up a manual trigger known as `workflow_dispatch` in YAML terms.

1. Go to the GitHub `Actions` tab.
2. Click on `test-automation` under the **All workflows** section (_located on the left side_).
3. You will see `This workflow has a workflow_dispatch event trigger.`
4. Click the `Run workflow` dropdown.
5. Select the **branch** `test-automation`.
6. Choose one of the **Select the testing type:** from the dropdown list:
   - <sub>`Functional`</sub>
   - <sub>`Visual`</sub>
7. Choose one of the **Select the browser:** from the dropdown list:

   - <sub>`chrome`</sub>
   - <sub>`firefox`</sub>
   - <sub>`edge`</sub>

   **🚨 Note**: _*No need to select browsers incase of `Visual` Testing [Percy configured]*_

8. Choose one of the **Select the environment:** from the dropdown list:

   - <sub>`prod`</sub>
   - <sub>`stage`</sub>
   - <sub>`dev`</sub>

   **🚨 Note**: _*No need to select environment incase of `Visual` Testing [Defaults to prod]*_

9. Finally, click `Run workflow`.

## Reporting 📊

An automatic trigger will occur after running scripts in the pipeline. To learn about pipeline configurations, refer to the GitHub workflow YAML file.

1. **GitHub Actions Summary Report:**

   - Check the `Summary` section in the latest GitHub Actions execution, which highlights the executed tests with pass/fail statistics.

2. **HTML Report:**
   - Download the `merged-mochawesome-report` from the executed pipeline in GitHub Actions. Check for `html-reports` directory, inside that open `index.html`. To share the report with client, just compress the `html-reports` directory and share it.

Feel free to customize the script to suit your specific requirements 😎
