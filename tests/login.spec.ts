import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TEST_USERS, ERROR_MESSAGES } from '../config/testData';

test.describe('Authentication Suite', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  /**
   * TC_01: Verify successful Login with Standard User
   * 
   * Validates that a user with valid credentials can log in successfully
   * and is redirected to the inventory product list page.
   */
  
  test('TC_01: Verify successful Login with Standard User', async ({ page }) => {
    await loginPage.login(TEST_USERS.STANDARD_USER.username, TEST_USERS.STANDARD_USER.password);
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  /**
   * TC_02: Verify locked out user cannot log in (Negative)
   * 
   * Verifies that the user is unable to log in with a locked-out account, and
   * displays the correct error message.
   */
  test('TC_02: Verify locked out user cannot log in (Negative)', async () => {
    await loginPage.login(TEST_USERS.LOCKED_OUT_USER.username, TEST_USERS.LOCKED_OUT_USER.password);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(ERROR_MESSAGES.LOCKED_OUT);
  });
});