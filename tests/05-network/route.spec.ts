import { test, expect } from '@playwright/test';

test('mock API response', async ({ page }) => {
  await page.route('**/api/v1/fruits', async (route) => {
    await route.fulfill({ json: [{ name: 'Mocked Mango', id: 1 }] });
  });

  await page.goto('https://demo.playwright.dev/api-mocking');
  await expect(page.getByText('Mocked Mango')).toBeVisible();
});

test('patch real API response', async ({ page }) => {
  await page.route('**/api/v1/fruits', async (route) => {
    const response = await route.fetch();
    const json = await response.json();
    json.push({ name: 'Extra Lychee', id: 999 });
    await route.fulfill({ response, json });
  });

  await page.goto('https://demo.playwright.dev/api-mocking');
  await expect(page.getByText('Extra Lychee')).toBeVisible();
});

test('wait for API response', async ({ page }) => {
  const responsePromise = page.waitForResponse('**/api/v1/fruits');
  await page.goto('https://demo.playwright.dev/api-mocking');
  const response = await responsePromise;

  expect(response.status()).toBe(200);
  const json = await response.json();
  expect(json.length).toBeGreaterThan(0);
});
