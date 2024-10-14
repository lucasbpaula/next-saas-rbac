import { Role } from '@sass/auth'
import { api } from './api-client'

interface UpdateMemberRequest {
  role: Role
  org: string
  memberId: string
}

export async function updateMember({
  role,
  memberId,
  org,
}: UpdateMemberRequest) {
  const result = await api
    .put(`organizations/${org}/members/${memberId}`, {
      json: { role },
    })
    .json()

  return result
}
