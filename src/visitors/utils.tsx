import { uuidValidateV4 } from '../utils/uuid';

export const validVisitorId = (id: string) => {
  const splitCookie = id.split('|');
  return uuidValidateV4(splitCookie[0]);
};
