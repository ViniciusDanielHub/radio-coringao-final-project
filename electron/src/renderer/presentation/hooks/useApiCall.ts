import { useToastStore } from '@/presentation/stores/toast-store';

export function useApiCall() {
  const addToast = useToastStore((s) => s.addToast);

  const call = async <T>(
    fn: () => Promise<T>,
    options?: { success?: string; error?: string }
  ): Promise<T | null> => {
    try {
      const result = await fn();
      if (options?.success) addToast(options.success, 'success');
      return result;
    } catch (err: any) {
      const msg = err?.response?.data?.error || err?.response?.data?.message || err?.message || 'Erro ao processar operação.';
      addToast(options?.error || (typeof msg === 'string' ? msg : 'Erro ao processar operação.'), 'error');
      return null;
    }
  };

  return { call };
}
