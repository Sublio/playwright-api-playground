import { test, expect } from '@playwright/test';

test('soft assertions', async ({ page }) => {
  await page.goto('/checkboxes');
  const firstCheckbox = page.getByRole('checkbox').first();
  const secondCheckbox = page.getByRole('checkbox').nth(1);
  await expect.soft(firstCheckbox).toBeChecked();
  await expect.soft(secondCheckbox).toBeChecked();
  await expect(page.getByRole('checkbox')).toHaveCount(2);
});
