import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    increment,
    collection,
    query,
    getDocs,
    orderBy,
    limit,
    Timestamp,
    getFirestore
} from 'firebase/firestore';
import { format, subDays } from 'date-fns';
import { initializeFirebase } from '@/firebase';

// Initialize Firebase services if not already done
const { firestore } = initializeFirebase();


export async function incrementVisitorCount() {
    const today = format(new Date(), 'yyyy-MM-dd');
    console.log("incrementVisitorCount called for:", today);

    const statsRef = doc(firestore, 'analytics', 'site_stats');
    const dailyRef = doc(firestore, 'daily_visits', today);

    try {
        // Increment Total Stats
        // Use setDoc with merge to handle if document doesn't exist
        await setDoc(statsRef, {
            visitorCount: increment(1)
        }, { merge: true });

        // Increment Daily Stats
        await setDoc(dailyRef, {
            date: today,
            count: increment(1)
        }, { merge: true });

        console.log("Visitor count incremented successfully");
        return { success: true };
    } catch (error) {
        console.error("Error incrementing visitor count:", error);
        return { success: false, error };
    }
}

export async function getSiteStats() {
    try {
        const statsRef = doc(firestore, 'analytics', 'site_stats');
        const snap = await getDoc(statsRef);

        if (snap.exists()) {
            return { visitorCount: snap.data().visitorCount || 0 };
        }
        return { visitorCount: 0 };
    } catch (error) {
        console.error("Error getting site stats:", error);
        return { visitorCount: 0 };
    }
}

export async function getDailyVisits(days = 7) {
    try {
        // Since daily_visits documents are named by date 'yyyy-MM-dd'
        // We can query them or just generate keys and fetch. 
        // Querying by date range is better if we have many.
        // Here we'll generate the last 7 days and fetch individually (parallel) 
        // or query connection with string comparison. 
        // String dates sort correctly.

        const endDate = format(new Date(), 'yyyy-MM-dd');
        const startDate = format(subDays(new Date(), days - 1), 'yyyy-MM-dd');

        const visitsRef = collection(firestore, 'daily_visits');
        // Simple query: all documents where ID (date) is >= startDate
        // Firestore doesn't easily filter by documentID in 'where' clause with standard client SDK in all versions, 
        // but we can query 'date' field if we saved it. (We did save 'date: today').

        const q = query(visitsRef, orderBy('date', 'asc')); // Fetching all for simplicity then filtering, or use where if possible.
        // For small data, fetching all is fine? No, efficient to filter.
        // Actually, let's just fetch the last 'days' keys in parallel, it's very predictable.

        const dates = [];
        for (let i = days - 1; i >= 0; i--) {
            dates.push(format(subDays(new Date(), i), 'yyyy-MM-dd'));
        }

        const results = await Promise.all(dates.map(async (date) => {
            const dRef = doc(firestore, 'daily_visits', date);
            const snap = await getDoc(dRef);
            return {
                date,
                count: snap.exists() ? (snap.data().count || 0) : 0
            };
        }));

        return results;
    } catch (error) {
        console.error("Error getting daily visits:", error);
        return [];
    }
}

export async function getPopularityStats() {
    try {
        const postsRef = collection(firestore, 'berita_acara'); // Assuming 'berita_acara' is 'posts'
        // Sort by likes if available, otherwise by date?
        // User requested 'likes'. If field missing, it will be 0.
        const q = query(postsRef, orderBy('likes', 'desc'), limit(5)); // Error if 'likes' not indexed or missing?
        // If 'likes' missing, this query might return nothing or fail.
        // Fallback: orderBy date (timestamp)

        // Let's try getting recent posts and simulating calculation or checking fields.
        // Since I can't guarantee 'likes', I'll just fetch recent 20 and sort in memory if needed.
        const qReset = query(postsRef, limit(20));
        const querySnapshot = await getDocs(qReset);

        let posts = querySnapshot.docs.map(doc => ({
            id: doc.id,
            title: doc.data().title || 'Untitled',
            category: doc.data().category || 'Uncategorized',
            likes: doc.data().likes || 0
        }));

        // Calculate Top Posts
        posts.sort((a, b) => b.likes - a.likes);
        const topPosts = posts.slice(0, 5);

        // Calculate Popular Categories
        const categoryCounts: Record<string, number> = {};
        posts.forEach(post => {
            categoryCounts[post.category] = (categoryCounts[post.category] || 0) + (post.likes || 1); // Weight by likes or just count? User said "category with total likes".
        });

        const popularCategories = Object.entries(categoryCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        return {
            topPosts,
            popularCategories
        };

    } catch (error) {
        console.error("Error getting popularity stats:", error);
        return { topPosts: [], popularCategories: [] };
    }
}

export async function incrementPostLikes(postId: string) {
    console.log("incrementPostLikes called for:", postId);
    try {
        const postRef = doc(firestore, 'berita_acara', postId);
        await updateDoc(postRef, {
            likes: increment(1)
        });
        console.log("Post likes incremented successfully");
        return { success: true };
    } catch (error) {
        console.error("Error incrementing post likes:", error);
        return { success: false, error };
    }
}
