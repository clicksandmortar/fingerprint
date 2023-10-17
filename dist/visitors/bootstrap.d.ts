import { Visitor } from './types';
import { Session } from '../sessions/types';
export declare const bootstrapVisitor: ({ setVisitor, session, setSession }: {
    setVisitor: (session: Visitor) => void;
    session: Session;
    setSession: (session: Session) => void;
}) => void;
