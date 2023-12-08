import { defineConfig, devices } from '@playwright/test'
import { resolve } from 'path'

const PORT = process.env.PORT || 4000
const baseURL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: 'src',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? 'html' : 'line',
  use: {
    baseURL: baseURL,
    trace: 'on-first-retry',
    video: 'on',
    permissions: []
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] }
    // },

    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] }
    // }
  ],

  webServer: {
    command: `npx serve ${resolve(__dirname, 'example')} -l 4000`,
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe'
  }
})
