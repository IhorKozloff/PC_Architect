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