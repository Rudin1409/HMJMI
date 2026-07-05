'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { api } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  Loader2,
  Upload,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

interface GalleryItem {
  id: number;
  category: 'home_hero' | 'gallery' | 'about_hero';
  title: string;
  image_url: string;
  year: string | null;
  caption: string | null;
  order_index: number;
}

// Fixed Slot Definitions
const HOME_SLOTS = [
  { slotIndex: 0, label: "Gambar Banner Atas", defaultSrc: "/Galeri/IT-fest.webp", description: "Ditampilkan di slot atas grid banner halaman Home." },
  { slotIndex: 1, label: "Gambar Banner Bawah", defaultSrc: "/Galeri/Sembis.webp", description: "Ditampilkan di slot bawah grid banner halaman Home." }
];

const ABOUT_SLOTS = [
  { slotIndex: 0, label: "Foto Utama (Tengah)", defaultSrc: "/Galeri/BUKBERMI.webp", description: "Foto lingkaran utama di tengah halaman Tentang." },
  { slotIndex: 1, label: "Foto Orbit (Atas)", defaultSrc: "/Galeri/BUKBRHMJ.webp", description: "Foto yang mengorbit di posisi atas." },
  { slotIndex: 2, label: "Foto Orbit (Bawah)", defaultSrc: "/Galeri/Makrab.webp", description: "Foto yang mengorbit di posisi bawah." },
  { slotIndex: 3, label: "Foto Orbit (Kiri)", defaultSrc: "/Galeri/LDOHMJMI.webp", description: "Foto yang mengorbit di posisi kiri." },
  { slotIndex: 4, label: "Foto Orbit (Kanan)", defaultSrc: "/Galeri/OR.webp", description: "Foto yang mengorbit di posisi kanan." }
];

function getImageStyle(captionStr: string | null) {
  if (!captionStr) return undefined;
  try {
    const parsed = JSON.parse(captionStr);
    if (parsed && typeof parsed === 'object') {
      const scale = parsed.zoom ?? 1;
      const posY = parsed.posY ?? 50;
      const fit = parsed.fit ?? 'cover';
      return {
        objectFit: fit,
        objectPosition: `50% ${posY}%`,
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
      } as React.CSSProperties;
    }
  } catch (e) {
    // Plain text caption
  }
  return undefined;
}

function getCaptionText(captionStr: string | null) {
  if (!captionStr) return '';
  try {
    const parsed = JSON.parse(captionStr);
    if (parsed && typeof parsed === 'object') {
      return parsed.text || '';
    }
  } catch (e) {
    // Plain text caption
    return captionStr;
  }
  return '';
}

