import { test, expect } from '@playwright/test';


test('poll for', async ({ page }) => {
  await page.goto('/dynamic_loading/2');
  await page.getByRole('button').click();
  await expect.poll(() => page.locator('#finish').textContent(), { timeout: 10_000 }).toBe('Hello World!');
});