import { api } from './api-client'

interface ICreateOrganizationRequest {
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

type CreateOrganizationResponse = {
  organizationId: string
}

export async function createOrganization({
  name,
  domain,
  shouldAttachUsersByDomain,
}: ICreateOrganizationRequest): Promise<CreateOrganizationResponse> {
  return await api
    .post('organizations', {
      json: {
        name,
        domain,
        shouldAttachUsersByDomain,
      },
    })
    .json()
}
