import { useToastStore } from '@/presentation/stores/toast-store';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const icons = {
  success: <CheckCircle size={16} />,
  error: <XCircle size={16} />,
  info: <Info size={16} />,
};

const styles = {
  success: {
    wrapper: 'bg-surface-container-lowest border-outline-variant',
    icon: 'text-green-600',
    text: 'text-on-surface',
  },
  error: {
    wrapper: 'bg-surface-container-lowest border-outline-variant',
    icon: 'text-secondary',
    text: 'text-on-surface',
  },
  info: {
    wrapper: 'bg-surface-container-lowest border-outline-variant',
    icon: 'text-primary',
    text: 'text-on-surface',
  },
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => {
        const s = styles[toast.type];
        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-md slide-up ${s.wrapper}`}
          >
            <span className={s.icon}>{icons[toast.type]}</span>
            <span className={`font-body text-body-sm flex-1 ${s.text}`}>{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="text-on-surface-variant/50 hover:text-on-surface transition-colors">
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
