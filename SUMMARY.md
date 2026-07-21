# SauceDemo Test Suite — Challenge Deliverables

---

## Part 1: Test Scenarios & Traceability Matrix

The manual and automated test cases cover critical functional paths across SauceDemo's e-commerce workflows.

| Test Case ID | Feature / Area | Description | Priority | Automated? |
| --- | --- | --- | --- | --- |
| **TC_01** | Authentication | Verify successful login with valid credentials (`standard_user`) | **P0 (Blocker)** | Yes (`login.spec.ts`) |
| **TC_02** | Authentication | Verify error handling for locked-out user account (`locked_out_user`) | **P0 (Blocker)** | Yes (`login.spec.ts`) |
| **TC_03** | Inventory & Sorting | Verify sorting products by price from Low to High | **P1 (High)** | Yes (`checkout.spec.ts`) |
| **TC_04** | Inventory & Sorting | Verify sorting products alphabetically (A to Z and Z to A) | **P2 (Medium)** | No (Manual only) |
| **TC_05** | Checkout & E2E | Verify complete end-to-end checkout flow from catalog to order confirmation | **P0 (Blocker)** | Yes (`checkout.spec.ts`) |
| **TC_06** | Cart Management | Verify adding and removing individual items from the cart and catalog view | **P1 (High)** | No (Manual only) |
| **TC_07** | Checkout Validation | Verify validation error handling on checkout form when required fields are missing | **P1 (High)** | No (Manual only) |

---

## Part 2: Detailed Manual Test Cases

### TC_01: Valid Login Verification

* **Preconditions:** User is on `https://www.saucedemo.com/`.
* **Priority:** P0
* **Steps:**
  1. Enter `standard_user` into the **Username** field.
  2. Enter `secret_sauce` into the **Password** field.
  3. Click the **Login** button.

* **Expected Result:** User is successfully redirected to `/inventory.html`, the app header displays `"Swag Labs"`, and the inventory grid displays 6 products.

---

### TC_02: Locked-Out User Login Validation

* **Preconditions:** User is on `https://www.saucedemo.com/`. User has locked_out_user username and password.
* **Priority:** P0
* **Steps:**
  1. Enter `locked_out_user` into the **Username** field.
  2. Enter password into the **Password** field.
  3. Click the **Login** button.

* **Expected Result:** Login is blocked, the user remains on the login page, and an error message appears: `"Epic sadface: Sorry, this user has been locked out."`

---

### TC_03: Product Sorting by Price (Low to High)

* **Preconditions:** User is logged in as `standard_user` and on `/inventory.html`.
* **Priority:** P1
* **Steps:**
  1. Click the sort dropdown menu in the top-right corner.
  2. Select **"Price (low to high)"**.

* **Expected Result:** The product list re-orders dynamically. The first displayed item costs **$7.99** (Sauce Labs Onesie) and the last item costs **$49.99** (Sauce Labs Fleece Jacket). Prices are in ascending numerical order.

---

### TC_05: End-to-End Checkout Flow

* **Preconditions:** User is logged in as `standard_user` and on `/inventory.html`.
* **Priority:** P0
* **Steps:**
  1. Click **"Add to cart"** on *Sauce Labs Backpack* ($29.99).
  2. Click the cart badge icon in the top right.
  3. Verify item is in the cart and click **"Checkout"**.
  4. Fill out the shipping form: First Name: `Test`, Last Name: `User`, Postal Code: `12345`.
  5. Click **"Continue"**.
  6. On the Overview page, verify Item Total matches `$29.99` and click **"Finish"**.

* **Expected Result:** Redirected to `/checkout-complete.html` displaying the header `"Thank you for your order!"` and dispatch confirmation text.

---

## Risk-Based Prioritization Strategy (P0 vs. P1 vs. P2)

Test scenarios were prioritized using a **risk-based testing approach**, evaluating both **likelihood of failure** and **business/customer impact**:

