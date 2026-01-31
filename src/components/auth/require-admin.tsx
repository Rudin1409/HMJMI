'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserProfile } from '@/firebase';
import { Loader2, ShieldAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

/**
 * RequireAdmin component - Guards routes that require admin role
 * Redirects to /login if not authenticated, or shows error if not admin
 */
export function RequireAdmin({ children }: { children: React.ReactNode }) {
    const { userProfile, isLoading, user } = useUserProfile();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/login');
        } else if (!isLoading && user && userProfile?.role !== 'admin') {
            router.replace('/admin'); // Redirect non-admins to main dashboard
        }
    }, [user, userProfile, isLoading, router]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user || userProfile?.role !== 'admin') {
        return (
            <div className="flex h-screen items-center justify-center p-4 bg-background">
                <Alert variant="destructive" className="max-w-md">
                    <ShieldAlert className="h-4 w-4" />
                    <AlertTitle>Akses Ditolak</AlertTitle>
                    <AlertDescription>
                        Anda tidak memiliki izin untuk mengakses halaman ini. Hanya administrator yang dapat mengakses area ini.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return <>{children}</>;
}
