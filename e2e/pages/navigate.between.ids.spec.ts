import { test } from '@playwright/test';

test('navigate between ids: people/1 ', async ({ page }) => {
  await page.goto('/people/1');

  // Click /films
  await page.click('a[href="/films/1"]');
  await page.waitForURL('/films/1');

  // click /starships
  await page.click('a[href="/starships/2"]');
  await page.waitForURL('/starships/2');
});

test('navigate between ids: people/3 ', async ({ page }) => {
  await page.goto('/people/3');

  // Click /species
  await page.click('a[href="/species/2"]');
  await page.waitForURL('/species/2');
});

test('navigate between ids: people/5 ', async ({ page }) => {
  await page.goto('/people/5');

  // Click /vehicles
  await page.click('a[href="/vehicles/30"]');
  await page.waitForURL('/vehicles/30');
});

test('navigate between ids: people/7 ', async ({ page }) => {
  await page.goto('/people/7');

  // Click /planets
  await page.click('a[href="/planets/1"]');
  await page.waitForURL('/planets/1');
});
