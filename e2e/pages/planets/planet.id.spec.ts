import { expect, test } from '@playwright/test';

test('Planets/5 ', async ({ page }) => {
  await page.goto('/planets/5');

  // test <h3>[name]</h3>
  await expect(page.locator('h3', { hasText: 'Dagobah' })).toBeVisible();
});
