import { useEffect, useState } from 'react';
import { clubeApi } from '@/infrastructure/api/client';
import { Plus, Pencil, Trash2, ChevronRight, ChevronDown, Loader2 } from 'lucide-react';
import { Modal } from '@/presentation/components/ui/Modal';
import { GENDER_LABELS, MODALITY_LABELS } from '@/shared/constants';
import { Skeleton } from '@/presentation/components/ui/Skeleton';
import { useToastStore } from '@/presentation/stores/toast-store';
import { confirm } from '@/presentation/stores/dialog-store';

export function ClubeCategoriesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: '', gender: 'MALE', modality: 'FOOTBALL', parentId: '' });
  const [initialForm, setInitialForm] = useState<{ name: string; gender: string; modality: string; parentId: string } | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const toast = useToastStore((s) => s.addToast);

  const isDirty = initialForm !== null && JSON.stringify(form) !== JSON.stringify(initialForm);

  const load = async () => {
    setLoading(true);
    try { const data = await clubeApi.get('/admin/categorias'); setItems(Array.isArray(data) ? data : []); }
    catch (e: any) { toast('Erro: ' + e.message, 'error'); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openNew = (parentId?: string) => {
    setEditing(null);
    const parent = parentId ? items.find((c) => c.id === parentId) : null;
    const f = {
      name: '',
      gender: parent?.gender || 'MALE',
      modality: parent?.modality || 'FOOTBALL',
      parentId: parentId || '',
    };
    setForm(f);
    setInitialForm({ ...f });
    setModalOpen(true);
  };

  const openEdit = (c: any) => {
    setEditing(c);
    const f = { name: c.name, gender: c.gender, modality: c.modality, parentId: c.parentId || '' };
    setForm(f);
    setInitialForm({ ...f });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) await clubeApi.patch(`/admin/categorias/${editing.id}`, form);
      else await clubeApi.post('/admin/categorias', form);
      toast('Salvo com sucesso!', 'success'); setModalOpen(false); load();
    } catch (e: any) { toast('Erro: ' + e.message, 'error'); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    confirm('Tem certeza que deseja deletar esta categoria?', async () => {
      setDeletingId(id);
      try { await clubeApi.delete(`/admin/categorias/${id}`); toast('Removido.', 'success'); load(); }
      catch (e: any) { toast('Erro: ' + e.message, 'error'); }
      setDeletingId(null);
    });
  };

  const isSubcategory = !!form.parentId;
  const parentName = items.find((c) => c.id === form.parentId)?.name || '';

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline text-headline-md font-bold text-on-surface">Categorias/Modalidades</h1>
        <button onClick={() => openNew()} className="btn-secondary flex items-center gap-2"><Plus size={16} /> Nova Categoria</button>
      </div>

      <div className="space-y-2">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card">
              <div className="flex items-center gap-3">
                <Skeleton className="w-6 h-6 rounded" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-40" />
                </div>
                <div className="flex gap-1">
                  <Skeleton className="h-7 w-7 rounded" />
                  <Skeleton className="h-7 w-7 rounded" />
                  <Skeleton className="h-7 w-7 rounded" />
                </div>
              </div>
            </div>
          ))
        ) : (
          items.map((cat, i) => (
            <div key={cat.id} className="slide-up" style={{ animationDelay: `${i * 30}ms` }}>
              <div className="card flex items-center gap-3">
                <button onClick={() => setExpanded(expanded === cat.id ? null : cat.id)} className="p-1">
                  {expanded === cat.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                <div className="flex-1">
                  <p className="font-headline text-sm font-bold text-on-surface">{cat.name}</p>
                  <p className="text-xs text-on-surface-variant">{GENDER_LABELS[cat.gender]} · {MODALITY_LABELS[cat.modality]}</p>
                </div>
                <button onClick={() => openNew(cat.id)} className="p-1.5 rounded hover:bg-surface-container-low text-on-surface-variant" title="Adicionar subcategoria"><Plus size={14} /></button>
                <button onClick={() => openEdit(cat)} className="p-1.5 rounded hover:bg-surface-container-low text-on-surface-variant"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(cat.id)} disabled={deletingId === cat.id} className="p-1.5 rounded hover:bg-gray-100 text-gray-500 disabled:opacity-50">
                  {deletingId === cat.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                </button>
              </div>

              {expanded === cat.id && cat.children && cat.children.length > 0 && (
                <div className="ml-8 mt-1 space-y-1 fade-in">
                  {cat.children.map((child: any) => (
                    <div key={child.id} className="card flex items-center gap-3 py-2">
                      <div className="flex-1">
                        <p className="font-body text-sm text-on-surface">{child.name}</p>
                        <p className="text-xs text-on-surface-variant">{GENDER_LABELS[child.gender]} · {MODALITY_LABELS[child.modality]}</p>
                      </div>
                      <button onClick={() => openEdit(child)} className="p-1.5 rounded hover:bg-surface-container-low text-on-surface-variant"><Pencil size={12} /></button>
                      <button onClick={() => handleDelete(child.id)} disabled={deletingId === child.id} className="p-1.5 rounded hover:bg-gray-100 text-gray-500 disabled:opacity-50">
                        {deletingId === child.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {expanded === cat.id && (!cat.children || cat.children.length === 0) && (
                <div className="ml-8 mt-1 text-xs text-on-surface-variant py-2 fade-in">Nenhuma subcategoria</div>
              )}
            </div>
          ))
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar' : isSubcategory ? `Nova Subcategoria de ${parentName}` : 'Nova Categoria'}>
        <div className="space-y-4">
          <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">{isSubcategory ? 'Nome da Subcategoria' : 'Nome da Categoria'} *</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder={isSubcategory ? 'Ex: Masculino, Feminino, Sub-20' : 'Ex: Futebol, Basquete, Futsal'} /></div>
          {isSubcategory && <p className="text-xs text-on-surface-variant">Será criada como subcategoria de: <strong>{parentName}</strong></p>}
          {!isSubcategory && (
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Gênero</label>
                <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="select-field">{Object.entries(GENDER_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
              <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Modalidade</label>
                <select value={form.modality} onChange={(e) => setForm({ ...form, modality: e.target.value })} className="select-field">{Object.entries(MODALITY_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
            </div>
          )}
          <button onClick={handleSave} disabled={saving || !isDirty} className="btn-secondary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {saving && <Loader2 size={16} className="animate-spin" />} Salvar
          </button>
        </div>
      </Modal>
    </div>
  );
}
