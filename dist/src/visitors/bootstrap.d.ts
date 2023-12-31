import { Session } from '../sessions/types';
import { Visitor } from './types';
export declare function getCookieDomain(): string | null;
export declare function correctCookieSubdomain(): string | undefined;
export declare const buildCookie: ({ visitorId }: {
    visitorId: string;
}) => string;
export declare const updateCookieUUID: (cookieData: string | undefined, uuid: string) => string | null;
export declare const updateCookie: (uuid: string) => void;
export declare const bootstrapVisitor: ({ setVisitor, session, setSession, }: {
    setVisitor: (visitor: Visitor) => void;
    session: Session;
    setSession: (session: Session) => void;
}) => void;
