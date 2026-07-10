// src/modules/comments/comments.controller.ts
import type { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../shared/database/prisma';

export class CommentsController {
  getByArticleSlug = async (request: FastifyRequest, reply: FastifyReply) => {
    const { slug } = request.params as { slug: string };

    const article = await prisma.article.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!article) {
      return reply.code(404).send({
        error: { code: 404, message: 'Artigo não encontrado.' },
      });
    }

    const comments = await prisma.comment.findMany({
      where: { articleId: article.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        content: true,
        createdAt: true,
      },
    });

    return reply.send(
      comments.map((c) => ({
        id: c.id,
        name: c.name,
        content: c.content,
        articleSlug: slug,
        createdAt: c.createdAt.toISOString(),
      })),
    );
  };

  addComment = async (request: FastifyRequest, reply: FastifyReply) => {
    const { slug } = request.params as { slug: string };
    const body = request.body as { name?: string; content?: string };

    if (!body?.name?.trim() || !body?.content?.trim()) {
      return reply.code(422).send({
        error: {
          code: 422,
          message: 'Os campos "name" e "content" são obrigatórios.',
        },
      });
    }

    const article = await prisma.article.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!article) {
      return reply.code(404).send({
        error: { code: 404, message: 'Artigo não encontrado.' },
      });
    }

    const comment = await prisma.comment.create({
      data: {
        name: body.name.trim(),
        content: body.content.trim(),
        articleId: article.id,
      },
    });

    return reply.code(201).send({
      id: comment.id,
      name: comment.name,
      content: comment.content,
      articleSlug: slug,
      createdAt: comment.createdAt.toISOString(),
    });
  };
}
