import { test, expect } from '@playwright/test';

test('find info in frames', async ({ page }) => {
  await page.goto('/nested_frames');
  const topFrame = page.locator('frame[name="frame-top"]').contentFrame();
  const middleFrame = topFrame.locator('frame[name="frame-middle"]').contentFrame();
  const bottomFrame = page.locator('frame[name="frame-bottom"]').contentFrame();
  await expect(middleFrame.getByText('MIDDLE')).toBeVisible();
  await expect(bottomFrame.getByText('BOTTOM')).toBeVisible();
});
