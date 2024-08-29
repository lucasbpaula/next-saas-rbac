import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { URL } from 'url'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function authenticateWithGithub(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/github',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with Github',
        body: z.object({
          code: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.body

      const githubOAuthURL = new URL(
        'https://github.com/login/oauth/access_token',
      )

      githubOAuthURL.searchParams.set('client_id', 'Ov23li3RGBRqmSSgUHLe')
      githubOAuthURL.searchParams.set(
        'client_secret',
        '5f4cf04db0876eeb16918904e61e80d7c4c3fc00',
      )
      githubOAuthURL.searchParams.set(
        'redirect_uri',
        'http://localhost:3000/api/auth/callback',
      )
      githubOAuthURL.searchParams.set('code', code)

      const githubAccessTokenResponse = await fetch(githubOAuthURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      })

      const githubAccessTokenData = await githubAccessTokenResponse.json()

      const { access_token: githubAccessToken } = z
        .object({
          access_token: z.string(),
          token_type: z.literal('bearer'),
          scope: z.string(),
        })
        .parse(githubAccessTokenData)

      const githubUserResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${githubAccessToken}`,
        },
      })

      const githubUserResponseData = await githubUserResponse.json()

      const {
        id: githubId,
        name,
        email,
        avatar_url: avatarUrl,
      } = z
        .object({
          id: z.number().int().transform(String),
          name: z.string().nullable(),
          email: z.string().email().nullable(),
          avatar_url: z.string().url(),
        })
        .parse(githubUserResponseData)

      if (!email) {
        throw new BadRequestError(
          'Your Github account must have an e-mail to authenticate',
        )
      }

      let user = await prisma.user.findUnique({ where: { email } })

      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            avatarUrl,
            name,
          },
        })
      }

      let account = await prisma.account.findUnique({
        where: { provider_userId: { provider: 'GITHUB', userId: user.id } },
      })

      if (!account) {
        account = await prisma.account.create({
          data: {
            provider: 'GITHUB',
            userId: user.id,
            providerAccountId: githubId,
          },
        })
      }

      const token = await reply.jwtSign(
        { sub: user.id },
        {
          sign: {
            expiresIn: '7d',
          },
        },
      )

      return reply.status(201).send({ token })
    },
  )
}
