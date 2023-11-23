import { Session } from '../sessions/types';
import { Visitor } from './types';
export declare const buildCookie: ({ visitorId }: {
    visitorId: string;
}) => string;
export declare const bootstrapVisitor: ({ setVisitor, session, setSession }: {
    setVisitor: (session: Visitor) => void;
    session: Session;
    setSession: (session: Session) => void;
}) => void;
