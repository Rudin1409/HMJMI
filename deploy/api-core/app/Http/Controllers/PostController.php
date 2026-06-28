<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PostController extends Controller
{
    // GET all posts
    public function index(Request $request)
    {
        $query = DB::table('berita_acara')
            ->leftJoin('users', 'berita_acara.user_id', '=', 'users.id')
            ->select(
                'berita_acara.*',
                'users.username as author_name',
                'users.avatar as author_avatar',
                'users.bio as author_bio',
                'users.department_id as author_department_id'
            )
            ->orderBy('berita_acara.date', 'desc');

        // Optional status filter (e.g., only show published for guests)
        if ($request->has('status')) {
            $query->where('berita_acara.status', $request->query('status'));
        }

        $posts = $query->get()->map(function ($post) {
            return $this->formatPost($post);
        });

        return response($posts, 200);
    }

    // GET single post
    public function show($id)
    {
        $post = DB::table('berita_acara')
            ->leftJoin('users', 'berita_acara.user_id', '=', 'users.id')
            ->select(
                'berita_acara.*',
                'users.username as author_name',
                'users.avatar as author_avatar',
                'users.bio as author_bio',
                'users.department_id as author_department_id'
            )
            ->where('berita_acara.id', $id)
            ->first();

        if (!$post) {
            return response(['message' => 'Postingan tidak ditemukan.'], 404);
        }

        return response($this->formatPost($post), 200);
    }

    // POST create post (admin/user)
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required|string|min:5',
            'content' => 'required|string|min:20',
            'imageUrl' => 'nullable|string',
            'imageStyle' => 'nullable|string',
            'category' => 'required|string',
            'status' => 'required|in:draft,published',
            'showAuthorInfo' => 'nullable|boolean',
        ]);

        $postId = Str::random(20); // Generate Firestore-like string ID

        $now = now();
        DB::table('berita_acara')->insert([
            'id' => $postId,
            'title' => $fields['title'],
            'content' => $fields['content'],
            'image_url' => $fields['imageUrl'] ?? null,
            'image_style' => $fields['imageStyle'] ?? null,
            'category' => $fields['category'],
            'status' => $fields['status'],
            'author' => $request->user()->username ?: 'Admin HMJ',
            'user_id' => $request->user()->id,
            'show_author_info' => $request->input('showAuthorInfo', true),
            'likes' => 0,
            'date' => $now,
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        $post = DB::table('berita_acara')
            ->leftJoin('users', 'berita_acara.user_id', '=', 'users.id')
            ->select(
                'berita_acara.*',
                'users.username as author_name',
                'users.avatar as author_avatar',
                'users.bio as author_bio',
                'users.department_id as author_department_id'
            )
            ->where('berita_acara.id', $postId)
            ->first();

        return response($this->formatPost($post), 201);
    }

    // PUT update post
    public function update(Request $request, $id)
    {
        $fields = $request->validate([
            'title' => 'required|string|min:5',
            'content' => 'required|string|min:20',
            'imageUrl' => 'nullable|string',
            'imageStyle' => 'nullable|string',
            'category' => 'required|string',
            'status' => 'required|in:draft,published',
            'showAuthorInfo' => 'nullable|boolean',
        ]);

        $post = DB::table('berita_acara')->where('id', $id)->first();
        if (!$post) {
            return response(['message' => 'Postingan tidak ditemukan.'], 404);
        }

        $now = now();
        DB::table('berita_acara')->where('id', $id)->update([
            'title' => $fields['title'],
            'content' => $fields['content'],
            'image_url' => $fields['imageUrl'] ?? $post->image_url,
            'image_style' => $fields['imageStyle'] ?? $post->image_style,
            'category' => $fields['category'],
            'status' => $fields['status'],
            'show_author_info' => $request->input('showAuthorInfo', true),
            'updated_at' => $now,
        ]);

        $updatedPost = DB::table('berita_acara')
            ->leftJoin('users', 'berita_acara.user_id', '=', 'users.id')
            ->select(
                'berita_acara.*',
                'users.username as author_name',
                'users.avatar as author_avatar',
                'users.bio as author_bio',
                'users.department_id as author_department_id'
            )
            ->where('berita_acara.id', $id)
            ->first();

        return response($this->formatPost($updatedPost), 200);
    }

    // DELETE post
    public function destroy($id)
    {
        $post = DB::table('berita_acara')->where('id', $id)->first();
        if (!$post) {
            return response(['message' => 'Postingan tidak ditemukan.'], 404);
        }

        DB::table('berita_acara')->where('id', $id)->delete();

        return response(['message' => 'Postingan berhasil dihapus.'], 200);
    }

    // POST increment likes (public)
    public function like($id)
    {
        $post = DB::table('berita_acara')->where('id', $id)->first();
        if (!$post) {
            return response(['message' => 'Postingan tidak ditemukan.'], 404);
        }

        DB::table('berita_acara')->where('id', $id)->increment('likes');

        return response(['success' => true], 200);
    }

    // Helper: format database post record to frontend DTO
    private function formatPost($post)
    {
        return [
            'id' => $post->id,
            'title' => $post->title,
            'content' => $post->content,
            'imageUrl' => $post->image_url,
            'imageStyle' => $post->image_style ?? null,
            'category' => $post->category,
            'status' => $post->status,
            'author' => $post->author,
            'likes' => (int) $post->likes,
            'showAuthorInfo' => isset($post->show_author_info) ? (bool) $post->show_author_info : true,
            'authorDetails' => (isset($post->show_author_info) && $post->show_author_info && $post->user_id) ? [
                'name' => $post->author_name ?? $post->author,
                'avatar' => $post->author_avatar,
                'bio' => $post->author_bio,
                'departmentId' => $post->author_department_id,
            ] : null,
            // Convert timestamps to object with seconds/nanoseconds to prevent breaking client parsing
            'date' => $post->date ? [
                'seconds' => strtotime($post->date),
                'nanoseconds' => 0
            ] : null,
            'created_at' => $post->created_at,
            'updated_at' => $post->updated_at,
        ];
    }
}
