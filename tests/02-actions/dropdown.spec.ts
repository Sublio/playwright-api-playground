import { test, expect } from '@playwright/test';

test('check first checkbox', async ({ page }) => {
  await page.goto('/dropdown');
  const dropBox = page.getByRole('combobox');
  await dropBox.selectOption('2');
  await expect(dropBox).toHaveValue('2');
  await dropBox.selectOption({ label: 'Option 1' });
  await expect(dropBox).toHaveValue('1');
});
