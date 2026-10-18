import type { Page, Locator } from 'playwright';
import { BasePage } from './BasePage';


export class CartPage extends BasePage {

    readonly cartItems: Locator;
    readonly itemNames: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page){

        super(page);

        this.cartItems = page.locator('[data-test="inventory-item"]');
        this.itemNames = page.locator('[data-test="inventory-item-name"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }


    async quitarProducto(name: string){
        await this.cartItems
            .filter({ has: this.page.getByText(name, { exact: true }) })
            .getByRole('button', { name: 'Remove' })
            .click();
    }

    async irAlCheckout(){
        await this.checkoutButton.click();
    }

}
