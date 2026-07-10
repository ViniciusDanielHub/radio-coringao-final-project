import { useDialogStore } from '@/presentation/stores/dialog-store';
import { Info, AlertTriangle, XCircle, HelpCircle } from 'lucide-react';

const ICONS = {
  info: { icon: Info, bg: 'bg-blue-50', color: 'text-blue-600' },
  warning: { icon: AlertTriangle, bg: 'bg-amber-50', color: 'text-amber-600' },
  error: { icon: XCircle, bg: 'bg-red-50', color: 'text-red-600' },
  question: { icon: HelpCircle, bg: 'bg-purple-50', color: 'text-purple-600' },
} as const;

const BUTTON_STYLES = {
  primary: 'bg-secondary text-secondary-foreground',
  secondary: 'bg-surface-container-high text-on-surface',
  ghost: 'bg-transparent text-on-surface-variant hover:bg-surface-container-low',
} as const;

export function Dialog() {
  const { open, type, title, message, buttons, close } = useDialogStore();

  if (!open) return null;

  const { icon: Icon, bg, color } = ICONS[type];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => close(-1)} />
      <div className="relative bg-surface-container-lowest rounded-lg shadow-xl w-full max-w-sm border border-outline-variant animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3 p-5 border-b border-outline-variant">
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bg}`}>
            <Icon size={16} className={color} />
          </div>
          <h2 className="font-headline text-headline-sm font-bold text-on-surface">{title}</h2>
        </div>
        <div className="p-5">
          <p className="font-body text-body-md text-on-surface-variant whitespace-pre-line">{message}</p>
        </div>
        <div className="flex items-center justify-end gap-3 px-5 pb-5">
          {buttons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => close(btn.value)}
              className={`px-4 py-2 rounded-lg font-headline font-bold text-label-sm transition-all duration-200 hover:opacity-90 active:scale-95 ${BUTTON_STYLES[btn.style ?? 'primary']}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
