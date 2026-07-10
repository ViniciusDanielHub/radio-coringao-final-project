// src/modules/articles/use-cases/unarchive-article.use-case.ts
import type { IArticleAdminRepository } from '../repositories/article-admin.repository.interface';
import type { Role } from '../../../shared/entities';
import { NotFoundError, ForbiddenError } from '../../../shared/errors';
import { hasPermission } from '../../../shared/plugins/permissions.plugin';
import { logger as rootLogger, type Logger } from '../../../shared/logger';

export class UnarchiveArticleUseCase {
  private readonly log: Logger;

  constructor(private readonly repo: IArticleAdminRepository, log?: Logger) {
    this.log = log ?? rootLogger.child({ useCase: 'UnarchiveArticle' });
  }

  async execute(id: string, userRole: Role) {
    if (!hasPermission(userRole, 'articles:archive')) {
      throw new ForbiddenError('Seu cargo não permite restaurar artigos arquivados.');
    }

    const article = await this.repo.findById(id);
    if (!article) throw new NotFoundError('Artigo não encontrado.');

    if ((article as any).status !== 'ARCHIVED') {
      return { message: 'Artigo não está arquivado.', article };
    }

    const updated = await this.repo.update(id, { status: 'DRAFT' } as any);

    this.log.info({ articleId: id, userRole }, 'Artigo restaurado de arquivo');

    return { message: 'Artigo restaurado como rascunho.', article: updated };
  }
}
