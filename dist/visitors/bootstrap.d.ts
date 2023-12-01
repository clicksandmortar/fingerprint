import { Session } from '../sessions/types';
import { Visitor } from './types';
export declare const CnMCookie = "_cm_id";
export declare function interceptFixCookieForSubdomains(): string | undefined;
export declare const buildCookie: ({ visitorId }: {
    visitorId: string;
}) => string;
export declare const updateCookie: (uuid: string) => void;
export declare const bootstrapVisitor: ({ setVisitor, session, setSession }: {
    setVisitor: (session: Visitor) => void;
    session: Session;
    setSession: (session: Session) => void;
}) => void;
