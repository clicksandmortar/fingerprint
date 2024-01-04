import Cookies from 'js-cookie';
export declare const CnMCookie = "_cm";
export declare const CnMIDCookie = "_cm_id";
export declare const cookieAccountJWT = "b2c_token";
export declare const cookieValidDays = 365;
export declare const setCookie: (name: string, value: string, expires: number | undefined, options?: Cookies.CookieAttributes | undefined) => string | undefined;
export declare const getCookie: (name: string) => string | undefined;
export declare const onCookieChanged: (callback: ({ oldValue, newValue, }: {
    oldValue: string;
    newValue: string;
}) => void, interval?: number) => void;
