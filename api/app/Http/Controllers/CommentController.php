<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    // GET all comments (admin dashboard)
    public function index(Request $request)
    {
        // Admin or authenticated user
        $comments = DB::table('comments')
            ->join('berita_acara', 'comments.post_id', '=', 'berita_acara.id')
            ->select('comments.*', 'berita_acara.title as articleTitle')
            ->orderBy('comments.created_at', 'desc')
            ->get()
            ->map(function ($comment) {
                return $this->formatComment($comment);
            });

        return response($comments, 200);
    }

    // GET comments for a specific post (public - approved only)
    public function postComments($postId)
    {
        $comments = DB::table('comments')
            ->where('post_id', $postId)
            ->where('status', 'approved')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($comment) {
                return $this->formatComment($comment);
            });

        return response($comments, 200);
    }

    // POST create comment for a specific post (public)
    public function store(Request $request, $postId)
    {
        $fields = $request->validate([
            'author' => 'required|string',
            'content' => 'required|string',
        ]);

        $post = DB::table('berita_acara')->where('id', $postId)->first();
        if (!$post) {
            return response(['message' => 'Postingan tidak ditemukan.'], 404);
        }

        $now = now();
        $id = DB::table('comments')->insertGetId([
            'post_id' => $postId,
            'author' => $fields['author'],
            'content' => $fields['content'],
            'status' => 'pending', // Default status for moderation
            'date' => $now,
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        $comment = DB::table('comments')->where('id', $id)->first();
        // Attach articleTitle for response
        $comment->articleTitle = $post->title;

        return response($this->formatComment($comment), 201);
    }

    // PUT update comment status/details (admin only)
    public function update(Request $request, $id)
    {
        $fields = $request->validate([
            'status' => 'required|in:pending,approved,rejected',
            'content' => 'nullable|string',
        ]);

        $comment = DB::table('comments')->where('id', $id)->first();
        if (!$comment) {
            return response(['message' => 'Komentar tidak ditemukan.'], 404);
        }

        $updateData = ['status' => $fields['status']];
        if (isset($fields['content'])) {
            $updateData['content'] = $fields['content'];
        }

        DB::table('comments')->where('id', $id)->update($updateData);

        $updatedComment = DB::table('comments')
            ->join('berita_acara', 'comments.post_id', '=', 'berita_acara.id')
            ->select('comments.*', 'berita_acara.title as articleTitle')
            ->where('comments.id', $id)
            ->first();

        return response($this->formatComment($updatedComment), 200);
    }

    // DELETE comment (admin only)
    public function destroy($id)
    {
        $comment = DB::table('comments')->where('id', $id)->first();
        if (!$comment) {
            return response(['message' => 'Komentar tidak ditemukan.'], 404);
        }

        DB::table('comments')->where('id', $id)->delete();

        return response(['message' => 'Komentar berhasil dihapus.'], 200);
    }

    // Helper to format comment to frontend DTO
    private function formatComment($comment)
    {
        return [
            'id' => (string) $comment->id,
            'postId' => $comment->post_id,
            'author' => $comment->author,
            'content' => $comment->content,
            'status' => $comment->status,
            'articleTitle' => $comment->articleTitle ?? null,
            'date' => $comment->date ? [
                'seconds' => strtotime($comment->date),
                'nanoseconds' => 0
            ] : null,
            'created_at' => $comment->created_at,
        ];
    }
}
