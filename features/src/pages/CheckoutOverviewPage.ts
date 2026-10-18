import type { Page, Locator } from 'playwright';
import { BasePage } from './BasePage';


export class CheckoutOverviewPage extends BasePage {

    readonly itemNames: Locator;
    readonly itemPrices: Locator;
    readonly subtotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly totalLabel: Locator;
    readonly finishButton: Locator;

    constructor(page: Page){

        super(page);

        this.itemNames = page.locator('[data-test="inventory-item-name"]');
        this.itemPrices = page.locator('[data-test="inventory-item-price"]');
        this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
        this.taxLabel = page.locator('[data-test="tax-label"]');
        this.totalLabel = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }


    async obtenerPrecios(): Promise<number[]> {
        await this.subtotalLabel.waitFor();
        const prices = await this.itemPrices.allInnerTexts();
        return prices.map(toAmount);
    }

    async obtenerSubtotal(): Promise<number> {
        return toAmount(await this.subtotalLabel.innerText());
    }

    async obtenerImpuesto(): Promise<number> {
        return toAmount(await this.taxLabel.innerText());
    }

    async obtenerTotal(): Promise<number> {
        return toAmount(await this.totalLabel.innerText());
    }

    async finalizarCompra(){
        await this.finishButton.click();
    }

}


// "Item total: $39.98" -> 39.98
function toAmount(text: string): number {
    const match = text.match(/\$(\d+(?:\.\d+)?)/);
    if (!match) {
        throw new Error(`No se encontró un monto en el texto: "${text}"`);
    }
    return Number(match[1]);
}
