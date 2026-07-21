import type { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly cartButton: Locator;
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators for checkout page.
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }

  // Navigates to the shopping cart and begins the checkout process.
  async navigateToCartAndInitiateCheckout() {
    await this.cartButton.click();
    await this.checkoutButton.click();
  }
  // Enters the required shipping information and continues to the next step of the checkout process.
  async fillShippingInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }
  // Submits the order by clicking the finish button.
  async completeCheckout() {
    await this.finishButton.click();
  }
}