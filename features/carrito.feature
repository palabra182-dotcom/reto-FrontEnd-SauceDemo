@carrito
Feature: Carrito de compras
  Como un cliente de Sauce Demo
  Quiero agregar productos al carrito
  Para revisarlos antes de comprarlos

  Background:
    Given que el usuario estándar ha iniciado sesión

  Scenario: Agregar un producto al carrito desde la página de productos
    When agrega el producto "Sauce Labs Backpack" al carrito
    Then el contador del carrito debe mostrar 1
    And el botón del producto "Sauce Labs Backpack" debe cambiar a "Remove"

  Scenario: Ver los productos agregados en el carrito de compras
    When agrega los siguientes productos al carrito:
      | producto              |
      | Sauce Labs Backpack   |
      | Sauce Labs Bike Light |
      | Sauce Labs Onesie     |
    And abre el carrito de compras
    Then el carrito debe contener los productos agregados
    And el contador del carrito debe mostrar 3

  Scenario: Eliminar un producto del carrito de compras
    Given agrega los siguientes productos al carrito:
      | producto                |
      | Sauce Labs Backpack     |
      | Sauce Labs Bolt T-Shirt |
    And abre el carrito de compras
    When elimina el producto "Sauce Labs Backpack" del carrito
    Then el carrito debe contener los productos agregados
    And el contador del carrito debe mostrar 1
