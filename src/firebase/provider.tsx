'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect, useMemo } from 'react';
import { api } from '@/lib/api-client';

interface FirebaseContextState {
  firebaseApp: any;
  firestore: any;
  auth: any;
  user: any;
  isUserLoading: boolean;
  userError: Error | null;
  refreshUser: () => Promise<void>;
}

export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('hmjmi_token') : null;
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const currentUser = await api.getMe();
      // Map username to displayName to match Firebase user shape if needed
      setUser({
        ...currentUser,
        displayName: currentUser.username,
      });
      setError(null);
    } catch (err: any) {
      console.error("FirebaseProvider: fetchUser error:", err);
      setUser(null);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const contextValue = useMemo(() => ({
    firebaseApp: null,
    firestore: null,
    auth: null,
    user,
    isUserLoading: isLoading,
    userError: error,
    refreshUser: fetchUser,
  }), [user, isLoading, error]);

  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
    </FirebaseContext.Provider>
  );
};

function useFirebaseContext() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebaseContext must be used within a FirebaseProvider.');
  }
  return context;
}

export const useAuth = () => {
  return null;
};

export const useFirestore = () => {
  return null;
};

export const useFirebaseApp = () => {
  return null;
};

export function useMemoFirebase<T>(factory: () => T, deps: any[]): T {
  return useMemo(factory, deps);
}

export const useUser = () => {
  const { user, isUserLoading, userError, refreshUser } = useFirebaseContext();
  return { user, isUserLoading, userError, refreshUser };
};
