import type { Page, Locator } from 'playwright';


// Elementos comunes a todas las páginas de la tienda
export abstract class BasePage {

    readonly page: Page;
    readonly titleText: Locator;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page){

        this.page = page;

        this.titleText = page.locator('[data-test="title"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }


    async irAlCarrito(){
        await this.cartLink.click();
    }

}
