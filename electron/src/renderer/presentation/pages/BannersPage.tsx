import { useEffect, useState } from 'react';
import { newsApi } from '@/infrastructure/api/client';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Modal } from '@/presentation/components/ui/Modal';
import { CardGridSkeleton, Skeleton } from '@/presentation/components/ui/Skeleton';
import { useToastStore } from '@/presentation/stores/toast-store';
import { confirm } from '@/presentation/stores/dialog-store';

const POSITIONS = [
  { value: 'home-top', label: 'Topo da Home' },
  { value: 'home-mid', label: 'Meio da Home' },
  { value: 'sidebar', label: 'Sidebar' },
  { value: 'footer', label: 'Rodapé' },
];

function BannerLayout({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  return (
    <div className="border border-outline-variant rounded-lg overflow-hidden bg-white">
      {/* Navbar */}
      <div className="bg-gray-800 h-7 flex items-center px-3 gap-3">
        <div className="w-5 h-5 bg-white/20 rounded" />
        <div className="flex gap-2">{['', '', '', '', ''].map((_, i) => <div key={i} className="w-10 h-1.5 bg-white/20 rounded" />)}</div>
      </div>

      {/* Banner Topo */}
      <div
        onClick={() => onSelect('home-top')}
        className={`mx-3 mt-2 h-10 rounded-lg cursor-pointer transition-all duration-150 flex items-center justify-center border-2 ${
          selected === 'home-top' ? 'border-primary bg-primary/5 shadow-sm' : 'border-dashed border-gray-300 hover:border-gray-400'
        }`}
      >
        <span className={`text-[9px] font-headline font-bold ${selected === 'home-top' ? 'text-primary' : 'text-gray-400'}`}>
          {selected === 'home-top' ? '✓ Banner Topo' : 'Banner Topo'}
        </span>
      </div>

      <div className="p-3">
        {/* Editorial Grid - Hero + 2 laterais */}
        <div className="flex gap-1.5 mb-1.5">
          <div className="w-3/5 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg" />
          <div className="w-2/5 flex flex-col gap-1.5">
            <div className="flex-1 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg" />
            <div className="flex-1 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg" />
          </div>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-4 gap-1.5 mb-1.5">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-7 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg" />)}
        </div>

        {/* Banner Meio */}
        <div
          onClick={() => onSelect('home-mid')}
          className={`h-9 rounded-lg cursor-pointer transition-all duration-150 flex items-center justify-center border-2 mb-1.5 ${
            selected === 'home-mid' ? 'border-primary bg-primary/5 shadow-sm' : 'border-dashed border-gray-300 hover:border-gray-400'
          }`}
        >
          <span className={`text-[9px] font-headline font-bold ${selected === 'home-mid' ? 'text-primary' : 'text-gray-400'}`}>
            {selected === 'home-mid' ? '✓ Banner Meio' : 'Banner Meio'}
          </span>
        </div>

        {/* Sidebar + conteúdo */}
        <div className="flex gap-1.5">
          <div className="w-2/3 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg" />
          <div
            onClick={() => onSelect('sidebar')}
            className={`w-1/3 rounded-lg cursor-pointer transition-all duration-150 flex items-center justify-center border-2 ${
              selected === 'sidebar' ? 'border-primary bg-primary/5 shadow-sm' : 'border-dashed border-gray-300 hover:border-gray-400'
            }`}
          >
            <span className={`text-[8px] font-headline font-bold ${selected === 'sidebar' ? 'text-primary' : 'text-gray-400'}`}>
              {selected === 'sidebar' ? '✓ Sidebar' : 'Sidebar'}
            </span>
          </div>
        </div>
      </div>

      {/* Banner Rodapé */}
      <div
        onClick={() => onSelect('footer')}
        className={`mx-3 mb-2 h-8 rounded-lg cursor-pointer transition-all duration-150 flex items-center justify-center border-2 ${
          selected === 'footer' ? 'border-primary bg-primary/5 shadow-sm' : 'border-dashed border-gray-300 hover:border-gray-400'
        }`}
      >
        <span className={`text-[9px] font-headline font-bold ${selected === 'footer' ? 'text-primary' : 'text-gray-400'}`}>
          {selected === 'footer' ? '✓ Banner Rodapé' : 'Banner Rodapé'}
        </span>
      </div>
    </div>
  );
}

