import { test, expect } from '@playwright/test';

test('drag over column', async ({ page }) => {
  await page.goto('/drag_and_drop');
  const blockA = page.locator('#column-a'); // Text A
  const blockB = page.locator('#column-b'); // Text B
  await expect(blockA).toHaveText('A');
  await blockA.dragTo(blockB);
  await expect(blockA).toHaveText('B');
  await expect(blockB).toHaveText('A');
});
