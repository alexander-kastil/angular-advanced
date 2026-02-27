import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:4200';

test.describe('Markdown Editor CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/demos/app-state`);
    await page.waitForSelector('[data-testid="markdown-editor-container"]', { timeout: 10000 });
  });

  test('should display the markdown editor container', async ({ page }) => {
    const editorContainer = page.getByTestId('markdown-editor-container');
    await expect(editorContainer).toBeVisible();
  });

  test('should display existing comments', async ({ page }) => {
    const comment1 = page.getByTestId('comment-item-1');
    const comment2 = page.getByTestId('comment-item-2');

    await expect(comment1).toBeVisible();
    await expect(comment2).toBeVisible();

    const title1 = page.getByTestId('comment-title-1');
    await expect(title1).toContainText('Using @ngrx/store');
  });

  test('should create a new comment with markdown', async ({ page }) => {
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

    const newComment = page.getByText('Test Markdown Comment');
    await expect(newComment).toBeVisible();
  });

  test('should edit an existing comment', async ({ page }) => {
    const editButton1 = page.getByTestId('edit-button-1');
    await editButton1.click();

    const titleInput = page.getByTestId('title-input');
    await expect(titleInput).toHaveValue('Using @ngrx/store');

    await titleInput.fill('Updated Title');

    const commentTextarea = page.getByTestId('comment-textarea');
    await commentTextarea.fill('## Updated Content\n\nThis is updated content with **markdown**.');

    const markdownPreview = page.getByTestId('markdown-preview');
    await expect(markdownPreview.locator('h2')).toContainText('Updated Content');

    const saveButton = page.getByTestId('save-button');
    await saveButton.click();

    await page.waitForTimeout(1000);

    const updatedTitle = page.getByTestId('comment-title-1');
    await expect(updatedTitle).toContainText('Updated Title');
  });

  test('should cancel editing without saving', async ({ page }) => {
    const editButton1 = page.getByTestId('edit-button-1');
    await editButton1.click();

    const titleInput = page.getByTestId('title-input');
    await titleInput.fill('Should Not Save');

    const cancelButton = page.getByTestId('cancel-button');
    await cancelButton.click();

    const originalTitle = page.getByTestId('comment-title-1');
    await expect(originalTitle).toContainText('Using @ngrx/store');
    await expect(originalTitle).not.toContainText('Should Not Save');
  });

  test('should delete a comment', async ({ page }) => {
    const deleteButton2 = page.getByTestId('delete-button-2');
    await deleteButton2.click();

    await page.waitForTimeout(1000);

    const comment2 = page.getByTestId('comment-item-2');
    await expect(comment2).not.toBeVisible();
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

    const firstComment = page.getByText('Sequential Test 1');
    const secondComment = page.getByText('Sequential Test 2');

    await expect(firstComment).toBeVisible();
    await expect(secondComment).toBeVisible();
  });
});
