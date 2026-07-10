// src/modules/competitions/competitions.routes.ts
import type { FastifyInstance } from 'fastify';
import { prisma } from '../../shared/database/prisma';
import { requireAdminAuth } from '../../shared/plugins/admin-auth.plugin';
import { Validator } from '../../shared/validation';

export async function competitionsPublicRoutes(app: FastifyInstance): Promise<void> {
  // GET /api/competitions?category=sub-20
  app.get('/competicoes', async (request, reply) => {
    const { category, includeStandings } = request.query as { category?: string; includeStandings?: string };
    const competitions = await prisma.competition.findMany({
      where: {
        isActive: true,
        ...(category && { category: { slug: category } }),
      },
      include: {
        category: { select: { name: true, slug: true } },
        ...(includeStandings === 'true' && {
          standing: { orderBy: { position: 'asc' } },
        }),
      },
      orderBy: { createdAt: 'desc' },
    });
    return reply.send(competitions);
  });
}

export async function competitionsAdminRoutes(app: FastifyInstance): Promise<void> {
  app.addHook('preHandler', requireAdminAuth);

  app.get('/competicoes', async (_req, reply) => {
    const competitions = await prisma.competition.findMany({
      include: { category: { select: { name: true, slug: true, modality: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return reply.send(competitions);
  });

  app.post('/competicoes', async (request, reply) => {
    const body = request.body as any;

    new Validator()
      .required('name', body?.name, 'nome')
      .string('name', body?.name, { min: 2, max: 120, label: 'nome' })
      .required('season', body?.season, 'temporada')
      .string('season', body?.season, { min: 4, max: 20, label: 'temporada' })
      .required('categoryId', body?.categoryId, 'categoria')
      .throw();

    // Verifica se a categoria existe
    const category = await prisma.category.findUnique({ where: { id: body.categoryId } });
    if (!category) {
      return reply.code(422).send({
        error: `Categoria com ID "${body.categoryId}" não encontrada.`,
        field: 'categoryId',
        hint: 'Use GET /api/admin/categories para listar as categorias disponíveis.',
      });
    }

    // Verifica unicidade [categoryId + name + season]
    const conflict = await prisma.competition.findFirst({
      where: {
        categoryId: body.categoryId,
        name: body.name.trim(),
        season: String(body.season),
      },
    });
    if (conflict) {
      return reply.code(409).send({
        error: `Já existe uma competição "${body.name.trim()}" na temporada "${body.season}" para a categoria "${category.name}".`,
        hint: 'Altere o nome ou a temporada, ou reutilize a competição existente.',
        existingId: conflict.id,
      });
    }

    const competition = await prisma.competition.create({
      data: {
        name: body.name.trim(),
        season: String(body.season),
        categoryId: body.categoryId,
        status: body.status || null,
        isParticipating: body.isParticipating !== false,
        tableFormat: body.tableFormat || 'single',
        groupNames: body.groupNames || null,
      },
    });
    return reply.code(201).send(competition);
  });

  app.patch('/competicoes/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;

    if (!body || Object.keys(body).length === 0) {
      return reply.code(422).send({
        error: 'Nenhum campo enviado para atualização.',
        hint: 'Envie ao menos um campo: name, season ou isActive.',
      });
    }

    new Validator()
      .string('name', body.name, { min: 2, max: 120, label: 'nome' })
      .string('season', body.season, { min: 4, max: 20, label: 'temporada' })
      .boolean('isActive', body.isActive, 'ativo')
      .throw();

    // Re-validate composite key when name, season or categoryId changes
    const current = await prisma.competition.findUnique({ where: { id } });
    if (!current) {
      return reply.code(404).send({ error: `Competição com ID "${id}" não encontrada.` });
    }

    const nextName = body.name ? body.name.trim() : current.name;
    const nextSeason = body.season ? String(body.season) : current.season;
    const nextCategoryId = body.categoryId !== undefined ? body.categoryId : current.categoryId;

    if (body.name || body.season || body.categoryId !== undefined) {
      const duplicate = await prisma.competition.findFirst({
        where: {
          name: nextName,
          season: nextSeason,
          categoryId: nextCategoryId,
          NOT: { id },
        },
      });
      if (duplicate) {
        return reply.code(409).send({
          error: `Já existe uma competição "${nextName}" na temporada "${nextSeason}" com esta categoria.`,
          conflictId: duplicate.id,
          hint: 'Altere o nome, a temporada ou a categoria para evitar duplicidade.',
        });
      }
    }

    const competition = await prisma.competition.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name.trim() }),
        ...(body.season && { season: String(body.season) }),
        ...(body.isActive !== undefined && { isActive: Boolean(body.isActive) }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.isParticipating !== undefined && { isParticipating: body.isParticipating === true || body.isParticipating === 'true' }),
        ...(body.tableFormat !== undefined && { tableFormat: body.tableFormat }),
        ...(body.groupNames !== undefined && { groupNames: body.groupNames || null }),
        ...(body.categoryId !== undefined && { categoryId: body.categoryId }),
      },
    });
    return reply.send(competition);
  });

  app.delete('/competicoes/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const matchesCount = await prisma.match.count({ where: { competitionId: id } });
    if (matchesCount > 0) {
      return reply.code(409).send({
        error: 'Não é possível deletar esta competição pois ela possui partidas vinculadas.',
        dependents: { matches: matchesCount },
        hint: 'Desative a competição (isActive: false) ou remova as partidas antes de deletar.',
      });
    }

    await prisma.competition.delete({ where: { id } });
    return reply.send({ message: 'Competição deletada com sucesso.' });
  });
}