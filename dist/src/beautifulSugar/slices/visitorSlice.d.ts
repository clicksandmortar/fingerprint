import { StateCreator } from 'zustand';
import { Session } from '../../sessions/types';
import { Visitor } from '../../visitors/types';
import { DifiStore } from '../types';
export declare type VisitorSlice = {
    visitor: Visitor;
    setVisitor: (visitor: Partial<Visitor>) => void;
    session: Session;
    setSession: (session: Partial<Session>) => void;
};
export declare const createVisitorSlice: StateCreator<DifiStore, [], [], VisitorSlice>;
export declare const useVisitor: () => Visitor & import("zustand/esm/vanilla").StoreApi<DifiStore>;
