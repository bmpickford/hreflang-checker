import { validateHreflang } from 'hreflang-checker';
console.log('importing')

Cypress.Commands.add('validateHreflang', (url) => {
  return validateHreflang(url)
})