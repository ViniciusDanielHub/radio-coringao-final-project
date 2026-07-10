// src/modules/comments/comments.routes.ts
import type { FastifyInstance } from 'fastify';
import { CommentsController } from './comments.controller';

const controller = new CommentsController();

export async function commentsPublicRoutes(app: FastifyInstance): Promise<void> {
  app.get('/noticias/:slug/comments', controller.getByArticleSlug);
  app.post('/noticias/:slug/comments', controller.addComment);
}
