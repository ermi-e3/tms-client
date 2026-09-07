// import { test as setup, expect } from '@playwright/test';

// setup('authenticate as admin', async ({ page }) => {
//   await page.goto('/login');

//   const adminEmail = process.env.TMS_ADMIN_EMAIL ?? process.env.TMS_ADMIN_USER;

//   const adminPassword = process.env.TMS_ADMIN_PASS;

//   if (!adminEmail) {
//     throw new Error('TMS_ADMIN_EMAIL or TMS_ADMIN_USER environment variable is required.');
//   }

//   if (!adminPassword) {
//     throw new Error('TMS_ADMIN_PASS environment variable is required.');
//   }

//   await page.getByLabel(/email|username/i).fill(adminEmail);

//   await page.getByLabel('Password').fill(adminPassword);

//   await page.getByRole('button', { name: 'Sign In' }).click();

//   await expect(
//     page.getByRole('heading', {
//       name: /command center/i,
//     }),
//   ).toBeVisible();

//   await page.context().storageState({
//     path: 'playwright/.auth/admin.json',
//   });
// });

import { test as setup, expect } from '@playwright/test';

setup('authenticate as admin', async ({ page }) => {
  await page.goto('/login');

  const adminEmail = process.env.TMS_ADMIN_EMAIL ?? process.env.TMS_ADMIN_USER;

  const adminPassword = process.env.TMS_ADMIN_PASS;

  if (!adminEmail) {
    throw new Error('TMS_ADMIN_EMAIL or TMS_ADMIN_USER environment variable is required.');
  }

  if (!adminPassword) {
    throw new Error('TMS_ADMIN_PASS environment variable is required.');
  }

  // Login form
  await page.getByLabel(/email|username/i).fill(adminEmail);
  await page.getByLabel('Password').fill(adminPassword);

  // Your actual button says "Login"
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify successful authentication
  await expect(
    page.getByRole('heading', {
      name: /command center/i,
    }),
  ).toBeVisible();

  // Save authenticated browser state
  await page.context().storageState({
    path: 'playwright/.auth/admin.json',
  });
});
