import { Role } from '@sass/auth'
import { api } from './api-client'

interface ICreateInviteRequest {
  email: string
  role: Role
  org: string
}

type CreateInviteResponse = {
  projectId: string
}

export async function createInvite({
  email,
  role,
  org,
}: ICreateInviteRequest): Promise<CreateInviteResponse> {
  return await api
    .post(`organizations/${org}/invites`, {
      json: {
        email,
        role,
      },
    })
    .json()
}
