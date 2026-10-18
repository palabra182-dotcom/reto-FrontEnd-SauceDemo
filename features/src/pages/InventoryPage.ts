import { Locator, Page } from "playwright";
import { BasePage } from "./BasePage";



export class InventoryPage extends BasePage {


    readonly productItems: Locator;

    constructor(page: Page){
        super(page);
        this.productItems = page.locator('[data-test="inventory-item"]');
    }


    productItem(name: string): Locator {
        return this.productItems.filter({ has: this.page.getByText(name, { exact: true }) });
    }

    productButton(name: string): Locator {
        return this.productItem(name).locator('button');
    }

    async agregarProductoAlCarrito(name: string){
        await this.productItem(name).getByRole('button', { name: 'Add to cart' }).click();
    }

}
