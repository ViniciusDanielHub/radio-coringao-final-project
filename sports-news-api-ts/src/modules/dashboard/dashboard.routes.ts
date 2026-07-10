// src/modules/dashboard/dashboard.routes.ts
import type { FastifyInstance } from 'fastify';
import { dashboardController } from '../../shared/container';

export async function dashboardRoutes(app: FastifyInstance): Promise<void> {
  app.get('/dashboard', dashboardController.getStats);
  app.get('/dashboard/articles-per-month', dashboardController.getArticlesPerMonth);
  app.get('/dashboard/articles-per-year', dashboardController.getArticlesPerYear);
  app.get('/dashboard/views-per-month', dashboardController.getViewsPerMonth);
  app.get('/dashboard/views-per-year', dashboardController.getViewsPerYear);
}
