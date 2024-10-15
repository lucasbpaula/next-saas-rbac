import { api } from './api-client'

interface RevokeInviteRequest {
  org: string
  inviteId: string
}

export async function revokeInvite({ org, inviteId }: RevokeInviteRequest) {
  return await api.delete(`organizations/${org}/invites/${inviteId}/revoke`)
}
