import { test, expect } from '@playwright/test';

test('get bookings', async ({ request }) => {
  const response = await request.get('https://restful-booker.herokuapp.com/booking');
  await expect(response).toBeOK();
  const body = await response.json();
  expect(body.length).toBeGreaterThan(0);
});
