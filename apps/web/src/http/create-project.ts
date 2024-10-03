import { api } from './api-client'

interface ICreateProjectRequest {
  name: string
  description: string
  org: string
}

type CreateProjectResponse = {
  projectId: string
}

export async function createProject({
  name,
  description,
  org,
}: ICreateProjectRequest): Promise<CreateProjectResponse> {
  return await api
    .post(`organizations/${org}/projects`, {
      json: {
        name,
        description,
      },
    })
    .json()
}
