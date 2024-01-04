import { StateCreator } from 'zustand';
import { Session } from '../../sessions/types';
import { Visitor } from '../../visitors/types';
import { DifiStore, useDifiStore } from '../store';
import { Get, Set } from '../types';

export type VisitorSlice = {
  visitor: Visitor
  setVisitor: (visitor: Partial<Visitor>) => void
  session: Session
  setSession: (session: Partial<Session>) => void
}

export const createVisitorSlice: StateCreator<
  DifiStore,
  [],
  [],
  VisitorSlice
> = (set: Set, _get: Get) => ({
  visitor: {} as Visitor,
  setVisitor: (partialVisitor: Visitor) => set((prev: DifiStore) => ({
    visitor: {
      ...prev.visitor,
      ...partialVisitor,
    },
  })),
  session: {} as Session,
  setSession: (updatedSession: Session) => set({ session: updatedSession }),
});

export const useVisitor = () => useDifiStore((state) => state.visitor);
