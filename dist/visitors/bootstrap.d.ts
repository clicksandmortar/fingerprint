import { Session } from '../sessions/types';
export declare const bootstrapVisitor: ({ setVisitorId, setVisitorCohort, setVisitorJwt, session, setSession }: {
    setVisitorId: (session: any) => void;
    setVisitorCohort: (session: any) => void;
    setVisitorJwt: (session: any) => void;
    session: Session;
    setSession: (session: Session) => void;
}) => void;
