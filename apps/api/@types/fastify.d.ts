import 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUserId(): Promise<string>
  }
}

// Nesse arquivo estamos extendendo a interface FastifyRequest
// para que possamos adicionar a ela uma nova funcao chamada getCurrentUserId
