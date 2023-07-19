import React from 'react';
import { VisitorState } from '../visitors/types';
import { SessionState } from '../sessions/types';
interface FingerprintContextInterface {
    session: SessionState;
    visitor: VisitorState;
}
export declare type FingerprintProviderProps = {
    appId: string;
    children: React.ReactNode;
    debug?: boolean;
};
export declare type FingerprintState = {
    session: SessionState;
    visitor: VisitorState;
};
export declare const FingerprintProvider: (props: FingerprintProviderProps) => React.JSX.Element;
export declare const FingerprintContext: React.Context<FingerprintContextInterface>;
export {};
