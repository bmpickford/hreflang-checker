
# hreflang-checker

Easily check your hreflangs are valid


## Installation

```bash
npm install hreflang-checker
```

## Usage/Examples

```typescript
import { validateHreflang } from 'hreflang-checker';

it('should pass', async () => {
  await expect(validateHrefLang('https://myurl.com')).resolves.toBe(true)
})
```
