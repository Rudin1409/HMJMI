<?php

namespace App\Http\Controllers;

use App\Models\StructuralMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StructuralMemberController extends Controller
{
    public function index(Request $request)
    {
        $deptId = $request->query('department_id');
        
        $query = StructuralMember::query();
        if ($deptId) {
            $query->where('department_id', $deptId);
        }
        
        $members = $query->orderBy('order_index', 'asc')
                         ->orderBy('id', 'asc')
                         ->get();
                         
        return response()->json($members);
    }

    public function show($id)
    {
        $member = StructuralMember::findOrFail($id);
        return response()->json($member);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'class' => 'required|string|max:255',
            'avatar' => 'nullable|string|max:255',
            'avatar_file' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:1024',
            'instagram' => 'nullable|string|max:255',
            'department_id' => 'required|string|max:255',
            'division_id' => 'nullable|string|max:255',
            'type' => 'required|in:head,member',
            'order_index' => 'nullable|integer',
            'image_rotation' => 'nullable|string|max:255',
            'image_grayscale' => 'nullable|string|max:255',
            'image_object_position' => 'nullable|string|max:255',
            'image_zoom' => 'nullable|string|max:255',
        ]);

        $url = '/anggota/default.webp'; // fallback default image
        
        if ($request->file('avatar_file')) {
            $path = \App\Helpers\ImageOptimizer::optimizeAndSave($request->file('avatar_file'), 'anggota');
            $url = asset('storage/' . $path);
        } elseif ($request->input('avatar')) {
            $url = $request->input('avatar');
        }

        $member = StructuralMember::create([
            'name' => $request->name,
            'role' => $request->role,
            'class' => $request->class,
            'avatar' => $url,
            'instagram' => $request->instagram,
            'department_id' => $request->department_id,
            'division_id' => $request->division_id,
            'type' => $request->type,
            'order_index' => $request->order_index ?? 0,
            'image_rotation' => $request->image_rotation ?? 'rotate-3',
            'image_grayscale' => $request->image_grayscale ?? 'none',
            'image_object_position' => $request->image_object_position ?? 'object-center',
            'image_zoom' => $request->image_zoom ?? 'scale-100',
        ]);

        return response()->json($member, 201);
    }

    public function update(Request $request, $id)
    {
        $member = StructuralMember::findOrFail($id);

        $request->validate([
            'name' => 'nullable|string|max:255',
            'role' => 'nullable|string|max:255',
            'class' => 'nullable|string|max:255',
            'avatar' => 'nullable|string|max:255',
            'avatar_file' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:1024',
            'instagram' => 'nullable|string|max:255',
            'department_id' => 'nullable|string|max:255',
            'division_id' => 'nullable|string|max:255',
            'type' => 'nullable|in:head,member',
            'order_index' => 'nullable|integer',
            'image_rotation' => 'nullable|string|max:255',
            'image_grayscale' => 'nullable|string|max:255',
            'image_object_position' => 'nullable|string|max:255',
            'image_zoom' => 'nullable|string|max:255',
        ]);

        $data = $request->only([
            'name', 'role', 'class', 'instagram', 'department_id', 
            'division_id', 'type', 'order_index', 'image_rotation', 
            'image_grayscale', 'image_object_position', 'image_zoom'
        ]);

        if ($request->file('avatar_file')) {
            // Delete old file if it was uploaded to storage
            if (str_contains($member->avatar, asset('storage/'))) {
                $oldPath = str_replace(asset('storage/'), '', $member->avatar);
                if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }

            $path = \App\Helpers\ImageOptimizer::optimizeAndSave($request->file('avatar_file'), 'anggota');
            $data['avatar'] = asset('storage/' . $path);
        } elseif ($request->has('avatar')) {
            $data['avatar'] = $request->input('avatar');
        }

        $member->update($data);

        return response()->json($member);
    }

    public function destroy($id)
    {
        $member = StructuralMember::findOrFail($id);

        // Delete file if stored locally
        if (str_contains($member->avatar, asset('storage/'))) {
            $filePath = str_replace(asset('storage/'), '', $member->avatar);
            if ($filePath && Storage::disk('public')->exists($filePath)) {
                Storage::disk('public')->delete($filePath);
            }
        }

        $member->delete();

        return response()->json(['message' => 'Anggota pengurus berhasil dihapus.']);
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:structural_members,id',
            'items.*.order_index' => 'required|integer',
        ]);

        foreach ($request->items as $itemData) {
            StructuralMember::where('id', $itemData['id'])->update(['order_index' => $itemData['order_index']]);
        }

        return response()->json(['message' => 'Urutan anggota berhasil diperbarui.']);
    }
}
