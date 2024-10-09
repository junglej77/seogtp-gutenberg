/**
 * Clears the local storage.
 */
export async function clearLocalStorage() {
  await page.evaluate(() => window.localStorage.clear());
}
//# sourceMappingURL=clear-local-storage.js.map