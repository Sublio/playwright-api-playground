import { test, expect } from '@playwright/test';

test('retry until success', async ({ page }) => {
  await page.goto('/notification_message_rendered');

  await expect(async () => {
    await page.getByRole('link', { name: 'Click here' }).click();
    await expect(page.locator('#flash')).toContainText('Action successful', { timeout: 1000 });
  }).toPass({ timeout: 15_000 });
});
