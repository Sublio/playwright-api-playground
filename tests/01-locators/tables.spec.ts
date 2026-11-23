import { test, expect } from '@playwright/test';

test('find info in tables', async ({ page }) => {
  await page.goto('/tables');
  const firstTable = page.getByRole('table').first();
  const conwayRow = firstTable.getByRole('row').filter({ hasText: 'Conway' });
  await expect(conwayRow).toContainText('tconway@earthlink.net');
  await expect(firstTable.getByRole('row')).toHaveCount(5);
});

test('find info in second table', async ({ page }) => {
  await page.goto('/tables');
  const secondTable = page.getByRole('table').nth(1);
  const rowsWithLink = secondTable
    .getByRole('row')
    .filter({ has: page.getByRole('link', { name: 'edit' }) });
  await expect(rowsWithLink).toHaveCount(4);
  await expect(rowsWithLink.nth(1)).toContainText('Bach');
});
