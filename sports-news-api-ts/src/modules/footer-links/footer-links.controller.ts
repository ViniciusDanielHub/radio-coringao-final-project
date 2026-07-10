// src/modules/footer-links/footer-links.controller.ts
import type { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../shared/database/prisma';

export class FooterLinksController {
  listPublic = async (_request: FastifyRequest, reply: FastifyReply) => {
    const links = await prisma.footerLink.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    return reply.send(links);
  };

  listAdmin = async (_request: FastifyRequest, reply: FastifyReply) => {
    const links = await prisma.footerLink.findMany({
      orderBy: { order: 'asc' },
    });
    return reply.send(links);
  };

  create = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = request.body as any;
      const type = body?.type || 'link';

      if (type === 'link') {
        if (!body?.label?.trim()) {
          return reply.code(422).send({
            code: 'VALIDATION_REQUIRED_FIELD',
            error: 'Campo obrigatório: label.',
            hint: 'O campo "label" é obrigatório para links.',
          });
        }
        if (!body?.href?.trim()) {
          return reply.code(422).send({
            code: 'VALIDATION_REQUIRED_FIELD',
            error: 'Campo obrigatório: href.',
            hint: 'O campo "href" é obrigatório para links.',
          });
        }
      }

      const label = body?.label?.trim() || '';
      if (label) {
        const existing = await prisma.footerLink.findFirst({
          where: { label, type },
        });
        if (existing) {
          return reply.code(409).send({
            code: 'DUPLICATE_ENTRY',
            error: `Já existe um registro do tipo "${type}" com o label "${label}".`,
            hint: 'Edite o registro existente em vez de criar um novo.',
          });
        }
      }

      const link = await prisma.footerLink.create({
        data: {
          label: body.label?.trim() || '',
          href: body.href?.trim() || '',
          imageUrl: request.uploadedFile?.path || null,
          description: body.description?.trim() || null,
          type,
          order: body.order ? Number(body.order) : 0,
        },
      });

      return reply.code(201).send(link);
    } catch (err: any) {
      if (err?.code === 'P2002') {
        return reply.code(409).send({
          code: 'DB_UNIQUE_VIOLATION',
          error: 'Já existe um registro com este valor.',
          hint: 'Verifique os campos únicos e tente novamente.',
        });
      }
      return reply.code(500).send({
        code: 'INTERNAL_ERROR',
        error: 'Erro interno ao criar link.',
        hint: 'Tente novamente ou contate o suporte.',
      });
    }
  };

  update = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string };
      const body = request.body as any;

      const existing = await prisma.footerLink.findUnique({ where: { id } });
      if (!existing) {
        return reply.code(404).send({
          code: 'RECORD_NOT_FOUND',
          error: 'Registro não encontrado.',
          hint: `Nenhum link de rodapé encontrado com o id "${id}".`,
        });
      }

      const type = body?.type ?? existing.type;

      if (type === 'link') {
        const label = body?.label !== undefined ? body.label : existing.label;
        if (!label?.trim()) {
          return reply.code(422).send({
            code: 'VALIDATION_REQUIRED_FIELD',
            error: 'Campo obrigatório: label.',
            hint: 'O campo "label" é obrigatório para links.',
          });
        }
        const href = body?.href !== undefined ? body.href : existing.href;
        if (!href?.trim()) {
          return reply.code(422).send({
            code: 'VALIDATION_REQUIRED_FIELD',
            error: 'Campo obrigatório: href.',
            hint: 'O campo "href" é obrigatório para links.',
          });
        }
      }

      const updateData: any = {};
      if (body?.label !== undefined) updateData.label = body.label.trim();
      if (body?.href !== undefined) updateData.href = body.href.trim();
      if (body?.order !== undefined) updateData.order = Number(body.order);
      if (body?.isActive !== undefined) updateData.isActive = Boolean(body.isActive);
      if (body?.description !== undefined) updateData.description = body.description?.trim() || null;
      if (body?.type !== undefined) updateData.type = body.type;
      if (request.uploadedFile?.path) updateData.imageUrl = request.uploadedFile.path;

      const checkLabel = updateData.label ?? existing.label;
      const checkType = updateData.type ?? existing.type;
      if (checkLabel) {
        const dup = await prisma.footerLink.findFirst({
          where: { label: checkLabel, type: checkType, id: { not: id } },
        });
        if (dup) {
          return reply.code(409).send({
            code: 'DUPLICATE_ENTRY',
            error: `Já existe outro registro do tipo "${checkType}" com o label "${checkLabel}".`,
            hint: 'Use um label diferente.',
          });
        }
      }

      const link = await prisma.footerLink.update({
        where: { id },
        data: updateData,
      });

      return reply.send(link);
    } catch (err: any) {
      if (err?.code === 'P2002') {
        return reply.code(409).send({
          code: 'DB_UNIQUE_VIOLATION',
          error: 'Já existe um registro com este valor.',
          hint: 'Verifique os campos únicos e tente novamente.',
        });
      }
      return reply.code(500).send({
        code: 'INTERNAL_ERROR',
        error: 'Erro interno ao atualizar link.',
        hint: 'Tente novamente ou contate o suporte.',
      });
    }
  };

  delete = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string };

      const existing = await prisma.footerLink.findUnique({ where: { id } });
      if (!existing) {
        return reply.code(404).send({
          code: 'RECORD_NOT_FOUND',
          error: 'Registro não encontrado.',
          hint: `Nenhum link de rodapé encontrado com o id "${id}".`,
        });
      }

      await prisma.footerLink.delete({ where: { id } });
      return reply.send({ message: 'Deletado com sucesso.' });
    } catch (err: any) {
      return reply.code(500).send({
        code: 'INTERNAL_ERROR',
        error: 'Erro interno ao deletar link.',
        hint: 'Tente novamente ou contate o suporte.',
      });
    }
  };
}
