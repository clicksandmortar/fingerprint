import { Browser, Page } from '@playwright/test';
export declare const getLocation: (page: Page) => Promise<Location>;
export declare const getDocument: (page: Page) => Promise<Document>;
export declare const setDom: (url?: string) => any;
export declare const getBrowserContext: (browser: Browser) => Promise<import("playwright-core").BrowserContext>;
export declare const getPage: (browser: Browser) => Promise<Page>;
export declare const prepPage: (browser: Browser) => Promise<Page>;
