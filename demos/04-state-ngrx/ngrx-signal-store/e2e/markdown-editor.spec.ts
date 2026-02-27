import { test, expect } from '@playwright/test';

test.describe('Markdown Editor CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos');
    await page.getByRole('button').filter({ hasText: 'create' }).click();
    await expect(page.locator('app-editor-container')).toBeVisible();
  });

  test('should display the editor container on demos page', async ({ page }) => {
    await expect(page.locator('app-editor-container')).toBeVisible();
    await expect(page.locator('app-comments-list')).toBeVisible();
  });

  test('should add a new comment with markdown preview', async ({ page }) => {
    await page.locator('app-editor-container button', { hasText: 'Add' }).click();
    await expect(page.locator('app-comment-edit')).toBeVisible();

    await page.locator('app-comment-edit input[matInput]').fill('Test Markdown Comment');
    await page.locator('app-comment-edit textarea').fill('## Hello\n\nThis is **bold** text.');

    await expect(page.locator('app-comment-edit markdown')).toBeVisible();
    await expect(page.locator('app-comment-edit markdown h2')).toContainText('Hello');

    await Promise.all([
      page.waitForResponse((r) => r.url().includes('/comments') && r.request().method() === 'POST'),
      page.locator('app-editor-container button', { hasText: 'Save' }).click(),
    ]);
    await expect(page.locator('app-comments-list')).toBeVisible();
    await expect(page.locator('app-comments-list .title', { hasText: 'Test Markdown Comment' })).toBeVisible();
  });

  test('should edit an existing comment', async ({ page }) => {
    await expect(page.locator('app-comments-list .row').first()).toBeVisible();

    const editButtons = page.locator('app-comments-list button', { hasText: 'Edit' });
    await editButtons.first().click();
    await expect(page.locator('app-comment-edit')).toBeVisible();

    const titleInput = page.locator('app-comment-edit input[matInput]');
    await titleInput.clear();
    await titleInput.fill('Updated Title');

    await Promise.all([
      page.waitForResponse((r) => r.url().includes('/comments') && r.request().method() === 'PUT'),
      page.locator('app-editor-container button', { hasText: 'Save' }).click(),
    ]);
    await expect(page.locator('app-comments-list')).toBeVisible();
    await expect(page.locator('app-comments-list .title', { hasText: 'Updated Title' })).toBeVisible();
  });

  test('should cancel edit and return to list', async ({ page }) => {
    await page.locator('app-editor-container button', { hasText: 'Add' }).click();
    await expect(page.locator('app-comment-edit')).toBeVisible();

    await page.locator('app-editor-container button', { hasText: 'Cancel' }).click();
    await expect(page.locator('app-comments-list')).toBeVisible();
    await expect(page.locator('app-comment-edit')).not.toBeVisible();
  });

  test('should delete a comment', async ({ page }) => {
    await page.locator('app-editor-container button', { hasText: 'Add' }).click();
    await page.locator('app-comment-edit input[matInput]').fill('Comment To Delete');
    await page.locator('app-comment-edit textarea').fill('Delete me');
    await Promise.all([
      page.waitForResponse((r) => r.url().includes('/comments') && r.request().method() === 'POST'),
      page.locator('app-editor-container button', { hasText: 'Save' }).click(),
    ]);

    await expect(page.locator('app-comments-list .title', { hasText: 'Comment To Delete' }).first()).toBeVisible();

    const targetRow = page.locator('app-comments-list .row', { hasText: 'Comment To Delete' }).first();
    await Promise.all([
      page.waitForResponse((r) => r.url().includes('/comments') && r.request().method() === 'DELETE'),
      targetRow.locator('button', { hasText: 'Delete' }).click(),
    ]);

    await expect(page.locator('app-comments-list .title', { hasText: 'Comment To Delete' })).toHaveCount(0);
  });

  test('should show markdown preview while editing', async ({ page }) => {
    await page.locator('app-editor-container button', { hasText: 'Add' }).click();

    const textarea = page.locator('app-comment-edit textarea');
    await textarea.fill('# Heading\n\n- Item 1\n- Item 2');

    await expect(page.locator('app-comment-edit markdown h1')).toContainText('Heading');
    await expect(page.locator('app-comment-edit markdown li').first()).toContainText('Item 1');
  });
});
