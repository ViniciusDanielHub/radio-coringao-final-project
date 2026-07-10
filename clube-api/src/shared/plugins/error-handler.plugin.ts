// src/shared/plugins/error-handler.plugin.ts
import type { FastifyInstance } from 'fastify';
import { ValidationException } from '../validation';

const isProd = process.env.NODE_ENV === 'production';

export function registerErrorHandler(app: FastifyInstance): void {
  app.setNotFoundHandler((request, reply) => {
    request.log.warn({ method: request.method, url: request.url }, 'Rota não encontrada');
    reply.code(404).send({
      error: 'Rota não encontrada.',
      hint: 'Verifique o método HTTP e o caminho da URL.',
    });
  });

  app.setErrorHandler((err: any, request, reply) => {
    // ── Erros de validação da nossa camada ───────────────────────────────
    if (err instanceof ValidationException) {
      return reply.code(422).send({
        error: 'Dados inválidos.',
        details: isProd ? undefined : err.errors,
      });
    }

    // ── Erros do Prisma ──────────────────────────────────────────────────
    if (err.code === 'P2002') {
      const fields: string[] = err.meta?.target ?? [];
      return reply.code(409).send({
        error: 'Já existe um registro com este valor único.',
        fields: isProd ? undefined : (fields.length > 0 ? fields : undefined),
        hint: fields.length > 0
          ? `O(s) campo(s) "${fields.join(', ')}" já está(ão) em uso.`
          : 'Verifique se não há duplicidade nos dados.',
      });
    }

    if (err.code === 'P2025') {
      return reply.code(404).send({ error: 'Registro não encontrado.' });
    }

    if (err.code === 'P2003') {
      const isDelete = request.method === 'DELETE';
      return reply.code(isDelete ? 409 : 422).send({
        error: isDelete
          ? 'Não é possível deletar: registro em uso por outro recurso.'
          : 'Referência inválida: o registro relacionado não existe.',
      });
    }

    if (err.code === 'P2011') {
      return reply.code(422).send({ error: 'Campo obrigatório ausente.' });
    }

    if (err.code === 'P2006') {
      return reply.code(422).send({ error: 'Valor inválido para o tipo de dado esperado.' });
    }

    if (err.code === 'P2024') {
      request.log.error({ err }, 'Timeout de conexão com o banco');
      return reply.code(503).send({ error: 'Banco de dados indisponível. Tente novamente.' });
    }

    if (err.code === 'P2034') {
      return reply.code(409).send({ error: 'Conflito de transação. Tente novamente.' });
    }

    // ── Fastify schema validation ────────────────────────────────────────
    if (err.validation) {
      return reply.code(422).send({
        error: 'Dados inválidos.',
        details: isProd ? undefined : err.validation.map((v: any) => ({
          field: v.instancePath?.replace('/', '') ?? 'desconhecido',
          message: v.message,
        })),
      });
    }

    // ── Multipart / upload ───────────────────────────────────────────────
    if (err.code === 'FST_FIELDS_LIMIT') {
      return reply.code(400).send({ error: 'Muitos campos no formulário.' });
    }
    if (err.code === 'FST_FILES_LIMIT') {
      return reply.code(400).send({ error: 'Número máximo de arquivos excedido.' });
    }
    if (err.code === 'FST_PARTS_LIMIT') {
      return reply.code(400).send({ error: 'Número máximo de partes excedido.' });
    }

    // ── Rate limit ───────────────────────────────────────────────────────
    if (err.statusCode === 429) {
      return reply.code(429).send({ error: 'Muitas requisições. Aguarde antes de tentar novamente.' });
    }

    // ── JSON malformado ──────────────────────────────────────────────────
    if (err.statusCode === 400 && err.message?.includes('JSON')) {
      return reply.code(400).send({ error: 'JSON malformado no corpo da requisição.' });
    }

    // ── Payload muito grande ─────────────────────────────────────────────
    if (err.statusCode === 413) {
      return reply.code(413).send({ error: 'Corpo da requisição excede o tamanho máximo.' });
    }

    // ── Fallback ─────────────────────────────────────────────────────────
    const statusCode = err.statusCode && err.statusCode < 500 ? err.statusCode : 500;

    if (statusCode >= 500) {
      request.log.error({ err, path: request.url, method: request.method }, 'Erro interno');
    }

    reply.code(statusCode).send({
      error: statusCode >= 500
        ? 'Erro interno do servidor.'
        : (err.message || 'Erro na requisição.'),
    });
  });
}