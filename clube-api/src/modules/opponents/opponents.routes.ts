// src/modules/opponents/opponents.routes.ts
import type { FastifyInstance } from 'fastify';
import { prisma } from '../../shared/database/prisma';
import { requireAdminAuth } from '../../shared/plugins/admin-auth.plugin';
import { createUploadHandler } from '../../shared/plugins/upload.plugin';
import { deleteImageSafe } from '../../shared/services/cloudinary';
import { Validator, sanitizePagination } from '../../shared/validation';

const uploadOpponentLogo = createUploadHandler('opponents');

export async function opponentsPublicRoutes(app: FastifyInstance): Promise<void> {
  app.get('/adversarios', async (req, reply) => {
    const { page, limit } = req.query as { page?: string; limit?: string };

    if (!page && !limit) {
      const opponents = await prisma.opponent.findMany({
        orderBy: { name: 'asc' },
        include: { categories: { include: { category: { select: { id: true, name: true, gender: true, modality: true } } } } },
      });
      return reply.send(opponents);
    }

    const { page: p, skip, take } = sanitizePagination(page, limit, 100);
    const [data, total] = await Promise.all([
      prisma.opponent.findMany({
        orderBy: { name: 'asc' }, skip, take,
        include: { categories: { include: { category: { select: { id: true, name: true, gender: true, modality: true } } } } },
      }),
      prisma.opponent.count(),
    ]);
    return reply.send({ data, total, page: p, limit: take, totalPages: Math.ceil(total / take) });
  });
}

export async function opponentsAdminRoutes(app: FastifyInstance): Promise<void> {
  app.addHook('preHandler', requireAdminAuth);

  app.get('/adversarios', async (req, reply) => {
    const { page = '1', limit = '20', q, categoryId } = req.query as { page?: string; limit?: string; q?: string; categoryId?: string };
    const { page: p, skip, take } = sanitizePagination(page, limit, 100);

    const where: any = {};
    if (q) where.name = { contains: q, mode: 'insensitive' as const };
    if (categoryId) {
      where.categories = { some: { categoryId } };
    }

    const [data, total] = await Promise.all([
      prisma.opponent.findMany({
        where,
        include: { categories: { include: { category: { select: { id: true, name: true, gender: true, modality: true } } } } },
        orderBy: { name: 'asc' }, skip, take,
      }),
      prisma.opponent.count({ where }),
    ]);
    return reply.send({ data, total, page: p, limit: take, totalPages: Math.ceil(total / take) });
  });

  // POST /api/admin/opponents
  app.post('/adversarios', { preHandler: [uploadOpponentLogo] }, async (request, reply) => {
    const body = request.body as any;
    const uploadedFile = (request as any).uploadedFile as { path: string } | undefined;

    try {
      new Validator()
        .required('name', body?.name, 'nome do adversário')
        .string('name', body?.name, { min: 2, max: 100, label: 'nome do adversário' })
        .throw();

      const conflict = await prisma.opponent.findFirst({ where: { name: body.name.trim() } });
      if (conflict) {
        return reply.code(409).send({ error: `Já existe um adversário com o nome "${body.name.trim()}".`, conflictId: conflict.id });
      }

      // Parse categoryIds from FormData (may be comma-separated string or array)
      let categoryIds: string[] = [];
      if (body.categoryIds) {
        categoryIds = Array.isArray(body.categoryIds) ? body.categoryIds : String(body.categoryIds).split(',').filter(Boolean);
      }

      const opponent = await prisma.opponent.create({
        data: {
          name: body.name.trim(),
          shortName: body.shortName?.trim() || null,
          logoUrl: uploadedFile?.path ?? null,
          stadium: body.stadium?.trim() || null,
          city: body.city?.trim() || null,
          foundedYear: body.foundedYear ? Number(body.foundedYear) : null,
          categories: categoryIds.length > 0 ? { create: categoryIds.map((cid) => ({ categoryId: cid })) } : undefined,
        },
        include: { categories: { include: { category: { select: { id: true, name: true, gender: true, modality: true } } } } },
      });
      return reply.code(201).send(opponent);
    } catch (err) {
      if (uploadedFile) await deleteImageSafe(uploadedFile.path);
      throw err;
    }
  });

  app.patch('/adversarios/:id', { preHandler: [uploadOpponentLogo] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;
    const uploadedFile = (request as any).uploadedFile as { path: string } | undefined;

    const hasFields = body && Object.keys(body).length > 0;
    if (!hasFields && !uploadedFile) {
      return reply.code(422).send({ error: 'Nenhum campo enviado para atualização.', hint: 'Envie campos ou um arquivo de logo.' });
    }

    try {
      if (body?.name) {
        new Validator().string('name', body.name, { min: 2, max: 100, label: 'nome do adversário' }).throw();
        const conflict = await prisma.opponent.findFirst({ where: { name: body.name.trim(), NOT: { id } } });
        if (conflict) {
          return reply.code(409).send({ error: `Já existe um adversário com o nome "${body.name.trim()}".`, conflictId: conflict.id });
        }
      }

      if (uploadedFile) {
        const existing = await prisma.opponent.findUnique({ where: { id } });
        if (existing?.logoUrl) await deleteImageSafe(existing.logoUrl);
      }

      // Parse categoryIds
      let categoryIds: string[] | undefined;
      if (body.categoryIds !== undefined) {
        categoryIds = Array.isArray(body.categoryIds) ? body.categoryIds : String(body.categoryIds).split(',').filter(Boolean);
      }

      const updateData: any = {
        ...(body?.name && { name: body.name.trim() }),
        ...(body?.shortName !== undefined && { shortName: body.shortName?.trim() || null }),
        ...(uploadedFile && { logoUrl: uploadedFile.path }),
        ...(body?.stadium !== undefined && { stadium: body.stadium?.trim() || null }),
        ...(body?.city !== undefined && { city: body.city?.trim() || null }),
        ...(body?.foundedYear !== undefined && { foundedYear: body.foundedYear ? Number(body.foundedYear) : null }),
      };

      // Replace categories if provided
      if (categoryIds !== undefined) {
        await prisma.opponentCategory.deleteMany({ where: { opponentId: id } });
        if (categoryIds.length > 0) {
          await prisma.opponentCategory.createMany({
            data: categoryIds.map((cid) => ({ opponentId: id, categoryId: cid })),
          });
        }
      }

      const opponent = await prisma.opponent.update({
        where: { id },
        data: updateData,
        include: { categories: { include: { category: { select: { id: true, name: true, gender: true, modality: true } } } } },
      });
      return reply.send(opponent);
    } catch (err) {
      if (uploadedFile) await deleteImageSafe(uploadedFile.path);
      throw err;
    }
  });

  app.delete('/adversarios/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const matchesCount = await prisma.match.count({ where: { opponentId: id } });
    if (matchesCount > 0) {
      return reply.code(409).send({
        error: 'Não é possível deletar este adversário pois ele possui partidas vinculadas.',
        dependents: { matches: matchesCount },
        hint: 'Remova as partidas vinculadas antes de deletar o adversário.',
      });
    }

    const opponent = await prisma.opponent.findUnique({ where: { id } });
    if (opponent?.logoUrl) await deleteImageSafe(opponent.logoUrl);
    await prisma.opponent.delete({ where: { id } });
    return reply.send({ message: 'Adversário deletado com sucesso.' });
  });
}
