import { DataTable, Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { expect } from 'playwright/test';




When('agrega el producto {string} al carrito',
    async function (this: CustomWorld, product: string){

        await this.inventoryPage.agregarProductoAlCarrito(product);
        this.addedProducts.push(product);
    }
);


Given('agrega los siguientes productos al carrito:',
    async function (this: CustomWorld, table: DataTable){

        for (const { producto } of table.hashes()) {
            await this.inventoryPage.agregarProductoAlCarrito(producto);
            this.addedProducts.push(producto);
        }
    }
);


When('abre el carrito de compras',
    async function (this: CustomWorld){

        await this.inventoryPage.irAlCarrito();
        await expect(this.cartPage.titleText).toHaveText('Your Cart');
    }
);


When('elimina el producto {string} del carrito',
    async function (this: CustomWorld, product: string){

        await this.cartPage.quitarProducto(product);
        this.addedProducts = this.addedProducts.filter(name => name !== product);
    }
);


Then('el contador del carrito debe mostrar {int}',
    async function (this: CustomWorld, quantity: number){

        await expect(this.inventoryPage.cartBadge).toHaveText(String(quantity));
    }
);


Then('el botón del producto {string} debe cambiar a {string}',
    async function (this: CustomWorld, product: string, buttonText: string){

        await expect(this.inventoryPage.productButton(product)).toHaveText(buttonText);
    }
);


Then('el carrito debe contener los productos agregados',
    async function (this: CustomWorld){

        await expect(this.cartPage.itemNames).toHaveText(this.addedProducts);
    }
);
