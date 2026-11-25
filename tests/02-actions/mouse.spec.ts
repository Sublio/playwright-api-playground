import { test, expect } from '@playwright/test';

test('check focus, right click & double click', async ({ page }) => {
  await page.setContent(`
        <button ondblclick="this.textContent='Double clicked'">Double click me</button>
        <div oncontextmenu="this.textContent='Right clicked'; return false">Right click me</div>
        <input placeholder="Focus me" onfocus="this.value='focused'" />
    `);
  const button = page.getByRole('button');
  await expect(button).toHaveText('Double click me');
  await button.dblclick();
  await expect(button).toHaveText('Double clicked');
  const text = page.locator('div');
  await expect(text).toHaveText('Right click me');
  await text.click({ button: 'right' });
  await expect(text).toHaveText('Right clicked');
  const focus = page.getByPlaceholder('Focus me');
  await expect(focus).not.toBeFocused();
  await focus.focus();
  await expect(focus).toBeFocused();
  await expect(focus).toHaveValue('focused');
});
