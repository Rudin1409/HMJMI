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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getImageUrl } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
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
  AlertCircle,
  Briefcase,
  Rocket,
  Award,
  Heart,
  Lightbulb,
  Users,
  ExternalLink,
  X,
} from 'lucide-react';

interface WorkProgram {
  id: number;
  title: string;
  category: 'unggulan' | 'pengembangan' | 'komunitas' | 'agenda';
  department_id?: string | null;
  description: string;
  image_url: string | null;
  link: string | null;
  icon: string;
  frequency?: string | null;
  type?: string | null;
  benefits?: { title: string; description: string }[] | null;
  highlights?: string[] | null;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

const AVAILABLE_ICONS = [
  { value: 'Briefcase', label: 'Briefcase / Tas Kerja', component: <Briefcase className="h-4 w-4" /> },
  { value: 'Rocket', label: 'Rocket / Roket', component: <Rocket className="h-4 w-4" /> },
  { value: 'Award', label: 'Award / Penghargaan', component: <Award className="h-4 w-4" /> },
  { value: 'Heart', label: 'Heart / Sosial & Kasih', component: <Heart className="h-4 w-4" /> },
  { value: 'Lightbulb', label: 'Lightbulb / Ide & Kreatif', component: <Lightbulb className="h-4 w-4" /> },
  { value: 'Users', label: 'Users / Anggota & Tim', component: <Users className="h-4 w-4" /> },
];

const CATEGORIES = [
  { value: 'unggulan', label: 'Program Unggulan' },
  { value: 'pengembangan', label: 'Pengembangan' },
  { value: 'komunitas', label: 'Komunitas' },
  { value: 'agenda', label: 'Agenda Rutin' },
];

const DEPT_TABS = [
  { value: 'semua', label: 'Semua' },
  { value: 'inti', label: 'BPH / Inti' },
  { value: 'ptkp', label: 'PTKP' },
  { value: 'humas', label: 'HUMAS' },
  { value: 'psdm', label: 'PSDM' },
  { value: 'kesma', label: 'KESMA' },
  { value: 'bistra', label: 'BISTRA' },
  { value: 'umum', label: 'Umum / Lainnya' }
];

export default function WorkProgramsAdminPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  const [programs, setPrograms] = useState<WorkProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dialog & Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<WorkProgram | null>(null);
  const [programToDelete, setProgramToDelete] = useState<WorkProgram | null>(null);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'unggulan' | 'pengembangan' | 'komunitas' | 'agenda'>('unggulan');
  const [departmentId, setDepartmentId] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [icon, setIcon] = useState('Briefcase');
  const [frequency, setFrequency] = useState('');
  const [type, setType] = useState('Offline');
  const [benefits, setBenefits] = useState<{ title: string; description: string }[]>([]);
  const [highlights, setHighlights] = useState<string[]>([]);
  
