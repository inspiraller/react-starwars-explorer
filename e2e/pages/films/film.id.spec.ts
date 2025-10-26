import { expect, test } from '@playwright/test';

test('Films/5 ', async ({ page }) => {
  await page.goto('/films/5');

  // test <h3>[name]</h3>
  await expect(
    page.locator('h3', { hasText: 'Attack of the Clones' }),
  ).toBeVisible();
});
