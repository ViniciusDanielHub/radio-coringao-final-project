import { contextBridge, ipcRenderer } from 'electron';

export interface DialogOptions {
  type: 'info' | 'warning' | 'error' | 'question';
  title: string;
  message: string;
  buttons?: string[];
}

contextBridge.exposeInMainWorld('electronAPI', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  showDialog: (options: DialogOptions) => ipcRenderer.invoke('show-dialog', options),
});
