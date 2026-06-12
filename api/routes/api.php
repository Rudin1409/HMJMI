<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\GalleryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public Auth routes
Route::post('/auth/login', [AuthController::class, 'login']);

// Public Berita Acara (Posts) routes
Route::get('/berita-acara', [PostController::class, 'index']);
Route::get('/berita-acara/{id}', [PostController::class, 'show']);
Route::post('/berita-acara/{id}/like', [PostController::class, 'like']);

// Public Comments routes
Route::get('/berita-acara/{postId}/comments', [CommentController::class, 'postComments']);
Route::post('/berita-acara/{postId}/comments', [CommentController::class, 'store']);

// Public Analytics routes
Route::post('/analytics/visit', [AnalyticsController::class, 'visit']);
Route::get('/analytics/stats', [AnalyticsController::class, 'stats']);
Route::get('/analytics/daily-visits', [AnalyticsController::class, 'dailyVisits']);
Route::get('/analytics/popularity', [AnalyticsController::class, 'popularity']);
Route::get('/gallery-items', [GalleryController::class, 'index']);

// Protected routes (Requires Auth Token)
Route::middleware('auth:sanctum')->group(function () {
    // Auth actions
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::put('/auth/profile', [AuthController::class, 'updateProfile']);
    Route::put('/auth/password', [AuthController::class, 'updatePassword']);
    
    // User management (Admin only check inside controller)
    Route::get('/users', [AuthController::class, 'index']);
    Route::post('/users', [AuthController::class, 'store']);
    
    // Admin Berita Acara actions
    Route::post('/berita-acara', [PostController::class, 'store']);
    Route::put('/berita-acara/{id}', [PostController::class, 'update']);
    Route::delete('/berita-acara/{id}', [PostController::class, 'destroy']);
    
    // Admin Comments moderation
    Route::get('/comments', [CommentController::class, 'index']);
    Route::put('/comments/{id}', [CommentController::class, 'update']);
    Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
    
    // Uploads
    Route::post('/upload', [UploadController::class, 'upload']);

    // Gallery Items Management
    Route::post('/gallery-items', [GalleryController::class, 'store']);
    Route::get('/gallery-items/{id}', [GalleryController::class, 'show']);
    Route::put('/gallery-items/reorder', [GalleryController::class, 'reorder']);
    Route::put('/gallery-items/{id}', [GalleryController::class, 'update']);
    Route::post('/gallery-items/{id}', [GalleryController::class, 'update']); // for compatibility with multipart FormData upload
    Route::delete('/gallery-items/{id}', [GalleryController::class, 'destroy']);
});