function BannerCardSkeleton() {
  return (
    <div className="flex-shrink-0 w-64 card">
      <Skeleton className="w-full h-24 rounded-lg mb-2" />
      <div className="flex items-center justify-between mb-1">
        <Skeleton className="h-3.5 w-32" />
        <Skeleton className="h-3.5 w-16 rounded" />
      </div>
      <Skeleton className="h-2.5 w-40" />
      <div className="flex justify-end gap-1 mt-2">
        <Skeleton className="w-6 h-6 rounded" />
        <Skeleton className="w-6 h-6 rounded" />
      </div>
    </div>
  );
}

export function BannersPage() {
  const [items, setItems] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ title: '', subtitle: '', linkUrl: '', position: 'home-top' });
  const [initialForm, setInitialForm] = useState<typeof form | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const toast = useToastStore((s) => s.addToast);

  const isDirty = initialForm !== null && JSON.stringify(form) !== JSON.stringify(initialForm);

  const load = async () => {
    try { const data = await newsApi.get('/admin/banners'); setItems(Array.isArray(data) ? data : []); }
    catch (e: any) { toast('Erro: ' + e.message, 'error'); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    const newForm = { title: '', subtitle: '', linkUrl: '', position: 'home-top' };
    setForm(newForm);
    setInitialForm(newForm);
    setModalOpen(true);
  };

  const openEdit = (b: any) => {
    setEditing(b);
    const loaded = { title: b.title, subtitle: b.subtitle || '', linkUrl: b.linkUrl || '', position: b.position || 'home-top' };
    setForm(loaded);
    setInitialForm(loaded);
    setModalOpen(true);
  };

  const handleSave = async () => {
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    setSaving(true);
    try {
      if (editing) await newsApi.patch(`/admin/banners/${editing.id}`, fd);
      else await newsApi.post('/admin/banners', fd);
      toast('Salvo com sucesso!', 'success'); setModalOpen(false); load();
    } catch (e: any) { toast('Erro: ' + e.message, 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    confirm('Tem certeza que deseja deletar este banner?', async () => {
      try { await newsApi.delete(`/admin/banners/${id}`); toast('Removido.', 'success'); load(); }
      catch (e: any) { toast('Erro: ' + e.message, 'error'); }
    });
  };

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline text-headline-md font-bold text-on-surface">Banners</h1>
        <button onClick={openNew} className="btn-secondary flex items-center gap-2"><Plus size={16} /> Novo Banner</button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <BannerCardSkeleton key={i} />)
        ) : (
          <>
            {items.map((b, i) => (
              <div key={b.id} className="flex-shrink-0 w-64 card slide-up" style={{ animationDelay: `${i * 40}ms` }}>
                <img src={b.imageUrl} alt={b.title} className="w-full h-24 object-cover rounded-lg mb-2" />
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-headline text-xs font-bold text-on-surface truncate">{b.title}</h3>
                  <span className="badge bg-surface-container text-on-surface-variant text-[9px]">{POSITIONS.find((p) => p.value === b.position)?.label || 'Topo'}</span>
                </div>
                {b.subtitle && <p className="text-[10px] text-on-surface-variant truncate">{b.subtitle}</p>}
                <div className="flex justify-end gap-1 mt-2">
                  <button onClick={() => openEdit(b)} className="p-1 rounded hover:bg-surface-container-low text-on-surface-variant"><Pencil size={12} /></button>
                  <button onClick={() => handleDelete(b.id)} className="p-1 rounded hover:bg-gray-100 text-gray-500"><Trash2 size={12} /></button>
                </div>
              </div>
            ))}
            {items.length === 0 && <p className="text-on-surface-variant text-center py-8 w-full">Nenhum banner cadastrado.</p>}
          </>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar Banner' : 'Novo Banner'} maxWidth="max-w-2xl">
        <div className="space-y-4">
          <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Título *</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" /></div>
          <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Subtítulo</label><input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="input-field" /></div>
          <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Link</label><input value={form.linkUrl} onChange={(e) => setForm({ ...form, linkUrl: e.target.value })} className="input-field" placeholder="https://..." /></div>
          <div>
            <label className="block font-headline text-label-sm font-bold text-on-surface mb-2">Posição no Site</label>
            <p className="text-xs text-on-surface-variant mb-2">Clique na posição desejada no layout abaixo</p>
            <BannerLayout selected={form.position} onSelect={(v) => setForm({ ...form, position: v })} />
          </div>
          <button onClick={handleSave} disabled={saving || !isDirty} className="btn-secondary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {saving ? <><Loader2 size={16} className="animate-spin" /> Salvando...</> : 'Salvar'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
