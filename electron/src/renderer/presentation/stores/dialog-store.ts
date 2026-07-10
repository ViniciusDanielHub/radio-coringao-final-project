import { create } from 'zustand';

export type DialogType = 'info' | 'warning' | 'error' | 'question';

export interface DialogButton {
  label: string;
  value: number;
  style?: 'primary' | 'secondary' | 'ghost';
}

interface DialogOptions {
  type: DialogType;
  title: string;
  message: string;
  buttons: DialogButton[];
}

interface DialogState {
  open: boolean;
  type: DialogType;
  title: string;
  message: string;
  buttons: DialogButton[];
  resolve: ((value: number) => void) | null;
  show: (options: DialogOptions) => Promise<number>;
  close: (value: number) => void;
}

export const useDialogStore = create<DialogState>()((set, get) => ({
  open: false,
  type: 'info',
  title: '',
  message: '',
  buttons: [],
  resolve: null,
  show: (options) =>
    new Promise<number>((resolve) => {
      set({ ...options, open: true, resolve });
    }),
  close: (value) => {
    const { resolve } = get();
    set({ open: false, resolve: null });
    resolve?.(value);
  },
}));

export function confirm(message: string, onConfirm: () => void | Promise<void>, title = 'Confirmar') {
  return useDialogStore.getState().show({
    type: 'question',
    title,
    message,
    buttons: [
      { label: 'Cancelar', value: 0, style: 'ghost' },
      { label: 'Confirmar', value: 1, style: 'primary' },
    ],
  }).then((value) => {
    if (value === 1) return onConfirm();
  });
}

export function alert(message: string, title = 'Aviso') {
  return useDialogStore.getState().show({
    type: 'info',
    title,
    message,
    buttons: [{ label: 'OK', value: 0, style: 'primary' }],
  });
}
