import type { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productSortDropdown: Locator;
  readonly inventoryItemPrice: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Locators for the product sort dropdown, inventory item prices, and shopping cart badge.
    this.productSortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItemPrice = page.locator('[data-test="inventory-item-price"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }
  // Selects a sorting option from the product sort dropdown.
  async selectSortOption(optionValue: string) {
    await this.productSortDropdown.selectOption(optionValue);
  }
  // Gets all of the product prices displayed on the inventory page and returns them as an array of numbers.
  async getAllProductPrices(): Promise<number[]> {
    const priceTexts = await this.inventoryItemPrice.allTextContents();
    return priceTexts.map(price => parseFloat(price.replace('$', '')));
  }
  // Adds an item to the shopping cart by clicking the "Add to Cart" button based on the item name.
  async addItemToCart(itemName: string) {
    const formattedName = itemName.toLowerCase().replace(/\s+/g, '-');
    const addToCartButton = this.page.locator(`[data-test="add-to-cart-${formattedName}"]`);
    await addToCartButton.click();
  }
}