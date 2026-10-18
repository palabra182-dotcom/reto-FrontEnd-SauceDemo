import type { Page, Locator } from 'playwright';
import { BasePage } from './BasePage';


export class LoginPage extends BasePage{

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page){

        super(page);

        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }


    async abrirLogin(){
        await this.page.goto('https://www.saucedemo.com/');
    }

    async iniciarSesion(user: string, pass: string){

        await this.usernameInput.fill(user);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();

    }

}
