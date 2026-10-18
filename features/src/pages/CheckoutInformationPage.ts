import type { Page, Locator } from 'playwright';
import { BasePage } from './BasePage';


export class CheckoutInformationPage extends BasePage {

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page){

        super(page);

        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }


    async ingresarDatosDeEnvio(firstName: string, lastName: string, postalCode: string){

        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);

    }

    async continuar(){
        await this.continueButton.click();
    }

}
