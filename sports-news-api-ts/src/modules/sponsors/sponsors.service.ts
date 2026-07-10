import type { ISponsorRepository } from './sponsors.repository';
import { NotFoundError, ValidationError, ConflictError } from '../../shared/errors';
import { ErrorCode } from '../../shared/errors/error-codes';
import { deleteImage } from '../../shared/services/cloudinary';

export class SponsorService {
  constructor(private readonly repo: ISponsorRepository) { }

  async listPublic() {
    return this.repo.listPublic();
  }

  async listAdmin() {
    return this.repo.listAdmin();
  }

  async create(
    logoUrl: string,
    data: { name: string; websiteUrl?: string; description?: string; order?: number },
  ) {
    if (!data.name?.trim()) throw new ValidationError(ErrorCode.SPONSOR_NAME_REQUIRED);

    const existing = await this.repo.findByName(data.name.trim());
    if (existing) {
      throw new ConflictError(ErrorCode.SPONSOR_NAME_TAKEN, {
        hint: `Já existe um patrocinador com o nome "${data.name.trim()}".`,
      });
    }

    try {
      return await this.repo.create({
        name: data.name.trim(),
        logoUrl,
        websiteUrl: data.websiteUrl ?? null,
        description: data.description?.trim() ?? null,
        isActive: true,
        order: data.order ? Number(data.order) : 0,
      });
    } catch (err: any) {
      if (err?.code === 'P2002') {
        throw new ConflictError(ErrorCode.SPONSOR_NAME_TAKEN, {
          hint: `Já existe um patrocinador com o nome "${data.name.trim()}".`,
        });
      }
      throw err;
    }
  }

  async update(
    id: string,
    data: { name?: string; websiteUrl?: string; description?: string; isActive?: boolean; order?: number },
    logoUrl?: string,
  ) {
    const existing = await this.repo.findById(id);
    if (!existing) throw new NotFoundError(ErrorCode.SPONSOR_NOT_FOUND, { id });

    if (data.name !== undefined) {
      const duplicate = await this.repo.findByName(data.name.trim());
      if (duplicate && duplicate.id !== id) {
        throw new ConflictError(ErrorCode.SPONSOR_NAME_TAKEN, {
          hint: `Já existe um patrocinador com o nome "${data.name.trim()}".`,
        });
      }
    }

    const updateData: any = {};

    if (data.name !== undefined) {
      updateData.name = data.name.trim();
    }

    if (data.websiteUrl !== undefined) updateData.websiteUrl = data.websiteUrl ?? null;
    if (data.description !== undefined) updateData.description = data.description?.trim() ?? null;
    if (data.isActive !== undefined) updateData.isActive = String(data.isActive) === 'true';
    if (data.order !== undefined) updateData.order = Number(data.order);

    if (logoUrl) {
      await deleteImage(existing.logoUrl).catch(() => { });
      updateData.logoUrl = logoUrl;
    }

    try {
      return await this.repo.update(id, updateData);
    } catch (err: any) {
      if (err?.code === 'P2002') {
        throw new ConflictError(ErrorCode.SPONSOR_NAME_TAKEN, {
          hint: `Já existe um patrocinador com o nome "${updateData.name ?? data.name}".`,
        });
      }
      throw err;
    }
  }

  async delete(id: string) {
    const sponsor = await this.repo.findById(id);
    if (!sponsor) throw new NotFoundError(ErrorCode.SPONSOR_NOT_FOUND, { id });
    await deleteImage(sponsor.logoUrl).catch(() => { });
    await this.repo.delete(id);
    return { message: 'Patrocinador deletado.' };
  }
}