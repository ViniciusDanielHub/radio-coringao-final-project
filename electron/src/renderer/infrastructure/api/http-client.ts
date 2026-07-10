import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from '@/presentation/stores/auth-store';

export function createHttpClient(baseURL: string): AxiosInstance {
  const client = axios.create({
    baseURL,
    timeout: 30000,
  });

  client.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return client;
}

// Singletons initialized by container
let _newsClient: AxiosInstance | null = null;
let _clubeClient: AxiosInstance | null = null;

export function initHttpClients(newsUrl: string, clubeUrl: string) {
  _newsClient = createHttpClient(newsUrl);
  _clubeClient = createHttpClient(clubeUrl);
}

export function getNewsClient(): AxiosInstance {
  if (!_newsClient) throw new Error('HTTP clients not initialized. Call initHttpClients first.');
  return _newsClient;
}

export function getClubeClient(): AxiosInstance {
  if (!_clubeClient) throw new Error('HTTP clients not initialized. Call initHttpClients first.');
  return _clubeClient;
}
