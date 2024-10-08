import { projectSchema } from '@sass/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function updateProject(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/organizations/:orgSlug/projects/:projectSlug',
      {
        schema: {
          tags: ['projects'],
          summary: 'Update project details',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            description: z.string(),
          }),
          params: z.object({ orgSlug: z.string(), projectSlug: z.string() }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { orgSlug, projectSlug } = request.params
        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(orgSlug)

        const project = await prisma.project.findUnique({
          where: {
            organizationId: organization.id,
            slug: projectSlug,
          },
        })

        if (!project) {
          throw new BadRequestError('Project not found.')
        }

        const authProject = projectSchema.parse(project)
        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('update', authProject)) {
          throw new UnauthorizedError(
            `You're not allowed to update this project.`,
          )
        }

        const { name, description } = request.body

        await prisma.project.update({
          data: { name, description },
          where: { id: project?.id, organizationId: organization.id },
        })

        return reply.status(204).send()
      },
    )
}
