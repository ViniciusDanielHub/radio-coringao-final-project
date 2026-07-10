// src/modules/proxy/clube-api-client.ts
//
// Cliente HTTP para chamadas públicas à clube-api.
// Reutiliza a variável CLUBE_API_URL já usada pelo módulo admin.
const BASE_URL = process.env.CLUBE_API_URL || 'http://localhost:3010';

export class ProxyError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'ProxyError';
  }
}

export async function clubeApiRequest<T>(path: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10_000),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Erro de rede';
    throw new ProxyError(502, `clube-api indisponível: ${msg}`);
  }

  const text = await res.text();
  const data: unknown = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const body = typeof data === 'object' && data !== null ? data as Record<string, unknown> : null;
    throw new ProxyError(res.status, String(body?.error ?? `Erro ${res.status} da clube-api`));
  }

  return data as T;
}
