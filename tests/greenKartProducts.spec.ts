import { test, expect } from '@playwright/test';
import { GreenKartPage } from '../src/pages/GreenKartPage';

test.describe('GreenKart - Product Quantity Tests', () => {
    let greenKartPage: GreenKartPage;

    test.beforeEach(async ({ page }) => {
        greenKartPage = new GreenKartPage(page);
        await greenKartPage.navigateToProductsPage();
    });

    test('should increment quantity for the first product (Brocolli)', async ({ page }) => {
        // Get initial product details
        const productName = await greenKartPage.getProductNameByIndex(0);
        const productPrice = await greenKartPage.getProductPriceByIndex(0);
        
        console.log(`Product: ${productName}, Price: ${productPrice}`);

        // Verify initial quantity is 1
        let quantity = await greenKartPage.getQuantityByIndex(0);
        expect(quantity).toBe('1');

        // Click the increment button for the first product
        await greenKartPage.clickIncrementButtonForFirstProduct();

        // Verify quantity increased to 2
        quantity = await greenKartPage.getQuantityByIndex(0);
        expect(quantity).toBe('2');
    });

    test('should increment multiple times for the first product', async ({ page }) => {
        // Verify initial quantity is 1
        let quantity = await greenKartPage.getQuantityByIndex(0);
        expect(quantity).toBe('1');

        // Click increment button 3 times
        for (let i = 0; i < 3; i++) {
            await greenKartPage.clickIncrementButtonForFirstProduct();
        }

        // Verify quantity is now 4
        quantity = await greenKartPage.getQuantityByIndex(0);
        expect(quantity).toBe('4');
    });

    test('should decrement quantity for the first product', async ({ page }) => {
        // First increment to get quantity to 2
        await greenKartPage.clickIncrementButtonForFirstProduct();
        
        let quantity = await greenKartPage.getQuantityByIndex(0);
        expect(quantity).toBe('2');

        // Now decrement
        await greenKartPage.clickDecrementButtonByIndex(0);

        // Verify quantity decreased back to 1
        quantity = await greenKartPage.getQuantityByIndex(0);
        expect(quantity).toBe('1');
    });

    test('should add product to cart after incrementing quantity', async ({ page }) => {
        // Get product details before adding to cart
        const productName = await greenKartPage.getProductNameByIndex(0);
        
        // Increment the quantity
        await greenKartPage.clickIncrementButtonForFirstProduct();
        
        let quantity = await greenKartPage.getQuantityByIndex(0);
        expect(quantity).toBe('2');

        // Add the product to cart
        await greenKartPage.addProductToCartByIndex(0);

        // Verify product was added (you can add more assertions here based on your requirements)
        console.log(`Added product "${productName}" with quantity 2 to cart`);
    });

    test('should increment quantity for different products independently', async ({ page }) => {
        // Increment first product
        await greenKartPage.clickIncrementButtonByIndex(0);
        
        // Increment second product twice
        await greenKartPage.clickIncrementButtonByIndex(1);
        await greenKartPage.clickIncrementButtonByIndex(1);

        // Verify quantities
        let quantity1 = await greenKartPage.getQuantityByIndex(0);
        let quantity2 = await greenKartPage.getQuantityByIndex(1);

        expect(quantity1).toBe('2');
        expect(quantity2).toBe('3');
    });
});
