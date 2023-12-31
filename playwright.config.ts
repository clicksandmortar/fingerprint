import { defineConfig, devices } from '@playwright/test'
import { resolve } from 'path'

const PORT = process.env.PORT || 4000

export const testBaseURL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: 'src',
  fullyParallel: true,
  timeout: 120 * 1000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? 'html' : 'line',

  use: {
    baseURL: testBaseURL,
    trace: 'on-first-retry',
    video: 'on',
    permissions: []
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },

    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    }
  ],

  webServer: {
    command: `npx serve ${resolve(__dirname)} -l ${PORT}`,
    url: testBaseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe'
  }
})
