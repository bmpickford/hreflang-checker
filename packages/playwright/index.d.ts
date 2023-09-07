export {};
declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toBeAValidHreflangCode(): Promise<R>;
      toHaveValidHreflangs(): Promise<R>;
    }
  }
}
