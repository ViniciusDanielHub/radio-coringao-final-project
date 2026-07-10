// src/shared/env-check.ts
// Valida variáveis de ambiente obrigatórias na inicialização.

interface EnvVar {
  key: string;
  required: boolean;
  hint?: string;
}

const ENV_VARS: EnvVar[] = [
  { key: 'DATABASE_URL', required: true, hint: 'postgresql://user:pass@host:port/db' },
  { key: 'JWT_SECRET', required: true, hint: 'String aleatória longa (min 32 chars)' },
  { key: 'CORS_ORIGIN', required: false, hint: 'Ex: https://radiocoringao.com.br' },
  { key: 'PORT', required: false, hint: 'Padrão: 3010' },
  { key: 'RATE_LIMIT_MAX', required: false, hint: 'Padrão: 100' },
];

export function checkEnv(): void {
  const missing: EnvVar[] = [];
  const warnings: EnvVar[] = [];

  for (const envVar of ENV_VARS) {
    const value = process.env[envVar.key];
    const isEmpty = !value || value.trim() === '';
    const isPlaceholder = value === 'sua_chave_aqui' || value === 'troque_essa_senha';

    if (isEmpty && envVar.required) {
      missing.push(envVar);
    } else if (isPlaceholder && envVar.required) {
      warnings.push(envVar);
    }
  }

  const jwtSecret = process.env.JWT_SECRET ?? '';
  if (process.env.NODE_ENV === 'production' && jwtSecret.length < 32) {
    console.warn('⚠️  [ENV] JWT_SECRET muito curto para produção. Use pelo menos 32 caracteres.');
  }

  if (missing.length > 0) {
    console.error('\n❌ [ENV] Variáveis obrigatórias não configuradas:\n');
    for (const v of missing) {
      console.error(`   • ${v.key}`);
      if (v.hint) console.error(`     → ${v.hint}`);
    }
    console.error('\n   Configure-as no .env e reinicie.\n');
    process.exit(1);
  }

  if (warnings.length > 0) {
    console.warn('\n⚠️  [ENV] Variáveis com valores padrão:\n');
    for (const v of warnings) {
      console.warn(`   • ${v.key}`);
    }
  }
}
