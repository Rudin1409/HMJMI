'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Feather,
  Wind,
  Sparkles,
  Cpu,
  Rocket,
  Target,
  Leaf,
  Flame,
  Heart,
  Shield,
  Award,
  Landmark,
  HelpCircle,
  Upload,
  Plus,
  Trash2,
  Loader2,
  Save,
  Palette,
  BrainCircuit,
  Info,
  Pencil,
} from 'lucide-react';

// ── Icon & Color Maps ──────────────────────────────────────────────────
const SYMBOL_ICONS: { [key: string]: React.ComponentType<any> } = {
  Feather, Wind, Sparkles, Cpu, Rocket, Target,
  Leaf, Flame, Heart, Shield, Award, Landmark,
};

const COLOR_PRESETS = [
  { name: 'Merah',          class: 'bg-red-500' },
  { name: 'Oranye',         class: 'bg-orange-500' },
  { name: 'Kuning',         class: 'bg-yellow-500' },
  { name: 'Amber',          class: 'bg-amber-500' },
  { name: 'Hijau',          class: 'bg-green-500' },
  { name: 'Emerald',        class: 'bg-emerald-500' },
  { name: 'Teal',           class: 'bg-teal-500' },
  { name: 'Cyan',           class: 'bg-cyan-500' },
  { name: 'Biru',           class: 'bg-blue-500' },
  { name: 'Sky',            class: 'bg-sky-500' },
  { name: 'Indigo',         class: 'bg-indigo-500' },
  { name: 'Ungu',           class: 'bg-purple-500' },
  { name: 'Pink',           class: 'bg-pink-500' },
  { name: 'Fuchsia',        class: 'bg-fuchsia-500' },
  { name: 'Abu-abu',        class: 'bg-gray-500' },
  { name: 'Slate',          class: 'bg-slate-500' },
  { name: 'Putih (Border)', class: 'bg-white border border-gray-300' },
  { name: 'Hitam',          class: 'bg-black' },
];

