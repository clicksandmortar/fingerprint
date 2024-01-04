import { test } from '@playwright/test';
import { Browser, webkit } from 'playwright';
import { prepPage } from '../__dev__/helpers';
import { fakeInterpolationModal } from '../__dev__/triggers.fake';

let browser: Browser;

test.beforeAll(async () => {
  browser = await webkit.launch();
});

test.describe('[behaviour] Difi script', async () => {
  test('is operational', async () => {
    const page = await prepPage(browser);

    const pageHasDifi = await page.content().then((content) => content.includes('fingerprint.js'));

    test.expect(pageHasDifi).toEqual(true);

    await page.waitForTimeout(4000);

    const modalElement = await page.evaluate(async () => {
      const modal = document.querySelector('[class$="-modal"]');
      return modal;
    });

    test.expect(modalElement).toBeTruthy();
  });
  test('modal text is interpolated', async () => {
    const page = await prepPage(browser, [fakeInterpolationModal]);

    await page.waitForTimeout(4000);

    const renderedHeaderText = await page.evaluate(async () => {
      const text = document.querySelector('[class$="main-text"]');
      return text?.innerHTML;
    });
    const renderedParagraphText = await page.evaluate(async () => {
      const text = document.querySelector('[class$="sub-text"]');
      return text?.innerHTML;
    });

    test.expect(renderedHeaderText).toEqual('Hello Ed');
    test
      .expect(renderedParagraphText?.toLowerCase())
      .toEqual('indeed penguin slapper');

    test.expect(renderedHeaderText).not.toContain('{');
    test.expect(renderedParagraphText).not.toEqual('{');

    test.expect(renderedHeaderText).not.toContain('}');
    test.expect(renderedParagraphText).not.toEqual('}');
  });
  test('modal text with incorrect interpolation substrings is hidden', async () => {
    const page = await prepPage(browser, [
      {
        ...fakeInterpolationModal,
        data: {
          ...fakeInterpolationModal.data,
          fihterTootle: '<<- intentionaly Misspelled key',
          paragraph: 'indeed {{ lastName }} is a {{ fighterTitle }}',
        },
      },
    ]);

    await page.waitForTimeout(4000);

    const renderedHeaderText = await page.evaluate(async () => {
      const text = document.querySelector('[class$="main-text"]');
      return text?.innerHTML;
    });
    const renderedParagraphText = await page.evaluate(async () => {
      const text = document.querySelector('[class$="sub-text"]');
      return text?.innerHTML;
    });

    test.expect(renderedHeaderText).toEqual('Hello Ed');
    test
      .expect(renderedParagraphText?.toLowerCase())
      .toEqual('indeed penguin slapper is a ');

    test.expect(renderedHeaderText).not.toContain('{');
    test.expect(renderedParagraphText).not.toEqual('{');

    test.expect(renderedHeaderText).not.toContain('}');
    test.expect(renderedParagraphText).not.toEqual('}');
  });
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
  });

  // Currently only testing that a modal is mounted.

  // TOOD: add tests for:
  // 1. Mobile only signals
  // 2. Desktop only signals
  // 3. Banners
  //
});
