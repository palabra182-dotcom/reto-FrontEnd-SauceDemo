@compra
Feature: Proceso de compra
  Como un cliente de Sauce Demo
  Quiero completar una compra
  Para poder adquirir los productos que necesito

  Background:
    Given que el usuario estándar ha iniciado sesión
    And agrega los siguientes productos al carrito:
      | producto                 |
      | Sauce Labs Backpack      |
      | Sauce Labs Fleece Jacket |
    And abre el carrito de compras
    And inicia el proceso de compra

  @smoke
  Scenario: Completar la compra hasta la confirmación
    When ingresa sus datos de envío con nombre "Juan", apellido "Pérez" y código postal "15001"
    And continúa al resumen de la compra
    And finaliza la compra
    Then debe ver la confirmación de compra "Thank you for your order!"
    And el carrito debe quedar vacío

  Scenario: Revisar el resumen de la compra antes de confirmarla
    When ingresa sus datos de envío con nombre "Juan", apellido "Pérez" y código postal "15001"
    And continúa al resumen de la compra
    Then el resumen debe mostrar los productos agregados
    And el subtotal debe ser la suma de los precios de los productos
    And el total debe ser el subtotal más los impuestos

  Scenario Outline: No se puede continuar sin completar los datos de envío: falta <campo>
    When ingresa sus datos de envío con nombre "<nombre>", apellido "<apellido>" y código postal "<código postal>"
    And continúa al resumen de la compra
    Then el formulario debe mostrar el error "<mensaje>"

    Examples:
      | campo         | nombre | apellido | código postal | mensaje                        |
      | nombre        |        | Pérez    | 15001         | Error: First Name is required  |
      | apellido      | Juan   |          | 15001         | Error: Last Name is required   |
      | código postal | Juan   | Pérez    |               | Error: Postal Code is required |
