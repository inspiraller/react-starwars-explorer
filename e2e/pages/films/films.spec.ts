import { expect, test } from '@playwright/test';

import translation from '@public/locales/en/translation.json' assert { type: 'json' };

test('Films ', async ({ page }) => {
  await page.goto('/films');

  // test <>Loading...</Loading>
  await expect(page.getByText('Loading')).toBeVisible();

  // test <h1>Films</h1>
  await expect(
    page.locator('h1', { hasText: translation.page.films.body.h1 }),
  ).toBeVisible();

  // using same logic as other tests..
  // leaving as there should be 9 films. this may update in the future.
});
