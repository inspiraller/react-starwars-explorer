import { expect, test } from '@playwright/test';

test('Vehicles/5 ', async ({ page }) => {
  await page.goto('/vehicles/6'); // NOTE: 5 not found!

  // test <h3>[name]</h3>
  await expect(page.locator('h3', { hasText: 'T-16 skyhopper' })).toBeVisible();
});
