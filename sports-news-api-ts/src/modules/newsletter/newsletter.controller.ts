// src/modules/newsletter/newsletter.controller.ts
import type { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../shared/database/prisma';

export class NewsletterController {
  subscribe = async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as { name?: string; email?: string };

    if (!body?.name?.trim() || !body?.email?.trim()) {
      return reply.code(422).send({
        error: {
          code: 422,
          message: 'Os campos "name" e "email" são obrigatórios.',
        },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email.trim())) {
      return reply.code(422).send({
        error: {
          code: 422,
          message: 'Formato de e-mail inválido.',
        },
      });
    }

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: body.email.trim().toLowerCase() },
    });

    if (existing) {
      if (existing.isActive) {
        return reply.code(200).send({ message: 'E-mail já está inscrito na newsletter.' });
      }
      await prisma.newsletterSubscriber.update({
        where: { id: existing.id },
        data: { isActive: true, name: body.name.trim() },
      });
      return reply.code(200).send({ message: 'Inscrição reativada com sucesso.' });
    }

    await prisma.newsletterSubscriber.create({
      data: {
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
      },
    });

    return reply.code(201).send({ message: 'Inscrito na newsletter com sucesso.' });
  };
}
