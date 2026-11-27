import { test, expect } from '@playwright/test';

test('mock API response', async ({ page }) => {
  await page.route('**/api/v1/fruits', async (route) => {
    await route.fulfill({ json: [{ name: 'Mocked Mango', id: 1 }] });
  });

  await page.goto('https://demo.playwright.dev/api-mocking');
  await expect(page.getByText('Mocked Mango')).toBeVisible();
});
