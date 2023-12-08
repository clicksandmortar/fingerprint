import { Page, test } from '@playwright/test'

import { Browser, chromium } from 'playwright'
import { fakeCollectorResp } from '../../behaviours/__test__/fakeResponse'
import { CnMIDCookie, buildCookie, getCookieDomain } from '../bootstrap'
import { validVisitorId } from '../utils'

const { expect } = test

let browser: Browser

test.beforeAll(async () => {
  browser = await chromium.launch()
})

// TODO: extract
const prepPage = async (browser) => {
  const page: Page =
    (await browser.contexts()[0]?.pages[0]) || (await browser.newPage())

  await page.goto('http://localhost:4000', {
    waitUntil: 'networkidle',
    timeout: 60000
  })

  await page.route('*/**/collector/**', async (route) => {
    const json = fakeCollectorResp

    await route.fulfill({ json })
  })

  return page
}

const getCookie = async (name: string, browser) => {
  const browserContext = await browser.contexts()[0]
  const cookies = await browserContext.cookies()

  const cookie = cookies.find((cookie) => cookie.name === name)
  return cookie
}

test.describe('Visitor stuff', async () => {
  test('get visitor id from the cookie', async () => {
    const cookie = await getCookie(CnMIDCookie, browser)

    const isVisitorIdValid = validVisitorId(cookie?.value || '')
    test.expect(isVisitorIdValid).toBe(true)
  })
  test('getCookieDomain', async () => {
    const domain = await test.step('getCookieDomain', async () => {
      const page = await prepPage(browser)

      await page.goto('https://example.com', {
        waitUntil: 'networkidle',
        timeout: 60000
      })

      const loc = await page.evaluate(() => location)
      globalThis.location = loc

      const domain = getCookieDomain()
      return domain
    })

    expect(domain).toBe('example.com')
  })
  test('buildCookie', async () => {
    const page = await prepPage(browser)

    const fauxCookie = buildCookie({ visitorId: '1234-5678-9012-3456' })
    const splitCookie = fauxCookie.split('|')
    expect(splitCookie.length).toEqual(3)
    // expect(fauxCookie)
  })
})
