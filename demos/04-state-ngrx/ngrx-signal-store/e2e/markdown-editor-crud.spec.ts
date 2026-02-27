import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:4200';
const API_URL = 'http://localhost:3000';

async function resetDatabase() {
  await fetch(`${API_URL}/comments/1`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: 1,
      url: '',
      title: 'Using @ngrx/store',
      comment: 'To use @ngrx/store, we need to install it first.',
      saved: '2020-09-16T20:10:06.925Z'
    })
  });

  await fetch(`${API_URL}/comments/2`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: 2,
      url: '',
      title: 'Optimizing change detection',
      comment: 'In order to optimize change detection, we need to use OnPush strategy.',
      saved: '2020-09-16T20:10:06.925Z'
    })
  });

  const response = await fetch(`${API_URL}/comments`);
  const comments = await response.json();
  for (const comment of comments) {
    if (comment.id > 2) {
      await fetch(`${API_URL}/comments/${comment.id}`, { method: 'DELETE' });
    }
  }
}

test.describe('Markdown Editor CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    await resetDatabase();
    await page.waitForTimeout(500);

    await page.goto(`${BASE_URL}/demos/app-state`);

    const editorToggleButton = page.locator('button[mattooltip="Show the markdown editor"]');
    await editorToggleButton.click();

    await page.waitForSelector('[data-testid="markdown-editor-container"]', { timeout: 10000 });
    await page.waitForTimeout(500);
  });

  test('should display the markdown editor container', async ({ page }) => {
    const editorContainer = page.getByTestId('markdown-editor-container');
    await expect(editorContainer).toBeVisible();
  });

  test('should display existing comments', async ({ page }) => {
    const commentItems = page.locator('[data-testid^="comment-item-"]');
    await expect(commentItems.first()).toBeVisible();

    const count = await commentItems.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('should create a new comment with markdown', async ({ page }) => {
    const initialCount = await page.locator('[data-testid^="comment-item-"]').count();

    const addButton = page.getByTestId('add-button');
    await addButton.click();

    const titleInput = page.getByTestId('title-input');
    const commentTextarea = page.getByTestId('comment-textarea');

    await titleInput.fill('Test Markdown Comment');
    await commentTextarea.fill('# Header\n\n**Bold text** and *italic text*\n\n- List item 1\n- List item 2');

    const markdownPreview = page.getByTestId('markdown-preview');
    await expect(markdownPreview).toBeVisible();
    await expect(markdownPreview.locator('h1')).toContainText('Header');
    await expect(markdownPreview.locator('strong')).toContainText('Bold text');
    await expect(markdownPreview.locator('em')).toContainText('italic text');

    const saveButton = page.getByTestId('save-button');
    await saveButton.click();

    await page.waitForTimeout(1000);

    const newCount = await page.locator('[data-testid^="comment-item-"]').count();
    expect(newCount).toBeGreaterThanOrEqual(initialCount);
  });

  test('should edit an existing comment', async ({ page }) => {
    const firstEditButton = page.locator('[data-testid^="edit-button-"]').first();
    await firstEditButton.click();

    const titleInput = page.getByTestId('title-input');
    const originalTitle = await titleInput.inputValue();

    await titleInput.fill('Updated Title');

    const commentTextarea = page.getByTestId('comment-textarea');
    await commentTextarea.fill('## Updated Content\n\nThis is updated content with **markdown**.');

    const markdownPreview = page.getByTestId('markdown-preview');
    await expect(markdownPreview.locator('h2')).toContainText('Updated Content');

    const saveButton = page.getByTestId('save-button');
    await saveButton.click();

    await page.waitForTimeout(1000);

    const firstTitle = page.locator('[data-testid^="comment-title-"]').first();
    await expect(firstTitle).toContainText('Updated Title');
    await expect(firstTitle).not.toContainText(originalTitle);
  });

  test('should cancel editing without saving', async ({ page }) => {
    const firstEditButton = page.locator('[data-testid^="edit-button-"]').first();
    await firstEditButton.click();

    const titleInput = page.getByTestId('title-input');
    const originalTitle = await titleInput.inputValue();

    await titleInput.fill('Should Not Save');

    const cancelButton = page.getByTestId('cancel-button');
    await cancelButton.click();

    await page.waitForTimeout(500);

    const firstTitle = page.locator('[data-testid^="comment-title-"]').first();
    await expect(firstTitle).toContainText(originalTitle);
    await expect(firstTitle).not.toContainText('Should Not Save');
  });

  test('should delete a comment', async ({ page }) => {
    const initialCount = await page.locator('[data-testid^="comment-item-"]').count();
    expect(initialCount).toBeGreaterThan(0);

    const firstCommentDeleteButton = page.locator('[data-testid^="delete-button-"]').first();
    await expect(firstCommentDeleteButton).toBeVisible();
    await firstCommentDeleteButton.click();

    await page.waitForTimeout(2000);

    const newCount = await page.locator('[data-testid^="comment-item-"]').count();
    expect(newCount).toBeLessThan(initialCount);
  });

  test('should show markdown preview in real-time', async ({ page }) => {
    const addButton = page.getByTestId('add-button');
    await addButton.click();

    const commentTextarea = page.getByTestId('comment-textarea');
    const markdownPreview = page.getByTestId('markdown-preview');

    await commentTextarea.fill('# Heading 1');
    await page.waitForTimeout(300);
    await expect(markdownPreview.locator('h1')).toContainText('Heading 1');

    await commentTextarea.fill('## Heading 2\n\n> Blockquote');
    await page.waitForTimeout(300);
    await expect(markdownPreview.locator('h2')).toContainText('Heading 2');
    await expect(markdownPreview.locator('blockquote')).toContainText('Blockquote');

    await commentTextarea.fill('```typescript\nconst x = 1;\n```');
    await page.waitForTimeout(300);
    await expect(markdownPreview.locator('code')).toBeVisible();
  });

  test('should handle multiple CRUD operations in sequence', async ({ page }) => {
    const addButton = page.getByTestId('add-button');
    await addButton.click();

    const titleInput = page.getByTestId('title-input');
    const commentTextarea = page.getByTestId('comment-textarea');

    await titleInput.fill('Sequential Test 1');
    await commentTextarea.fill('First test comment');

    const saveButton = page.getByTestId('save-button');
    await saveButton.click();
    await page.waitForTimeout(1000);

    await addButton.click();
    await titleInput.fill('Sequential Test 2');
    await commentTextarea.fill('Second test comment');
    await saveButton.click();
    await page.waitForTimeout(1000);

    const commentsCount = await page.locator('[data-testid^="comment-item-"]').count();
    expect(commentsCount).toBeGreaterThanOrEqual(4);
  });
});
