import { test, expect } from '@playwright/test';

test.describe('Split pane layout', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/demos', { waitUntil: 'networkidle' });
        await page.evaluate(() => localStorage.clear());
    });

    test('guide button is NOT visible on demos root (no content)', async ({ page }) => {
        await page.goto('/demos', { waitUntil: 'networkidle' });
        const guideBtn = page.locator('[mattooltip="Toggle Markdown Guide"]');
        await expect(guideBtn).not.toBeVisible();
    });

    test('guide button IS visible on deep-signals demo', async ({ page }) => {
        await page.goto('/demos/deep-signals', { waitUntil: 'networkidle' });
        const guideBtn = page.locator('[mattooltip="Toggle Markdown Guide"]');
        await expect(guideBtn).toBeVisible();
    });

    test('split pane retains position after toggle off and on', async ({ page }) => {
        await page.goto('/demos/deep-signals', { waitUntil: 'networkidle' });

        const guideBtn = page.locator('[mattooltip="Toggle Markdown Guide"]');
        await guideBtn.click();

        const gutter = page.locator('.as-split-gutter').first();
        await expect(gutter).toBeVisible();

        const gutterBox = await gutter.boundingBox();
        if (gutterBox) {
            const cx = gutterBox.x + gutterBox.width / 2;
            const cy = gutterBox.y + gutterBox.height / 2;
            await page.mouse.move(cx, cy);
            await page.mouse.down();
            await page.mouse.move(cx, cy - 150, { steps: 10 });
            await page.mouse.up();
        }

        // Wait for dragEnd to persist to localStorage
        await page.waitForFunction(
            () => {
                const state = JSON.parse(localStorage.getItem('layout-state') || '{}');
                return state.demoPaneSize !== 500;
            },
            { timeout: 5000 }
        );

        const sizeAfterDrag = await page.evaluate(() => {
            const state = JSON.parse(localStorage.getItem('layout-state') || '{}');
            return state.demoPaneSize as number;
        });

        expect(sizeAfterDrag).toBeDefined();
        expect(sizeAfterDrag).not.toBe(500);

        await guideBtn.click();
        await expect(page.locator('.as-split-gutter')).not.toBeVisible();

        await guideBtn.click();
        await expect(gutter).toBeVisible();

        const sizeAfterToggle = await page.evaluate(() => {
            const state = JSON.parse(localStorage.getItem('layout-state') || '{}');
            return state.demoPaneSize as number;
        });

        expect(sizeAfterToggle).toBeCloseTo(sizeAfterDrag, 0);
    });
});
