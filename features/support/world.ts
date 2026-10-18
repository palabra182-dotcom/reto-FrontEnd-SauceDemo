import { setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, Page } from "playwright";
import { LoginPage } from "../src/pages/LoginPage";
import { InventoryPage } from "../src/pages/InventoryPage";
import { CartPage } from "../src/pages/CartPage";
import { CheckoutInformationPage } from "../src/pages/CheckoutInformationPage";
import { CheckoutOverviewPage } from "../src/pages/CheckoutOverviewPage";
import { CheckoutCompletePage } from "../src/pages/CheckoutCompletePage";



export class CustomWorld extends World {

    browser!: Browser;
    page!: Page;
    loginPage!: LoginPage;
    inventoryPage!: InventoryPage;
    cartPage!: CartPage;
    checkoutInformationPage!: CheckoutInformationPage;
    checkoutOverviewPage!: CheckoutOverviewPage;
    checkoutCompletePage!: CheckoutCompletePage;

    // Productos agregados durante el escenario, para validarlos luego en carrito y resumen.
    addedProducts: string[] = [];

}


setWorldConstructor(CustomWorld);
