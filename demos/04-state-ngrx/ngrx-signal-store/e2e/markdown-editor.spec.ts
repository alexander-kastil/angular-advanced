import { test, expect, Page } from '@playwright/test';

const showEditor = async (page: Page) => {
  await page.goto('/demos/app-state');
  const toggleBtn = page.locator('app-side-panel button[mat-mini-fab]').last();
  await toggleBtn.click();
  await expect(page.locator('app-editor-container')).toBeVisible();
};

test.describe('Markdown Editor CRUD', () => {
  test('displays existing comments', async ({ page }) => {
    await showEditor(page);
    await expect(page.locator('app-comments-list .row')).toHaveCount(2);
  });

  test('adds a new comment with markdown preview', async ({ page }) => {
    await showEditor(page);

    await page.locator('button', { hasText: 'Add' }).click();
    await expect(page.locator('app-comment-edit')).toBeVisible();

    await page.locator('app-comment-edit input[matInput]').fill('Test Comment');
    await page.locator('app-comment-edit textarea').fill('## Hello Markdown');

    await expect(page.locator('app-comment-edit .preview markdown h2')).toContainText('Hello Markdown');

    await page.locator('button', { hasText: 'Save' }).click();

    await expect(page.locator('app-comments-list')).toBeVisible();
    await expect(page.locator('app-comments-list .title', { hasText: 'Test Comment' })).toBeVisible();
  });

  test('edits an existing comment', async ({ page }) => {
    await showEditor(page);

    await page.locator('app-comments-list button', { hasText: 'Edit' }).first().click();
    await expect(page.locator('app-comment-edit')).toBeVisible();

    const titleInput = page.locator('app-comment-edit input[matInput]');
    await titleInput.clear();
    await titleInput.fill('Updated Title');

    await page.locator('button', { hasText: 'Save' }).click();

    await expect(page.locator('app-comments-list .title', { hasText: 'Updated Title' })).toBeVisible();
  });

  test('deletes a comment', async ({ page }) => {
    await showEditor(page);

    const initialCount = await page.locator('app-comments-list .row').count();

    await page.locator('app-comments-list button', { hasText: 'Delete' }).first().click();

    await expect(page.locator('app-comments-list .row')).toHaveCount(initialCount - 1);
  });
});
