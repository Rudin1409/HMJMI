'use client';

import { useEffect, useRef } from 'react';
import { incrementVisitorCount } from '@/services/analytics';
import { format } from 'date-fns';

export function VisitorTracker() {
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const trackVisit = async () => {
            try {
                const STORAGE_KEY = 'visitor-tracking';
                const today = format(new Date(), 'yyyy-MM-dd');
                const stored = localStorage.getItem(STORAGE_KEY);

                let shouldIncrement = false;

                if (!stored) {
                    // New visitor
                    shouldIncrement = true;
                } else {
                    try {
                        const parsed = JSON.parse(stored);
                        if (parsed.lastVisited !== today) {
                            // Returning visitor, new day
                            shouldIncrement = true;
                        }
                    } catch (e) {
                        // Invalid JSON, treat as new
                        shouldIncrement = true;
                    }
                }

                if (shouldIncrement) {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify({ lastVisited: today }));
                    await incrementVisitorCount();
                }
            } catch (error) {
                console.error("Visitor tracking failed:", error);
            }
        };

        trackVisit();
    }, []);

    return null;
}
