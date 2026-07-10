// src/modules/presence/presence.service.ts
//
// Gerencia o status de presença dos usuários do painel admin.
//
// Estratégia — "last seen" com limiar:
//   • Login       → grava lastLoginAt = now, lastSeenAt = now
//   • Heartbeat   → grava lastSeenAt  = now  (chamado pelo front a cada 60s)
//   • Logout      → grava lastLogoutAt = now
//   • isOnline    → lastSeenAt > (now - ONLINE_THRESHOLD_MS)
//
// Por que heartbeat e não só login/logout?
//   JWT é stateless. Se o usuário fecha a aba sem clicar em "sair",
//   nunca haverá um logout. Com heartbeat, a janela de "online fantasma"
//   é de no máximo ONLINE_THRESHOLD_MS (5 minutos padrão).

import { prisma } from '../../shared/database/prisma';

/** Tempo máximo sem heartbeat para considerar o usuário online (ms). */
export const ONLINE_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutos

export class PresenceService {
  // ─── Chamado pelo AuthService no login ──────────────────────
  async onLogin(userId: string): Promise<void> {
    const now = new Date();
    await prisma.user.update({
      where: { id: userId },
      data: {
        lastLoginAt: now,
        lastSeenAt: now,
      },
    });
  }

  // ─── Chamado pelo AuthService no logout ─────────────────────
  async onLogout(userId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { lastLogoutAt: new Date() },
    });
  }

  // ─── Chamado pelo endpoint PATCH /admin/presence/heartbeat ──
  async heartbeat(userId: string): Promise<{ lastSeenAt: Date }> {
    const now = new Date();
    await prisma.user.update({
      where: { id: userId },
      data: { lastSeenAt: now },
    });
    return { lastSeenAt: now };
  }

  // ─── Chamado pelo authenticate hook a cada request ──────────
  // Atualiza lastSeenAt apenas se faz mais de 60s desde a última atualização
  async onActivity(userId: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { lastSeenAt: true } });
    if (!user) return;
    const now = new Date();
    if (user.lastSeenAt && now.getTime() - user.lastSeenAt.getTime() < 60000) return;
    await prisma.user.update({ where: { id: userId }, data: { lastSeenAt: now } });
  }

  // ─── Helper: deriva isOnline a partir de lastSeenAt ─────────
  static isOnline(lastSeenAt: Date | null | undefined): boolean {
    if (!lastSeenAt) return false;
    return Date.now() - lastSeenAt.getTime() < ONLINE_THRESHOLD_MS;
  }

  // ─── Enriches a user object with derived isOnline field ─────
  static withPresence<T extends {
    lastSeenAt?: Date | null;
    lastLoginAt?: Date | null;
    lastLogoutAt?: Date | null;
  }>(user: T): T & { isOnline: boolean } {
    return {
      ...user,
      isOnline: PresenceService.isOnline(user.lastSeenAt),
    };
  }
}

export const presenceService = new PresenceService();