// src/modules/columnists/columnists.controller.ts
import type { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../shared/database/prisma';

export class ColumnistsController {
  list = async (_request: FastifyRequest, reply: FastifyReply) => {
    const columnists = await prisma.user.findMany({
      where: { role: 'COLUNISTA', isActive: true },
      select: {
        id: true,
        name: true,
        avatar: true,
        bio: true,
        position: true,
      },
      orderBy: { name: 'asc' },
    });

    return reply.send(
      columnists.map((c) => ({
        name: c.name,
        role: c.position ?? 'Colunista',
        description: c.bio ?? '',
        avatar: c.avatar,
        slug: c.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
      })),
    );
  };

  getBySlug = async (request: FastifyRequest, reply: FastifyReply) => {
    const { slug } = request.params as { slug: string };

    const columnists = await prisma.user.findMany({
      where: { role: 'COLUNISTA', isActive: true },
      select: {
        id: true,
        name: true,
        avatar: true,
        bio: true,
        position: true,
      },
      orderBy: { name: 'asc' },
    });

    const found = columnists.find((c) => {
      const s = c.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      return s === slug;
    });

    if (!found) {
      return reply.code(404).send({
        error: { code: 404, message: 'Colunista não encontrado.' },
      });
    }

    return reply.send({
      name: found.name,
      role: found.position ?? 'Colunista',
      description: found.bio ?? '',
      avatar: found.avatar,
      slug,
    });
  };
}
