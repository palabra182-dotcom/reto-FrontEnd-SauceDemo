import { After, Before, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { CustomWorld } from "./world";
import { chromium } from "playwright";
import { LoginPage } from "../src/pages/LoginPage";
import { InventoryPage } from "../src/pages/InventoryPage";
import { CartPage } from "../src/pages/CartPage";
import { CheckoutInformationPage } from "../src/pages/CheckoutInformationPage";
import { CheckoutOverviewPage } from "../src/pages/CheckoutOverviewPage";
import { CheckoutCompletePage } from "../src/pages/CheckoutCompletePage";


setDefaultTimeout(30 * 1000);


Before (

    async function (this: CustomWorld) {

        this.browser = await chromium.launch({ headless: false });
        this.page = await this.browser.newPage();

        this.loginPage = new LoginPage(this.page);
        this.inventoryPage = new InventoryPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutInformationPage = new CheckoutInformationPage(this.page);
        this.checkoutOverviewPage = new CheckoutOverviewPage(this.page);
        this.checkoutCompletePage = new CheckoutCompletePage(this.page);

    }


);


After (

    async function (this:CustomWorld, { result }) {

        if (result?.status === Status.FAILED && this.page) {
            const screenshot = await this.page.screenshot({ fullPage: true });
            this.attach(screenshot, 'image/png');
        }

        await this.browser?.close();
    }
);
