import { api } from './api-client'

export async function rejectInvite(inviteId: string) {
  return await api.post(`invites/${inviteId}/reject`).json()
}
