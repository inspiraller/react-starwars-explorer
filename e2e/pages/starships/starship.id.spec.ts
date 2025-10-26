import { expect, test } from '@playwright/test';

test('Starships/5 ', async ({ page }) => {
  await page.goto('/starships/5');

  // test <h3>[name]</h3>
  await expect(
    page.locator('h3', { hasText: 'Sentinel-class landing craft' }),
  ).toBeVisible();
});
