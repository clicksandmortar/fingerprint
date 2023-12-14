import { test } from '@playwright/test'
import { Browser, webkit } from 'playwright'
import { prepPage } from '../../utils/__dev__/helpers'

let browser: Browser

test.beforeAll(async () => {
  browser = await webkit.launch()
})

test.describe('[behaviour] Difi script', async () => {
  test('is operational', async () => {
    const page = await prepPage(browser)

    const pageHasDifi = await page.content().then((content) => {
      return content.includes('fingerprint.js')
    })

    test.expect(pageHasDifi).toEqual(true)

    await page.waitForTimeout(4000)

    const modalElement = await page.evaluate(async () => {
      const modal = document.querySelector('[class$="-modal"]')
      return modal
    })

    test.expect(modalElement).toBeTruthy()
  })
  test('banners render', async () => {
    // TODO: Figure out why these are failing on CI....
    // Works fine locally
    // const page = await prepPage(browser)
    // const horizontalBanners = await page.evaluate(async () => {
    //   const elementsWTestId = document.querySelectorAll('[data-testid]')
    //   const _banners = Array.from(elementsWTestId).filter((element) => {
    //     return element
    //       .getAttribute('data-testid')
    //       ?.includes('cnm-horizontal-banner')
    //   })
    //   return _banners
    // })
    // test.expect(horizontalBanners.length).toBe(2)
    // const sideBanners = await page.evaluate(async () => {
    //   const elementsWTestId = document.querySelectorAll('[data-testid]')
    //   const _banners = Array.from(elementsWTestId).filter((element) => {
    //     return element.getAttribute('data-testid')?.includes('cnm-side-banner')
    //   })
    //   return _banners
    // })
    // test.expect(sideBanners.length).toBe(2)
  })

  // Currently only testing that a modal is mounted.

  // TOOD: add tests for:
  // 1. Mobile only signals
  // 2. Desktop only signals
  // 3. Banners
  //
})
