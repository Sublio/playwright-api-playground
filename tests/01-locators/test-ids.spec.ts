import { test, expect } from '@playwright/test';

test('user-facing and test-id locators', async ({ page }) => {
  await page.setContent(`
    <label for="email">Email</label>
    <input id="email" placeholder="you@example.com" />
    <button data-testid="submit-btn">Send</button>
    <p data-testid="status" hidden>Sent!</p>
  `);
  const testEmail = 'test@test.com';
  const emailField = page.getByPlaceholder('you@example.com');
  await emailField.fill(testEmail);
  const emailField2 = page.getByLabel('Email', { exact: true });
  await expect(emailField2).toHaveValue(testEmail);
  const sendButton = page.getByTestId('submit-btn');
  await expect(sendButton).toHaveText('Send');
  await expect(page.getByTestId('status')).toBeHidden();
});
