import { expect, test } from '@playwright/test';

import translation from '@public/locales/en/translation.json' assert { type: 'json' };

test('Vehicles ', async ({ page }) => {
  await page.goto('/vehicles');

  // test <>Loading...</Loading>
  await expect(page.getByText('Loading')).toBeVisible();

  // test <h1>Vehicles</h1>
  await expect(
    page.locator('h1', { hasText: translation.page.vehicles.body.h1 }),
  ).toBeVisible();

  // test <Label>Search for  Vehicle</Label> (dynamically loaded)
  await expect(page.getByLabel('Search for Vehicle')).toBeVisible();

  // test <h2>Results (number)</h2>
  await expect(page.locator('h2', { hasText: 'Results (39)' })).toBeVisible();

  // test <h3>[name]</h3>
  await expect(page.locator('h3', { hasText: 'Sand Crawler' })).toBeVisible();

  // Test Autocomplete

  // Focus and type into the Autocomplete input
  //const autocompleteInput = page.getByRole('combobox');

  const autocompleteInput = page.getByPlaceholder('Start typing a name...');
  await autocompleteInput.fill('v');

  // // Wait for the dropdown row to appear
  const row = page.getByRole('option', { name: 'Vulture Droid' });
  await expect(row).toBeVisible();

  // Click/select the row
  await row.click();

  // test <h3>(name)</h3>
  await expect(
    page.locator('h3', { hasText: 'Vulture Droid' }).first(),
  ).toBeVisible();
});
