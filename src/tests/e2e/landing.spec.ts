import { appConfig } from '@/config/app.config';
import { test, expect } from '@playwright/test';

test('displays the main heading on the landing page', async ({ page }) => {
  await page.goto('/');
  const mainHeading = page.getByRole('heading', {
    level: 1,
    name: appConfig.TEXT.LANDING.HERO.MAIN_HEADING_TEXT.main
  });

  await expect(mainHeading).toBeVisible();
});

test('Hero CTA redirects unauthenticated user to login', async ({ page }) => {
  await page.goto('/');
  const hero = page.getByRole('region', {
    name: `${appConfig.TEXT.LANDING.HERO.MAIN_HEADING_TEXT.main} ${appConfig.TEXT.LANDING.HERO.MAIN_HEADING_TEXT.hightLighted}`
  });
  await expect(hero).toBeVisible();
  const startBuilding = hero.getByRole('link', {
    name: appConfig.TEXT.LANDING.HERO.CTA_BUTTON_MAIN
  });
  await expect(startBuilding).toBeVisible();

  await startBuilding.click();

  await expect(page).toHaveURL(/\/login$/);
});

test('Final CTA redirects unauthenticated user to login', async ({ page }) => {
  await page.goto('/');
  const hero = page.getByRole('region', {
    name: appConfig.TEXT.LANDING.FINAL_CTA.MAIN_HEADING_TEXT
  });
  await expect(hero).toBeVisible();
  const startBuilding = hero.getByRole('button', {
    name: appConfig.TEXT.LANDING.FINAL_CTA.CTA_BUTTON_MAIN
  });
  await expect(startBuilding).toBeVisible();

  await startBuilding.click();

  await expect(page).toHaveURL(/\/login$/);
});