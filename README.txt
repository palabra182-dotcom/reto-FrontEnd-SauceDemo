===============================================================================
 RETO DE AUTOMATIZACIÓN QA - FRONTEND (SAUCE DEMO)
===============================================================================

Suite de pruebas automatizadas end-to-end para Sauce Demo
(https://www.saucedemo.com/) construida con Playwright + Cucumber (Gherkin)
en TypeScript, aplicando el patrón Page Object Model.

-------------------------------------------------------------------------------
 1. REQUISITOS
-------------------------------------------------------------------------------

  - Node.js 20 o superior
  - npm

-------------------------------------------------------------------------------
 2. INSTALACIÓN
-------------------------------------------------------------------------------

  git clone <url-del-repositorio>
  cd reto
  npm install
  npx playwright install chromium


-------------------------------------------------------------------------------
 3. EJECUCIÓN
-------------------------------------------------------------------------------

  npm test                 Ejecuta toda la suite (14 escenarios).
  npm run test:smoke       Ejecuta solo los escenarios marcados con @smoke.
  npm run typecheck        Verifica los tipos de TypeScript.

  Las pruebas se ejecutan en Chromium con el navegador visible.

  Ejecuciones parciales:

  npx cucumber-js features/compra.feature        Un feature completo
  npx cucumber-js features/login.feature:14      Un escenario (por número de línea)
  npx cucumber-js --name "Acceso exitoso"        Escenarios por nombre
  npx cucumber-js --tags "@carrito"              Escenarios por tag

  Tags disponibles:
    @login     Inicio de sesión
    @carrito   Carrito de compras
    @compra    Proceso de compra
    @smoke     Flujo crítico: compra completa hasta la confirmación


-------------------------------------------------------------------------------
 4. REPORTES
-------------------------------------------------------------------------------

  Cada ejecución genera un reporte HTML en:

    reports/cucumber-report.html

-------------------------------------------------------------------------------
 5. COBERTURA DE LOS CRITERIOS DE ACEPTACIÓN
-------------------------------------------------------------------------------

  1. Iniciar sesión con credenciales válidas
     login.feature   -> Acceso exitoso (standard_user)

  2. No poder iniciar sesión con credenciales inválidas
     login.feature   -> Usuario bloqueado (locked_out_user)
                     -> Contraseña incorrecta
                     -> Usuario inexistente
                     -> Usuario vacío
                     -> Contraseña vacía

  3. Agregar un producto al carrito desde la página de productos
     carrito.feature -> Agregar un producto (el contador muestra 1 y el
                        botón cambia a "Remove")

  4. Ver los productos agregados en el carrito de compras
     carrito.feature -> Ver los productos agregados
                     -> Eliminar un producto del carrito

  5. Completar el proceso de compra hasta la confirmación
     compra.feature  -> Compra completa hasta "Thank you for your order!"
                     -> Revisión del resumen (subtotal y total)
                     -> Validación de datos de envío obligatorios
                        (nombre, apellido y código postal)

  Total: 14 escenarios.


-------------------------------------------------------------------------------
 6. ESTRUCTURA DEL PROYECTO
-------------------------------------------------------------------------------

  features/
    login.feature                  Escenarios de inicio de sesión
    carrito.feature                Escenarios del carrito de compras
    compra.feature                 Escenarios del proceso de compra
    step-definitions/              Implementación de los pasos Gherkin
      login.steps.ts
      cart.steps.ts
      checkout.steps.ts
    src/
      data/users.ts                Credenciales de prueba
      pages/                       Page Objects
        BasePage.ts                Elementos comunes: título y carrito
        LoginPage.ts
        InventoryPage.ts
        CartPage.ts
        CheckoutInformationPage.ts
        CheckoutOverviewPage.ts
        CheckoutCompletePage.ts
    support/
      world.ts                     Contexto compartido por escenario
      hooks.ts                     Apertura y cierre del navegador,
                                   captura de pantalla en fallos
  cucumber.js                      Configuración de Cucumber


-------------------------------------------------------------------------------
 7. CREDENCIALES DE PRUEBA
-------------------------------------------------------------------------------

  Usuario estándar:   standard_user   / secret_sauce
  Usuario bloqueado:  locked_out_user / secret_sauce

