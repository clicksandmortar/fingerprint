import { Page } from '@playwright/test';
import { JSDOM } from 'jsdom';
export declare const getLocation: (page: Page) => Promise<Location>;
export declare const getDocument: (page: Page) => Promise<Document>;
export declare const setDom: (url?: string) => JSDOM;
