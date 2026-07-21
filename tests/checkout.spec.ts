import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { TEST_USERS, CHECKOUT_DATA, INVENTORY_DATA } from '../config/testData';

test.describe('E-Commerce Core Functional Flows', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login(TEST_USERS.STANDARD_USER.username, TEST_USERS.STANDARD_USER.password);
  });

  /**
   * TC_03: Verify product sorting by Price (Low to High)
   * 
   * Verifies that selecting the 'Price (low to high)' option correctly
   * reorders all inventory items in ascending price order.
   */
  test('TC_03: Verify product sorting by Price (Low to High)', async () => {
    await inventoryPage.selectSortOption(INVENTORY_DATA.SORT_LOW_TO_HIGH);
    const prices = await inventoryPage.getAllProductPrices();
    
    // Verify that prices are strictly in ascending order
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  /**
   * TC_05: Verify complete End-to-End Checkout Flow
   * 
   * Validates that a user can add a product to the cart, complete shipping details,
   * place an order, see the order confirmation message, and verify the cart clears.
   */
  test('TC_05: Verify complete End-to-End Checkout Flow', async () => {
    // 1. Add an item to shopping cart
    await inventoryPage.addItemToCart(INVENTORY_DATA.SAMPLE_ITEM);
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

    // 2. Navigate to the shopping cart, enter checkout information and place the order.
    await checkoutPage.navigateToCartAndInitiateCheckout();
    await checkoutPage.fillShippingInformation(CHECKOUT_DATA.FIRST_NAME, CHECKOUT_DATA.LAST_NAME, CHECKOUT_DATA.POSTAL_CODE);
    await checkoutPage.completeCheckout();

    // 3. Verify checkout success message.
    await expect(checkoutPage.completeHeader).toHaveText(CHECKOUT_DATA.SUCCESS_MESSAGE);
    await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();
  });
});