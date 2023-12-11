import { FullConfig, chromium } from '@playwright/test'
import { fakeCollectorResp } from './response.fake'

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use

  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(baseURL!)
  await page.route('*/**/collector/**', async (route) => {
    const json = fakeCollectorResp

    await route.fulfill({ json })
  })
  await browser.close()
}

export default globalSetup
