import { useEffect, useState } from 'react';
import { clubeApi } from '@/infrastructure/api/client';
import { Shield, Save, MapPin, Building2, Loader2 } from 'lucide-react';
import { ImageUpload } from '@/presentation/components/ui/ImageUpload';
import { Skeleton } from '@/presentation/components/ui/Skeleton';
import { useToastStore } from '@/presentation/stores/toast-store';

export function TeamPage() {
  const [team, setTeam] = useState<any>(null);
  const [form, setForm] = useState({ name: '', shortName: '', stadium: '', city: '' });
  const [initialForm, setInitialForm] = useState<{ name: string; shortName: string; stadium: string; city: string } | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const toast = useToastStore((s) => s.addToast);

  const isDirty = (initialForm !== null && JSON.stringify(form) !== JSON.stringify(initialForm)) || !!logoFile;

  useEffect(() => {
    clubeApi.get('/team')
      .then((data) => {
        if (data && !data.error) {
          setTeam(data);
          const f = { name: data.name || '', shortName: data.shortName || '', stadium: data.stadium || '', city: data.city || '' };
          setForm(f);
          setInitialForm({ ...f });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      if (form.shortName) fd.append('shortName', form.shortName);
      if (form.stadium) fd.append('stadium', form.stadium);
      if (form.city) fd.append('city', form.city);
      if (logoFile) fd.append('logo', logoFile);
      await clubeApi.patch('/admin/team', fd);
      const updated = await clubeApi.get('/team');
      setTeam(updated);
      setInitialForm({ ...form });
      setLogoFile(null);
      toast('Time salvo com sucesso!', 'success');
    } catch (e: any) { toast('Erro: ' + e.message, 'error'); }
    setSaving(false);
  };

  if (loading) return (
    <div className="fade-in">
      <Skeleton className="h-8 w-56 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card space-y-4 p-6">
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <Skeleton className="h-5 w-40" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Skeleton className="h-4 w-28 mb-1.5" /><Skeleton className="h-10 w-full" /></div>
            <div><Skeleton className="h-4 w-32 mb-1.5" /><Skeleton className="h-10 w-full" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Skeleton className="h-4 w-16 mb-1.5" /><Skeleton className="h-10 w-full" /></div>
            <div><Skeleton className="h-4 w-12 mb-1.5" /><Skeleton className="h-10 w-full" /></div>
          </div>
          <Skeleton className="h-32 w-full" />
          <div className="flex justify-end"><Skeleton className="h-10 w-28" /></div>
        </div>
        <div className="lg:col-span-1">
          <div className="card p-6">
            <Skeleton className="h-4 w-28 mb-4" />
            <div className="flex justify-center mb-4"><Skeleton className="w-24 h-24 rounded-full" /></div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-32 mx-auto" />
              <Skeleton className="h-3 w-20 mx-auto" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const previewLogo = logoFile ? URL.createObjectURL(logoFile) : team?.logoUrl;

  return (
    <div className="fade-in">
      <h1 className="font-headline text-headline-md font-bold text-on-surface mb-6">Informações do Time</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 card space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center">
              <Shield size={16} className="text-on-surface-variant" />
            </div>
            <h2 className="font-headline text-headline-sm font-bold">Editar Informações</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Nome do Clube *</label><input value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setTeam({ ...team, name: e.target.value }); }} className="input-field" /></div>
            <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Nome Abreviado</label><input value={form.shortName} onChange={(e) => setForm({ ...form, shortName: e.target.value })} className="input-field" /></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Estádio</label><input value={form.stadium} onChange={(e) => setForm({ ...form, stadium: e.target.value })} className="input-field" /></div>
            <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Cidade</label><input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="input-field" /></div>
          </div>

          <div className="border-t border-outline-variant pt-4">
            <ImageUpload label="Brasão / Logo do Time" currentImage={team?.logoUrl} onUpload={(file) => setLogoFile(file)} />
          </div>

          <div className="flex justify-end border-t border-outline-variant pt-4">
            <button onClick={handleSave} disabled={saving || !isDirty} className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </div>

        {/* Preview Card */}
        <div className="lg:col-span-1">
          <div className="card lg:sticky lg:top-6">
            <h3 className="font-headline text-label-sm font-bold text-on-surface mb-4">Dados do Time</h3>

            {previewLogo ? (
              <div className="flex justify-center mb-4">
                <img src={previewLogo} alt={form.name} className="h-24 w-auto object-contain" />
              </div>
            ) : (
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center">
                  <Shield size={32} className="text-on-surface-variant/30" />
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div className="text-center">
                <p className="font-headline text-sm font-bold text-on-surface">{form.name || 'Nome do Clube'}</p>
                {form.shortName && <p className="text-xs text-on-surface-variant">{form.shortName}</p>}
              </div>

              <div className="border-t border-outline-variant pt-3 space-y-2">
                {form.stadium && (
                  <div className="flex items-center gap-2 text-xs">
                    <Building2 size={12} className="text-on-surface-variant shrink-0" />
                    <span className="text-on-surface-variant">{form.stadium}</span>
                  </div>
                )}
                {form.city && (
                  <div className="flex items-center gap-2 text-xs">
                    <MapPin size={12} className="text-on-surface-variant shrink-0" />
                    <span className="text-on-surface-variant">{form.city}</span>
                  </div>
                )}
              </div>

              {team && (
                <div className="border-t border-outline-variant pt-3">
                  <p className="text-[10px] text-on-surface-variant/50">ID: {team.id}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
