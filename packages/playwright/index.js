import { expect } from '@playwright/test';
import { validateIsoCode, validateHreflang } from 'hreflang-checker';

expect.extend({
  toBeAValidHreflangCode(code) {
    if (validateIsoCode(code)) {
      return { pass: true, message: () => `ISO code ${code} is valid` };
    }
    return { pass: false, message: () => `${code} is not a valid code for hreflangs` };
  },
  async toHaveValidHreflangs(page) {
    const url = await page.url();
    try {
      await validateHreflang(url);
      return { pass: true, message: () => `${url} has valid hreflangs` };
    } catch (error) {
      return { pass: false, message: () => error.message };
    }
  },
})
