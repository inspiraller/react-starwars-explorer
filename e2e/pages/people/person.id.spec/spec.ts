import { expect, test } from '@playwright/test';

test('Person/5 ', async ({ page }) => {
  await page.goto('/people/5');

  // test <h3>[name]</h3>
  await expect(page.locator('h3', { hasText: 'Leia Organa' })).toBeVisible();
});
