import { test, expect } from '@playwright/test';

test('upload simple file', async ({ page }) => {
  await page.goto('/upload');
  const uploadPlace = page.locator('#file-upload');
  await uploadPlace.setInputFiles({
    name: 'hello.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('hello playwright'),
  });
  await page.getByRole('button', { name: 'Upload' }).click();
  await expect(page.getByText('File Uploaded!')).toBeVisible();
  await expect(page.getByText('hello.txt')).toBeVisible();
});
