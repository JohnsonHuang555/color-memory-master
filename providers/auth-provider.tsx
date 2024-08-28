'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { useUserSession } from '@/hooks/useUserSession';

type AuthContextData = {
  userSessionId: string | null;
};
const AuthContext = createContext<AuthContextData | undefined>(undefined);

type AuthProviderProps = {
  session: string | null;
  children: React.ReactNode;
};
export function AuthProvider({ session, children }: AuthProviderProps) {
  const userSessionId = useUserSession(session);

  const authContextData: AuthContextData = useMemo(() => {
    return {
      userSessionId,
    };
  }, [userSessionId]);

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const authContextData = useContext(AuthContext);

  // 確保 counterContext 不會是空的
  if (authContextData === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return authContextData;
}
