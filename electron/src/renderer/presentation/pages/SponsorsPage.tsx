import { useEffect, useState } from 'react';
import { newsApi } from '@/infrastructure/api/client';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Modal } from '@/presentation/components/ui/Modal';
import { ImageUpload } from '@/presentation/components/ui/ImageUpload';
import { TableSkeleton, Skeleton } from '@/presentation/components/ui/Skeleton';
import { useToastStore } from '@/presentation/stores/toast-store';
import { confirm } from '@/presentation/stores/dialog-store';

export function SponsorsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: '', websiteUrl: '' });
  const [initialForm, setInitialForm] = useState<{ name: string; websiteUrl: string } | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const toast = useToastStore((s) => s.addToast);

  const isDirty = !editing && imageFile ? true : (initialForm !== null && JSON.stringify(form) !== JSON.stringify(initialForm));

  const load = async () => {
    try { const data = await newsApi.get('/admin/patrocinadores'); setItems(Array.isArray(data) ? data : []); }
    catch (e: any) { toast('Erro: ' + e.message, 'error'); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm({ name: '', websiteUrl: '' }); setInitialForm({ name: '', websiteUrl: '' }); setImageFile(null); setModalOpen(true); };
  const openEdit = (s: any) => { setEditing(s); setForm({ name: s.name, websiteUrl: s.websiteUrl || '' }); setInitialForm({ name: s.name, websiteUrl: s.websiteUrl || '' }); setImageFile(null); setModalOpen(true); };

  const handleSave = async () => {
    if (!form.name.trim()) { toast('Nome é obrigatório.', 'error'); return; }
    if (!editing && !imageFile) { toast('Imagem é obrigatória.', 'error'); return; }
    const fd = new FormData();
    fd.append('name', form.name);
    if (form.websiteUrl.trim()) fd.append('websiteUrl', form.websiteUrl.trim());
    if (imageFile) fd.append('logo', imageFile);
    setSaving(true);
    try {
      if (editing) await newsApi.patch(`/admin/patrocinadores/${editing.id}`, fd);
      else await newsApi.post('/admin/patrocinadores', fd);
      toast('Salvo com sucesso!', 'success'); setModalOpen(false); load();
    } catch (e: any) { toast('Erro: ' + e.message, 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    confirm('Tem certeza que deseja deletar este patrocinador?', async () => {
      try { await newsApi.delete(`/admin/patrocinadores/${id}`); toast('Removido.', 'success'); load(); }
      catch (e: any) { toast('Erro: ' + e.message, 'error'); }
    });
  };

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline text-headline-md font-bold text-on-surface">Patrocinadores</h1>
        <button onClick={openNew} className="btn-secondary flex items-center gap-2"><Plus size={16} /> Novo Patrocinador</button>
      </div>

      {loading ? (
        <TableSkeleton rows={5} cols={3} />
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-outline-variant">
              <th className="text-left py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">Logo</th>
              <th className="text-left py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">Nome</th>
              <th className="text-left py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">Site</th>
              <th className="text-right py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">Ações</th>
            </tr></thead>
            <tbody>
              {items.length === 0 && <tr><td colSpan={4} className="py-8 text-center text-on-surface-variant">Nenhum patrocinador cadastrado.</td></tr>}
              {items.map((s) => (
                <tr key={s.id} className="table-row">
                  <td className="py-3 px-4">{s.logoUrl ? <img src={s.logoUrl} alt={s.name} className="h-8 w-auto object-contain" /> : <div className="h-8 w-16 bg-surface-container rounded" />}</td>
                  <td className="py-3 px-4 font-body text-sm font-bold text-on-surface">{s.name}</td>
                  <td className="py-3 px-4 font-body text-sm text-on-surface-variant">{s.websiteUrl ? <a href={s.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{s.websiteUrl}</a> : '—'}</td>
                  <td className="py-3 px-4"><div className="flex justify-end gap-1">
                    <button onClick={() => openEdit(s)} className="p-1.5 rounded hover:bg-surface-container-low"><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded hover:bg-gray-100 text-gray-500"><Trash2 size={14} /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar Patrocinador' : 'Novo Patrocinador'}>
        <div className="space-y-4">
          <div>
            <label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Nome *</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Nome do patrocinador" />
          </div>
          <div>
            <label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">URL do Site</label>
            <input value={form.websiteUrl} onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })} className="input-field" placeholder="https://exemplo.com" />
          </div>
          <ImageUpload
            label={editing ? 'Trocar Logo' : 'Logo do Patrocinador *'}
            currentImage={editing?.logoUrl}
            onUpload={(file) => setImageFile(file)}
            onRemove={() => setImageFile(null)}
          />
          <button onClick={handleSave} disabled={saving || (!editing && !imageFile) || (editing && !isDirty)} className="btn-secondary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {saving ? <><Loader2 size={16} className="animate-spin" /> Salvando...</> : 'Salvar'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
