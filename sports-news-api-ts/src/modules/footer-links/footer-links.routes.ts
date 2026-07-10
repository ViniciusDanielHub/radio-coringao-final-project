// src/modules/footer-links/footer-links.routes.ts
import type { FastifyInstance } from 'fastify';
import { FooterLinksController } from './footer-links.controller';
import { requirePermission } from '../../shared/plugins/permissions.plugin';
import { createUploadHandler } from '../../shared/plugins/upload.plugin';

const uploadFooter = createUploadHandler('footer');
const controller = new FooterLinksController();

export async function footerLinksPublicRoutes(app: FastifyInstance): Promise<void> {
  app.get('/links-rodape', controller.listPublic);
}

export async function footerLinksAdminRoutes(app: FastifyInstance): Promise<void> {
  app.addHook('preHandler', requirePermission('settings:manage'));

  app.get('/links-rodape', controller.listAdmin);
  app.post('/links-rodape', { preHandler: [uploadFooter] }, controller.create);
  app.patch('/links-rodape/:id', { preHandler: [uploadFooter] }, controller.update);
  app.delete('/links-rodape/:id', controller.delete);
}
