import { Browser, Page } from '@playwright/test'
import { JSDOM } from 'jsdom'
import { testBaseURL } from '../../../playwright.config'
import { fakeCollectorResp } from '../../behaviours/__test__/response.fake'

export const getLocation = async (page: Page) => {
  return await page.evaluate(() => {
    return window.location
  })
}
export const getDocument = async (page: Page) => {
  return await page.evaluate(() => {
    return window.document
  })
}

export const setDom = (url = `${testBaseURL}/test`) => {
  const dom = new JSDOM(
    `
  <!doctype html>
  <html>
    <head>
      <style>
        body {
          background: white;
        }
      </style>
      <script>
        console.log('yo!);
      </script>
    </head>
    
    <body>
    <h1>Sample test page here.</h1> 
      <button>Capybara? 🐐</button>
    </body>
  </html>`,
    {
      url,
      referrer: url,
      contentType: 'text/html',
      includeNodeLocations: true,
      storageQuota: 10000000
    }
  )

  global.document = dom.window.document
  // @ts-ignore
  global.window = dom.window

  return dom
}

export const getPage = async (browser: Browser) => {
  const page: Page =
    (await browser.contexts()[0]?.pages[0]) || (await browser.newPage())
  return page
}

export const prepPage = async (browser: Browser) => {
  const page = await getPage(browser)

  await page.goto(testBaseURL, {
    waitUntil: 'networkidle',
    timeout: 60000
  })

  await page.route('*/**/collector/**', async (route) => {
    const json = fakeCollectorResp

    await route.fulfill({ json })
  })

  return page
}
