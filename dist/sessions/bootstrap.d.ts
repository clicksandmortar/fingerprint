import { Session } from './types';
export declare const bootstrapSession: ({ appId, setSession }: {
    appId: string;
    setSession: (session: Session) => void;
}) => void;
