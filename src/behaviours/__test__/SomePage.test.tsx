import { test } from '@playwright/test'

import { Browser, chromium } from 'playwright'

let browser: Browser

test.beforeAll(async () => {
  browser = await chromium.launch()
})

test.afterAll(async () => {})

test.describe('check difi working', async () => {
  test('it is mounted', async () => {
    const page = await browser.newPage()
    await page.goto('/', {
      waitUntil: 'networkidle',
      timeout: 60000
    })

    const isVisible = await page.isVisible('div')
    const pageHasDifi = await page.content().then((content) => {
      console.log({ content })
      return content.includes('script')
    })
    test.expect(pageHasDifi).toEqual(true)
  })
})
