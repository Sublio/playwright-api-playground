import { test, expect } from '@playwright/test';

test('hover over first picture', async ({ page }) => {
  await page.goto('/hovers');
  const hoverPlace = page.locator('.figure').first();
  await expect(hoverPlace.getByText('name: user1')).toBeHidden();
  await hoverPlace.hover();
  await expect(hoverPlace.getByText('name: user1')).toBeVisible();
});
