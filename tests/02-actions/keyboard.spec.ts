import { test, expect } from '@playwright/test';

test('keyboard press escape', async ({ page }) => {
  await page.goto('/key_presses');
  const inputField = page.locator('#target');
  await inputField.press('Escape');
  await expect(page.locator('#result')).toHaveText('You entered: ESCAPE');
});

test('keyboard input abc sequentially', async ({ page }) => {
  await page.goto('/key_presses');
  const inputField = page.locator('#target');
  await inputField.pressSequentially('abc');
  await expect(page.locator('#result')).toHaveText('You entered: C');
});
