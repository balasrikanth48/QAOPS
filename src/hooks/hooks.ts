import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page } from "@playwright/test";
import { pageFixture } from "./pageFixture";


let browser : Browser;
let context : BrowserContext;
BeforeAll(async function()  {
     browser = await chromium.launch({ headless: false });
})

Before(async function()  {
    context = await browser.newContext();
     const page = await browser.newPage();
     pageFixture.page = page;


});

After(async function({pickle})  {
   const img = await pageFixture.page.screenshot({ path: `./test-result/screenshot/"${pickle.name}.png` });
   await this.attach(img, 'image/png');


    await  pageFixture.page?.close();
    await context.close();

});

AfterAll(async function()  {
    await  browser.close();

})