* **P0 (Blocker — High Risk / Critical Business Impact):** Authentication and the purchasing pipeline (`TC_01`, `TC_02`, `TC_05`) targets core users journeys. If users cannot log in or complete checkout, revenue drops and customer conversion/retention is reduced/blocked.
* **P1 (High — Medium Risk / Direct User Experience Impact):** Inventory browsing, sorting, cart management, and form validation (`TC_03`, `TC_06`, `TC_07`) represent key functional features. Failures here frustrate users, cause cart abandonment, and impact core usability.
* **P2 (Medium — Low Risk / Minor Impact):** Visual inconsistencies/defects, alternate sorting options (A-Z/Z-A), and UI formatting (`TC_04`) affect convenience but do not prevent a user from discovering products or placing an order.

---

# Part 4: Challenge Summary & Engineering Notes

## 1. Overall Approach & Thought Process

When approaching this challenge, my main goal was to build a test automation suite focusing on maintainability, scalability, and execution speed.

Key design decisions included:

* **Page Object Model (POM):** Separated UI locators and page interaction methods (`pages/`) from test execution specs (`tests/`). This ensures that if SauceDemo updates its DOM, locators only need to be updated in a single class file.
* **Centralized Configuration & Data:** Stored test credentials, checkout details, and expected UI strings inside `config/testData.ts` to eliminate hardcoded values ("magic strings") across spec files.
* **Resilient Locators:** Prioritized user-facing and data attributes (`data-test="..."`) over fragile CSS paths or absolute XPaths to make tests resilient against minor layout changes.

---

## 2. Framework Choice & Justification: Playwright + TypeScript

I chose **Playwright with TypeScript** as the automation framework for the following reasons:

* **Native Language Fit & Familiarity:** TypeScript is Playwright's primary native language, offering robust compile-time type checking, excellent IDE autocompletion, and clean object-oriented structure. Having worked with Playwright and TypeScript in past projects, I was able to build a clean architecture quickly.
* **Speed & Parallelization:** Playwright runs tests out-of-the-box in parallel with isolated browser contexts, making test execution significantly faster than traditional Selenium setups.
* **Auto-Waiting & Resilience:** Built-in auto-waiting and retry capabilities automatically handle dynamic elements before clicks or inputs, eliminating hardcoded sleeps and drastically reducing test flakiness.
* **Native Tooling:** Features like **UI Mode** (`npx playwright test --ui`), trace viewing, automatic failure screenshots, and HTML reporting provide immediate visibility during execution and debugging.

---

## 3. Bugs & Anomalies Discovered During Testing

During exploratory testing across SauceDemo’s user personas, I identified several functional, validation, performance, and visual defects:

1. **`problem_user` — Functional & UI Defects:**
   * **Broken Images & Links:** Product catalog displays broken image links and redirects to incorrect product detail pages.
   * **Cart Mismatches:** Clicking "Add to Cart" adds wrong items to the cart, and certain items cannot be added or removed.
   * **Item #6 Anomaly:** Fails to display price formatting properly, omits proper error messaging, and prevents item removal once added.
   * **Checkout Blocker:** The Last Name input field on the Checkout Information form rejects user input, permanently blocking checkout completion.

2. **`error_user` — Form Validation Defect:**
   * **Missing Input Validation:** Fails to display required field error messages when submitting an empty Checkout Information form, allowing users to illegally proceed to the Overview page.

3. **`performance_glitch_user` — Performance Bottlenecks:**
   * **Latency Delays:** Displays an intentional 5-second loading delay during login, navigation back-clicks, and order placement.

4. **`visual_user` — Layout & Visual Defects:**
   * **UI Misalignment:** Various action buttons, input fields, and page labels are visibly misaligned or do not allow inputs to be entered.

5. **`locked_out_user` — Expected Account Lockout:**
   * **Handled Security Validation:** Confirmed that login is properly blocked with the banner `Epic sadface: Sorry, this user has been locked out.` (Covered in automated test `TC_02`).

---

## 4. Future Improvements (Given More Time)

If given more time, I would like to add:

* **CI/CD Integration:** Set up a **GitHub Actions** workflow (`.github/workflows/playwright.yml`) to automatically run headless execution on every Pull Request.
* **Visual Regression Testing:** Integrate Playwright's native `expect(page).toHaveScreenshot()` assertions to catch visual layout bugs (specifically targeting personas like `visual_user`).
* **Multi-Browser & Cross-Device Coverage:** Expand `playwright.config.ts` to execute tests against WebKit (Safari), Firefox, and mobile viewport emulators.
* **Rich Historical Reporting:** Integrate Allure Report for historical execution trends and embedded video traces upon failure.