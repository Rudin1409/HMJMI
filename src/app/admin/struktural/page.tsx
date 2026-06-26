'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUserProfile } from '@/firebase';
import { api } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { useToast } from '@/hooks/use-toast';
import {
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  Loader2,
  Upload,
  Instagram,
  Sparkles,
  ArrowUpRight,
  Info
} from 'lucide-react';

interface StructuralMember {
  id: number;
  name: string;
  role: string;
  class: string;
  avatar: string;
  instagram: string | null;
  department_id: string;
  division_id: string | null;
  type: 'head' | 'member';
  order_index: number;
  image_rotation: string;
  image_grayscale: string;
  image_object_position: string;
  image_zoom: string;
}

const DEPARTMENTS = [
  { id: "inti", name: "BPH", fullName: "Badan Pengurus Harian" },
  { id: "ptkp", name: "PTKP", fullName: "Perguruan Tinggi dan Kepemudaan" },
  { id: "humas", name: "HUMAS", fullName: "Hubungan Mahasiswa" },
  { id: "psdm", name: "PSDM", fullName: "Pengembangan Sumber Daya Mahasiswa" },
  { id: "kesma", name: "KESMA", fullName: "Kesejahteraan Mahasiswa" },
  { id: "bistra", name: "BISTRA", fullName: "Bisnis dan Kemitraan" }
];

const DIVISIONS: { [key: string]: { id: string; name: string }[] } = {
  ptkp: [
    { id: "akademik", name: "Divisi Akademik" },
    { id: "kepemudaan", name: "Divisi Kepemudaan" }
  ],
  humas: [
    { id: "medkraf", name: "Media Kreatif" },
    { id: "kominfo", name: "Komunikasi dan Informasi" },
    { id: "jurnalis", name: "Jurnalistik" }
  ],
  psdm: [
    { id: "minatbakat", name: "Minat Bakat" },
    { id: "hrd", name: "HRD" }
  ],
  kesma: [
    { id: "agama", name: "Agama" },
    { id: "sosial", name: "Sosial" }
  ],
  bistra: [
    { id: "bisnis", name: "Bisnis" },
    { id: "kemitraan", name: "Kemitraan" }
  ]
};

const ROTATION_OPTIONS = [
  { value: 'rotate-0', label: 'Tegak Lurus (0°)' },
  { value: 'rotate-1', label: 'Miring Kanan Sedikit (1°)' },
  { value: 'rotate-2', label: 'Miring Kanan Sedang (2°)' },
  { value: 'rotate-3', label: 'Miring Kanan Kuat (3°)' },
  { value: 'rotate-6', label: 'Miring Kanan Ekstrem (6°)' },
  { value: '-rotate-1', label: 'Miring Kiri Sedikit (-1°)' },
  { value: '-rotate-2', label: 'Miring Kiri Sedang (-2°)' },
  { value: '-rotate-3', label: 'Miring Kiri Kuat (-3°)' },
  { value: '-rotate-6', label: 'Miring Kiri Ekstrem (-6°)' },
];

const GRAYSCALE_OPTIONS = [
  { value: 'none', label: 'Normal (Penuh Warna)' },
  { value: 'grayscale_hover', label: 'Hitam Putih, Berwarna Saat Kursor Di Atasnya' },
  { value: 'grayscale_always', label: 'Hitam Putih Selamanya' },
];

