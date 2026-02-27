import { expect, test } from '@playwright/test';

test.describe('Skills', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/skills');
    await page.waitForSelector('app-skill-row');
  });

  test('should display skills list', async ({ page }) => {
    const rows = page.locator('app-skill-row');
    await expect(rows).not.toHaveCount(0);
  });

  test('should add a new skill', async ({ page }) => {
    const initialCount = await page.locator('app-skill-row').count();
    await page.click('button:has-text("Add")');
    await expect(page.locator('app-skill-row')).toHaveCount(initialCount + 1);
  });

  test('should navigate to skill edit on edit click', async ({ page }) => {
    await page.locator('app-skill-row').first().locator('button').click();
    await expect(page).toHaveURL(/\/skills\/\d+/);
  });

  test('should edit a skill name', async ({ page }) => {
    await page.locator('app-skill-row').first().locator('button').click();
    await expect(page).toHaveURL(/\/skills\/\d+/);
    const nameInput = page.locator('input[placeholder="Name"]');
    await nameInput.clear();
    await nameInput.fill('Updated Skill Name');
    await page.click('button:has-text("Save")');
    await expect(page).toHaveURL('/skills');
  });

  test('should cancel editing a skill', async ({ page }) => {
    await page.locator('app-skill-row').first().locator('button').click();
    await page.click('button:has-text("Cancel")');
    await expect(page).toHaveURL('/skills');
  });
});
