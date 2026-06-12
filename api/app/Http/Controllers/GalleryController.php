<?php

namespace App\Http\Controllers;

use App\Models\GalleryItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
        $category = $request->query('category');
        
        $query = GalleryItem::query();
        if ($category) {
            $query->where('category', $category);
        }
        
        $items = $query->orderBy('order_index', 'asc')
                       ->orderBy('created_at', 'desc')
                       ->get();
                       
        return response()->json($items);
    }

    public function show($id)
    {
        $item = GalleryItem::findOrFail($id);
        return response()->json($item);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category' => 'required|in:home_hero,gallery,about_hero',
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'image_url' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:4',
            'caption' => 'nullable|string|max:255',
            'order_index' => 'nullable|integer',
        ]);

        if ($request->file('image')) {
            $path = \App\Helpers\ImageOptimizer::optimizeAndSave($request->file('image'), 'gallery');
            $url = asset('storage/' . $path);
        } else if ($request->input('image_url')) {
            $url = $request->input('image_url');
        } else {
            return response()->json(['message' => 'File gambar wajib diunggah.'], 400);
        }

        $item = GalleryItem::create([
            'category' => $request->category,
            'title' => $request->title,
            'image_url' => $url,
            'year' => $request->year,
            'caption' => $request->caption,
            'order_index' => $request->order_index ?? 0,
        ]);

        return response()->json($item, 201);
    }

    public function update(Request $request, $id)
    {
        $item = GalleryItem::findOrFail($id);

        $request->validate([
            'category' => 'nullable|in:home_hero,gallery,about_hero',
            'title' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'year' => 'nullable|string|max:4',
            'caption' => 'nullable|string|max:255',
            'order_index' => 'nullable|integer',
        ]);

        $data = $request->only(['category', 'title', 'year', 'caption', 'order_index']);

        if ($request->file('image')) {
            // Delete old file if exists
            $oldPath = str_replace(asset('storage/'), '', $item->image_url);
            if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }

            $path = \App\Helpers\ImageOptimizer::optimizeAndSave($request->file('image'), 'gallery');
            $data['image_url'] = asset('storage/' . $path);
        }

        $item->update($data);

        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = GalleryItem::findOrFail($id);

        // Delete file from disk
        $filePath = str_replace(asset('storage/'), '', $item->image_url);
        if ($filePath && Storage::disk('public')->exists($filePath)) {
            Storage::disk('public')->delete($filePath);
        }

        $item->delete();

        return response()->json(['message' => 'Foto berhasil dihapus.']);
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:gallery_items,id',
            'items.*.order_index' => 'required|integer',
        ]);

        foreach ($request->items as $itemData) {
            GalleryItem::where('id', $itemData['id'])->update(['order_index' => $itemData['order_index']]);
        }

        return response()->json(['message' => 'Urutan foto berhasil diperbarui.']);
    }
}