function getStructuralImageStyle(member: {
  image_zoom?: string | null;
  image_object_position?: string | null;
}) {
  const styles: React.CSSProperties = {
    transformOrigin: 'center center',
  };

  // Parse Zoom
  let scale = 1;
  const zoom = member.image_zoom || 'scale-100';
  if (zoom.startsWith('scale-')) {
    const scaleMap: { [key: string]: number } = {
      'scale-100': 1,
      'scale-105': 1.05,
      'scale-110': 1.1,
      'scale-115': 1.15,
      'scale-125': 1.25,
    };
    scale = scaleMap[zoom] ?? 1;
  } else {
    const num = parseFloat(zoom);
    scale = isNaN(num) ? 1 : num;
  }

  // Parse Position X & Y / Crop
  let posX = 50;
  let posY = 50;
  const pos = member.image_object_position || 'object-center';
  if (pos.startsWith('object-')) {
    const posMap: { [key: string]: { x: number; y: number } } = {
      'object-center': { x: 50, y: 50 },
      'object-top': { x: 50, y: 0 },
      'object-bottom': { x: 50, y: 100 },
      'object-left': { x: 0, y: 50 },
      'object-right': { x: 100, y: 50 },
    };
    const mapped = posMap[pos] ?? { x: 50, y: 50 };
    posX = mapped.x;
    posY = mapped.y;
  } else if (pos.includes(' ')) {
    const parts = pos.split(' ');
    const numX = parseInt(parts[0]);
    const numY = parseInt(parts[1]);
    posX = isNaN(numX) ? 50 : numX;
    posY = isNaN(numY) ? 50 : numY;
  } else {
    const num = parseInt(pos);
    posX = 50;
    posY = isNaN(num) ? 50 : num;
  }

  // Apply objectPosition for native crop (aspect ratio offset)
  styles.objectPosition = `${posX}% ${posY}%`;

  // Calculate translation X and Y based on zoom to slide the scaled viewport
  const translateXVal = ((50 - posX) / 50) * ((scale - 1) / 2) * 100;
  const translateYVal = ((50 - posY) / 50) * ((scale - 1) / 2) * 100;
  styles.transform = `scale(${scale}) translate(${translateXVal}%, ${translateYVal}%)`;

  return styles;
}

const parseCropToPercentages = (pos: string): { x: number; y: number } => {
  if (pos.startsWith('object-')) {
    const posMap: { [key: string]: { x: number; y: number } } = {
      'object-center': { x: 50, y: 50 },
      'object-top': { x: 50, y: 0 },
      'object-bottom': { x: 50, y: 100 },
      'object-left': { x: 0, y: 50 },
      'object-right': { x: 100, y: 50 },
    };
    return posMap[pos] ?? { x: 50, y: 50 };
  }
  if (pos.includes(' ')) {
    const parts = pos.split(' ');
    const numX = parseInt(parts[0]);
    const numY = parseInt(parts[1]);
    return {
      x: isNaN(numX) ? 50 : numX,
      y: isNaN(numY) ? 50 : numY,
    };
  }
  const num = parseInt(pos);
  return {
    x: 50,
    y: isNaN(num) ? 50 : num,
  };
};

const parseZoomToNumeric = (zoom: string): number => {
  if (zoom.startsWith('scale-')) {
    const scaleMap: { [key: string]: number } = {
      'scale-100': 1,
      'scale-105': 1.05,
      'scale-110': 1.1,
      'scale-115': 1.15,
      'scale-125': 1.25,
    };
    return scaleMap[zoom] ?? 1;
  }
  const num = parseFloat(zoom);
  return isNaN(num) ? 1 : num;
};

