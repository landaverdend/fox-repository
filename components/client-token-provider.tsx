'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { setCookie } from 'cookies-next'; // or js-cookie

export const CLIENT_TOKEN_KEY = 'fox-client-token';

const ClientTokenContext = createContext<string | null>(null);

export function useClientToken() {
  return useContext(ClientTokenContext);
}

type ClientTokenProviderProps = {
  children: React.ReactNode;
};
export default function ClientTokenProvider({ children }: ClientTokenProviderProps) {
  const [clientToken, setClientToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let token = localStorage.getItem(CLIENT_TOKEN_KEY);
      if (!token) {
        token = crypto.randomUUID();
        localStorage.setItem(CLIENT_TOKEN_KEY, token);
      }
      setCookie(CLIENT_TOKEN_KEY, token, {});
      setClientToken(token);
    }
  }, []);

  return <ClientTokenContext.Provider value={clientToken}>{children}</ClientTokenContext.Provider>;
}
