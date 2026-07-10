// src/modules/navbar/navbar.routes.ts
import type { FastifyInstance } from 'fastify';
import { NavbarController } from './navbar.controller';

const controller = new NavbarController();

export async function navbarPublicRoutes(app: FastifyInstance): Promise<void> {
  app.get('/navbar', controller.getNavbar);
}
