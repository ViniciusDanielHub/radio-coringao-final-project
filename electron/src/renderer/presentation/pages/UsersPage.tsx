import { useEffect, useState } from 'react';
import { newsApi } from '@/infrastructure/api/client';
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Modal } from '@/presentation/components/ui/Modal';
import { ImageUpload } from '@/presentation/components/ui/ImageUpload';
import { TableSkeleton } from '@/presentation/components/ui/Skeleton';
import { useToastStore } from '@/presentation/stores/toast-store';
import { confirm } from '@/presentation/stores/dialog-store';

function OnlineStatus({ user }: { user: any }) {
  if (!user.isActive) return <span className="badge bg-gray-100 text-gray-500 text-[10px]">Inativo</span>;
  if (user.lastSeenAt) {
    const diff = Date.now() - new Date(user.lastSeenAt).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 5) return <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /><span className="text-[10px] text-green-600 font-bold">Online</span></span>;
    if (mins < 60) return <span className="text-[10px] text-on-surface-variant">Há {mins}min</span>;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return <span className="text-[10px] text-on-surface-variant">Há {hours}h</span>;
    const days = Math.floor(hours / 24);
    return <span className="text-[10px] text-on-surface-variant">Há {days}d</span>;
  }
  return <span className="text-[10px] text-on-surface-variant">Nunca</span>;
}

const ROLES: Record<string, string> = {
  SUPER_ADMIN: 'Super Admin', EDITOR_CHEFE: 'Editor-Chefe', EDITOR: 'Editor',
  JORNALISTA: 'Jornalista', COLUNISTA: 'Colunista', SOCIAL_MEDIA: 'Social Media',
  MODERADOR: 'Moderador', SEO_MANAGER: 'SEO Manager',
};

const LIMIT = 10;

