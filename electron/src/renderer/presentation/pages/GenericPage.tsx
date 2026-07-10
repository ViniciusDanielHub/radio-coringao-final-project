import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Modal } from '@/presentation/components/ui/Modal';
import { confirm } from '@/presentation/stores/dialog-store';

interface GenericPageProps {
  title: string;
  apiBase: string;
  apiPath: string;
  columns: { key: string; label: string; render?: (val: any, row: any) => React.ReactNode }[];
  formFields: { key: string; label: string; type?: string; required?: boolean; options?: { value: string; label: string }[] }[];
  createLabel?: string;
}

export function GenericPage({ title, apiBase, apiPath, columns, formFields, createLabel }: GenericPageProps) {
  const [items, setItems] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState<{ text: string; type: 'ok' | 'err' } | null>(null);

  const load = async () => {
    try {
      const data = await (apiBase === 'clube' ? (await import('@/infrastructure/api/client')).clubeApi : (await import('@/infrastructure/api/client')).newsApi).get(apiPath);
      setItems(Array.isArray(data) ? data : data?.data || []);
    } catch (err: any) { setMsg({ text: err.message, type: 'err' }); }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm({}); setModalOpen(true); };
  const openEdit = (row: any) => { setEditing(row); setForm(Object.fromEntries(columns.map((c) => [c.key, String(row[c.key] || '')]))); setModalOpen(true); };

  const handleSave = async () => {
    try {
      const api = apiBase === 'clube' ? (await import('@/infrastructure/api/client')).clubeApi : (await import('@/infrastructure/api/client')).newsApi;
      if (editing) await api.patch(`${apiPath}/${editing.id}`, form);
      else await api.post(apiPath, form);
      setMsg({ text: 'Salvo com sucesso!', type: 'ok' });
      setModalOpen(false); load();
    } catch (err: any) { setMsg({ text: err.message, type: 'err' }); }
  };

  const handleDelete = async (id: string) => {
    confirm('Tem certeza que deseja deletar este registro?', async () => {
      try {
        const api = apiBase === 'clube' ? (await import('@/infrastructure/api/client')).clubeApi : (await import('@/infrastructure/api/client')).newsApi;
        await api.delete(`${apiPath}/${id}`);
        setMsg({ text: 'Removido.', type: 'ok' }); load();
      } catch (err: any) { setMsg({ text: err.message, type: 'err' }); }
    });
  };

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline text-headline-md font-bold text-on-surface">{title}</h1>
        <button onClick={openNew} className="btn-secondary flex items-center gap-2"><Plus size={16} /> {createLabel || 'Novo'}</button>
      </div>
      {msg && <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-body ${msg.type === 'ok' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>{msg.text} <button onClick={() => setMsg(null)} className="ml-2 font-bold">✕</button></div>}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead><tr className="border-b border-outline-variant">
            {columns.map((c) => <th key={c.key} className="text-left py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">{c.label}</th>)}
            <th className="text-right py-3 px-4 font-headline text-label-sm font-bold text-on-surface-variant">Ações</th>
          </tr></thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan={columns.length + 1} className="py-8 text-center text-on-surface-variant">Nenhum registro.</td></tr>}
            {items.map((row) => (
              <tr key={row.id} className="table-row">
                {columns.map((c) => <td key={c.key} className="py-3 px-4 font-body text-sm text-on-surface">{c.render ? c.render(row[c.key], row) : row[c.key]}</td>)}
                <td className="py-3 px-4"><div className="flex justify-end gap-1">
                  <button onClick={() => openEdit(row)} className="p-1.5 rounded hover:bg-surface-container-low"><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(row.id)} className="p-1.5 rounded hover:bg-gray-100 text-gray-500"><Trash2 size={14} /></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar' : `Novo ${title}`}>
        <div className="space-y-4">
          {formFields.map((f) => (
            <div key={f.key}>
              <label className="block font-headline text-label-sm font-bold text-on-surface mb-1.5">{f.label}{f.required && ' *'}</label>
              {f.options ? (
                <select value={form[f.key] || ''} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className="select-field">
                  <option value="">Selecione...</option>
                  {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : f.type === 'textarea' ? (
                <textarea value={form[f.key] || ''} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className="input-field h-20 resize-none" />
              ) : f.type === 'color' ? (
                <div className="flex items-center gap-2">
                  <input type="color" value={form[f.key] || '#000000'} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className="w-9 h-9 rounded cursor-pointer border border-outline-variant" />
                  <input value={form[f.key] || ''} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className="input-field flex-1 font-mono text-sm" />
                </div>
              ) : (
                <input type={f.type || 'text'} value={form[f.key] || ''} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className="input-field" />
              )}
            </div>
          ))}
          <button onClick={handleSave} className="btn-secondary w-full">Salvar</button>
        </div>
      </Modal>
    </div>
  );
}
