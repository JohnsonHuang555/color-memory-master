import { useEffect, useState } from 'react';
import { onAuthStateChanged } from '@/lib/auth';

export function useUserSession(initSession: string | null) {
  const [userUid, setUserUid] = useState<string | null>(initSession);

  // Listen for changes to the user session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async authUser => {
      if (authUser) {
        setUserUid(authUser.uid);
      } else {
        setUserUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return userUid;
}
