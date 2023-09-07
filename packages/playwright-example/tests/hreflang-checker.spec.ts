import { test, expect } from "@playwright/test";

const VALID_URLS = [
  "http://localhost:3001/valid/en.html",
  "http://localhost:3001/valid/de.html",
  "http://localhost:3001/valid/en-au.html",
  "http://localhost:3001/valid/en-us.html",
];

for (const url of VALID_URLS) {
  test(`hreflang for ${url} is valid`, async ({ page }) => {
    await page.goto(url);
    await expect(page).toHaveValidHreflangs();
  });
}

test('no reciprocal', async ({ page }) => {
  await page.goto('http://localhost:3001/invalid/no-reciprocal.html');
  await expect(page).not.toHaveValidHreflangs();
})

test('invalid code', async ({ page }) => {
  await page.goto('http://localhost:3001/invalid/invalid-code.html');
  await expect(page).not.toHaveValidHreflangs();
})

test('no x default', async ({ page }) => {
  await page.goto('http://localhost:3001/invalid/no-x-default.html');
  await expect(page).not.toHaveValidHreflangs();
})

test('no self reference', async ({ page }) => {
  await page.goto('http://localhost:3001/invalid/no-self-reference.html');
  await expect(page).not.toHaveValidHreflangs();
})