export default function StructuralAdminPage() {
  const router = useRouter();
  const { userProfile, isLoading: authLoading } = useUserProfile();
  const { toast } = useToast();

  const [members, setMembers] = useState<StructuralMember[]>([]);
  const [activeDept, setActiveDept] = useState<string>('inti');
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [isReordering, setIsReordering] = useState<boolean>(false);

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<StructuralMember | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false);
  const [memberToDelete, setMemberToDelete] = useState<number | null>(null);

  // Form Fields
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [className, setClassName] = useState<string>('MI 2024');
  const [instagram, setInstagram] = useState<string>('');
  const [departmentId, setDepartmentId] = useState<string>('inti');
  const [divisionId, setDivisionId] = useState<string>('none');
  const [type, setType] = useState<'head' | 'member'>('member');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  // Style Settings
  const [imgRotation, setImgRotation] = useState<string>('rotate-3');
  const [imgGrayscale, setImgGrayscale] = useState<string>('none');
  const [imgCrop, setImgCrop] = useState<string>('50 50');
  const [imgZoom, setImgZoom] = useState<string>('1');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const data = await api.getStructuralMembers();
      setMembers(data);
    } catch (err: any) {
      toast({
        title: "Gagal Mengambil Data",
        description: err.message || "Terjadi kesalahan saat memuat data pengurus.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddForm = () => {
    setSelectedMember(null);
    setName('');
    setRole('');
    setClassName('MI 2024');
    setInstagram('');
    setDepartmentId(activeDept);
    setDivisionId('none');
    setType('member');
    setAvatarUrl('');
    setAvatarFile(null);
    setAvatarPreview('');
    setImgRotation('rotate-0');
    setImgGrayscale('none');
    setImgCrop('50 50');
    setImgZoom('1');
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (member: StructuralMember) => {
    setSelectedMember(member);
    setName(member.name);
    setRole(member.role);
    setClassName(member.class);
    setInstagram(member.instagram ? getInstagramUsername(member.instagram) : '');
    setDepartmentId(member.department_id);
    setDivisionId(member.division_id || 'none');
    setType(member.type);
    setAvatarUrl(member.avatar);
    setAvatarFile(null);
    setAvatarPreview(member.avatar);
    setImgRotation(member.image_rotation);
    setImgGrayscale(member.image_grayscale);
    setImgCrop(member.image_object_position);
    setImgZoom(member.image_zoom);
    setIsFormOpen(true);
  };

  const MAX_FILE_SIZE_MB = 1;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  const ALLOWED_EXTENSIONS = ['JPG', 'JPEG', 'PNG', 'WEBP'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast({
          title: "❌ Tipe File Tidak Didukung",
          description: `File "${file.name}" bertipe ${file.type || 'tidak diketahui'}. Hanya format ${ALLOWED_EXTENSIONS.join(', ')} yang diterima. File akan otomatis dikonversi ke WebP oleh sistem.`,
          variant: "destructive",
        });
        e.target.value = '';
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE_BYTES) {
        const fileSizeKB = (file.size / 1024).toFixed(0);
        toast({
          title: "❌ Ukuran File Terlalu Besar",
          description: `File "${file.name}" berukuran ${fileSizeKB} KB (melebihi batas maksimum ${MAX_FILE_SIZE_MB} MB). Silakan kompres atau gunakan foto dengan resolusi lebih kecil.`,
          variant: "destructive",
        });
        e.target.value = '';
        return;
      }

      // Success — set file and show info toast
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      setAvatarUrl('');

      const fileSizeKB = (file.size / 1024).toFixed(0);
      const fileExt = file.name.split('.').pop()?.toUpperCase() || '?';
      toast({
        title: "✅ Foto Berhasil Dipilih",
        description: `"${file.name}" (${fileSizeKB} KB, ${fileExt}) — Foto akan otomatis dikonversi ke format WebP dan dikompres saat disimpan untuk performa optimal.`,
      });
    }
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !className) {
      toast({
        title: "Validasi Gagal",
        description: "Nama, Jabatan, dan Angkatan wajib diisi.",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('role', role);
      formData.append('class', className);
      formData.append('department_id', departmentId);
      formData.append('type', type);
      formData.append('image_rotation', imgRotation);
      formData.append('image_grayscale', imgGrayscale);
      formData.append('image_object_position', imgCrop);
      formData.append('image_zoom', imgZoom);

      if (instagram) {
        const cleanUsername = instagram.trim().replace(/^@/, '');
        let finalUrl = cleanUsername;
        if (cleanUsername) {
          if (!cleanUsername.startsWith('http://') && !cleanUsername.startsWith('https://')) {
            finalUrl = `https://www.instagram.com/${cleanUsername}/`;
          } else {
            try {
              const path = new URL(cleanUsername).pathname;
              const username = path.split('/').filter(Boolean).pop();
              if (username) {
                finalUrl = `https://www.instagram.com/${username}/`;
              }
            } catch (e) {}
          }
          formData.append('instagram', finalUrl);
        }
      }
      if (divisionId && divisionId !== 'none') formData.append('division_id', divisionId);

      if (avatarFile) {
        formData.append('avatar_file', avatarFile);
      } else if (avatarUrl) {
        formData.append('avatar', avatarUrl);
      }

      if (selectedMember) {
        // Edit mode
        await api.updateStructuralMember(selectedMember.id, formData);
        toast({
          title: "Pengurus Diperbarui",
          description: `Data ${name} berhasil disimpan.`
        });
      } else {
        // Add mode
        // Set order index to be at the end
        const maxOrder = members
          .filter(m => m.department_id === departmentId)
          .reduce((max, m) => m.order_index > max ? m.order_index : max, 0);
        formData.append('order_index', String(maxOrder + 1));

        await api.createStructuralMember(formData);
        toast({
          title: "Pengurus Ditambahkan",
          description: `Data ${name} berhasil ditambahkan.`
        });
      }

      setIsFormOpen(false);
      fetchMembers();
    } catch (err: any) {
      toast({
        title: "Gagal Menyimpan Data",
        description: err.message || "Terjadi kesalahan.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setMemberToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (memberToDelete === null) return;
    try {
      await api.deleteStructuralMember(memberToDelete);
      toast({
        title: "Berhasil Dihapus",
        description: "Pengurus berhasil dihapus dari sistem."
      });
      fetchMembers();
    } catch (err: any) {
      toast({
        title: "Gagal Menghapus",
        description: err.message || "Terjadi kesalahan saat menghapus pengurus.",
        variant: "destructive"
      });
    } finally {
      setDeleteConfirmOpen(false);
      setMemberToDelete(null);
    }
  };

  const handleReorder = async (memberId: number, direction: 'up' | 'down') => {
    if (isReordering) return;

    const member = members.find(m => m.id === memberId);
    if (!member) return;

    const isSameGroup = (m: StructuralMember) => {
      if (m.department_id !== member.department_id || m.type !== member.type) {
        return false;
      }
      const divA = m.division_id === 'none' ? null : m.division_id;
      const divB = member.division_id === 'none' ? null : member.division_id;
      return divA === divB;
    };

    // Sort group members by order_index, with id fallback for stable/duplicate sorting
    const groupMembers = members
      .filter(isSameGroup)
      .sort((a, b) => {
        if (a.order_index !== b.order_index) {
          return a.order_index - b.order_index;
        }
        return a.id - b.id;
      });

    const index = groupMembers.findIndex(m => m.id === memberId);
    if (index === -1) return;

    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === groupMembers.length - 1) return;

    // Normalize group members indices strictly to 1, 2, 3... to heal any duplicates/overlaps
    const normalizedGroup = groupMembers.map((m, idx) => ({
      ...m,
      order_index: idx + 1
    }));

    const targetIndex = index;
    const swapIndex = direction === 'up' ? index - 1 : index + 1;

    const targetMemberNormalized = normalizedGroup[targetIndex];
    const swapMemberNormalized = normalizedGroup[swapIndex];

    const targetNewOrder = swapMemberNormalized.order_index;
    const swapNewOrder = targetMemberNormalized.order_index;

    // Build the full updated list for this group
    const updatedGroupItems = normalizedGroup.map(m => {
      if (m.id === targetMemberNormalized.id) {
        return { id: m.id, order_index: targetNewOrder };
      }
      if (m.id === swapMemberNormalized.id) {
        return { id: m.id, order_index: swapNewOrder };
      }
      return { id: m.id, order_index: m.order_index };
    });

    const previousState = [...members];

    // Optimistic Update: Update React state instantly without mutating original objects
    setMembers(prev => {
      return prev.map(m => {
        const match = updatedGroupItems.find(u => u.id === m.id);
        if (match) {
          return { ...m, order_index: match.order_index };
        }
        return m;
      }).sort((a, b) => a.order_index - b.order_index);
    });

    setIsReordering(true);
    try {
      await api.reorderStructuralMembers(updatedGroupItems);
    } catch (err: any) {
      // Rollback on error
      setMembers(previousState);
      toast({
        title: "Gagal Memperbarui Urutan",
        description: err.message || "Gagal menghubungi server.",
        variant: "destructive"
      });
    } finally {
      setIsReordering(false);
    }
  };

  const getInstagramUsername = (url: string) => {
    if (!url) return '';
    try {
      const path = new URL(url).pathname;
      return path.split('/').filter(Boolean).pop() || '';
    } catch (e) {
      return url;
    }
  };

  // Helper filters
  const filteredHeads = members
    .filter(m => m.department_id === activeDept && m.type === 'head')
    .sort((a, b) => a.order_index - b.order_index);

  const filteredMembers = members
    .filter(m => m.department_id === activeDept && m.type === 'member')
    .sort((a, b) => a.order_index - b.order_index);

  const activeDeptData = DEPARTMENTS.find(d => d.id === activeDept);

  return (
    <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kelola Struktur Organisasi</h1>
          <p className="text-muted-foreground mt-2">Atur pimpinan, anggota departemen, dan kustomisasi gaya visual kartu profil.</p>
        </div>
        <Button onClick={handleOpenAddForm}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Pengurus
        </Button>
      </div>

      {/* Department Selector Tab List */}
      <div className="flex flex-wrap gap-2 bg-muted/40 p-2 rounded-xl">
        {DEPARTMENTS.map((dept) => (
          <Button
            key={dept.id}
            variant={activeDept === dept.id ? 'secondary' : 'ghost'}
            className={activeDept === dept.id ? 'bg-background shadow-sm font-semibold' : 'text-muted-foreground'}
            onClick={() => setActiveDept(dept.id)}
          >
            {dept.name}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-2 border bg-blue-500/5 dark:bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400 p-4 rounded-xl text-sm">
        <Info className="h-5 w-5 shrink-0" />
        <div>
          Sedang menampilkan <strong>{activeDeptData?.fullName}</strong>. Anda dapat mengurutkan urutan tampil dengan menekan tombol Panah Atas/Bawah.
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-64 gap-4 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p>Memuat pengurus...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-12">
          {/* 1. Heads Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold border-b pb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              Pimpinan / Pengurus Inti ({filteredHeads.length})
            </h2>

            {filteredHeads.length === 0 ? (
              <p className="text-muted-foreground text-sm italic">Belum ada pengurus di kategori pimpinan.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHeads.map((member, index) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    isFirst={index === 0}
                    isLast={index === filteredHeads.length - 1}
                    onEdit={handleOpenEditForm}
                    onDelete={handleDeleteClick}
                    onReorder={handleReorder}
                    getInstagramUsername={getInstagramUsername}
                    isReordering={isReordering}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 2. Members Section */}
          {(() => {
            const deptDivisions = DIVISIONS[activeDept] || [];

            // Group members by division
            const membersByDivision: { [key: string]: StructuralMember[] } = {};
            const membersWithoutDivision: StructuralMember[] = [];

            filteredMembers.forEach(member => {
              const divId = member.division_id;
              if (divId && divId !== 'none' && deptDivisions.some(d => d.id === divId)) {
                if (!membersByDivision[divId]) {
                  membersByDivision[divId] = [];
                }
                membersByDivision[divId].push(member);
              } else {
                membersWithoutDivision.push(member);
              }
            });

            if (filteredMembers.length === 0) {
              return (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold border-b pb-2 flex items-center gap-2">
                    Anggota Departemen (0)
                  </h2>
                  <p className="text-muted-foreground text-sm italic">Belum ada anggota di departemen ini.</p>
                </div>
              );
            }

            if (deptDivisions.length === 0) {
              // No divisions defined for this department, show all members together
              return (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold border-b pb-2 flex items-center gap-2">
                    Anggota Departemen ({filteredMembers.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMembers.map((member, index) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        isFirst={index === 0}
                        isLast={index === filteredMembers.length - 1}
                        onEdit={handleOpenEditForm}
                        onDelete={handleDeleteClick}
                        onReorder={handleReorder}
                        getInstagramUsername={getInstagramUsername}
                        isReordering={isReordering}
                      />
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div className="space-y-8">
                {deptDivisions.map(division => {
                  const divMembers = membersByDivision[division.id] || [];
                  return (
                    <div key={division.id} className="space-y-4">
                      <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2 text-primary">
                        Anggota - {division.name} ({divMembers.length})
                      </h3>
                      {divMembers.length === 0 ? (
                        <p className="text-muted-foreground text-sm italic">Belum ada anggota di divisi ini.</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {divMembers.map((member, index) => (
                            <MemberCard
                              key={member.id}
                              member={member}
                              isFirst={index === 0}
                              isLast={index === divMembers.length - 1}
                              onEdit={handleOpenEditForm}
                              onDelete={handleDeleteClick}
                              onReorder={handleReorder}
                              getInstagramUsername={getInstagramUsername}
                              isReordering={isReordering}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {membersWithoutDivision.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2 text-muted-foreground">
                      Anggota Tanpa Divisi ({membersWithoutDivision.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {membersWithoutDivision.map((member, index) => (
                        <MemberCard
                          key={member.id}
                          member={member}
                          isFirst={index === 0}
                          isLast={index === membersWithoutDivision.length - 1}
                          onEdit={handleOpenEditForm}
                          onDelete={handleDeleteClick}
                          onReorder={handleReorder}
                          getInstagramUsername={getInstagramUsername}
                          isReordering={isReordering}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* Form Dialog (Add / Edit) */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedMember ? 'Edit Data Pengurus' : 'Tambah Pengurus Baru'}</DialogTitle>
            <DialogDescription>Isi detail pengurus serta atur layout foto visual di sebelah kanan.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveMember} className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-4">
            {/* Left: Input Form */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Contoh: Muhammad Farhan" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="role">Jabatan</Label>
                <Input id="role" value={role} onChange={e => setRole(e.target.value)} placeholder="Contoh: Ketua Himpunan / Anggota Kominfo" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="class">Angkatan (Kelas/Tahun)</Label>
                  <Input id="class" value={className} onChange={e => setClassName(e.target.value)} placeholder="Contoh: MI 2024" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="type">Tipe</Label>
                  <Select value={type} onValueChange={(val: 'head' | 'member') => setType(val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="head">Pimpinan (Koor/BPH/Kepala)</SelectItem>
                      <SelectItem value="member">Anggota Biasa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="department">Departemen</Label>
                  <Select value={departmentId} onValueChange={setDepartmentId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Departemen" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEPARTMENTS.map(d => (
                        <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="division">Divisi (Sub-Departemen)</Label>
                  <Select
                    value={divisionId}
                    onValueChange={setDivisionId}
                    disabled={!DIVISIONS[departmentId]}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Divisi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Tanpa Divisi</SelectItem>
                      {DIVISIONS[departmentId]?.map(div => (
                        <SelectItem key={div.id} value={div.id}>{div.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="instagram">Username Instagram (Opsional)</Label>
                <Input id="instagram" type="text" value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="Contoh: username (tanpa @)" />
              </div>

              <div className="border-t pt-4 space-y-3">
                <Label>Foto Profil</Label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Label
                      htmlFor="photo-file"
                      className="flex items-center justify-center border border-dashed rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors w-full h-20"
                    >
                      <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
                        <Upload className="h-4 w-4" />
                        <span>Pilih & Unggah File Foto</span>
                        <span className="text-[10px] opacity-70">JPG, PNG, atau WebP — Maks. 1 MB</span>
                      </div>
                    </Label>
                    <input
                      id="photo-file"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground shrink-0">atau masukkan URL langsung:</span>
                    <Input
                      value={avatarUrl}
                      onChange={e => {
                        setAvatarUrl(e.target.value);
                        setAvatarFile(null);
                        setAvatarPreview(e.target.value);
                      }}
                      placeholder="https://example.com/foto.jpg"
                      className="text-xs h-8"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Style Settings & Live Preview */}
            <div className="lg:col-span-5 border-l pl-0 lg:pl-8 flex flex-col gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-sm border-b pb-2">Kustomisasi Gaya Tampilan Foto</h3>

                <div className="space-y-1">
                  <Label className="text-xs">Kemiringan Frame Foto (Rotation)</Label>
                  <Select value={imgRotation} onValueChange={setImgRotation}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ROTATION_OPTIONS.map(opt => (
                        <SelectItem key={opt.value} value={opt.value} className="text-xs">{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Mode Warna Grayscale</Label>
                  <Select value={imgGrayscale} onValueChange={setImgGrayscale}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {GRAYSCALE_OPTIONS.map(opt => (
                        <SelectItem key={opt.value} value={opt.value} className="text-xs">{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Preset Recommendation Buttons */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rekomendasi Cepat Crop/Zoom</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 justify-start px-2 font-normal border-border/80 hover:bg-muted"
                      onClick={() => {
                        setImgZoom('1');
                        setImgCrop('50 50');
                      }}
                    >
                      🎯 Default / Tengah
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 justify-start px-2 font-normal border-border/80 hover:bg-muted"
                      onClick={() => {
                        setImgZoom('1.2');
                        setImgCrop('50 15');
                      }}
                    >
                      👤 Fokus Kepala (Atas)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 justify-start px-2 font-normal border-border/80 hover:bg-muted"
                      onClick={() => {
                        setImgZoom('1.45');
                        setImgCrop('50 50');
                      }}
                    >
                      🔍 Fokus Tengah (Zoom)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 justify-start px-2 font-normal border-border/80 hover:bg-muted"
                      onClick={() => {
                        setImgZoom('1.1');
                        setImgCrop('50 35');
                      }}
                    >
                      👤 Zoom Sedang + Atas
                    </Button>
                  </div>
                </div>

                {/* Manual Sliders */}
                <div className="space-y-4 pt-3 border-t border-border">
                  {/* Zoom Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <Label htmlFor="zoom-slider" className="font-semibold">Skala Zoom</Label>
                      <span className="font-mono text-[11px] text-muted-foreground font-bold bg-muted px-1.5 py-0.5 rounded">
                        {parseZoomToNumeric(imgZoom).toFixed(2)}x
                      </span>
                    </div>
                    <input
                      id="zoom-slider"
                      type="range"
                      min="1"
                      max="2"
                      step="0.05"
                      value={parseZoomToNumeric(imgZoom)}
                      onChange={(e) => setImgZoom(e.target.value)}
                      className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  {/* Horizontal position X Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <Label htmlFor="pos-x-slider" className="font-semibold">Pergeseran Posisi X (Horizontal)</Label>
                      <span className="font-mono text-[11px] text-muted-foreground font-bold bg-muted px-1.5 py-0.5 rounded">
                        {parseCropToPercentages(imgCrop).x}%
                      </span>
                    </div>
                    <input
                      id="pos-x-slider"
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={parseCropToPercentages(imgCrop).x}
                      onChange={(e) => setImgCrop(prev => {
                        const parsed = parseCropToPercentages(prev);
                        return `${e.target.value} ${parsed.y}`;
                      })}
                      className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
                      <span>0% (Kiri)</span>
                      <span>50% (Tengah)</span>
                      <span>100% (Kanan)</span>
                    </div>
                  </div>

                  {/* Vertical position Y Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <Label htmlFor="pos-y-slider" className="font-semibold">Pergeseran Posisi Y (Vertikal)</Label>
                      <span className="font-mono text-[11px] text-muted-foreground font-bold bg-muted px-1.5 py-0.5 rounded">
                        {parseCropToPercentages(imgCrop).y}%
                      </span>
                    </div>
                    <input
                      id="pos-y-slider"
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={parseCropToPercentages(imgCrop).y}
                      onChange={(e) => setImgCrop(prev => {
                        const parsed = parseCropToPercentages(prev);
                        return `${parsed.x} ${e.target.value}`;
                      })}
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

              {/* Live Preview Area */}
              <div className="space-y-2 flex-1 flex flex-col justify-end">
                <Label className="text-xs text-muted-foreground">Live Preview Tampilan Foto</Label>
                <div className="border rounded-2xl p-6 bg-slate-950/20 dark:bg-slate-950/40 flex justify-center items-center min-h-[260px]">
                  <div className="relative group/preview w-40 h-48 rounded-[1.5rem] p-[2px] bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-blue-500/30 dark:from-white/30 dark:via-purple-500/30 dark:to-white/10 shadow-lg transition-all duration-300">
                    <div className={`relative w-full h-full rounded-[1.4rem] overflow-hidden bg-slate-900/50 transition-all duration-300 ${imgRotation}`}>
                      {avatarPreview ? (
                        <Image
                          src={avatarPreview}
                          alt="Live Preview"
                          fill
                          className={`object-cover transition-all duration-300 ${
                            imgGrayscale === 'grayscale_always' ? 'grayscale' :
                            imgGrayscale === 'grayscale_hover' ? 'grayscale hover:grayscale-0' : ''
                          }`}
                          style={getStructuralImageStyle({ image_zoom: imgZoom, image_object_position: imgCrop })}
                          unoptimized
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground text-center p-3">
                          Foto belum diunggah
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="col-span-full border-t pt-4">
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)} disabled={saving}>
                Batal
              </Button>
              <Button type="submit" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {selectedMember ? 'Simpan Perubahan' : 'Tambah Pengurus'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin ingin menghapus pengurus ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini permanen dan data pengurus akan dihapus selamanya dari database kami.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Ya, Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Sub-Component: Member Card
interface MemberCardProps {
  member: StructuralMember;
  isFirst: boolean;
  isLast: boolean;
  onEdit: (member: StructuralMember) => void;
  onDelete: (id: number) => void;
  onReorder: (id: number, direction: 'up' | 'down') => void;
  getInstagramUsername: (url: string) => string;
  isReordering?: boolean;
}

function MemberCard({
  member,
  isFirst,
  isLast,
  onEdit,
  onDelete,
  onReorder,
  getInstagramUsername,
  isReordering
}: MemberCardProps) {
  const igUsername = member.instagram ? getInstagramUsername(member.instagram) : '';

  return (
    <Card className="flex flex-col bg-card hover:bg-accent/10 border transition-colors shadow-sm rounded-2xl overflow-hidden">
      <CardContent className="p-5 flex gap-4 items-center flex-1">
        {/* Profile Image Preview Box */}
        <div className="relative shrink-0 w-24 h-28 rounded-xl p-[2px] bg-gradient-to-br from-purple-500/20 to-pink-500/20 dark:from-white/20 dark:to-white/5 shadow-md">
          <div className={`relative w-full h-full rounded-[10px] overflow-hidden bg-slate-900/50 ${member.image_rotation}`}>
            <ImageWithSkeleton
              src={member.avatar}
              alt={member.name}
              fill
              className={`object-cover transition-all duration-300 ${
                member.image_grayscale === 'grayscale_always' ? 'grayscale' :
                member.image_grayscale === 'grayscale_hover' ? 'grayscale hover:grayscale-0' : ''
              }`}
              style={getStructuralImageStyle(member)}
              containerClassName="absolute inset-0"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <h3 className="font-bold text-base truncate" title={member.name}>{member.name}</h3>
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-xs py-0.5 truncate font-medium">
            {member.role}
          </Badge>
          <p className="text-xs text-muted-foreground">{member.class}</p>

          {member.instagram && igUsername && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-pink-500 transition-colors"
            >
              <Instagram className="h-3.5 w-3.5" />
              <span className="truncate">{igUsername}</span>
            </a>
          )}
        </div>
      </CardContent>

      <CardFooter className="bg-muted/30 border-t px-5 py-3 flex justify-between items-center gap-2">
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-muted-foreground"
            onClick={() => onReorder(member.id, 'up')}
            disabled={isFirst || isReordering}
            title="Pindah ke Atas"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-muted-foreground"
            onClick={() => onReorder(member.id, 'down')}
            disabled={isLast || isReordering}
            title="Pindah ke Bawah"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-8"
            onClick={() => onEdit(member)}
          >
            <Edit2 className="h-3.5 w-3.5 mr-1" /> Edit
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onDelete(member.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
