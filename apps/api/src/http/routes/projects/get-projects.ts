import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function getProjects(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:orgSlug/projects/',
      {
        schema: {
          tags: ['projects'],
          summary: 'Get all organization projects',
          security: [{ bearerAuth: [] }],
          params: z.object({
            orgSlug: z.string(),
          }),
          response: {
            200: z.object({
              projects: z.array(
                z.object({
                  id: z.string().uuid(),
                  name: z.string(),
                  description: z.string(),
                  slug: z.string(),
                  avatarUrl: z.string().nullable(),
                  organizationId: z.string().uuid(),
                  createdAt: z.date(),
                  ownerId: z.string().uuid(),
                  owner: z.object({
                    id: z.string().uuid(),
                    name: z.string().nullable(),
                    avatarUrl: z.string().nullable(),
                  }),
                }),
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const { orgSlug } = request.params
        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(orgSlug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('get', 'Project')) {
          throw new UnauthorizedError(
            `You're not allowed to see organization projects.`,
          )
        }

        const projects = await prisma.project.findMany({
          select: {
            id: true,
            name: true,
            description: true,
            avatarUrl: true,
            slug: true,
            organizationId: true,
            ownerId: true,
            createdAt: true,
            owner: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
          where: {
            organizationId: organization.id,
          },
          orderBy: {
            createdAt: 'desc',
          },
        })

        return reply.status(200).send({ projects })
      },
    )
}