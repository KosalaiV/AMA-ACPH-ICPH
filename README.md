# AMA Multisites ACPH ICPH Automated Testing 🚀

---

### Overview
This help document guides users on how to manually trigger **Functional** and **Visual** Cypress tests for the ACPH and ICPH websites via GitHub Actions. It walks through the exact steps in the GitHub UI for selecting inputs and launching the tests.

---

### Project Structure: AMA Multisites ACPH ICPH Automated Testing 🚀

This project enables automated functional and visual testing within the CI pipeline, aiming to minimize release risks and manual test time.

#### **File Structure 📂**
- **Config file**: `cypress.config.js`
- **Dependency file**: `package.json`
- **Test files**: `cypress/e2e/`
- **Page object files**: `cypress/pageobject/`
- **Support files**: `cypress/support/`
- **Test data files**: `cypress/fixtures/`

---

### Step-by-Step Instructions

#### 1. **Navigate to the Actions Tab**
- Go to your repository on GitHub.
- Click on the **"Actions"** tab near the top navigation bar.

#### 2. **Select the `test-automation` Workflow**
- In the left sidebar, click on **`test-automation`** under **All workflows**.
- You will see the message: *This workflow has a workflow_dispatch event trigger.*

#### 3. **Click "Run Workflow"**
- On the right side, click the **"Run workflow"** dropdown.
- Select the desired **branch** (typically `test-automation`).

#### 4. **Fill in the Required Inputs**
- **Website**: Choose `ACPH` or `ICPH`.
- **Testing Type**: Choose `Functional` or `Visual`.
- **Browser Type** *(only required for Functional)*: `chrome`, `firefox`, or `edge`.
- **Env Type** *(only required for Functional)*: `prod`, `stage`, or `dev`.

> 🚨 **Note:** For **Visual Testing**, `browser` and `environment` inputs must still be filled due to form constraints, but they are ignored during execution.

#### 5. **Click the Green "Run workflow" Button**
- Once all fields are selected, click **Run workflow**.
- The job starts and appears in the list of recent runs.

---

### Reporting 📊

#### 1. **GitHub Actions Summary**
- Go to the latest run under `Actions` tab.
- View the **Summary** to check test pass/fail counts.

#### 2. **HTML Report**
- From the pipeline run artifacts, download the `merged-mochawesome-report.zip`.
- Extract and open `html-reports/index.html`.
- To share, zip the `html-reports` directory and send.

---

### Troubleshooting
- ✅ Ensure all required secrets (`CYPRESS_USERNAME`, `CYPRESS_PASSWORD`, `ACPH_PERCY_TOKEN`, `ICPH_PERCY_TOKEN`) are available.
- ✅ Make sure spec files are present in the expected folder (`cypress/e2e/Functional/` or `Visual/`).

---

Feel free to customize the script to suit your specific requirements 😎
