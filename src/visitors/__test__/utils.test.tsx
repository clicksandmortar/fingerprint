import { Page, test } from '@playwright/test'

import { Browser, chromium } from 'playwright'
import { fakeCollectorResp } from '../../behaviours/__test__/fakeResponse'
import { CnMIDCookie, getCookieDomain } from '../bootstrap'
import { validVisitorId } from '../utils'

const { expect } = test

let browser: Browser

test.beforeAll(async () => {
  browser = await chromium.launch()
})

const getPage = async () => {
  const page: Page =
    (await browser.contexts()[0]?.pages[0]) || (await browser.newPage())
  return page
}

// TODO: extract
const prepPage = async (browser) => {
  const page = await getPage()
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
    await prepPage(browser)
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
  test('User cookie gets updated when visitor ID is returned from API', async () => {
    const outdatedCookie =
      '1234-5678-9012-3456|3c4f6a89-4edb-450e-9962-ba90dfc05466|1991-01-01T14:13:17.000Z'

    const context = await browser.newContext()

    test.step('set outdated cookie', async () => {
      await context?.addCookies([
        {
          name: CnMIDCookie,
          value: outdatedCookie,
          domain: 'localhost',
          path: '/'
        }
      ])

      const oldCookies = await context.cookies()

      console.log({ oldCookies })
      const oldCookie = oldCookies.find((cookie) => cookie.name === CnMIDCookie)

      expect(oldCookies).toBeDefined()
      expect(oldCookie?.value).toEqual(outdatedCookie)
    })
    test.step('outdated cookie is updated', async () => {
      const page = await prepPage(browser)

      await page.route('*/**/collector/**', async (route) => {
        const json = fakeCollectorResp

        await route.fulfill({ json })
      })

      await page.waitForTimeout(5000)

      const cookies = await browser.contexts()[0].cookies()

      const locatedCookie = cookies?.find((cookie) => {
        return cookie.name === CnMIDCookie
      })
      expect(locatedCookie).toBeDefined()

      const splitCookie = (locatedCookie?.value || '').split('|')
      expect(splitCookie.length).toEqual(3)

      expect(splitCookie[0]).toEqual('1234-5678-9012-3456')
      // expect(splitCookie[1]).toEqual(fakeCollectorResp.identifiers?.main) - invalid. session is generted on the fly
      expect(new Date(splitCookie[2])).toBeInstanceOf(Date)
      // expect(fauxCookie)
    })
  })
})
