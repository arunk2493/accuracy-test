import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    expect: { timeout: 5000 },
    reporter: [
        ['list'], // Console output
        ['allure-playwright', { outputFolder: 'allure-results' }], // Allure report integration
    ],
    use: {
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },
    //globalSetup: require.resolve('./src/global-setup.ts'),
    //globalTeardown: require.resolve('./src/global-teardown.ts'),
});
