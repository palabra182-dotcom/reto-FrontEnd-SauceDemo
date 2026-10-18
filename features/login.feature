@login
Feature: Inicio de sesión
  Como un cliente de Sauce Demo
  Quiero poder iniciar sesión
  Para acceder a los productos de la tienda

  Background:
    Given que el usuario abre la página de inicio de sesión

  Scenario: Acceso exitoso
    When ingresa sus credenciales válidas
    Then debe acceder correctamente al sistema

  Scenario: Acceso denegado a un usuario bloqueado
    When inicia sesión con usuario bloqueado
    Then debe ver el mensaje de error "Epic sadface: Sorry, this user has been locked out."

  Scenario Outline: Acceso denegado con credenciales inválidas: <caso>
    When ingresa el usuario "<usuario>" y la contraseña "<contraseña>"
    Then debe ver el mensaje de error "<mensaje>"

    Examples:
      | caso                  | usuario       | contraseña     | mensaje                                                                   |
      | contraseña incorrecta | standard_user | clave_invalida | Epic sadface: Username and password do not match any user in this service |
      | usuario inexistente   | usuario_falso | secret_sauce   | Epic sadface: Username and password do not match any user in this service |
      | usuario vacío         |               | secret_sauce   | Epic sadface: Username is required                                        |
      | contraseña vacía      | standard_user |                | Epic sadface: Password is required                                        |
