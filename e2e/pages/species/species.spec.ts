import { expect, test } from '@playwright/test';

import translation from '@public/locales/en/translation.json' assert { type: 'json' };

test('Species ', async ({ page }) => {
  await page.goto('/species');

  // test <>Loading...</Loading>
  await expect(page.getByText('Loading')).toBeVisible();

  // test <h1>Species</h1>
  await expect(
    page.locator('h1', { hasText: translation.page.species.body.h1 }),
  ).toBeVisible();

  // test <Label>Search for  Person</Label> (dynamically loaded)
  await expect(page.getByLabel('Search for Specie')).toBeVisible();

  // test <h2>Results [number]/h2>
  await expect(page.locator('h2', { hasText: 'Results (37)' })).toBeVisible();

  // test <h3>[name]</h3>
  await expect(page.locator('h3', { hasText: 'Human' })).toBeVisible();

  // Test Autocomplete

  // Focus and type into the Autocomplete input
  //const autocompleteInput = page.getByRole('combobox');

  const autocompleteInput = page.getByPlaceholder('Start typing a name...');
  await autocompleteInput.fill('z');

  // // Wait for the dropdown row to appear
  const row = page.getByRole('option', { name: 'Zabrak' });
  await expect(row).toBeVisible();

  // Click/select the row
  await row.click();

  // test <h3>Biggs Darklighter</h3>
  await expect(page.locator('h3', { hasText: 'Zabrak' }).first()).toBeVisible();
});
