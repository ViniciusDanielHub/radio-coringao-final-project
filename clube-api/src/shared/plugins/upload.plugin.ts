// src/shared/plugins/upload.plugin.ts
import type { FastifyRequest, FastifyReply } from 'fastify';
import { uploadImage, type UploadFolder } from '../services/cloudinary';

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];

const MAGIC_BYTES: { signature: number[]; type: string }[] = [
  { signature: [0xFF, 0xD8, 0xFF], type: 'image/jpeg' },
  { signature: [0x89, 0x50, 0x4E, 0x47], type: 'image/png' },
  { signature: [0x52, 0x49, 0x46, 0x46], type: 'image/webp' },
];

function detectMimeFromBuffer(buf: Buffer): string | null {
  for (const { signature, type } of MAGIC_BYTES) {
    if (signature.every((byte, i) => buf[i] === byte)) {
      if (type === 'image/webp') {
        const webpMarker = buf.slice(8, 12).toString('ascii');
        if (webpMarker !== 'WEBP') continue;
      }
      return type;
    }
  }
  // SVG check: starts with <svg or <?xml
  const head = buf.slice(0, 100).toString('utf-8').trim().toLowerCase();
  if (head.startsWith('<svg') || head.startsWith('<?xml')) {
    return 'image/svg+xml';
  }
  return null;
}

export function createUploadHandler(folder: UploadFolder) {
  return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const contentType = request.headers['content-type'] || '';

    // Se não é multipart, apenas segue (permite JSON puro sem upload)
    if (!contentType.includes('multipart')) {
      return;
    }

    const fields: Record<string, any> = {};
    let fileBuffer: Buffer | null = null;
    let fileMimetype = '';

    try {
      const parts = request.parts({ limits: { fileSize: MAX_SIZE_BYTES } });

      for await (const part of parts) {
        if (part.type === 'file') {
          try {
            fileBuffer = await part.toBuffer();
            fileMimetype = part.mimetype;
          } catch (err: any) {
            if (err.message === 'File size limit reached') {
              return reply.code(413).send({ error: `O arquivo excede o limite de ${MAX_SIZE_BYTES / 1024 / 1024}MB.` });
            }
            throw err;
          }
        } else {
          fields[part.fieldname] = part.value;
        }
      }
    } catch (err: any) {
      request.log.error({ err }, 'Erro ao processar multipart');
      return reply.code(400).send({ error: 'Erro ao processar o envio.' });
    }

    request.body = fields;

    if (!fileBuffer || fileBuffer.length === 0) return;

    const declaredMime = fileMimetype?.toLowerCase() ?? '';
    if (!ACCEPTED_TYPES.includes(declaredMime)) {
      return reply.code(415).send({
        error: 'Tipo de arquivo não suportado. Envie JPEG, PNG, WebP ou SVG.',
        received: declaredMime,
      });
    }

    const realMime = detectMimeFromBuffer(fileBuffer);
    if (!realMime) {
      return reply.code(415).send({ error: 'O arquivo enviado não é uma imagem válida.' });
    }

    try {
      const url = await uploadImage(fileBuffer, folder);
      (request as any).uploadedFile = { path: url };
    } catch (err: any) {
      return reply.code(500).send({
        error: 'Falha ao fazer upload da imagem.',
        details: process.env.NODE_ENV !== 'production' ? err.message : undefined,
      });
    }
  };
}
