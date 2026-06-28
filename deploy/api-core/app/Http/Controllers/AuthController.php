<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        // Check email
        $user = User::where('email', $fields['email'])->first();

        // Check password
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Email atau password salah.'
            ], 401);
        }

        // Generate Sanctum token
        $token = $user->createToken('admin-token')->plainTextToken;

        return response([
            'user' => [
                'uid' => $user->firebase_uid ?: (string) $user->id,
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role,
                'departmentId' => $user->department_id,
                'divisionId' => $user->division_id,
                'avatar' => $user->avatar,
                'bio' => $user->bio,
            ],
            'token' => $token
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response([
            'message' => 'Berhasil keluar.'
        ], 200);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        return response([
            'uid' => $user->firebase_uid ?: (string) $user->id,
            'id' => $user->id,
            'username' => $user->username,
            'email' => $user->email,
            'role' => $user->role,
            'departmentId' => $user->department_id,
            'divisionId' => $user->division_id,
            'avatar' => $user->avatar,
            'bio' => $user->bio,
        ], 200);
    }

    // List all users
    public function index(Request $request)
    {
        // Admin only
        if ($request->user()->role !== 'admin') {
            return response(['message' => 'Unauthorized'], 403);
        }

        $users = User::all()->map(function($user) {
            return [
                'id' => (string) $user->id, // Frontend expects string ID
                'uid' => $user->firebase_uid ?: (string) $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role,
                'departmentId' => $user->department_id,
                'divisionId' => $user->division_id,
                'avatar' => $user->avatar,
                'bio' => $user->bio,
            ];
        });

        return response($users, 200);
    }

    // Create user
    public function store(Request $request)
    {
        // Admin only
        if ($request->user()->role !== 'admin') {
            return response(['message' => 'Unauthorized'], 403);
        }

        $fields = $request->validate([
            'username' => 'required|string|min:3',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6',
            'departmentId' => 'required|string',
            'divisionId' => 'nullable|string',
            'role' => 'nullable|string|in:admin,penulis,user',
        ]);

        $user = User::create([
            'username' => $fields['username'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
            'department_id' => $fields['departmentId'],
            'division_id' => $fields['divisionId'] ?? null,
            'avatar' => 'https://placehold.co/100x100.png?text=' . urlencode(substr($fields['username'], 0, 1)),
            'role' => $fields['role'] ?? 'user',
        ]);

        return response([
            'id' => (string) $user->id,
            'uid' => (string) $user->id,
            'username' => $user->username,
            'email' => $user->email,
            'role' => $user->role,
            'departmentId' => $user->department_id,
            'divisionId' => $user->division_id,
            'avatar' => $user->avatar,
        ], 201);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $fields = $request->validate([
            'username' => 'required|string|min:3',
            'avatar' => 'nullable|string',
            'bio' => 'nullable|string|max:1000',
        ]);

        $user->update([
            'username' => $fields['username'],
            'avatar' => $fields['avatar'] ?? $user->avatar,
            'bio' => $fields['bio'] ?? $user->bio,
        ]);

        return response([
            'uid' => $user->firebase_uid ?: (string) $user->id,
            'id' => $user->id,
            'username' => $user->username,
            'email' => $user->email,
            'role' => $user->role,
            'departmentId' => $user->department_id,
            'divisionId' => $user->division_id,
            'avatar' => $user->avatar,
            'bio' => $user->bio,
        ], 200);
    }

    public function updatePassword(Request $request)
    {
        $user = $request->user();

        $fields = $request->validate([
            'password' => 'required|string|min:6',
        ]);

        $user->update([
            'password' => Hash::make($fields['password']),
        ]);

        return response([
            'message' => 'Kata sandi berhasil diperbarui.'
        ], 200);
    }
}
