import { Given, When, Then} from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { expect } from 'playwright/test';
import { USERS } from '../src/data/users';




Given('que el usuario abre la página de inicio de sesión',
    async function (this: CustomWorld){

        await this.loginPage.abrirLogin();
    }
);


Given('que el usuario estándar ha iniciado sesión',
    async function (this: CustomWorld){

        await this.loginPage.abrirLogin();
        await this.loginPage.iniciarSesion(USERS.standard.username, USERS.standard.password);
        await expect(this.inventoryPage.titleText).toHaveText('Products');
    }
);


When('ingresa sus credenciales válidas',

    async function (this: CustomWorld) {

        await this.loginPage.iniciarSesion(USERS.standard.username, USERS.standard.password);

    }
);


When('inicia sesión con usuario bloqueado',

    async function (this: CustomWorld) {

        await this.loginPage.iniciarSesion(USERS.lockedOut.username, USERS.lockedOut.password);

    }
);


When('ingresa el usuario {string} y la contraseña {string}',

    async function (this: CustomWorld, user: string, pass: string) {

        await this.loginPage.iniciarSesion(user, pass);

    }
);


Then('debe acceder correctamente al sistema',

    async function (this: CustomWorld)  {
        await expect(this.inventoryPage.titleText)
            .toHaveText('Products');
    }
);


Then('debe ver el mensaje de error {string}',

    async function (this: CustomWorld, message: string)  {
        await expect(this.loginPage.errorMessage).toHaveText(message);
    }
);
