import type { FastifyInstance } from 'fastify';
import { sponsorController } from '../../shared/container';
import { requirePermission } from '../../shared/plugins/permissions.plugin';
import { createUploadHandler } from '../../shared/plugins/upload.plugin';

const uploadSponsor = createUploadHandler('sponsors');

export async function sponsorPublicRoutes(app: FastifyInstance): Promise<void> {
  app.get('/patrocinadores', sponsorController.listPublic);
}

export async function sponsorAdminRoutes(app: FastifyInstance): Promise<void> {
  app.get('/patrocinadores', sponsorController.listAdmin);

  app.post('/patrocinadores',
    { preHandler: [requirePermission('sponsors:manage'), uploadSponsor] },
    sponsorController.create,
  );

  app.patch('/patrocinadores/:id',
    { preHandler: [requirePermission('sponsors:manage'), uploadSponsor] },
    sponsorController.update,
  );

  app.delete('/patrocinadores/:id',
    { preHandler: [requirePermission('sponsors:manage')] },
    sponsorController.delete,
  );
}