// ── Page Component ─────────────────────────────────────────────────────
export default function CabinetSettingsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Data state
  const [cabinetName, setCabinetName] = useState('');
  const [overallPhilosophy, setOverallPhilosophy] = useState('');
  const [logoPath, setLogoPath] = useState('');
  const [colorMeanings, setColorMeanings] = useState<any[]>([]);
  const [symbolMeanings, setSymbolMeanings] = useState<any[]>([]);

  // File upload
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Dialog state for editing Color
  const [editColorOpen, setEditColorOpen] = useState(false);
  const [editColorIndex, setEditColorIndex] = useState<number | null>(null);
  const [editColorDraft, setEditColorDraft] = useState({ name: '', class: 'bg-red-500', description: '' });

  // Dialog state for editing Symbol
  const [editSymbolOpen, setEditSymbolOpen] = useState(false);
  const [editSymbolIndex, setEditSymbolIndex] = useState<number | null>(null);
  const [editSymbolDraft, setEditSymbolDraft] = useState({ icon: 'Feather', title: '', description: '' });

  // ── Fetch Data ─────────────────────────────────────────────────────
  useEffect(() => {
    async function fetchCabinetSettings() {
      setIsLoading(true);
      try {
        const data = await api.getCabinetSettings();
        if (data) {
          setCabinetName(data.cabinet_name || '');
          setOverallPhilosophy(data.overall_philosophy || '');
          setLogoPath(data.logo_path || '');
          setColorMeanings(data.color_meanings || []);
          setSymbolMeanings(data.symbol_meanings || []);
        }
      } catch (err: any) {
        toast({ title: 'Gagal Memuat Data', description: err.message || 'Kesalahan saat memuat data.', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    }
    fetchCabinetSettings();
  }, [toast]);

  // ── Logo handler ───────────────────────────────────────────────────
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        toast({ title: 'File Terlalu Besar', description: 'Ukuran logo maksimal adalah 1 MB.', variant: 'destructive' });
        return;
      }
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // ── Color Dialog helpers ───────────────────────────────────────────
  const openAddColor = () => {
    setEditColorIndex(null);
    setEditColorDraft({ name: '', class: 'bg-red-500', description: '' });
    setEditColorOpen(true);
  };

  const openEditColor = (index: number) => {
    setEditColorIndex(index);
    setEditColorDraft({ ...colorMeanings[index] });
    setEditColorOpen(true);
  };

  const saveColorDraft = () => {
    if (!editColorDraft.name.trim() || !editColorDraft.description.trim()) {
      toast({ title: 'Validasi', description: 'Nama dan deskripsi warna harus diisi.', variant: 'destructive' });
      return;
    }
    const newColors = [...colorMeanings];
    if (editColorIndex !== null) {
      newColors[editColorIndex] = { ...editColorDraft };
    } else {
      newColors.push({ ...editColorDraft });
    }
    setColorMeanings(newColors);
    setEditColorOpen(false);
  };

  const handleRemoveColor = (index: number) => {
    const newColors = [...colorMeanings];
    newColors.splice(index, 1);
    setColorMeanings(newColors);
  };

  // ── Symbol Dialog helpers ──────────────────────────────────────────
  const openAddSymbol = () => {
    setEditSymbolIndex(null);
    setEditSymbolDraft({ icon: 'Feather', title: '', description: '' });
    setEditSymbolOpen(true);
  };

  const openEditSymbol = (index: number) => {
    setEditSymbolIndex(index);
    setEditSymbolDraft({ ...symbolMeanings[index] });
    setEditSymbolOpen(true);
  };

  const saveSymbolDraft = () => {
    if (!editSymbolDraft.title.trim() || !editSymbolDraft.description.trim()) {
      toast({ title: 'Validasi', description: 'Judul dan deskripsi simbol harus diisi.', variant: 'destructive' });
      return;
    }
    const newSymbols = [...symbolMeanings];
    if (editSymbolIndex !== null) {
      newSymbols[editSymbolIndex] = { ...editSymbolDraft };
    } else {
      newSymbols.push({ ...editSymbolDraft });
    }
    setSymbolMeanings(newSymbols);
    setEditSymbolOpen(false);
  };

  const handleRemoveSymbol = (index: number) => {
    const newSymbols = [...symbolMeanings];
    newSymbols.splice(index, 1);
    setSymbolMeanings(newSymbols);
  };

  // ── Save All ───────────────────────────────────────────────────────
  const handleSaveSettings = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!cabinetName.trim()) { toast({ title: 'Validasi', description: 'Nama Kabinet wajib diisi.', variant: 'destructive' }); return; }
    if (!overallPhilosophy.trim()) { toast({ title: 'Validasi', description: 'Filosofi Utama wajib diisi.', variant: 'destructive' }); return; }

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append('cabinet_name', cabinetName);
      formData.append('overall_philosophy', overallPhilosophy);
      formData.append('color_meanings', JSON.stringify(colorMeanings));
      formData.append('symbol_meanings', JSON.stringify(symbolMeanings));
      if (logoFile) formData.append('logo_file', logoFile);

      const updated = await api.updateCabinetSettings(formData);
      toast({ title: 'Berhasil Disimpan ✓', description: 'Pengaturan kabinet telah diperbarui.' });
      if (updated) {
        setCabinetName(updated.cabinet_name || '');
        setOverallPhilosophy(updated.overall_philosophy || '');
        setLogoPath(updated.logo_path || '');
        setColorMeanings(updated.color_meanings || []);
        setSymbolMeanings(updated.symbol_meanings || []);
        setLogoFile(null);
        setLogoPreview(null);
      }
    } catch (err: any) {
      toast({ title: 'Gagal Menyimpan', description: err.message || 'Kesalahan.', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  // ── Render Icon ────────────────────────────────────────────────────
  const renderIcon = (name: string, className = 'w-5 h-5') => {
    const Ic = SYMBOL_ICONS[name] || HelpCircle;
    return <Ic className={className} />;
  };

  // ── Loading ────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto pb-20">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pengaturan Kabinet</h1>
          <p className="text-muted-foreground mt-1">Kelola identitas, logo, warna, dan simbol kabinet.</p>
        </div>
        <Button onClick={() => handleSaveSettings()} disabled={isSaving} size="lg" className="gap-2 shrink-0">
          {isSaving ? <><Loader2 className="h-4 w-4 animate-spin" /> Menyimpan...</> : <><Save className="h-4 w-4" /> Simpan Perubahan</>}
        </Button>
      </div>

      {/* ── Section 1: Identitas & Logo ─────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Identitas Kabinet
          </CardTitle>
          <CardDescription>Nama resmi kabinet, filosofi utama, dan logo.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8">
            {/* Left: Form Fields */}
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="cabinetName" className="text-sm font-medium">Nama Kabinet</Label>
                <Input
                  id="cabinetName"
                  value={cabinetName}
                  onChange={(e) => setCabinetName(e.target.value)}
                  placeholder="Contoh: Kabinet Karsadhikara"
                  className="text-base h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="overallPhilosophy" className="text-sm font-medium">Filosofi Utama</Label>
                <Textarea
                  id="overallPhilosophy"
                  value={overallPhilosophy}
                  onChange={(e) => setOverallPhilosophy(e.target.value)}
                  placeholder="Ringkasan filosofi keseluruhan kabinet..."
                  className="min-h-[140px] text-sm leading-relaxed"
                />
              </div>
            </div>

            {/* Right: Logo */}
            <div className="flex flex-col items-center gap-4 md:w-56">
              <div className="relative w-44 h-44 rounded-2xl border-2 border-dashed border-muted-foreground/20 flex items-center justify-center overflow-hidden bg-muted/30">
                {logoPreview ? (
                  <img src={logoPreview} alt="Preview" className="object-contain w-full h-full p-3" />
                ) : logoPath ? (
                  <img src={logoPath} alt="Logo" className="object-contain w-full h-full p-3" onError={(e) => { (e.target as HTMLImageElement).src = '/logo/logokabinet.png'; }} />
                ) : (
                  <div className="text-center p-4">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-40" />
                    <span className="text-xs text-muted-foreground">Belum ada logo</span>
                  </div>
                )}
              </div>
              <div className="w-full space-y-2">
                <input id="logoFile" type="file" accept="image/png,image/jpeg,image/jpg,image/webp" onChange={handleLogoChange} className="hidden" />
                <Button type="button" variant="outline" className="w-full gap-2" onClick={() => document.getElementById('logoFile')?.click()}>
                  <Upload className="w-4 h-4" />
                  {logoFile ? 'Ganti Logo' : 'Pilih Logo'}
                </Button>
                {logoFile && (
                  <p className="text-xs text-center text-primary font-medium">
                    {logoFile.name} ({(logoFile.size / 1024).toFixed(0)} KB)
                  </p>
                )}
                <p className="text-[11px] text-center text-muted-foreground">
                  Max 1 MB · PNG / WebP · Otomatis dikompresi
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Section 2: Makna Warna ──────────────────────────────────── */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              Makna Warna Logo
            </CardTitle>
            <CardDescription className="mt-1">Warna-warna yang terkandung di logo dan makna filosofisnya.</CardDescription>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={openAddColor} className="gap-1.5">
            <Plus className="w-4 h-4" /> Tambah
          </Button>
        </CardHeader>
        <CardContent>
          {colorMeanings.length === 0 ? (
            <div className="text-center py-10 border border-dashed rounded-xl">
              <Palette className="w-10 h-10 text-muted-foreground/25 mx-auto mb-3" />
              <p className="text-muted-foreground">Belum ada makna warna.</p>
              <Button type="button" variant="link" size="sm" onClick={openAddColor} className="mt-2">+ Tambah warna pertama</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {colorMeanings.map((color, index) => (
                <div
                  key={index}
                  className="group relative flex items-start gap-4 p-4 rounded-xl border bg-card hover:bg-accent/30 transition-colors cursor-pointer"
                  onClick={() => openEditColor(index)}
                >
                  {/* Color dot */}
                  <div className={`w-5 h-5 rounded-full flex-shrink-0 mt-0.5 ${color.class || 'bg-slate-500'} shadow-sm`} />

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{color.name}</p>
                    <p className="text-muted-foreground text-sm mt-0.5 line-clamp-2 leading-relaxed">{color.description}</p>
                  </div>

                  {/* Actions (visible on hover) */}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <Button
                      type="button" variant="ghost" size="icon" className="h-8 w-8"
                      onClick={(e) => { e.stopPropagation(); openEditColor(index); }}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      type="button" variant="ghost" size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={(e) => { e.stopPropagation(); handleRemoveColor(index); }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Section 3: Makna Simbol ─────────────────────────────────── */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-primary" />
              Makna Simbol Logo
            </CardTitle>
            <CardDescription className="mt-1">Elemen simbolis logo (sayap, ekor, dll) dan makna filosofisnya.</CardDescription>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={openAddSymbol} className="gap-1.5">
            <Plus className="w-4 h-4" /> Tambah
          </Button>
        </CardHeader>
        <CardContent>
          {symbolMeanings.length === 0 ? (
            <div className="text-center py-10 border border-dashed rounded-xl">
              <BrainCircuit className="w-10 h-10 text-muted-foreground/25 mx-auto mb-3" />
              <p className="text-muted-foreground">Belum ada makna simbol.</p>
              <Button type="button" variant="link" size="sm" onClick={openAddSymbol} className="mt-2">+ Tambah simbol pertama</Button>
            </div>
          ) : (
            <div className="space-y-3">
              {symbolMeanings.map((symbol, index) => (
                <div
                  key={index}
                  className="group relative flex items-start gap-4 p-4 rounded-xl border bg-card hover:bg-accent/30 transition-colors cursor-pointer"
                  onClick={() => openEditSymbol(index)}
                >
                  {/* Icon */}
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                    {renderIcon(symbol.icon)}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{symbol.title}</p>
                    <p className="text-muted-foreground text-sm mt-0.5 line-clamp-2 leading-relaxed">{symbol.description}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <Button
                      type="button" variant="ghost" size="icon" className="h-8 w-8"
                      onClick={(e) => { e.stopPropagation(); openEditSymbol(index); }}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      type="button" variant="ghost" size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={(e) => { e.stopPropagation(); handleRemoveSymbol(index); }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Dialog: Edit Warna ─────────────────────────────────────── */}
      <Dialog open={editColorOpen} onOpenChange={setEditColorOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              {editColorIndex !== null ? 'Edit Makna Warna' : 'Tambah Makna Warna'}
            </DialogTitle>
            <DialogDescription>Isi nama warna, pilih visual warna, dan jelaskan maknanya.</DialogDescription>
          </DialogHeader>
          <div className="space-y-5 pt-2">
            {/* Color Visual Preview */}
            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
              <div className={`w-10 h-10 rounded-full flex-shrink-0 ${editColorDraft.class} shadow-sm border`} />
              <div className="flex-1">
                <Label className="text-sm font-medium mb-1.5 block">Visual Warna</Label>
                <select
                  value={editColorDraft.class}
                  onChange={(e) => setEditColorDraft({ ...editColorDraft, class: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {COLOR_PRESETS.map((preset) => (
                    <option key={preset.class} value={preset.class}>{preset.name}</option>
                  ))}
                  {!COLOR_PRESETS.find(p => p.class === editColorDraft.class) && (
                    <option value={editColorDraft.class}>{editColorDraft.class}</option>
                  )}
                </select>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Nama Warna</Label>
              <Input
                value={editColorDraft.name}
                onChange={(e) => setEditColorDraft({ ...editColorDraft, name: e.target.value })}
                placeholder="Contoh: Merah & Oranye"
                className="h-11 text-base"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Deskripsi Makna</Label>
              <Textarea
                value={editColorDraft.description}
                onChange={(e) => setEditColorDraft({ ...editColorDraft, description: e.target.value })}
                placeholder="Jelaskan makna filosofis dari warna ini..."
                className="min-h-[100px] text-sm leading-relaxed"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setEditColorOpen(false)}>Batal</Button>
              <Button type="button" onClick={saveColorDraft}>
                {editColorIndex !== null ? 'Simpan Perubahan' : 'Tambahkan'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Dialog: Edit Simbol ────────────────────────────────────── */}
      <Dialog open={editSymbolOpen} onOpenChange={setEditSymbolOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-primary" />
              {editSymbolIndex !== null ? 'Edit Makna Simbol' : 'Tambah Makna Simbol'}
            </DialogTitle>
            <DialogDescription>Pilih ikon, beri judul, dan jelaskan makna filosofisnya.</DialogDescription>
          </DialogHeader>
          <div className="space-y-5 pt-2">
            {/* Icon Selector Grid */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Pilih Ikon</Label>
              <div className="grid grid-cols-6 gap-2">
                {Object.keys(SYMBOL_ICONS).map((iconKey) => {
                  const isActive = editSymbolDraft.icon === iconKey;
                  return (
                    <button
                      key={iconKey}
                      type="button"
                      onClick={() => setEditSymbolDraft({ ...editSymbolDraft, icon: iconKey })}
                      className={`flex flex-col items-center gap-1 p-2.5 rounded-lg border-2 transition-all text-xs
                        ${isActive
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-transparent bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                    >
                      {renderIcon(iconKey, 'w-5 h-5')}
                      <span className="truncate w-full text-center text-[10px]">{iconKey}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Judul Simbol</Label>
              <Input
                value={editSymbolDraft.title}
                onChange={(e) => setEditSymbolDraft({ ...editSymbolDraft, title: e.target.value })}
                placeholder="Contoh: Ekor di Bawah"
                className="h-11 text-base"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Deskripsi Makna</Label>
              <Textarea
                value={editSymbolDraft.description}
                onChange={(e) => setEditSymbolDraft({ ...editSymbolDraft, description: e.target.value })}
                placeholder="Jelaskan makna filosofis dari simbol ini secara detail..."
                className="min-h-[120px] text-sm leading-relaxed"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setEditSymbolOpen(false)}>Batal</Button>
              <Button type="button" onClick={saveSymbolDraft}>
                {editSymbolIndex !== null ? 'Simpan Perubahan' : 'Tambahkan'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
