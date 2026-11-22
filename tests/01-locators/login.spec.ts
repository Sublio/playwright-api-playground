import { test, expect } from '@playwright/test';

test('logs in with valid credentials', async ({ page }) => {
  await page.goto('/login');
  const usernameField = page.getByRole('textbox', { name: 'Username' });
  const passField = page.getByRole('textbox', {name: 'Password'});
  await usernameField.fill('tomsmith');
  await passField.fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('You logged into a secure area')).toBeVisible();
});