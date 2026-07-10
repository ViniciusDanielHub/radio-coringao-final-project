// src/modules/columnists/columnists.routes.ts
import type { FastifyInstance } from 'fastify';
import { ColumnistsController } from './columnists.controller';

const controller = new ColumnistsController();

export async function columnistsPublicRoutes(app: FastifyInstance): Promise<void> {
  app.get('/cronistas', controller.list);
  app.get('/columnists/:slug', controller.getBySlug);
}
