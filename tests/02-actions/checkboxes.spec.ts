import { test, expect } from '@playwright/test';

test('check first checkbox', async ({ page }) => {
  await page.goto('/checkboxes');
  const firstCheckbox = page.getByRole('checkbox').first();
  await firstCheckbox.check();
  await expect(firstCheckbox).toBeChecked();
});

test('uncheck second checkbox', async ({ page }) => {
  await page.goto('/checkboxes');
  const secondCheckbox = page.getByRole('checkbox').nth(1);
  await expect(secondCheckbox).toBeChecked();
  await secondCheckbox.uncheck();
  await expect(secondCheckbox).not.toBeChecked();
});
