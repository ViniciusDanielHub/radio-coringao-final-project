// src/shared/scheduler/loan-return.ts
//
// Verifica empréstimos com returnDate vencida e reativa o jogador no elenco.
// Executa a cada 5 minutos.

import { prisma } from '../database/prisma';

export function startLoanReturnScheduler(): void {
  setInterval(async () => {
    try {
      const now = new Date();
      const overdueLoans = await prisma.playerMovement.findMany({
        where: {
          type: 'LOAN_OUT',
          returnDate: { lte: now },
        },
        select: { id: true, squadMemberId: true, returnDate: true },
      });

      for (const loan of overdueLoans) {
        const member = await prisma.squadMember.findUnique({ where: { id: loan.squadMemberId } });
        if (member && !member.isActive) {
          await prisma.squadMember.update({
            where: { id: loan.squadMemberId },
            data: { isActive: true },
          });
          console.log(`[SCHEDULER] Jogador ${member.name} reativado automaticamente (empréstimo vencido em ${loan.returnDate?.toISOString().slice(0, 10)}).`);
        }
      }
    } catch (err) {
      console.error('[SCHEDULER] Erro no scheduler de retorno de empréstimo:', err);
    }
  }, 5 * 60 * 1000); // a cada 5 minutos
}
