import React from 'react';
import { Session } from '../sessions/types';
import { Visitor } from '../visitors/types';
export declare type VisitorProviderProps = {
    children?: React.ReactNode;
};
export declare const VisitorProvider: ({ children }: VisitorProviderProps) => React.JSX.Element;
export declare type VisitorContextInterface = {
    session: Session;
    visitor: Visitor;
};
export declare const VisitorContext: React.Context<VisitorContextInterface>;
export declare const useVisitor: () => VisitorContextInterface;
