import 'fastify'

import { Member, Organization } from '@prisma/client'
declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUserId(): Promise<string>
    getUserMembership(
      slug: string,
    ): Promise<{ organization: Organization; membership: Member }>
  }
}

// Nesse arquivo estamos extendendo a interface FastifyRequest
// para que possamos adicionar a ela uma nova funcao chamada getCurrentUserId
