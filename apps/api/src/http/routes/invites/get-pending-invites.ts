import { roleSchema } from '@sass/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function getPendingInvites(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/pending-invites',
      {
        schema: {
          tags: ['invites'],
          summary: 'Get all user pending invites',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              invites: z.array(
                z.object({
                  id: z.string(),
                  email: z.string(),
                  role: roleSchema,
                  createdAt: z.date(),
                  author: z
                    .object({
                      name: z.string().nullable(),
                      id: z.string(),
                    })
                    .nullable(),
                  organization: z.object({
                    name: z.string(),
                  }),
                }),
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        })

        if (!user) {
          throw new BadRequestError(`User not found.`)
        }

        const invites = await prisma.invite.findMany({
          select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                name: true,
              },
            },
            organization: {
              name: true,
            },
          },
          where: {
            email: user.email,
          },
          orderBy: {
            createdAt: 'desc',
          },
        })

        if (!invites) {
          throw new BadRequestError('Invites not found.')
        }

        return reply.status(200).send({ invites })
      },
    )
}
