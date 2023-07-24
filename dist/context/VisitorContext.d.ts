import React from 'react';
export declare type VisitorProviderProps = {
    children?: React.ReactNode;
};
export declare type VisitorContextInterface = {};
export declare const VisitorProvider: ({ children }: VisitorProviderProps) => React.JSX.Element;
export declare const VisitorContext: React.Context<VisitorContextInterface>;
