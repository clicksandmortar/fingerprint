export declare const request: {
    get: (url: string, params: any) => Promise<Response>;
    post: (url: string, body: any) => Promise<Response>;
    patch: (url: string, body: any) => Promise<Response>;
    put: (url: string, body: any) => Promise<Response>;
    delete: (url: string) => Promise<Response>;
};
