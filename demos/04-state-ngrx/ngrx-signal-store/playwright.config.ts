import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: 1,
  globalSetup: './e2e/global-setup.ts',
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'npx json-server db-test.json --port 3000',
      port: 3000,
      reuseExistingServer: true,
    },
    {
      command: 'npx ng serve --port 4200',
      port: 4200,
      reuseExistingServer: true,
      timeout: 60000,
    },
  ],
});
