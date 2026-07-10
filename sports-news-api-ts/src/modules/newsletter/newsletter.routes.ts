// src/modules/newsletter/newsletter.routes.ts
import type { FastifyInstance } from 'fastify';
import { NewsletterController } from './newsletter.controller';

const controller = new NewsletterController();

export async function newsletterPublicRoutes(app: FastifyInstance): Promise<void> {
  app.post('/newsletter/subscribe', controller.subscribe);
}
