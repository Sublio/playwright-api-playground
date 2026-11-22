import { test, expect } from '@playwright/test';

test('find info in tables', async ({ page }) => {
  await page.goto('/tables');
  const firstTable = page.getByRole('table').first();
  const conwayRow = firstTable.getByRole('row').filter({ hasText: 'Conway' });
  await expect(conwayRow).toContainText('tconway@earthlink.net');
  await expect(firstTable.getByRole('row')).toHaveCount(5);
});