export default function AdminGalleryPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  // Data State
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'home_hero' | 'gallery' | 'about_hero'>('home_hero');

  // Form Modal State
  const [formImageFit, setFormImageFit] = useState<'cover' | 'contain'>('cover');
  const [formImageZoom, setFormImageZoom] = useState<number>(1);
  const [formImagePosY, setFormImagePosY] = useState<number>(50);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formCategory, setFormCategory] = useState<'home_hero' | 'gallery' | 'about_hero'>('home_hero');
  const [formTitle, setFormTitle] = useState('');
  const [formYear, setFormYear] = useState('');
  const [formCaption, setFormCaption] = useState('');
  const [formOrderIndex, setFormOrderIndex] = useState(0);
  const [formImageFile, setFormImageFile] = useState<File | null>(null);
  const [formImagePreview, setFormImagePreview] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete State (only used for dynamic gallery list)
  const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);

  // Fetch items
  const fetchItems = async (cat: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getGalleryItems(cat);
      setItems(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Gagal memuat foto dari server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
      return;
    }
    if (user) {
      fetchItems(activeCategory);
    }
  }, [user, isUserLoading, activeCategory, router]);

  // Handle image file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormError('Ukuran file maksimal adalah 5MB.');
        return;
      }
      setFormError(null);
      setFormImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Open modal for a fixed slot (Home / About)
  const handleSlotEditOpen = (slotIndex: number, label: string, existingItem?: GalleryItem) => {
    setFormCategory(activeCategory);
    setFormOrderIndex(slotIndex);
    setFormError(null);

    if (existingItem) {
      setEditingItem(existingItem);
      setFormTitle(existingItem.title);
      setFormYear(existingItem.year || '');
      
      let fit: 'cover' | 'contain' = 'cover';
      let zoom = 1;
      let posY = 50;
      let captionText = '';
      if (existingItem.caption) {
        try {
          const parsed = JSON.parse(existingItem.caption);
          if (parsed && typeof parsed === 'object') {
            captionText = parsed.text || '';
            fit = parsed.fit || 'cover';
            zoom = parsed.zoom ?? 1;
            posY = parsed.posY ?? 50;
          } else {
            captionText = existingItem.caption;
          }
        } catch (e) {
          captionText = existingItem.caption;
        }
      }
      setFormCaption(captionText);
      setFormImageFit(fit);
      setFormImageZoom(zoom);
      setFormImagePosY(posY);

      setFormImageFile(null);
      setFormImagePreview(existingItem.image_url);
    } else {
      setEditingItem(null);
      setFormTitle(label);
      setFormYear('');
      setFormCaption('');
      setFormImageFit('cover');
      setFormImageZoom(1);
      setFormImagePosY(50);
      setFormImageFile(null);
      
      // Determine the default image source to show in the preview
      let defaultSrc = '';
      if (activeCategory === 'home_hero') {
        defaultSrc = HOME_SLOTS.find(s => s.slotIndex === slotIndex)?.defaultSrc || '';
      } else if (activeCategory === 'about_hero') {
        defaultSrc = ABOUT_SLOTS.find(s => s.slotIndex === slotIndex)?.defaultSrc || '';
      }
      setFormImagePreview(defaultSrc || null);
    }
    setIsModalOpen(true);
  };

  // Open modal for dynamic gallery Create
  const handleDynamicCreateOpen = () => {
    setEditingItem(null);
    setFormCategory('gallery');
    setFormOrderIndex(items.length); // Place at the end
    setFormTitle('');
    setFormYear('');
    setFormCaption('');
    setFormImageFit('cover');
    setFormImageZoom(1);
    setFormImagePosY(50);
    setFormImageFile(null);
    setFormImagePreview(null);
    setFormError(null);
    setIsModalOpen(true);
  };

  // Open modal for dynamic gallery Edit
  const handleDynamicEditOpen = (item: GalleryItem) => {
    setEditingItem(item);
    setFormCategory(item.category);
    setFormOrderIndex(item.order_index);
    setFormTitle(item.title);
    setFormYear(item.year || '');
    
    let fit: 'cover' | 'contain' = 'cover';
    let zoom = 1;
    let posY = 50;
    let captionText = '';
    if (item.caption) {
      try {
        const parsed = JSON.parse(item.caption);
        if (parsed && typeof parsed === 'object') {
          captionText = parsed.text || '';
          fit = parsed.fit || 'cover';
          zoom = parsed.zoom ?? 1;
          posY = parsed.posY ?? 50;
        } else {
          captionText = item.caption;
        }
      } catch (e) {
        captionText = item.caption;
      }
    }
    setFormCaption(captionText);
    setFormImageFit(fit);
    setFormImageZoom(zoom);
    setFormImagePosY(posY);

    setFormImageFile(null);
    setFormImagePreview(item.image_url);
    setFormError(null);
    setIsModalOpen(true);
  };

  // Save (Create or Update)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formTitle.trim()) {
      setFormError('Judul wajib diisi.');
      return;
    }

    if (!editingItem && !formImageFile) {
      if (formCategory === 'gallery' || !formImagePreview) {
        setFormError('File gambar wajib diunggah.');
        return;
      }
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append('category', formCategory);
      formData.append('title', formTitle);
      formData.append('order_index', String(formOrderIndex));
      if (formYear) {
        formData.append('year', formYear);
      }
      const serializedCaption = JSON.stringify({
        text: formCaption,
        fit: formImageFit,
        zoom: formImageZoom,
        posY: formImagePosY
      });
      formData.append('caption', serializedCaption);
      
      if (formImageFile) {
        formData.append('image', formImageFile);
      } else if (!editingItem && formImagePreview) {
        formData.append('image_url', formImagePreview);
      }

      if (editingItem) {
        // PUT update spoofed via POST request
        await api.updateGalleryItem(editingItem.id, formData);
        showSuccessNotification('Foto berhasil diperbarui.');
      } else {
        await api.createGalleryItem(formData);
        showSuccessNotification('Foto berhasil diunggah.');
      }

      setIsModalOpen(false);
      fetchItems(activeCategory);
    } catch (err: any) {
      console.error(err);
      setFormError(err.message || 'Terjadi kesalahan saat menyimpan foto.');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete (only for dynamic gallery)
  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      setIsLoading(true);
      await api.deleteGalleryItem(itemToDelete.id);
      showSuccessNotification('Foto berhasil dihapus.');
      setItemToDelete(null);
      fetchItems(activeCategory);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Gagal menghapus foto.');
      setIsLoading(false);
    }
  };

  // Reset custom slot to show default static asset
  const handleResetSlot = async (item: GalleryItem) => {
    try {
      setIsLoading(true);
      await api.deleteGalleryItem(item.id);
      showSuccessNotification('Slot foto dikembalikan ke default.');
      fetchItems(activeCategory);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Gagal mereset slot foto.');
      setIsLoading(false);
    }
  };

  // Reorder (Move Up/Down for dynamic gallery items)
  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const previousState = [...items];
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    setItems(newItems);

    const payload = newItems.map((item, idx) => ({
      id: item.id,
      order_index: idx,
    }));

    try {
      await api.reorderGalleryItems(payload);
    } catch (err: any) {
      console.error('Failed to save order index:', err);
      setItems(previousState);
      setError(err.message || 'Gagal menyimpan urutan galeri ke server.');
    }
  };

  const showSuccessNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => {
      setSuccessMsg(null);
    }, 4000);
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Pengaturan Foto Tampilan</h1>
          <p className="text-muted-foreground">Kelola aset gambar publik yang tampil di Halaman Home, Galeri, dan Tentang.</p>
        </div>
      </div>

      {successMsg && (
        <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="bg-destructive/10 text-destructive border border-destructive/20 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle className="h-5 w-5" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      <Tabs
        defaultValue="home_hero"
        value={activeCategory}
        onValueChange={(val) => setActiveCategory(val as any)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 max-w-xl">
          <TabsTrigger value="home_hero">Home Banner</TabsTrigger>
          <TabsTrigger value="gallery">Galeri Kegiatan</TabsTrigger>
          <TabsTrigger value="about_hero">Tentang (Orbit)</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {/* ==================== HOME HERO SLOTS ==================== */}
          <TabsContent value="home_hero" className="border-none p-0 m-0">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Manajemen Slot Banner Home</h2>
              <p className="text-sm text-muted-foreground">Halaman Home menampilkan tepat 2 foto bertumpuk di sisi kanan. Anda dapat mengubah foto pada masing-masing slot secara mandiri.</p>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
                {HOME_SLOTS.map((slot) => {
                  const dbItem = items.find(item => item.order_index === slot.slotIndex);
                  const activeSrc = dbItem ? dbItem.image_url : slot.defaultSrc;
                  
                  return (
                    <Card key={slot.slotIndex} className="overflow-hidden flex flex-col hover:border-primary/30 transition-colors">
                      <div className="relative aspect-video w-full bg-slate-900 overflow-hidden border-b border-border">
                        <ImageWithSkeleton
                          src={activeSrc}
                          alt={slot.label}
                          fill
                          className="object-cover"
                          style={dbItem ? getImageStyle(dbItem.caption) : undefined}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          containerClassName="absolute inset-0"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <Badge className="bg-black/80 text-white border-white/20">
                            Slot {slot.slotIndex + 1}
                          </Badge>
                          {dbItem ? (
                            <Badge className="bg-primary text-primary-foreground">Kustom</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">Default / Bawaan</Badge>
                          )}
                        </div>
                      </div>

                      <CardHeader className="p-5">
                        <CardTitle className="text-lg">{slot.label}</CardTitle>
                        <CardDescription className="text-sm mt-1">{slot.description}</CardDescription>
                        {dbItem && (
                          <div className="mt-2 text-xs text-muted-foreground bg-muted/40 p-2 rounded-md">
                            <strong>Judul Kustom:</strong> {dbItem.title}
                          </div>
                        )}
                      </CardHeader>

                      <CardFooter className="p-5 pt-0 mt-auto border-t border-border/40 bg-muted/10 flex justify-end gap-3">
                        {dbItem && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => handleResetSlot(dbItem)}
                          >
                            <RefreshCw className="h-4 w-4 mr-1.5" /> Reset Default
                          </Button>
                        )}
                        <Button
                          size="sm"
                          className="gap-1.5"
                          onClick={() => handleSlotEditOpen(slot.slotIndex, slot.label, dbItem)}
                        >
                          <Edit2 className="h-4 w-4" /> {dbItem ? 'Ubah Foto' : 'Kustomisasi Foto'}
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* ==================== ABOUT HERO SLOTS ==================== */}
          <TabsContent value="about_hero" className="border-none p-0 m-0">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Manajemen Slot Orbit Halaman Tentang</h2>
              <p className="text-sm text-muted-foreground">Bagian atas halaman Tentang menampilkan 1 foto utama di tengah dan 4 foto kecil yang mengorbit di sekelilingnya. Ubah foto pada slot tertentu agar sesuai.</p>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ABOUT_SLOTS.map((slot) => {
                  const dbItem = items.find(item => item.order_index === slot.slotIndex);
                  const activeSrc = dbItem ? dbItem.image_url : slot.defaultSrc;

                  return (
                    <Card key={slot.slotIndex} className="overflow-hidden flex flex-col hover:border-primary/30 transition-colors">
                      <div className="relative aspect-video w-full bg-slate-900 overflow-hidden border-b border-border">
                        <ImageWithSkeleton
                          src={activeSrc}
                          alt={slot.label}
                          fill
                          className="object-cover"
                          style={dbItem ? getImageStyle(dbItem.caption) : undefined}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          containerClassName="absolute inset-0"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <Badge className="bg-black/80 text-white border-white/20">
                            Slot {slot.slotIndex + 1}
                          </Badge>
                          {dbItem ? (
                            <Badge className="bg-primary text-primary-foreground">Kustom</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">Default / Bawaan</Badge>
                          )}
                        </div>
                      </div>

                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base">{slot.label}</CardTitle>
                        <CardDescription className="text-xs mt-1 min-h-[2.5rem]">{slot.description}</CardDescription>
                        {dbItem && (
                          <div className="mt-2 text-xs text-muted-foreground bg-muted/40 p-2 rounded-md">
                            <strong>Judul Kustom:</strong> {dbItem.title}
                          </div>
                        )}
                      </CardHeader>

                      <CardFooter className="p-4 pt-2 mt-auto border-t border-border/40 bg-muted/10 flex justify-end gap-2">
                        {dbItem && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive text-xs hover:bg-destructive/10 h-8"
                            onClick={() => handleResetSlot(dbItem)}
                          >
                            <RefreshCw className="h-3.5 w-3.5 mr-1" /> Reset Default
                          </Button>
                        )}
                        <Button
                          size="sm"
                          className="h-8 text-xs gap-1"
                          onClick={() => handleSlotEditOpen(slot.slotIndex, slot.label, dbItem)}
                        >
                          <Edit2 className="h-3.5 w-3.5" /> {dbItem ? 'Ubah Foto' : 'Kustomisasi'}
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* ==================== DYNAMIC GALLERY CAROUSEL ==================== */}
          <TabsContent value="gallery" className="border-none p-0 m-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div>
                <h2 className="text-xl font-semibold">Manajemen Carousel Galeri Kegiatan</h2>
                <p className="text-sm text-muted-foreground">Foto-foto di bawah ini ditampilkan sebagai slide carousel di Halaman Tentang. Jumlah foto bersifat dinamis.</p>
              </div>
              <Button onClick={handleDynamicCreateOpen} size="sm" className="gap-1.5 shrink-0">
                <Plus className="h-4 w-4" /> Tambah Foto Kegiatan
              </Button>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : items.length === 0 ? (
              <Card className="border-dashed flex flex-col items-center justify-center py-16 text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <CardTitle>Belum ada foto kegiatan</CardTitle>
                  <CardDescription>
                    Kategori ini kosong. Tambahkan foto kegiatan agar slide carousel di halaman Tentang terisi.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button onClick={handleDynamicCreateOpen} variant="outline" className="gap-1.5">
                    <Plus className="h-4 w-4" /> Unggah Foto Pertama
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((item, idx) => (
                  <Card key={item.id} className="overflow-hidden flex flex-col group hover:border-primary/40 transition-colors">
                    <div className="relative aspect-video w-full bg-slate-900 border-b border-border overflow-hidden">
                      <ImageWithSkeleton
                        src={item.image_url}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        style={getImageStyle(item.caption)}
                        sizes="(max-width: 768px) 100vw, 25vw"
                        containerClassName="absolute inset-0"
                      />
                      <div className="absolute top-2 left-2 flex gap-1.5">
                        <Badge className="bg-black/80 text-white border-white/10">
                          Slide {idx + 1}
                        </Badge>
                        {item.year && (
                          <Badge variant="secondary">
                            {item.year}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base truncate">{item.title}</CardTitle>
                      <CardDescription className="line-clamp-2 min-h-[2.5rem] text-xs">
                        {getCaptionText(item.caption) || <span className="italic text-muted-foreground/50">Tidak ada keterangan.</span>}
                      </CardDescription>
                    </CardHeader>

                    <CardFooter className="p-4 pt-2 mt-auto border-t border-border/50 flex justify-between items-center bg-muted/20">
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          disabled={idx === 0}
                          onClick={() => handleMove(idx, 'up')}
                          title="Geser Kiri"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          disabled={idx === items.length - 1}
                          onClick={() => handleMove(idx, 'down')}
                          title="Geser Kanan"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                          onClick={() => handleDynamicEditOpen(item)}
                          title="Edit Info"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20"
                          onClick={() => setItemToDelete(item)}
                          title="Hapus"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>

      {/* Upload & Edit Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto pr-6 scrollbar-thin">
          <DialogHeader>
            <DialogTitle>
              {activeCategory === 'gallery'
                ? (editingItem ? 'Edit Info Kegiatan' : 'Tambah Foto Kegiatan Baru')
                : `Kustomisasi ${formTitle || 'Slot Foto'}`
              }
            </DialogTitle>
            <DialogDescription>
              {activeCategory === 'gallery'
                ? 'Lengkapi rincian foto untuk carousel kegiatan halaman Tentang di bawah ini.'
                : 'Unggah file gambar baru untuk menggantikan gambar bawaan sistem pada slot ini.'
              }
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-5 py-4">
            {formError && (
              <div className="bg-destructive/10 text-destructive border border-destructive/20 p-3 rounded-lg flex items-center gap-2.5 text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span className="font-medium">{formError}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Judul Foto / Kegiatan <span className="text-destructive">*</span></Label>
              <Input
                id="title"
                placeholder="Contoh: IT Festival / Bukber MI"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                maxLength={100}
                required
              />
            </div>

            {formCategory === 'gallery' && (
              <div className="space-y-2">
                <Label htmlFor="year">Tahun Pelaksanaan <span className="text-destructive">*</span></Label>
                <Input
                  id="year"
                  placeholder="Contoh: 2025"
                  value={formYear}
                  onChange={(e) => setFormYear(e.target.value)}
                  maxLength={4}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="caption">Keterangan Singkat (Caption)</Label>
              <Input
                id="caption"
                placeholder="Tulis deskripsi singkat foto..."
                value={formCaption}
                onChange={(e) => setFormCaption(e.target.value)}
                maxLength={200}
              />
            </div>

            <div className="space-y-2">
              <Label>File Gambar {editingItem ? '(Opsional - Kosongkan jika tidak ingin mengubah gambar)' : <span className="text-destructive">*</span>}</Label>
              <div className="flex flex-col items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted/70 transition-colors border-border">
                  <div className="flex flex-col items-center justify-center pt-4 pb-4 px-2 text-center">
                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-primary">Klik untuk memilih gambar</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG, JPEG, WEBP (Maks. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              {formImagePreview && (
                <div className="space-y-4 border border-border bg-muted/20 p-4 rounded-xl mt-4">
                  <div className="flex items-center justify-between">
                    <Label className="font-semibold text-foreground flex items-center gap-1.5 text-sm">
                      <Sparkles className="h-4 w-4 text-pink-500" /> Posisi & Zoom Gambar (Pratinjau)
                    </Label>
                  </div>

                  {/* Real-time Preview Box */}
                  <div className={`relative overflow-hidden border border-border bg-black/90 mx-auto transition-all duration-300 ${
                    formCategory === 'about_hero'
                      ? 'w-48 h-48 rounded-full'
                      : 'w-full aspect-video rounded-lg'
                  }`}>
                    <img
                      src={formImagePreview}
                      alt="Pratinjau penyesuaian gambar"
                      className="w-full h-full"
                      style={{
                        objectFit: formImageFit,
                        objectPosition: `50% ${formImagePosY}%`,
                        transform: `scale(${formImageZoom})`,
                        transformOrigin: 'center center',
                      }}
                    />
                  </div>

                  {/* Preset Recommendation Buttons */}
                  <div className="space-y-2">
                    <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Rekomendasi Cepat</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-xs h-9 justify-start px-2.5 font-normal border-border/80 hover:bg-muted"
                        onClick={() => {
                          setFormImageFit('cover');
                          setFormImageZoom(1);
                          setFormImagePosY(50);
                        }}
                      >
                        🎯 Default / Tengah
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-xs h-9 justify-start px-2.5 font-normal border-border/80 hover:bg-muted"
                        onClick={() => {
                          setFormImageFit('cover');
                          setFormImageZoom(1.2);
                          setFormImagePosY(15);
                        }}
                      >
                        👤 Fokus Atas (Kepala)
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-xs h-9 justify-start px-2.5 font-normal border-border/80 hover:bg-muted"
                        onClick={() => {
                          setFormImageFit('cover');
                          setFormImageZoom(1.45);
                          setFormImagePosY(50);
                        }}
                      >
                        🔍 Fokus Tengah (Zoom)
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-xs h-9 justify-start px-2.5 font-normal border-border/80 hover:bg-muted"
                        onClick={() => {
                          setFormImageFit('contain');
                          setFormImageZoom(1);
                          setFormImagePosY(50);
                        }}
                      >
                        🖼️ Tampilkan Utuh (Fit)
                      </Button>
                    </div>
                  </div>

                  {/* Manual Sliders */}
                  <div className="space-y-4 pt-3 border-t border-border">
                    {/* Object Fit Selector */}
                    <div className="flex items-center justify-between gap-4">
                      <Label className="text-xs font-semibold">Tipe Penyesuaian Fit</Label>
                      <div className="flex bg-muted p-0.5 rounded-lg border border-border text-xs">
                        <button
                          type="button"
                          className={`px-3 py-1.5 rounded-md font-medium transition-all duration-200 ${formImageFit === 'cover' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                          onClick={() => setFormImageFit('cover')}
                        >
                          Cover (Penuhi)
                        </button>
                        <button
                          type="button"
                          className={`px-3 py-1.5 rounded-md font-medium transition-all duration-200 ${formImageFit === 'contain' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                          onClick={() => setFormImageFit('contain')}
                        >
                          Contain (Muat)
                        </button>
                      </div>
                    </div>

                    {/* Zoom Slider */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <Label htmlFor="zoom-slider" className="font-semibold">Skala Zoom</Label>
                        <span className="font-mono text-[11px] text-muted-foreground font-bold bg-muted px-1.5 py-0.5 rounded">
                          {formImageZoom.toFixed(2)}x
                        </span>
                      </div>
                      <input
                        id="zoom-slider"
                        type="range"
                        min="1"
                        max="2"
                        step="0.05"
                        value={formImageZoom}
                        onChange={(e) => setFormImageZoom(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                    </div>

                    {/* Vertical position Y Slider */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <Label htmlFor="pos-y-slider" className="font-semibold">Pergeseran Posisi Y (Vertikal)</Label>
                        <span className="font-mono text-[11px] text-muted-foreground font-bold bg-muted px-1.5 py-0.5 rounded">
                          {formImagePosY}%
                        </span>
                      </div>
                      <input
                        id="pos-y-slider"
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={formImagePosY}
                        onChange={(e) => setFormImagePosY(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
                        <span>0% (Atas)</span>
                        <span>50% (Tengah)</span>
                        <span>100% (Bawah)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="pt-4 border-t border-border gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={isSaving}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingItem ? 'Simpan Perubahan' : (activeCategory === 'gallery' ? 'Tambah Foto' : 'Kustomisasi Slot')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert (only for dynamic gallery) */}
      <AlertDialog open={!!itemToDelete} onOpenChange={(open) => !open && setItemToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus foto kegiatan ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus foto <strong>{itemToDelete?.title}</strong> dari carousel galeri? 
              Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/95">
              Hapus Foto
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
