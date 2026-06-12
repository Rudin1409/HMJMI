'use client';

import { useUser as useFirebaseUser } from '../provider';

export interface UserProfile {
    uid: string;
    username: string;
    email: string;
    departmentId: string;
    divisionId?: string;
    avatar?: string;
    role: 'admin' | 'user';
}

/**
 * Hook to access the full user profile data from the REST API.
 * Replaces the original Firestore combination hook.
 */
export const useUserProfile = () => {
  const { user, isUserLoading, userError } = useFirebaseUser();

  return {
    user,
    userProfile: user, // The REST user object contains username, role, departmentId, etc.
    isLoading: isUserLoading,
    error: userError,
  };
};