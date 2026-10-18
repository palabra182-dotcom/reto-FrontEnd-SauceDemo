import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { expect } from 'playwright/test';




When('inicia el proceso de compra',
    async function (this: CustomWorld){

        await this.cartPage.irAlCheckout();
        await expect(this.checkoutInformationPage.titleText).toHaveText('Checkout: Your Information');
    }
);


When('ingresa sus datos de envío con nombre {string}, apellido {string} y código postal {string}',
    async function (this: CustomWorld, firstName: string, lastName: string, postalCode: string){

        await this.checkoutInformationPage.ingresarDatosDeEnvio(firstName, lastName, postalCode);
    }
);


When('continúa al resumen de la compra',
    async function (this: CustomWorld){

        await this.checkoutInformationPage.continuar();
    }
);


When('finaliza la compra',
    async function (this: CustomWorld){

        await this.checkoutOverviewPage.finalizarCompra();
    }
);


Then('el formulario debe mostrar el error {string}',
    async function (this: CustomWorld, message: string){

        await expect(this.checkoutInformationPage.errorMessage).toHaveText(message);
    }
);


Then('el resumen debe mostrar los productos agregados',
    async function (this: CustomWorld){

        await expect(this.checkoutOverviewPage.titleText).toHaveText('Checkout: Overview');
        await expect(this.checkoutOverviewPage.itemNames).toHaveText(this.addedProducts);
    }
);


Then('el subtotal debe ser la suma de los precios de los productos',
    async function (this: CustomWorld){

        const prices = await this.checkoutOverviewPage.obtenerPrecios();
        const expectedSubtotal = prices.reduce((sum, price) => sum + price, 0);

        expect(await this.checkoutOverviewPage.obtenerSubtotal()).toBeCloseTo(expectedSubtotal, 2);
    }
);


Then('el total debe ser el subtotal más los impuestos',
    async function (this: CustomWorld){

        const subtotal = await this.checkoutOverviewPage.obtenerSubtotal();
        const tax = await this.checkoutOverviewPage.obtenerImpuesto();

        expect(await this.checkoutOverviewPage.obtenerTotal()).toBeCloseTo(subtotal + tax, 2);
    }
);


Then('debe ver la confirmación de compra {string}',
    async function (this: CustomWorld, message: string){

        await expect(this.checkoutCompletePage.titleText).toHaveText('Checkout: Complete!');
        await expect(this.checkoutCompletePage.completeHeader).toHaveText(message);
    }
);


Then('el carrito debe quedar vacío',
    async function (this: CustomWorld){

        await expect(this.checkoutCompletePage.cartBadge).toHaveCount(0);
    }
);