  // Multi-image upload states
  interface ImagePreviewItem {
    id: string;
    url: string;
    file?: File;
  }
  const [previews, setPreviews] = useState<ImagePreviewItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Active Category Tab
  const [activeTab, setActiveTab] = useState('semua');

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const fetchPrograms = async () => {
    setIsLoading(true);
    try {
      const data = await api.getWorkPrograms();
      setPrograms(data || []);
    } catch (err: any) {
      toast({
        title: 'Gagal memuat program kerja',
        description: err.message || 'Terjadi kesalahan.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPrograms();
    }
  }, [user]);

  const handleOpenAdd = () => {
    setEditingProgram(null);
    setTitle('');
    setCategory('unggulan');
    setDepartmentId('');
    setDescription('');
    setLink('');
    setIcon('Briefcase');
    setFrequency('');
    setType('Offline');
    setBenefits([]);
    setHighlights([]);
    setPreviews([]);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (program: WorkProgram) => {
    setEditingProgram(program);
    setTitle(program.title);
    setCategory(program.category);
    setDepartmentId(program.department_id || '');
    setDescription(program.description);
    setLink(program.link || '');
    setIcon(program.icon || 'Briefcase');
    setFrequency(program.frequency || '');
    setType(program.type || 'Offline');
    setBenefits(program.benefits || []);
    setHighlights(program.highlights || []);
    
    // Set initial previews from program images or fallback image_url
    const initialImages = program.images || (program.image_url ? [program.image_url] : []);
    setPreviews(initialImages.map(img => ({
      id: img,
      url: img
    })));
    
    setIsFormOpen(true);
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newItems: ImagePreviewItem[] = files.map(file => {
        const randId = Math.random().toString(36).substring(7);
        return {
          id: `new-${randId}`,
          url: URL.createObjectURL(file),
          file: file
        };
      });
      setPreviews(prev => [...prev, ...newItems]);
    }
  };

  const handleRemovePreview = (id: string) => {
    setPreviews(prev => {
      const itemToRemove = prev.find(item => item.id === id);
      if (itemToRemove && itemToRemove.file) {
        URL.revokeObjectURL(itemToRemove.url);
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast({
        title: 'Validasi Gagal',
        description: 'Judul dan deskripsi program kerja wajib diisi.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      if (departmentId && departmentId !== 'none') {
        formData.append('department_id', departmentId);
      } else {
        formData.append('department_id', '');
      }
      formData.append('description', description);
      formData.append('link', link);
      formData.append('icon', icon);
      formData.append('frequency', frequency);
      formData.append('type', type);
      formData.append('benefits', JSON.stringify(benefits));
      formData.append('highlights', JSON.stringify(highlights));
      
      // Collect new file uploads
      previews.forEach(item => {
        if (item.file) {
          formData.append('image_files[]', item.file);
        }
      });
      
      // Collect remaining existing images
      const existing = previews
        .filter(item => !item.file)
        .map(item => item.url);
      formData.append('existing_images', JSON.stringify(existing));

      if (editingProgram) {
        await api.updateWorkProgram(editingProgram.id, formData);
        toast({ title: 'Program Kerja Diperbarui ✓' });
      } else {
        // Set order index as the max + 1
        const maxOrder = programs.length > 0 ? Math.max(...programs.map(p => p.order_index)) : 0;
        formData.append('order_index', String(maxOrder + 1));
        await api.createWorkProgram(formData);
        toast({ title: 'Program Kerja Ditambahkan ✓' });
      }

      setIsFormOpen(false);
      fetchPrograms();
    } catch (err: any) {
      toast({
        title: 'Gagal menyimpan program kerja',
        description: err.message || 'Terjadi kesalahan.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenDelete = (program: WorkProgram) => {
    setProgramToDelete(program);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!programToDelete) return;

    try {
      await api.deleteWorkProgram(programToDelete.id);
      toast({ title: 'Program Kerja Dihapus ✓' });
      setIsDeleteOpen(false);
      setProgramToDelete(null);
      fetchPrograms();
    } catch (err: any) {
      toast({
        title: 'Gagal menghapus program kerja',
        description: err.message || 'Terjadi kesalahan.',
        variant: 'destructive',
      });
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const list = [...programsFiltered];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= list.length) return;
    
    // Swap order indexes
    const tempOrder = list[index].order_index;
    list[index].order_index = list[newIndex].order_index;
    list[newIndex].order_index = tempOrder;

    try {
      const itemsToUpdate = [
        { id: list[index].id, order_index: list[index].order_index },
        { id: list[newIndex].id, order_index: list[newIndex].order_index }
      ];
      await api.reorderWorkPrograms(itemsToUpdate);
      fetchPrograms();
    } catch (err: any) {
      toast({
        title: 'Gagal mengubah urutan',
        description: err.message || 'Terjadi kesalahan.',
        variant: 'destructive',
      });
    }
  };

  const renderIcon = (iconName: string) => {
    const found = AVAILABLE_ICONS.find(i => i.value === iconName);
    return found ? found.component : <Briefcase className="h-4 w-4" />;
  };

  const getDinasName = (deptId?: string | null) => {
    if (!deptId || deptId === 'none') return 'Umum';
    const found = DEPT_TABS.find(d => d.value === deptId);
    return found ? found.label : deptId.toUpperCase();
  };

  const programsFiltered = programs
    .filter(p => {
      if (activeTab === 'semua') return true;
      if (activeTab === 'umum') return !p.department_id || p.department_id === 'none';
      return p.department_id === activeTab;
    })
    .sort((a, b) => a.order_index - b.order_index);

  if (isUserLoading || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Program Kerja</h1>
          <p className="text-muted-foreground mt-1">Kelola daftar program kerja, agenda rutin, dan aktivitas komunitas HMJ MI.</p>
        </div>
        <Button onClick={handleOpenAdd} className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" /> Tambah Program Kerja
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/60 mb-6 p-1 max-w-4xl border border-border/20 rounded-xl">
          {DEPT_TABS.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value} className="px-4 py-2.5 text-xs md:text-sm rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {DEPT_TABS.map(tab => (
          <TabsContent key={tab.value} value={tab.value} className="space-y-4">
            {programsFiltered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {programsFiltered.map((program, index) => {
                  const imagesArray = Array.isArray(program.images) ? program.images : [];
                  const coverImage = imagesArray.length > 0 ? imagesArray[0] : program.image_url;

                  return (
                    <Card key={program.id} className="flex flex-col overflow-hidden border border-border/50 bg-card/40 hover:shadow-md transition-all rounded-2xl">
                      {coverImage ? (
                        <div className="relative aspect-video w-full border-b border-border/30 bg-muted/30">
                          <ImageWithSkeleton
                            src={getImageUrl(coverImage)}
                            alt={program.title}
                            fill
                            className="object-cover"
                            containerClassName="absolute inset-0"
                          />
                          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 uppercase">
                            <span>{program.type || 'Offline'}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 border-b border-border/30 bg-muted/20 flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                            {renderIcon(program.icon, "h-5 w-5")}
                          </div>
                          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{program.icon} Icon</span>
                        </div>
                      )}
                      
                      <CardHeader className="pb-2">
                        <div className="flex flex-wrap gap-1.5 mb-1.5">
                          <Badge className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] border border-primary/20 px-2 py-0.5 rounded uppercase">
                            {program.category}
                          </Badge>
                          <Badge variant="secondary" className="text-[10px] px-2 py-0.5 rounded uppercase">
                            Dinas: {getDinasName(program.department_id)}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg line-clamp-1">{program.title}</CardTitle>
                        {program.link && (
                          <CardDescription className="flex items-center gap-1 text-primary text-xs truncate">
                            <ExternalLink className="h-3 w-3" />
                            <a href={program.link} target="_blank" rel="noreferrer" className="hover:underline">
                              {program.link}
                            </a>
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="pb-4 flex-1">
                        <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                          {program.description}
                        </p>
                      </CardContent>
                      <CardFooter className="bg-muted/30 border-t border-border/20 px-4 py-3 flex justify-between items-center">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={() => handleMove(index, 'up')}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={() => handleMove(index, 'down')}
                            disabled={index === programsFiltered.length - 1}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 px-3 h-8 text-xs"
                            onClick={() => handleOpenEdit(program)}
                          >
                            <Edit2 className="h-3 w-3" /> Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="gap-1 px-3 h-8 text-xs"
                            onClick={() => handleOpenDelete(program)}
                          >
                            <Trash2 className="h-3 w-3" /> Hapus
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border rounded-2xl bg-muted/10 text-center">
                <AlertCircle className="h-10 w-10 text-muted-foreground opacity-30 mb-3" />
                <h3 className="font-semibold text-foreground text-sm">Belum ada program kerja</h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                  Tidak ada program kerja dinamis di departemen ini. Anda bisa menambahkannya menggunakan tombol di atas.
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingProgram ? 'Edit Program Kerja' : 'Tambah Program Kerja Baru'}</DialogTitle>
            <DialogDescription>Isi detail program kerja di bawah ini. Harap isi judul dan deskripsi dengan lengkap.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="max-h-[70vh] overflow-y-auto px-1 space-y-4 pb-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="proker-title">Judul Program Kerja</Label>
                  <Input
                    id="proker-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: IT Festival 2026"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="proker-cat">Kategori</Label>
                  <Select value={category} onValueChange={(val: any) => setCategory(val)}>
                    <SelectTrigger id="proker-cat">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="proker-icon">Ikon Program</Label>
                  <Select value={icon} onValueChange={setIcon}>
                    <SelectTrigger id="proker-icon">
                      <SelectValue placeholder="Pilih ikon" />
                    </SelectTrigger>
                    <SelectContent>
                      {AVAILABLE_ICONS.map(ic => (
                        <SelectItem key={ic.value} value={ic.value}>
                          <span className="flex items-center gap-2">
                            {ic.component}
                            <span>{ic.label}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="proker-dept">Departemen Pelaksana</Label>
                  <Select value={departmentId} onValueChange={setDepartmentId}>
                    <SelectTrigger id="proker-dept">
                      <SelectValue placeholder="Pilih departemen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Umum (Tidak Ada)</SelectItem>
                      <SelectItem value="inti">BPH / Pengurus Inti</SelectItem>
                      <SelectItem value="ptkp">PTKP</SelectItem>
                      <SelectItem value="humas">HUMAS</SelectItem>
                      <SelectItem value="psdm">PSDM</SelectItem>
                      <SelectItem value="kesma">KESMA</SelectItem>
                      <SelectItem value="bistra">BISTRA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="proker-freq">Frekuensi Pelaksanaan</Label>
                  <Input
                    id="proker-freq"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    placeholder="Contoh: Setiap Tahun, Bulanan"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="proker-type">Tipe Pelaksanaan</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger id="proker-type">
                      <SelectValue placeholder="Pilih tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Offline">Offline</SelectItem>
                      <SelectItem value="Online">Online</SelectItem>
                      <SelectItem value="Offline & Online">Offline & Online</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="proker-desc">Deskripsi Lengkap</Label>
                  <Textarea
                    id="proker-desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Jelaskan mengenai program kerja ini secara mendetail..."
                    className="min-h-[100px] resize-none leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="proker-link">Link Eksternal (Opsional)</Label>
                  <Input
                    id="proker-link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Contoh: https://it-festival.com"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label>Gambar Banner Program (Dapat memilih lebih dari 1 gambar)</Label>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImagesChange}
                    className="text-xs h-9 cursor-pointer"
                  />
                  <p className="text-[10px] text-muted-foreground">Pilih satu atau beberapa file gambar untuk diunggah (Maks. 2 MB per file)</p>
                  
                  {previews.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-3">
                      {previews.map((item) => (
                        <div key={item.id} className="relative aspect-video rounded-lg overflow-hidden border bg-muted group">
                          <Image src={getImageUrl(item.url)} fill alt="Preview" className="object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemovePreview(item.id)}
                            className="absolute top-1 right-1 h-5 w-5 bg-destructive/80 text-white rounded-full flex items-center justify-center hover:bg-destructive opacity-85 hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Manfaat Program */}
                <div className="space-y-2 sm:col-span-2 pt-2 border-t border-border/40">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold">Manfaat Program ({benefits.length})</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs gap-1"
                      onClick={() => setBenefits([...benefits, { title: '', description: '' }])}
                    >
                      <Plus className="h-3 w-3" /> Tambah Manfaat
                    </Button>
                  </div>
                  {benefits.length > 0 ? (
                    <div className="space-y-3 mt-2">
                      {benefits.map((benefit, bIndex) => (
                        <div key={bIndex} className="p-3 border rounded-lg bg-muted/20 relative space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold text-muted-foreground">Manfaat #{bIndex + 1}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-destructive hover:bg-destructive/10 animate-fade-in"
                              onClick={() => setBenefits(benefits.filter((_, idx) => idx !== bIndex))}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                            <Input
                              placeholder="Judul Manfaat (misal: Koneksi Luas)"
                              value={benefit.title}
                              onChange={(e) => {
                                const newB = [...benefits];
                                newB[bIndex].title = e.target.value;
                                setBenefits(newB);
                              }}
                              className="h-8 text-xs"
                            />
                            <Textarea
                              placeholder="Deskripsi Manfaat singkat..."
                              value={benefit.description}
                              onChange={(e) => {
                                const newB = [...benefits];
                                newB[bIndex].description = e.target.value;
                                setBenefits(newB);
                              }}
                              className="min-h-[50px] text-xs resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">Belum ada manfaat yang ditambahkan.</p>
                  )}
                </div>

                {/* Highlights Program */}
                <div className="space-y-2 sm:col-span-2 pt-2 border-t border-border/40">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold">Highlights Program ({highlights.length})</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs gap-1"
                      onClick={() => setHighlights([...highlights, ''])}
                    >
                      <Plus className="h-3 w-3" /> Tambah Highlight
                    </Button>
                  </div>
                  {highlights.length > 0 ? (
                    <div className="space-y-2 mt-2">
                      {highlights.map((highlight, hIndex) => (
                        <div key={hIndex} className="flex items-center gap-2">
                          <Input
                            placeholder="Contoh: Pembicara Praktisi IT"
                            value={highlight}
                            onChange={(e) => {
                              const newH = [...highlights];
                              newH[hIndex] = e.target.value;
                              setHighlights(newH);
                            }}
                            className="h-8 text-xs flex-1"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:bg-destructive/10 shrink-0"
                            onClick={() => setHighlights(highlights.filter((_, idx) => idx !== hIndex))}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">Belum ada highlight yang ditambahkan.</p>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="pt-4 border-t border-border/20">
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)} disabled={isSaving}>
                Batal
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...
                  </>
                ) : (
                  'Simpan Program Kerja'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus program kerja <strong>{programToDelete?.title}</strong>? Aksi ini tidak dapat dibatalkan dan file gambar akan dihapus dari server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setProgramToDelete(null)}>Batal</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive hover:bg-destructive/90 text-white" onClick={handleDelete}>Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
