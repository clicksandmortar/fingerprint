import { getEnvVars } from './getEnvVars';

const headers = { 'Content-Type': 'application/json' };

export const hostname = getEnvVars().FINGERPRINT_API_HOSTNAME;

export const request = {
  get: async (url: string, params: any) => await fetch(`${url}?${new URLSearchParams(params)}`, {
    method: 'GET',
    headers,
  }),
  post: async (url: string, body: any) => await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }),
  patch: async (url: string, body: any) => await fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body),
  }),
  put: async (url: string, body: any) => await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  }),
  delete: async (url: string) => await fetch(url, {
    method: 'DELETE',
    headers,
  }),
};
