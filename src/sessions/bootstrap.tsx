import {
  CnMCookie, cookieValidDays, getCookie, setCookie,
} from '../utils/cookies';
import { Session } from './types';

export const bootstrapSession = ({ appId, setSession }: { appId: string; setSession: (session: Session) => void }) => {
  const session: Session = {
    firstVisit: undefined,
  };

  if (!getCookie(CnMCookie) || getCookie(CnMCookie) !== appId) {
    setCookie(CnMCookie, appId, cookieValidDays);

    setSession(session);

    return;
  }

  if (getCookie(CnMCookie) && getCookie(CnMCookie) === appId) {
    session.firstVisit = false;

    setSession(session);
  }
};
