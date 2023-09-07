
# hreflang-checker

Easily check your hreflangs are valid using Playwright


## Installation

```bash
npm install @hreflang-checker/playwright
```

```ts
// playwright.config.ts
import '@hreflang-checker/playwright';
```
## Usage/Examples

```typescript
test(`hreflang for https://myurl.com is valid`, async ({ page }) => {
    await page.goto('https://myurl.com');
    await expect(page).toHaveValidHreflangs();
});
```
