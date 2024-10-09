import { api } from './api-client'

interface IUpdateOrganizationRequest {
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
  org: string
}

type UpdateOrganizationResponse = {
  organizationId: string
}

export async function updateOrganization({
  name,
  domain,
  shouldAttachUsersByDomain,
  org,
}: IUpdateOrganizationRequest): Promise<UpdateOrganizationResponse> {
  return await api
    .put(`organizations/${org}`, {
      json: {
        name,
        domain,
        shouldAttachUsersByDomain,
      },
    })
    .json()
}
