import { Role } from '@sass/auth'
import { api } from './api-client'
import next from 'next'

interface GetMembersResponse {
  members: {
    name: string | null
    id: string
    avatarUrl: string | null
    role: Role
    userId: string
    email: string
  }[]
}

export async function getMembers(org: string) {
  const result = await api
    .get(`organizations/${org}/members`, {
      next: {
        tags: [`${org}/members`],
      },
    })
    .json<GetMembersResponse>()

  return result
}