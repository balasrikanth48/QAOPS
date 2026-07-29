import { Page, Locator } from '@playwright/test';

export class GreenKartPage {
    readonly page: Page;
    readonly pageURL: string = 'https://rahulshettyacademy.com/seleniumPractise/#/';

    // Header & Navigation
    readonly cartButton: Locator;
    readonly searchBox: Locator;

    // Product Locators
    readonly productContainers: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly addToCartButtons: Locator;

    // Quantity Control Locators
    readonly incrementButtons: Locator;
    readonly decrementButtons: Locator;
    readonly quantityInputs: Locator;

    constructor(page: Page) {
        this.page = page;

        // Header locators
        this.cartButton = page.locator('[href="#"]').filter({ hasText: /^Cart$/ });
        this.searchBox = page.getByPlaceholder('Search for Vegetables and Fruits');

        // Product locators
        this.productContainers = page.locator('div.product');
        this.productNames = page.locator('h4');
        this.productPrices = page.locator('p');
        this.addToCartButtons = page.locator('button:has-text("ADD TO CART")');

        // Quantity control locators
        this.incrementButtons = page.locator('a.increment');
        this.decrementButtons = page.locator('a.decrement');
        this.quantityInputs = page.locator('input[type="number"]');
    }

    /**
     * Navigate to the GreenKart products page
     */
    async navigateToProductsPage(): Promise<void> {
        await this.page.goto(this.pageURL);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Get the increment button for a specific product by index (0-based)
     */
    async getIncrementButtonByProductIndex(index: number): Promise<Locator> {
        return this.page.locator(`div:nth-child(${index + 1}) > .stepper-input > .increment`);
    }

    /**
     * Get the decrement button for a specific product by index (0-based)
     */
    async getDecrementButtonByProductIndex(index: number): Promise<Locator> {
        return this.page.locator(`div:nth-child(${index + 1}) > .stepper-input > .decrement`);
    }

    /**
     * Get the quantity input for a specific product by index (0-based)
     */
    async getQuantityInputByProductIndex(index: number): Promise<Locator> {
        return this.page.locator(`div:nth-child(${index + 1}) > .stepper-input > input`);
    }

    /**
     * Click the increment button for the first product
     */
    async clickIncrementButtonForFirstProduct(): Promise<void> {
        const incrementButton = await this.getIncrementButtonByProductIndex(0);
        await incrementButton.click();
    }

    /**
     * Click the increment button for a specific product by index (0-based)
     */
    async clickIncrementButtonByIndex(index: number): Promise<void> {
        const incrementButton = await this.getIncrementButtonByProductIndex(index);
        await incrementButton.click();
    }

    /**
     * Click the decrement button for a specific product by index (0-based)
     */
    async clickDecrementButtonByIndex(index: number): Promise<void> {
        const decrementButton = await this.getDecrementButtonByProductIndex(index);
        await decrementButton.click();
    }

    /**
     * Get the current quantity for a specific product by index (0-based)
     */
    async getQuantityByIndex(index: number): Promise<string> {
        const quantityInput = await this.getQuantityInputByProductIndex(index);
        return await quantityInput.inputValue();
    }

    /**
     * Add a product to cart by index (0-based)
     */
    async addProductToCartByIndex(index: number): Promise<void> {
        const addToCartButton = this.addToCartButtons.nth(index);
        await addToCartButton.click();
    }

    /**
     * Get the name of a product by index (0-based)
     */
    async getProductNameByIndex(index: number): Promise<string> {
        const productName = this.page.locator(`div:nth-child(${index + 1}) h4`);
        return await productName.textContent() || '';
    }

    /**
     * Get the price of a product by index (0-based)
     */
    async getProductPriceByIndex(index: number): Promise<string> {
        const productPrice = this.page.locator(`div:nth-child(${index + 1}) p`);
        return await productPrice.textContent() || '';
    }

    /**
     * Search for a product
     */
    async searchProduct(productName: string): Promise<void> {
        await this.searchBox.fill(productName);
    }

    /**
     * Click on the cart button
     */
    async clickCartButton(): Promise<void> {
        await this.cartButton.click();
    }
}
