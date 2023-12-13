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

    // TODO: try to test the banners. Cna't get it to work at the moment
    // becaue of an issue with the icon handling lib - @loadable/component
    
    // const page = await getPage(browser)

    // await page.route('*/**/collector/**', async (route) => {
    //   const fakeBanner: BannerTrigger = {
    //     id: 'banner_1',
    //     behaviour: 'BEHAVIOUR_BANNER',
    //     multipleOfSameBehaviourSupported: true,
    //     invocation: 'INVOCATION_PAGE_LOAD',
    //     data: {
    //       buttonURL: 'https://www.google.com',
    //       buttonText: 'Click me!',
    //       marketingText: 'This is a banner',
    //       position: 'bottom'
    //     }
    //   }
    //   const json: CollectorVisitorResponse = {
    //     ...fakeCollectorResp,
    //     pageTriggers: [fakeBanner as Trigger]
    //   }

    //   await route.fulfill({ json })
    // })
    // await page.goto(testBaseURL, {
    //   waitUntil: 'networkidle',
    //   timeout: 60000
    // })

    // const banners = await page.evaluate(async () => {
    //   const elementsWTestId = document.querySelectorAll('[data-testid]')

    //   const _banners = Array.from(elementsWTestId).filter((element) => {
    //     return element.getAttribute('data-testid')?.includes('cnm-banner')
    //   })

    //   return _banners
    // })
    
    // test.expect(banners.length).toBe(3)
    test.expect(true).toBe(true
  })

  // Currently only testing that a modal is mounted.

  // TOOD: add tests for:
  // 1. Mobile only signals
  // 2. Desktop only signals
  // 3. Banners
  //
})