export function UsersPage() {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showInactive, setShowInactive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'JORNALISTA' });
  const [initialForm, setInitialForm] = useState<typeof form | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const toast = useToastStore((s) => s.addToast);

  const isDirty = initialForm !== null && (
    JSON.stringify(form) !== JSON.stringify(initialForm) || avatarFile !== null
  );

  const load = async () => {
    try {
      setLoading(true);
      const data = await newsApi.get(`/admin/users?page=${page}&limit=${LIMIT}${showInactive ? '' : '&isActive=true'}`);
      setItems(data?.data || (Array.isArray(data) ? data : []));
      setTotal(data?.total || 0);
    } catch (e: any) { toast('Erro: ' + e.message, 'error'); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, [page, showInactive]);

  const totalPages = Math.ceil(total / LIMIT);

  const openNew = () => {
    setEditing(null);
    const newForm = { name: '', email: '', password: '', role: 'JORNALISTA' };
    setForm(newForm);
    setInitialForm(newForm);
    setAvatarFile(null);
    setModalOpen(true);
  };

  const openEdit = (u: any) => {
    setEditing(u);
    const loaded = { name: u.name, email: u.email, password: '', role: u.role };
    setForm(loaded);
    setInitialForm(loaded);
    setAvatarFile(null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.email.trim()) { toast('Nome e e-mail são obrigatórios.', 'error'); return; }
    if (!editing && !form.password.trim()) { toast('Senha é obrigatória.', 'error'); return; }
    if (form.password && form.password.length < 6) { toast('Senha deve ter no mínimo 6 caracteres.', 'error'); return; }

    try {
      setSaving(true);
      if (editing) {
        await newsApi.patch(`/admin/users/${editing.id}`, { name: form.name, email: form.email, role: form.role });
        if (form.password.trim()) {
          await newsApi.patch(`/admin/users/${editing.id}/password`, { newPassword: form.password });
        }
        if (avatarFile) {
          const fd = new FormData();
          fd.append('avatar', avatarFile);
          await newsApi.patch(`/admin/users/${editing.id}`, fd);
        }
      } else {
        if (avatarFile) {
          const fd = new FormData();
          fd.append('name', form.name);
          fd.append('email', form.email);
          fd.append('password', form.password);
          fd.append('role', form.role);
          fd.append('avatar', avatarFile);
          await newsApi.post('/admin/users', fd);
        } else {
          await newsApi.post('/admin/users', { name: form.name, email: form.email, password: form.password, role: form.role });
        }
      }
      toast('Salvo com sucesso!', 'success'); setModalOpen(false); load();
    } catch (e: any) { toast('Erro: ' + e.message, 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    confirm('Tem certeza que deseja desativar este usuário?', async () => {
      try { await newsApi.delete(`/admin/users/${id}`); toast('Usuário desativado.', 'success'); load(); }
      catch (e: any) { toast('Erro: ' + e.message, 'error'); }
    });
  };

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline text-headline-md font-bold text-on-surface">Usuários</h1>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-on-surface-variant">
            <input type="checkbox" checked={showInactive} onChange={(e) => { setShowInactive(e.target.checked); setPage(1); }} className="rounded" />
            Mostrar inativos
          </label>
          <button onClick={openNew} className="btn-secondary flex items-center gap-2"><Plus size={16} /> Novo Usuário</button>
        </div>
      </div>

      {loading ? (
        <TableSkeleton rows={5} cols={7} />
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-outline-variant">
              <th className="text-left py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">Foto</th>
              <th className="text-left py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">Nome</th>
              <th className="text-left py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">E-mail</th>
              <th className="text-left py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">Cargo</th>
              <th className="text-left py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">Status</th>
              <th className="text-left py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">Online</th>
              <th className="text-right py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">Ações</th>
            </tr></thead>
            <tbody>
              {items.length === 0 && <tr><td colSpan={7} className="py-8 text-center text-on-surface-variant">Nenhum usuário.</td></tr>}
              {items.map((u) => (
                <tr key={u.id} className="table-row">
                  <td className="py-3 px-4">
                    {u.avatar ? <img src={u.avatar} alt="" className="w-8 h-8 rounded-full object-cover" /> : <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-[10px] font-bold text-on-surface-variant">{u.name?.[0]?.toUpperCase()}</div>}
                  </td>
                  <td className="py-3 px-4 font-body text-sm font-bold text-on-surface">{u.name}</td>
                  <td className="py-3 px-4 font-body text-sm text-on-surface-variant">{u.email}</td>
                  <td className="py-3 px-4"><span className="badge bg-surface-container text-on-surface-variant text-[10px]">{ROLES[u.role] || u.role}</span></td>
                  <td className="py-3 px-4"><span className={`badge text-[10px] ${u.isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>{u.isActive ? 'Ativo' : 'Inativo'}</span></td>
                  <td className="py-3 px-4"><OnlineStatus user={u} /></td>
                  <td className="py-3 px-4"><div className="flex justify-end gap-1">
                    <button onClick={() => openEdit(u)} className="p-1.5 rounded hover:bg-surface-container-low"><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(u.id)} className="p-1.5 rounded hover:bg-gray-100 text-gray-500"><Trash2 size={14} /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-outline-variant">
              <p className="font-body text-sm text-on-surface-variant">{total} usuário{total !== 1 ? 's' : ''} — Página {page} de {totalPages}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded hover:bg-surface-container-low disabled:opacity-30 disabled:cursor-not-allowed"><ChevronLeft size={16} /></button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded text-sm font-bold transition-colors ${p === page ? 'bg-primary text-white' : 'hover:bg-surface-container-low text-on-surface-variant'}`}>{p}</button>
                ))}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 rounded hover:bg-surface-container-low disabled:opacity-30 disabled:cursor-not-allowed"><ChevronRight size={16} /></button>
              </div>
            </div>
          )}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar Usuário' : 'Novo Usuário'}>
        <div className="space-y-4">
          <ImageUpload
            label="Foto do Perfil"
            currentImage={editing?.avatar}
            onUpload={(file) => setAvatarFile(file)}
          />
          <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Nome *</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" /></div>
          <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">E-mail *</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" /></div>
          <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">{editing ? 'Nova Senha (deixe vazio para manter)' : 'Senha *'}</label><input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input-field" placeholder={editing ? '••••••' : 'Mínimo 6 caracteres'} /></div>
          <div><label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">Cargo *</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="select-field">
              {Object.entries(ROLES).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          <button onClick={handleSave} disabled={saving || !isDirty} className="btn-secondary w-full flex items-center justify-center gap-2">
            {saving && <Loader2 size={16} className="animate-spin" />}
            Salvar
          </button>
        </div>
      </Modal>
    </div>
  );
}
