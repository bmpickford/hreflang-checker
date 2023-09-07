import { validateHreflang } from "hreflang-checker";
import { Cypress } from "cypress";

Cypress.Commands.add("validateHreflang", (url) => {
  return validateHreflang(url);
});
