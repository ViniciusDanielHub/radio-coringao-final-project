// src/modules/dashboard/dashboard.service.ts
import type { IArticleAdminRepository } from '../articles/repositories/article-admin.repository.interface';
import type { IUserRepository } from '../users/users.repository';
import type { ICategoryRepository } from '../categories/categories.repository';
import { prisma } from '../../shared/database/prisma';

export class DashboardService {
  constructor(
    private readonly articleRepo: IArticleAdminRepository,
    private readonly userRepo: IUserRepository,
    private readonly categoryRepo: ICategoryRepository,
  ) { }

  async getStats() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      stats,
      { topArticles, recentArticles },
      topCategories,
      totalUsers,
      articlesPerMonth,
      readsPerMonth,
      mostReadArticle,
      mostReadArticleThisMonth,
      scheduledThisMonth,
      pending,
      publishedThisYear,
    ] = await Promise.all([
      this.articleRepo.aggregateStats(),
      this.articleRepo.findForDashboard(),
      this.categoryRepo.listTopByArticleCount(5),
      this.userRepo.count(),
      this.articleRepo.getArticlesPerMonth(12),
      this.articleRepo.getReadsPerMonth(12),
      this.articleRepo.getMostReadArticle(),
      this.articleRepo.getMostReadArticle({ from: startOfMonth }),
      this.articleRepo.countScheduledThisMonth(),
      this.articleRepo.countPending(),
      this.articleRepo.countPublishedThisYear(),
    ]);

    return {
      stats: { ...stats, totalUsers },
      topArticles,
      topCategories,
      recentArticles,
      articlesPerMonth,
      readsPerMonth,
      mostReadArticle,
      mostReadArticleThisMonth,
      scheduledThisMonth,
      pending,
      publishedThisYear,
    };
  }

  async getArticlesPerMonth(months: number) {
    return this.articleRepo.getArticlesPerMonth(months);
  }

  async getArticlesPerYear(years: number) {
    const now = new Date();
    const startYear = now.getFullYear() - years + 1;

    const results: { year: string; published: number; review: number; draft: number }[] = [];

    for (let y = startYear; y <= now.getFullYear(); y++) {
      const [published, review, draft] = await Promise.all([
        prisma.article.count({
          where: { status: 'PUBLISHED', publishedAt: { gte: new Date(y, 0, 1), lt: new Date(y + 1, 0, 1) } },
        }),
        prisma.article.count({
          where: { status: 'REVIEW', createdAt: { gte: new Date(y, 0, 1), lt: new Date(y + 1, 0, 1) } },
        }),
        prisma.article.count({
          where: { status: 'DRAFT', createdAt: { gte: new Date(y, 0, 1), lt: new Date(y + 1, 0, 1) } },
        }),
      ]);
      results.push({ year: String(y), published, review, draft });
    }

    return results;
  }

  async getViewsPerMonth(months: number) {
    const reads = await this.articleRepo.getReadsPerMonth(months);
    return reads.map((r) => ({
      month: r.month,
      reads: r.reads,
      uniqueReaders: r.uniqueReaders,
    }));
  }

  async getViewsPerYear(years: number) {
    const now = new Date();
    const startYear = now.getFullYear() - years + 1;

    const results: { year: string; reads: number; uniqueReaders: number }[] = [];

    for (let y = startYear; y <= now.getFullYear(); y++) {
      const row = await prisma.$queryRawUnsafe<{ reads: bigint; unique: bigint }[]>(
        `SELECT
           COUNT(*) AS reads,
           COUNT(DISTINCT "ipHash") AS unique
         FROM "article_views"
         WHERE "viewedAt" >= $1 AND "viewedAt" < $2`,
        new Date(y, 0, 1),
        new Date(y + 1, 0, 1),
      );
      results.push({
        year: String(y),
        reads: Number(row[0]?.reads ?? 0),
        uniqueReaders: Number(row[0]?.unique ?? 0),
      });
    }

    return results;
  }
}
