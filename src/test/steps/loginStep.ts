import { Given ,When,Then} from '@cucumber/cucumber'
import { expect ,Browser,Page, chromium } from '@playwright/test';

let browser : Browser;
let page : Page;

Given('User navigates to the application', async function () {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    await page.goto('https://bookcart.azurewebsites.net/')
})

Given('User click on the login link', async function () {
    await page.locator("//span[normalize-space(text())='Login']").click();
});

Given('User enter the username as {string}', async function (username) {
   await page.locator("//input[@formcontrolname='username']").fill(username);
});

Given('User enter the password as {string}', async function (password) {
    await page.locator("//input[@formcontrolname='password']").fill(password);
})

When('User click on the login button', async function () {
   await page.locator("//span[text()='Login']").click();
});


Then('Login should be success', async function () {
 
})

When('Login should fail', async function () {
    
});