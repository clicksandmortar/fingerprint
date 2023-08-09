export declare const setCookie: (name: string, value: string) => string | undefined;
export declare const getCookie: (name: string) => string | undefined;
export declare const onCookieChanged: (callback: ({ oldValue, newValue }: {
    oldValue: string;
    newValue: string;
}) => void, interval?: number) => void;
