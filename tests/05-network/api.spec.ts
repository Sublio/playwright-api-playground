import { test, expect } from '@playwright/test';

test.use({ baseURL: 'https://restful-booker.herokuapp.com' });

test('get bookings', async ({ request }) => {
  const response = await request.get('/booking');
  await expect(response).toBeOK();
  const body = await response.json();
  expect(body.length).toBeGreaterThan(0);
});

test('create booking', async ({ request }) => {
  const response = await request.post('/booking', {
    data: {
      firstname: 'Denis',
      lastname: 'Test',
      totalprice: 100,
      depositpaid: true,
      bookingdates: { checkin: '2026-12-01', checkout: '2026-12-05' },
    },
  });
  await expect(response).toBeOK();
  const body = await response.json();
  expect(body.bookingid).toBeTruthy();
  expect(body.booking.firstname).toBe('Denis');
});

test('delete booking with auth', async ({ request }) => {
  const auth = await request.post('/auth', {
    data: { username: 'admin', password: 'password123' },
  });
  const { token } = await auth.json();

  const created = await request.post('/booking', {
    data: {
      firstname: 'Denis',
      lastname: 'Delete',
      totalprice: 50,
      depositpaid: false,
      bookingdates: { checkin: '2026-12-01', checkout: '2026-12-02' },
    },
  });
  const { bookingid } = await created.json();

  const deleted = await request.delete(`/booking/${bookingid}`, {
    headers: { Cookie: `token=${token}` },
  });
  expect(deleted.status()).toBe(201);

  const after = await request.get(`/booking/${bookingid}`);
  expect(after.status()).toBe(404);
});
