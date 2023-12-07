import { Page } from '@playwright/test'
import { JSDOM } from 'jsdom'

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

export const setDom = (url = 'http://localhost:3000/test') => {
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
  global.window = dom.window

  return dom
}
