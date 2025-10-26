import { expect, test } from '@playwright/test';

test('Species/5 ', async ({ page }) => {
  await page.goto('/species/5');

  // test <h3>[name]</h3>
  await expect(page.locator('h3', { hasText: 'Hutt' })).toBeVisible();
});
