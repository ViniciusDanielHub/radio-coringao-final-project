import { useEffect, useState } from 'react';
import { newsApi } from '@/infrastructure/api/client';
import { Save, Globe, Loader2 } from 'lucide-react';
import { ImageUpload } from '@/presentation/components/ui/ImageUpload';
import { Skeleton } from '@/presentation/components/ui/Skeleton';
import { useToastStore } from '@/presentation/stores/toast-store';

export function SettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [initialSettings, setInitialSettings] = useState<any>(null);
  const toast = useToastStore((s) => s.addToast);

  const isDirty = initialSettings !== null && (
    JSON.stringify({ siteName: settings.siteName, siteDescription: settings.siteDescription }) !==
    JSON.stringify({ siteName: initialSettings.siteName, siteDescription: initialSettings.siteDescription })
  ) || !!logoFile;

  useEffect(() => {
    newsApi.get('/configuracoes').then((data) => { setSettings(data); setInitialSettings({ ...data }); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await newsApi.patch('/admin/configuracoes', {
        siteName: settings.siteName,
        siteDescription: settings.siteDescription,
        footerText: null,
        copyrightText: null,
        socialInstagram: null,
        socialYoutube: null,
        socialTiktok: null,
        socialFacebook: null,
        socialTwitter: null,
      });
      if (logoFile) {
        const fd = new FormData();
        fd.append('logo', logoFile);
        await newsApi.patch('/admin/configuracoes/logo', fd);
        setLogoFile(null);
      }
      const updated = await newsApi.get('/configuracoes');
      setSettings(updated);
      setInitialSettings({ ...updated });
      toast('Configurações salvas com sucesso!', 'success');
    } catch (err: any) { toast('Erro: ' + err.message, 'error'); }
    setSaving(false);
  };

  if (loading) return (
    <div className="fade-in">
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="max-w-2xl">
        <div className="card p-6">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="flex items-start gap-6">
            <Skeleton className="w-24 h-24 rounded-lg shrink-0" />
            <div className="flex-1 space-y-4">
              <div><Skeleton className="h-4 w-24 mb-1.5" /><Skeleton className="h-10 w-full" /></div>
              <div><Skeleton className="h-4 w-20 mb-1.5" /><Skeleton className="h-16 w-full" /></div>
            </div>
          </div>
          <div className="flex justify-end border-t border-outline-variant pt-4 mt-4">
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fade-in">
      <h1 className="font-headline text-headline-md font-bold text-on-surface mb-6">Configurações</h1>

      <div className="max-w-2xl">
        {/* Logo do Site */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center">
              <Globe size={16} className="text-on-surface-variant" />
            </div>
            <h2 className="font-headline text-headline-sm font-bold text-on-surface">Identidade do Site</h2>
          </div>

          <div className="flex items-start gap-6">
            <div className="shrink-0">
              <ImageUpload
                label="Logo"
                currentImage={settings.logoUrl}
                onUpload={(file) => setLogoFile(file)}
              />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Nome do Site</label>
                <input value={settings.siteName || ''} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} className="input-field" placeholder="Rádio Coringão" />
              </div>
              <div>
                <label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Descrição</label>
                <textarea value={settings.siteDescription || ''} onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })} className="input-field h-20 resize-none" placeholder="Portal de notícias do Sport Club Corinthians Paulista..." />
              </div>
            </div>
          </div>

          <div className="flex justify-end border-t border-outline-variant pt-4 mt-4">
            <button onClick={handleSave} disabled={saving || !isDirty} className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
