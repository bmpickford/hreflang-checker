const VALID_URLS = [
  "http://localhost:3001/valid/en.html",
  "http://localhost:3001/valid/de.html",
  "http://localhost:3001/valid/en-au.html",
  "http://localhost:3001/valid/en-us.html",
];

for (const url of VALID_URLS) {
  it(`should pass for url ${url}`, async () => {
    cy.visit(url);
    cy.url().then(url => cy.validateHreflang(url))
  });
}