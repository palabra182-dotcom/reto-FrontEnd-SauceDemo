
// Sin "paths": Cucumber usa por defecto features/**/*.feature y así
// las rutas pasadas por CLI (p. ej. features/login.feature:14) filtran correctamente.
module.exports = {
  default: {
    requireModule: ["tsx/cjs"],
    require: [
      "features/step-definitions/**/*.ts",
      "features/support/**/*.ts"
    ],
    format: ["progress", "html:reports/cucumber-report.html"]
  }
};
