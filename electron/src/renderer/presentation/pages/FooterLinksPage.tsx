import { useEffect, useState } from 'react';
import { newsApi } from '@/infrastructure/api/client';
import { Plus, Pencil, Trash2, Link, Image as ImageIcon, Copyright, Share2, Loader2 } from 'lucide-react';
import { Modal } from '@/presentation/components/ui/Modal';
import { ImageUpload } from '@/presentation/components/ui/ImageUpload';
import { TableSkeleton } from '@/presentation/components/ui/Skeleton';
import { useToastStore } from '@/presentation/stores/toast-store';
import { confirm } from '@/presentation/stores/dialog-store';

type TabType = 'links' | 'images' | 'copyright' | 'social' | 'description';

export function FooterLinksPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [tab, setTab] = useState<TabType>('links');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ label: '', href: '', order: '', description: '' });
  const [initialForm, setInitialForm] = useState<{ label: string; href: string; order: string; description: string } | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const toast = useToastStore((s) => s.addToast);

  const isDirty = !editing && imageFile ? true : (initialForm !== null && JSON.stringify(form) !== JSON.stringify(initialForm));

  const load = async () => {
    setLoading(true);
    try { const data = await newsApi.get('/admin/links-rodape'); setItems(Array.isArray(data) ? data : []); }
    catch (e: any) { toast('Erro: ' + e.message, 'error'); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const links = items.filter((i) => i.type === 'link');
  const images = items.filter((i) => i.type === 'image');
  const copyrightItems = items.filter((i) => i.type === 'copyright');
  const socialItems = items.filter((i) => i.type === 'social');
  const descriptionItems = items.filter((i) => i.type === 'description');

  const openNew = () => {
    setEditing(null);
    setForm({ label: '', href: '', order: '', description: '' });
    setInitialForm({ label: '', href: '', order: '', description: '' });
    setImageFile(null);
    setModalOpen(true);
  };
  const openEdit = (item: any) => {
    setEditing(item);
    const f = { label: item.label || '', href: item.href || '', order: String(item.order ?? ''), description: item.description || '' };
    setForm(f);
    setInitialForm({ ...f });
    setImageFile(null);
    setModalOpen(true);
  };

  const needsImage = tab === 'images' || tab === 'social';
  const canSave = !editing
    ? (needsImage ? !!imageFile : !!form.description || !!form.label)
    : isDirty;

  const handleSave = async () => {
    setSaving(true);
    const fd = new FormData();
    fd.append('type', tab === 'links' ? 'link' : tab === 'images' ? 'image' : tab);
    fd.append('label', form.label || ' ');
    fd.append('href', form.href || '#');
    fd.append('order', form.order);
    if (form.description) fd.append('description', form.description);
    if (imageFile) fd.append('imageUrl', imageFile);

    try {
      if (editing) await newsApi.patch(`/admin/links-rodape/${editing.id}`, fd);
      else await newsApi.post('/admin/links-rodape', fd);
      toast('Salvo com sucesso!', 'success'); setModalOpen(false); load();
    } catch (e: any) { toast('Erro: ' + e.message, 'error'); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    confirm('Tem certeza que deseja deletar este item?', async () => {
      setDeletingId(id);
      try { await newsApi.delete(`/admin/links-rodape/${id}`); toast('Removido.', 'success'); load(); }
      catch (e: any) { toast('Erro: ' + e.message, 'error'); }
      setDeletingId(null);
    });
  };

  const displayItems = tab === 'links' ? links : tab === 'images' ? images : tab === 'copyright' ? copyrightItems : tab === 'social' ? socialItems : descriptionItems;

  const tabs: { key: TabType; label: string; icon: React.ReactNode; count: number }[] = [
    { key: 'links', label: 'Links', icon: <Link size={14} />, count: links.length },
    { key: 'images', label: 'Imagens/Descrição', icon: <ImageIcon size={14} />, count: images.length },
    { key: 'copyright', label: 'Copyright', icon: <Copyright size={14} />, count: copyrightItems.length },
    { key: 'social', label: 'Redes Sociais', icon: <Share2 size={14} />, count: socialItems.length },
    { key: 'description', label: 'Descrição', icon: <Copyright size={14} />, count: descriptionItems.length },
  ];

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline text-headline-md font-bold text-on-surface">Links do Footer</h1>
        <button onClick={openNew} className="btn-secondary flex items-center gap-2"><Plus size={16} /> Novo</button>
      </div>

      <div className="flex gap-1 mb-6 bg-surface-container rounded-lg p-1 flex-wrap">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-headline font-bold transition-colors ${tab === t.key ? 'bg-white shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}>
            {t.icon} {t.label} ({t.count})
          </button>
        ))}
      </div>

      <div className="card overflow-x-auto">
        {loading ? (
          <TableSkeleton rows={5} cols={4} />
        ) : (
          <table className="w-full">
            <thead><tr className="border-b border-outline-variant">
              {tab === 'links' && (<><th className="text-left py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">Label</th><th className="text-left py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">URL</th><th className="text-left py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">Ordem</th></>)}
              {tab === 'images' && (<><th className="text-left py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">Imagem</th><th className="text-left py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">Label</th></>)}
              {tab === 'copyright' && (<><th className="text-left py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">Texto Copyright</th></>)}
              {tab === 'social' && (<><th className="text-left py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">Ícone</th><th className="text-left py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">Rede Social</th><th className="text-left py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">Link</th></>)}
              {tab === 'description' && (<><th className="text-left py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">Descrição</th></>)}
              <th className="text-right py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">Ações</th>
            </tr></thead>
            <tbody>
              {displayItems.length === 0 && <tr><td colSpan={4} className="py-8 text-center text-on-surface-variant">Nenhum registro.</td></tr>}
              {displayItems.map((item) => (
                <tr key={item.id} className="table-row">
                  {tab === 'links' && (<><td className="py-3 px-4 font-body text-sm font-bold text-on-surface">{item.label}</td><td className="py-3 px-4 font-body text-sm text-on-surface-variant font-mono">{item.href}</td><td className="py-3 px-4 font-body text-sm text-on-surface-variant">{item.order}</td></>)}
                  {tab === 'images' && (<><td className="py-3 px-4">{item.imageUrl ? <img src={item.imageUrl} alt="" className="h-10 w-auto object-contain" /> : <div className="h-10 w-16 bg-surface-container rounded" />}</td><td className="py-3 px-4 font-body text-sm font-bold text-on-surface">{item.label}</td></>)}
                  {tab === 'copyright' && (<><td className="py-3 px-4 font-body text-sm text-on-surface max-w-[400px] truncate">{item.description || item.label}</td></>)}
                  {tab === 'social' && (<><td className="py-3 px-4">{item.imageUrl ? <img src={item.imageUrl} alt="" className="h-5 w-5 rounded object-contain" /> : <div className="h-5 w-5 bg-surface-container rounded" />}</td><td className="py-3 px-4 font-body text-sm font-bold text-on-surface">{item.label}</td><td className="py-3 px-4 font-body text-sm text-on-surface-variant font-mono truncate max-w-[200px]">{item.href}</td></>)}
                  {tab === 'description' && (<td className="py-3 px-4 font-body text-sm text-on-surface max-w-[400px] truncate">{item.description || item.label}</td>)}
                  <td className="py-3 px-4"><div className="flex justify-end gap-1">
                    <button onClick={() => openEdit(item)} className="p-1.5 rounded hover:bg-surface-container-low"><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(item.id)} disabled={deletingId === item.id} className="p-1.5 rounded hover:bg-gray-100 text-gray-500 disabled:opacity-50">
                      {deletingId === item.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    </button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar' : 'Novo'}>
        <div className="space-y-4">
          {tab === 'links' && (<>
            <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Label *</label><input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="input-field" placeholder="Ex: Quem Somos" /></div>
            <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">URL *</label><input value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} className="input-field" placeholder="Ex: /about" /></div>
            <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Ordem</label><input type="number" min="1" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value.replace(/^0+/, '') })} className="input-field" placeholder="Ex: 1" /></div>
          </>)}

          {tab === 'images' && (<>
            <ImageUpload label="Imagem *" currentImage={editing?.imageUrl} onUpload={(file) => setImageFile(file)} />
            <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Label *</label><input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="input-field" placeholder="Ex: Logo Patrocinador" /></div>
          </>)}

          {tab === 'copyright' && (<>
            <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Texto Copyright *</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value, label: 'copyright' })} className="input-field h-24 resize-none" placeholder="Ex: © 2026 Rádio Coringão. Todos os direitos reservados." /></div>
          </>)}

          {tab === 'social' && (<>
            <ImageUpload label="Ícone da Rede Social *" currentImage={editing?.imageUrl} onUpload={(file) => setImageFile(file)} />
            <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Nome da Rede *</label><input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="input-field" placeholder="Ex: Instagram" /></div>
            <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Link *</label><input value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} className="input-field" placeholder="Ex: https://instagram.com/radiocoringao" /></div>
            <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Ordem</label><input type="number" min="1" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value.replace(/^0+/, '') })} className="input-field" placeholder="Ex: 1" /></div>
          </>)}

          {tab === 'description' && (<>
            <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Descrição *</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value, label: 'description' })} className="input-field h-24 resize-none" placeholder="Ex: Rádio Coringão é o portal da Fiel..." /></div>
          </>)}

          <button onClick={handleSave} disabled={saving || !canSave} className="btn-secondary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {saving && <Loader2 size={16} className="animate-spin" />} Salvar
          </button>
        </div>
      </Modal>
    </div>
  );
}
