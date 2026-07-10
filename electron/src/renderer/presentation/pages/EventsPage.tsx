import { useEffect, useState } from 'react';
import { newsApi } from '@/infrastructure/api/client';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Modal } from '@/presentation/components/ui/Modal';
import { Skeleton } from '@/presentation/components/ui/Skeleton';
import { useToastStore } from '@/presentation/stores/toast-store';
import { confirm } from '@/presentation/stores/dialog-store';

export function EventsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ title: '', description: '', slug: '', location: '' });
  const [initialForm, setInitialForm] = useState<{ title: string; description: string; slug: string; location: string } | null>(null);
  const toast = useToastStore((s) => s.addToast);

  const isDirty = initialForm !== null && JSON.stringify(form) !== JSON.stringify(initialForm);

  const load = async () => {
    setLoading(true);
    try { const data = await newsApi.get('/admin/eventos'); setItems(Array.isArray(data) ? data : []); }
    catch (e: any) { toast('Erro: ' + e.message, 'error'); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm({ title: '', description: '', slug: '', location: '' }); setInitialForm({ title: '', description: '', slug: '', location: '' }); setModalOpen(true); };
  const openEdit = (e: any) => { setEditing(e); const f = { title: e.title, description: e.description || '', slug: e.slug || '', location: e.location || '' }; setForm(f); setInitialForm({ ...f }); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    try {
      if (editing) await newsApi.put(`/admin/eventos/${editing.id}`, fd);
      else await newsApi.post('/admin/eventos', fd);
      toast('Salvo com sucesso!', 'success'); setModalOpen(false); load();
    } catch (e: any) { toast('Erro: ' + e.message, 'error'); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    confirm('Tem certeza que deseja deletar este evento?', async () => {
      setDeletingId(id);
      try { await newsApi.delete(`/admin/eventos/${id}`); toast('Removido.', 'success'); load(); }
      catch (e: any) { toast('Erro: ' + e.message, 'error'); }
      setDeletingId(null);
    });
  };

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline text-headline-md font-bold text-on-surface">Eventos</h1>
        <button onClick={openNew} className="btn-secondary flex items-center gap-2"><Plus size={16} /> Novo</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-full mb-1" />
              <Skeleton className="h-3 w-2/3 mb-3" />
              <div className="flex justify-end gap-1">
                <Skeleton className="h-7 w-7 rounded" />
                <Skeleton className="h-7 w-7 rounded" />
              </div>
            </div>
          ))
        ) : (
          items.map((e, i) => (
            <div key={e.id} className="card slide-up" style={{ animationDelay: `${i * 40}ms` }}>
              <h3 className="font-headline text-sm font-bold text-on-surface mb-1">{e.title}</h3>
              <p className="text-xs text-on-surface-variant line-clamp-2 mb-3">{e.description}</p>
              <div className="flex justify-end gap-1">
                <button onClick={() => openEdit(e)} className="p-1.5 rounded hover:bg-surface-container-low"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(e.id)} disabled={deletingId === e.id} className="p-1.5 rounded hover:bg-gray-100 text-gray-500 disabled:opacity-50">
                  {deletingId === e.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar' : 'Novo Evento'}>
        <div className="space-y-4">
          <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Título *</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" /></div>
          <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Slug</label><input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="input-field" /></div>
          <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Descrição</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field h-24 resize-none" /></div>
          <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Local</label><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input-field" /></div>
          <button onClick={handleSave} disabled={saving || !isDirty} className="btn-secondary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {saving && <Loader2 size={16} className="animate-spin" />} Salvar
          </button>
        </div>
      </Modal>
    </div>
  );
}
