import { test } from '@playwright/test'

import { Browser, chromium } from 'playwright'
import { TriggerModal } from '../TriggerModal'
import { fakeCollectorResp } from './fakeResponse'

let browser: Browser

test.beforeAll(async () => {
  browser = await chromium.launch()
})

test.afterAll(async () => {})

test.describe('check difi working', async () => {
  test('it is mounted', async () => {
    const page = await browser.newPage()
    await page.goto('http://localhost:4000', {
      waitUntil: 'networkidle',
      timeout: 60000
    })

    const pageHasDifi = await page.content().then((content) => {
      return content.includes('fingerprint.js')
    })

    await page.exposeFunction('createPortalExample', TriggerModal)

    await page.route('*/**/collector/**', async (route) => {
      const json = fakeCollectorResp
      await route.fulfill({ json })
    })

    await page.waitForRequest('*/**/collector/**', { timeout: 30000 })

    await page.waitForTimeout(4000)
    const modalElement = await page.evaluate(async () => {
      const modal = document.querySelector('[class$="-modal"]')
      return modal
    })

    test.expect(pageHasDifi).toEqual(true)
    test.expect(modalElement).toBeTruthy()
  })
})
