'use client';
    
import { useState, useEffect } from 'react';
import {
  DocumentReference,
  onSnapshot,
  DocumentData,
  FirestoreError,
  DocumentSnapshot,
  doc
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useDoc } from '../firestore/use-doc';
import { useFirestore, useUser as useFirebaseUser, useMemoFirebase } from '../provider';


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
 * Hook to access the full user profile data from Firestore.
 * This combines the Firebase Auth user with their profile data.
 */
export const useUserProfile = () => {
  const { user, isUserLoading, userError } = useFirebaseUser();
  const firestore = useFirestore();

  const userProfileRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const {
    data: userProfile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useDoc<UserProfile>(userProfileRef);

  return {
    user,
    userProfile,
    isLoading: isUserLoading || isProfileLoading,
    error: userError || profileError,
  };
};