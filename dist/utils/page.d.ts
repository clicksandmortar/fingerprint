export declare function isUndefined(o?: any): o is undefined;
export declare function getReducedSearchParams(): Record<string, string | undefined>;
/** gets page data to be sent to collecto endpoints */
export declare function getPagePayload(): {
    url: string;
    path: string;
    title: string;
    params: any;
} | null;
export declare function getReferrer(): {
    url: string;
    title: string;
    utm: {
        source: string | undefined;
        medium: string | undefined;
        campaign: string | undefined;
        term: string | undefined;
        content: string | undefined;
    };
};
/**
 * Some apps (like our gatsby based ones) can't
 */
export declare function refreshURL(): void;
