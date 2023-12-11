import { test } from '@playwright/test'

import { Browser, webkit } from 'playwright'
import { cookieAccountJWT } from '../../context/FingerprintContext'
import { Session } from '../../sessions/types'
import {
  CnMIDCookie,
  getCookieDomain,
  updateCookieUUID
} from '../../visitors/bootstrap'
import { Visitor } from '../../visitors/types'
import { validVisitorId } from '../../visitors/utils'
import { fakeCollectorResp } from './response.fake'
import { prepPage } from './testHelpers'

const { expect, describe } = test

let browser: Browser

test.beforeAll(async () => {
  browser = await webkit.launch()
})

const getCookie = async (name: string, browser) => {
  const browserContext = await browser.contexts()[0]
  const cookies = await browserContext.cookies()

  const cookie = cookies.find((cookie) => cookie.name === name)
  return cookie
}

describe('Visitor stuff', async () => {
  test('get visitor id from the cookie', async () => {
    await prepPage(browser)
    const cookie = await getCookie(CnMIDCookie, browser)

    const isVisitorIdValid = validVisitorId(cookie?.value || '')
    test.expect(isVisitorIdValid).toBe(true)
  })

  test('[unit] getCookieDomain', async () => {
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

    await context?.addCookies([
      {
        name: CnMIDCookie,
        value: outdatedCookie,
        domain: 'localhost',
        path: '/',
        secure: true
      }
    ])

    const oldCookies = await context.cookies()

    const oldCookie = oldCookies.find((cookie) => cookie.name === CnMIDCookie)

    expect(oldCookies).toBeDefined()
    expect(oldCookie?.value).toEqual(outdatedCookie)

    const page = await prepPage(browser)

    await page.route('*/**/collector/**', async (route) => {
      const json = fakeCollectorResp

      await route.fulfill({ json })
    })

    const cookies = await browser.contexts()[0].cookies()

    const locatedCookie = cookies?.find((cookie) => {
      return cookie.name === CnMIDCookie
    })
    expect(locatedCookie).toBeDefined()

    const splitCookie = (locatedCookie?.value || '').split('|')
    expect(splitCookie.length).toEqual(3)

    expect(splitCookie[0]).toEqual('1234-5678-9012-3456')
    expect(new Date(splitCookie[2])).toBeInstanceOf(Date)
  })
  test('[unit] updateCookieUUID', async () => {
    await prepPage(browser)

    const cookie = await getCookie(CnMIDCookie, browser)
    const uuid = '1ac5abb8-d64f-456f-bc90-b0b5f314d192'

    expect(cookie.value?.split('|')[0]?.length).toBeGreaterThan(0)
    expect(cookie.value?.split('|')[0]).not.toEqual(uuid)

    const cookieData = cookie?.value || ''
    const newCookie = updateCookieUUID(cookieData, uuid)
    const splitCookie = newCookie?.split('|') || []

    expect(splitCookie.length).toEqual(3)
    expect(splitCookie[0]).toEqual(uuid)
    expect(splitCookie[1]).toEqual(splitCookie[1])
    expect(new Date(splitCookie[2])).toBeInstanceOf(Date)
  })
  test('[impl] updateCookie', async () => {
    // TODO: implement
    expect(true).toBe(true)
  })

  test('(unfinished) [impl] bootstrapVisitor ', async () => {
    // stil fails
    const page = await prepPage(browser)

    let sampleSession = {
      firstVisit: true,
      lastVisit: new Date().toUTCString(),
      visits: 1,
      id: '1234-5678-9012-3456',
      endTime: new Date().toUTCString()
    }

    let visitor = {},
      session = {}
    const setVisitor = (val: Visitor) => (visitor = val)
    const setSession = (val: Session) => (session = val)

    const context = await browser.contexts()[0]
    await context.addCookies([
      {
        name: cookieAccountJWT,
        value: '1234-5678-9012-3456',
        domain: 'localhost',
        path: '/'
      }
    ])

    // const loc = await page.evaluate(() => location)
    // const window = await page.evaluate(() => window)
    // const document = await page.evaluate(() => document)

    // globalThis.window = window
    // globalThis.location = loc
    // globalThis.document = window.document

    // bootstrapVisitor({ setSession, session, setVisitor })

    // expect(visitor).toHaveProperty('id')
    // expect(visitor).toHaveProperty('jwt')

    // expect(session).toHaveProperty('id')
    // expect(session).toHaveProperty('endTime')
    // expect(session).toHaveProperty('lastVisit')
    // expect(session).toHaveProperty('visits')
    // expect(session).toHaveProperty('firstVisit')
  })
})
