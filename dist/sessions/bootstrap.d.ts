import { SessionState } from './types';
export declare const bootstrapSession: ({ appId, setSession }: {
    appId: string;
    setSession: (session: SessionState) => void;
}) => void;
