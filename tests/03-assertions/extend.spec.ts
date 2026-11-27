import { test, expect } from '@playwright/test';

const myExpect = expect.extend({
  toBeEven(received: number) {
    const pass = received % 2 === 0;
    return {
      pass,
      message: () => `expected ${received} ${pass ? 'not ' : ''}to be even`,
    };
  },
});

test('custom matcher', async ({ page }) => {
  await page.goto('/checkboxes');
  const count = await page.getByRole('checkbox').count();
  myExpect(count).toBeEven();
});