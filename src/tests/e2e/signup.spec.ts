import { test, expect } from '@playwright/test';
import { cleanupTestUser } from './helpers/cleanup';

const registerData = {
  name: 'Jack Sparrow',
  email: 'js@gmail.com',
  password: '123123123'
};

test.afterEach(async () => {
  await cleanupTestUser(registerData.email);
});

test('should fill the registration form', async ({ page }) => {
  await page.goto('/signup');

  const heading = page.getByRole('heading', {
    level: 1,
    name: 'Create an account'
  });
  await expect(heading).toBeVisible();

  const name = page.getByLabel('Full Name');
  const email = page.getByLabel('Email');
  const password = page.getByLabel('Password');

  await name.fill(registerData.name);
  await email.fill(registerData.email);
  await password.fill(registerData.password);

  await expect(name).toHaveValue(registerData.name);
  await expect(email).toHaveValue(registerData.email);
  await expect(password).toHaveValue(registerData.password);

  const submit = page.getByRole('button', {
    name: 'Create Account'
  });

  await submit.click();

  await expect(page).toHaveURL(/\/login$/);
});