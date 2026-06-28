<?php

namespace App\Http\Controllers;

use App\Models\WorkProgram;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class WorkProgramController extends Controller
{
    // GET all work programs
    public function index(Request $request)
    {
        $category = $request->query('category');
        
        $query = WorkProgram::query();
        if ($category) {
            $query->where('category', $category);
        }
        
        $programs = $query->orderBy('order_index', 'asc')
                          ->orderBy('created_at', 'desc')
                          ->get();
                          
        return response()->json($programs, 200);
    }

    // GET single work program
    public function show($id)
    {
        $program = WorkProgram::findOrFail($id);
        return response()->json($program, 200);
    }

    // POST create work program (Admin Only)
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|in:unggulan,pengembangan,komunitas,agenda',
            'department_id' => 'nullable|string|max:50',
            'description' => 'required|string',
            'image_files' => 'nullable|array',
            'image_files.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_url' => 'nullable|string|max:255',
            'link' => 'nullable|string|max:255',
            'icon' => 'nullable|string|max:100',
            'frequency' => 'nullable|string|max:100',
            'type' => 'nullable|string|max:50',
            'benefits' => 'nullable|string',
            'highlights' => 'nullable|string',
            'order_index' => 'nullable|integer',
        ]);

        $data = [
            'title' => $request->title,
            'category' => $request->category,
            'department_id' => $request->department_id,
            'description' => $request->description,
            'link' => $request->link,
            'icon' => $request->icon ?? 'Briefcase',
            'frequency' => $request->frequency,
            'type' => $request->type ?? 'Offline',
            'order_index' => $request->order_index ?? 0,
        ];

        if ($request->has('benefits')) {
            $benefits = $request->benefits;
            $data['benefits'] = is_string($benefits) ? json_decode($benefits, true) : $benefits;
        }
        if ($request->has('highlights')) {
            $highlights = $request->highlights;
            $data['highlights'] = is_string($highlights) ? json_decode($highlights, true) : $highlights;
        }

        $images = [];
        if ($request->hasFile('image_files')) {
            foreach ($request->file('image_files') as $file) {
                $path = \App\Helpers\ImageOptimizer::optimizeAndSave($file, 'proker');
                $images[] = asset('storage/' . $path);
            }
        } elseif ($request->image_url) {
            $images[] = $request->image_url;
        }

        $data['images'] = $images;
        $data['image_url'] = count($images) > 0 ? $images[0] : null;

        $program = WorkProgram::create($data);

        return response()->json($program, 201);
    }

    // POST/PUT update work program (Admin Only)
    public function update(Request $request, $id)
    {
        $program = WorkProgram::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|in:unggulan,pengembangan,komunitas,agenda',
            'department_id' => 'nullable|string|max:50',
            'description' => 'required|string',
            'image_files' => 'nullable|array',
            'image_files.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'existing_images' => 'nullable|string',
            'image_url' => 'nullable|string|max:255',
            'link' => 'nullable|string|max:255',
            'icon' => 'nullable|string|max:100',
            'frequency' => 'nullable|string|max:100',
            'type' => 'nullable|string|max:50',
            'benefits' => 'nullable|string',
            'highlights' => 'nullable|string',
            'order_index' => 'nullable|integer',
        ]);

        $data = [
            'title' => $request->title,
            'category' => $request->category,
            'department_id' => $request->department_id,
            'description' => $request->description,
            'link' => $request->link,
            'icon' => $request->icon ?? $program->icon,
            'frequency' => $request->frequency,
            'type' => $request->type ?? $program->type,
            'order_index' => $request->order_index ?? $program->order_index,
        ];

        if ($request->has('benefits')) {
            $benefits = $request->benefits;
            $data['benefits'] = is_string($benefits) ? json_decode($benefits, true) : $benefits;
        }
        if ($request->has('highlights')) {
            $highlights = $request->highlights;
            $data['highlights'] = is_string($highlights) ? json_decode($highlights, true) : $highlights;
        }

        // Handle existing images to preserve
        $existing = [];
        if ($request->has('existing_images')) {
            $decoded = json_decode($request->existing_images, true);
            if (is_array($decoded)) {
                $existing = $decoded;
            }
        }

        // Delete physical files of removed images
        $oldImages = is_array($program->images) ? $program->images : [];
        if ($program->image_url && !in_array($program->image_url, $oldImages)) {
            $oldImages[] = $program->image_url;
        }
        foreach ($oldImages as $oldImg) {
            if ($oldImg && !in_array($oldImg, $existing)) {
                if (str_contains($oldImg, asset('storage/'))) {
                    $oldPath = str_replace(asset('storage/'), '', $oldImg);
                    if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                    }
                }
            }
        }

        // Handle new file uploads
        $newImages = [];
        if ($request->hasFile('image_files')) {
            foreach ($request->file('image_files') as $file) {
                $path = \App\Helpers\ImageOptimizer::optimizeAndSave($file, 'proker');
                $newImages[] = asset('storage/' . $path);
            }
        }

        $finalImages = array_merge($existing, $newImages);
        $data['images'] = $finalImages;
        $data['image_url'] = count($finalImages) > 0 ? $finalImages[0] : null;

        $program->update($data);

        return response()->json($program, 200);
    }

    // DELETE work program (Admin Only)
    public function destroy($id)
    {
        $program = WorkProgram::findOrFail($id);

        // Delete all image files from storage
        $images = is_array($program->images) ? $program->images : [];
        if ($program->image_url && !in_array($program->image_url, $images)) {
            $images[] = $program->image_url;
        }
        foreach ($images as $img) {
            if ($img && str_contains($img, asset('storage/'))) {
                $oldPath = str_replace(asset('storage/'), '', $img);
                if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }
        }

        $program->delete();

        return response()->json(['message' => 'Program kerja berhasil dihapus.'], 200);
    }

    // PUT reorder work programs (Admin Only)
    public function reorder(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:work_programs,id',
            'items.*.order_index' => 'required|integer',
        ]);

        foreach ($request->items as $itemData) {
            WorkProgram::where('id', $itemData['id'])->update(['order_index' => $itemData['order_index']]);
        }

        return response()->json(['message' => 'Urutan program kerja berhasil diperbarui.'], 200);
    }
}
