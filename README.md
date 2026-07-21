# SauceDemo Test Suite (Playwright + TypeScript)

This repository contains an automated test suite for [SauceDemo](https://www.saucedemo.com/), built as part of the AMP QA Engineer take-home challenge. 

It covers core e-commerce workflows—focusing on authentication (both happy path and negative error handling), product price sorting, and an end-to-end checkout flow.

---

## Framework Choice: Why Playwright + TypeScript

When deciding on a tool for this challenge, Playwright with TypeScript was the clear choice:

* **Zero-config resilience:** Playwright's auto-waiting handles asynchronous UI updates out of the box, eliminating brittle `sleep()` or `waitForTimeout()` calls.
* **Speed & Isolation:** Isolated browser contexts allow tests to run quickly in parallel without test state bleeding into subsequent runs.
* **Type Safety & Intellisense:** TypeScript catches errors at compile time and makes writing page objects and maintaining test data straightforward.
* **Debugging Tools:** Playwright’s Trace Viewer and UI mode make inspecting DOM snapshots and step-by-step execution fast and intuitive.

---

## Project Structure

The project follows the **Page Object Model (POM)** design pattern to keep locators, test logic, and test data cleanly separated and easy to maintain:

```text
├── config/
│   └── testData.ts        # User credentials, checkout data, and expected UI strings
├── pages/
│   ├── LoginPage.ts       # Locators & actions for authentication
│   ├── InventoryPage.ts   # Locators & actions for inventory grid, sorting, & cart
│   └── CheckoutPage.ts    # Locators & actions for checkout form & order confirmation
├── tests/
│   ├── login.spec.ts      # TC_01 & TC_02 (Standard & Locked-out user tests)
│   └── checkout.spec.ts   # TC_03 & TC_05 (Price sorting & E2E Checkout tests)
├── playwright.config.ts   # Base Playwright test runner configuration
└── package.json

```

---

##  Getting Started

### Prerequisites

Make sure you have **Node.js** (v18 or higher recommended) installed on your machine.

### Setup

1. **Clone the repository:**
```bash
git clone <YOUR_GITHUB_REPO_URL>
cd <YOUR_REPO_NAME>

```


2. **Install dependencies:**
```bash
npm install

```


3. **Install Playwright browsers:**
```bash
npx playwright install

```



---

##  Running the Tests

You can execute the test suite using any of the following commands:

* **Run all tests headlessly (Default):**
```bash
npx playwright test

```


* **Run tests in headed mode (Watch execution in browser):**
```bash
npx playwright test --headed

```


* **Run in Playwright UI Mode (Interactive debugging):**
```bash
npx playwright test --ui

```


* **View the HTML test report:**
```bash
npx playwright show-report

```



---

##  Documentation & Deliverables

For the full test strategy, test scenarios traceability matrix, detailed manual test cases, risk-based prioritization rationale, and exploratory bug reports, please view [SUMMARY.md](./SUMMARY.md)
