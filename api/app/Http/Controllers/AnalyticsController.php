<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AnalyticsController extends Controller
{
    // POST increment visitor count (public)
    public function visit()
    {
        try {
            $today = Carbon::today()->format('Y-m-d');

            // 1. Increment total site stats
            DB::table('site_stats')->updateOrInsert(
                ['id' => 1],
                ['visitor_count' => DB::raw('visitor_count + 1'), 'updated_at' => now()]
            );

            // 2. Increment daily visits
            DB::table('daily_visits')->updateOrInsert(
                ['visit_date' => $today],
                ['count' => DB::raw('count + 1'), 'updated_at' => now()]
            );

            return response(['success' => true], 200);
        } catch (\Exception $e) {
            return response(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    // GET site stats (total visits)
    public function stats()
    {
        $stats = DB::table('site_stats')->where('id', 1)->first();
        $visitorCount = $stats ? $stats->visitor_count : 0;

        return response(['visitorCount' => (int) $visitorCount], 200);
    }

    // GET daily visits (default 7 days)
    public function dailyVisits(Request $request)
    {
        $days = (int) $request->query('days', 7);
        
        $dates = [];
        for ($i = $days - 1; $i >= 0; $i--) {
            $dates[] = Carbon::today()->subDays($i)->format('Y-m-d');
        }

        // Fetch existing visits
        $visits = DB::table('daily_visits')
            ->whereIn('visit_date', $dates)
            ->get()
            ->keyBy('visit_date');

        $results = [];
        foreach ($dates as $date) {
            $results[] = [
                'date' => $date,
                'count' => isset($visits[$date]) ? (int) $visits[$date]->count : 0
            ];
        }

        return response($results, 200);
    }

    // GET popularity statistics
    public function popularity()
    {
        try {
            // 1. Top 5 posts sorted by likes
            $topPosts = DB::table('berita_acara')
                ->select('id', 'title', 'category', 'likes')
                ->orderBy('likes', 'desc')
                ->limit(5)
                ->get()
                ->map(function ($post) {
                    return [
                        'id' => $post->id,
                        'title' => $post->title,
                        'category' => $post->category,
                        'likes' => (int) $post->likes,
                    ];
                });

            // 2. Popular categories weighted by likes (likes + 1)
            $popularCategories = DB::table('berita_acara')
                ->select('category as name', DB::raw('SUM(likes + 1) as count'))
                ->groupBy('category')
                ->orderBy('count', 'desc')
                ->limit(5)
                ->get()
                ->map(function ($cat) {
                    return [
                        'name' => $cat->name,
                        'count' => (int) $cat->count,
                    ];
                });

            return response([
                'topPosts' => $topPosts,
                'popularCategories' => $popularCategories
            ], 200);
        } catch (\Exception $e) {
            return response(['topPosts' => [], 'popularCategories' => []], 500);
        }
    }
}
