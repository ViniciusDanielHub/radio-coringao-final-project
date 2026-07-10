// src/modules/dashboard/dashboard.controller.ts
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { DashboardService } from './dashboard.service';

export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  getStats = async (_request: FastifyRequest, reply: FastifyReply) => {
    return reply.send(await this.dashboardService.getStats());
  };

  getArticlesPerMonth = async (request: FastifyRequest, reply: FastifyReply) => {
    const { months } = request.query as { months?: string };
    return reply.send(await this.dashboardService.getArticlesPerMonth(months ? Number(months) : 6));
  };

  getArticlesPerYear = async (request: FastifyRequest, reply: FastifyReply) => {
    const { years } = request.query as { years?: string };
    return reply.send(await this.dashboardService.getArticlesPerYear(years ? Number(years) : 5));
  };

  getViewsPerMonth = async (request: FastifyRequest, reply: FastifyReply) => {
    const { months } = request.query as { months?: string };
    return reply.send(await this.dashboardService.getViewsPerMonth(months ? Number(months) : 6));
  };

  getViewsPerYear = async (request: FastifyRequest, reply: FastifyReply) => {
    const { years } = request.query as { years?: string };
    return reply.send(await this.dashboardService.getViewsPerYear(years ? Number(years) : 5));
  };
}
