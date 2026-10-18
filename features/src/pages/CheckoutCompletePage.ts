import type { Page, Locator } from 'playwright';
import { BasePage } from './BasePage';


export class CheckoutCompletePage extends BasePage {

    readonly completeHeader: Locator;

    constructor(page: Page){

        super(page);

        this.completeHeader = page.locator('[data-test="complete-header"]');
    }

}
